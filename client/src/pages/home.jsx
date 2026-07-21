import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  FaArrowRight,
  FaCode,
  FaLaptopCode,
  FaMobileAlt,
  FaServer,
} from "react-icons/fa";
import "./home.css";

// Typing Text Component
const TypeWriter = ({
  texts,
  speed = 80,
  deleteSpeed = 40,
  pauseTime = 2000,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < currentText.length) {
            setDisplayText(currentText.slice(0, charIndex + 1));
            setCharIndex((prev) => prev + 1);
          } else {
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else {
          if (charIndex > 0) {
            setDisplayText(currentText.slice(0, charIndex - 1));
            setCharIndex((prev) => prev - 1);
          } else {
            setIsDeleting(false);
            setTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed,
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, speed, deleteSpeed, pauseTime]);

  return (
    <span className="typewriter-text">
      {displayText}
      <span className="typewriter-cursor">|</span>
    </span>
  );
};

// Animated Counter
const AnimatedCounter = ({ end, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 },
    );

    if (counterRef.current) observer.observe(counterRef.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={counterRef} className="counter">
      {count}
      {suffix}
    </span>
  );
};

// Skills Data
const skills = [
  { name: "React", level: 92, color: "#61dafb" },
  { name: "JavaScript", level: 88, color: "#f7df1e" },
  { name: "HTML/CSS", level: 95, color: "#e34f26" },
  { name: "Node.js", level: 78, color: "#68a063" },
  { name: "MongoDB", level: 72, color: "#47a248" },
  { name: "TypeScript", level: 75, color: "#007acc" },
  { name: "Express", level: 78, color: "#00cc88" },
  { name: "Git", level: 75, color: "#85cc00" },
  { name: "Github", level: 75, color: "#cc007e" },
];

// Services Data
const services = [
  {
    icon: <FaCode />,
    title: "Clean Code",
    desc: "Writing maintainable, scalable code following best practices.",
  },
  {
    icon: <FaLaptopCode />,
    title: "Web Apps",
    desc: "Building modern, responsive web applications with React.",
  },
  {
    icon: <FaMobileAlt />,
    title: "Responsive UI",
    desc: "Pixel perfect designs that look great on all devices.",
  },
  {
    icon: <FaServer />,
    title: "Full Stack",
    desc: "End-to-end solutions from frontend to backend.",
  },
];

const Home = () => {
  const typedTexts = [
    "Mern Developer",
    "AI Web Developer",
    "UI/UX Enthusiast",
    "Problem Solver",
  ];

  return (
    <>
      {/* ⚡ Hero Section */}
      <section className="hero-section page-section" id="home">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content animate-fade-in-left">
              <p className="hero-greeting">👋 Hello, I'm</p>
              <h1 className="hero-title">
                <span className="gradient-text">Shani</span> Devpriya
              </h1>
              <div className="hero-role">
                <span className="hero-role-label">I'm a </span>
                <TypeWriter texts={typedTexts} />
              </div>
              <p className="hero-description">
                I craft clean, pixel-perfect web experiences with modern
                technologies. Passionate about building accessible, performant,
                and beautiful interfaces that users love.
              </p>

              <div className="hero-cta">
                <NavLink to="/contact" className="btn btn-primary btn-lg">
                  Hire Me <FaArrowRight />
                </NavLink>
                <NavLink to="/service" className="btn btn-outline btn-lg">
                  View Services
                </NavLink>
              </div>

              {/* Stats Strip */}
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">3+</span>
                  <span className="stat-label">Years Exp</span>
                </div>
                <div className="stat-divider" />
                <div className="stat-item">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Projects</span>
                </div>
                <div className="stat-divider" />
                <div className="stat-item">
                  <span className="stat-number">30+</span>
                  <span className="stat-label">Clients</span>
                </div>
              </div>
            </div>

            <div className="hero-visual animate-fade-in-right">
              <div className="hero-image-wrapper">
                <div className="hero-image-glow" />
                <img
                  src="images/webdev.png"
                  alt="Shani Devpriya - Frontend Developer"
                  className="hero-image"
                />
                <div className="hero-floating-badge badge-1">
                  <FaCode /> React
                </div>
                <div className="hero-floating-badge badge-2">
                  <FaLaptopCode /> UI/UX
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Orbs */}
        <div className="hero-bg-orbs">
          <div className="hero-orb orb-1" />
          <div className="hero-orb orb-2" />
          <div className="hero-orb orb-3" />
        </div>
      </section>

      {/* 📊 Analytics Section */}
      <section className="analytics-section page-section">
        <div className="container">
          <div className="analytics-grid">
            <div className="analytics-card">
              <h3>
                <AnimatedCounter end={50} suffix="+" />
              </h3>
              <p>Registered Companies</p>
            </div>
            <div className="analytics-card">
              <h3>
                <AnimatedCounter end={400} suffix="+" />
              </h3>
              <p>Happy Clients</p>
            </div>
            <div className="analytics-card">
              <h3>
                <AnimatedCounter end={500} suffix="+" />
              </h3>
              <p>Developers</p>
            </div>
            <div className="analytics-card">
              <h3>
                <AnimatedCounter end={50} suffix="+" />
              </h3>
              <p>Projects Delivered</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🛠️ Skills Section */}
      <section className="skills-section page-section">
        <div className="container">
          <div className="section-title">
            <span className="subtitle">My Expertise</span>
            <h2>Technical Skills</h2>
            <p>Technologies and tools I use to bring ideas to life</p>
          </div>

          <div className="skills-grid">
            {skills.map((skill, idx) => (
              <div
                className="skill-card animate-fade-in-up"
                key={skill.name}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percent">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-bar-fill"
                    style={{
                      width: `${skill.level}%`,
                      background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 Services Preview Section */}
      <section className="services-preview-section page-section">
        <div className="container">
          <div className="section-title">
            <span className="subtitle">What I Do</span>
            <h2>Services I Offer</h2>
            <p>From concept to deployment, I deliver complete web solutions</p>
          </div>

          <div className="services-preview-grid">
            {services.map((service, idx) => (
              <div
                className="service-preview-card animate-fade-in-up"
                key={service.title}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="service-preview-icon">{service.icon}</div>
                <h4>{service.title}</h4>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>

          <div className="services-cta">
            <NavLink to="/service" className="btn btn-primary">
              View All Services <FaArrowRight />
            </NavLink>
          </div>
        </div>
      </section>

      {/* 💬 CTA Section */}
      <section className="cta-section page-section">
        <div className="container">
          <div className="cta-card glass">
            <div className="cta-content">
              <h2>Let's Work Together</h2>
              <p>
                Have a project in mind? Let's discuss how I can help you build
                something amazing.
              </p>
              <div className="cta-buttons">
                <NavLink to="/contact" className="btn btn-primary btn-lg">
                  Get In Touch <FaArrowRight />
                </NavLink>
                <NavLink to="/about" className="btn btn-white btn-lg">
                  Learn More
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
