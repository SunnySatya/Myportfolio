import { NavLink } from "react-router-dom";
import {
  FaArrowRight,
  FaDownload,
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaDatabase,
} from "react-icons/fa";
import "./about.css";

const About = () => {
  const skills = [
    { name: "React / Next.js", level: 92, icon: <FaReact />, color: "#61dafb" },
    { name: "JavaScript / ES6+", level: 88, icon: <FaJs />, color: "#f7df1e" },
    { name: "HTML5", level: 95, icon: <FaHtml5 />, color: "#e34f26" },
    {
      name: "CSS3 / Tailwind",
      level: 93,
      icon: <FaCss3Alt />,
      color: "#1572b6",
    },
    {
      name: "Node.js / Express",
      level: 78,
      icon: <FaNodeJs />,
      color: "#68a063",
    },
    {
      name: "MongoDB / SQL",
      level: 72,
      icon: <FaDatabase />,
      color: "#47a248",
    },
  ];

  const timeline = [
    {
      year: "2025",
      title: "Mern Stack Developer",
      company: "Freelance / Agency",
      desc: "Leading frontend architecture for enterprise clients, building scalable React applications.",
    },
    {
      year: "2023",
      title: "Junior Developer",
      company: "Tech Startup",
      desc: "Built full-stack web applications using React, Node.js, and MongoDB from the ground up.",
    },
    {
      year: "2023",
      title: "Frontend Developer",
      company: "Digital Agency",
      desc: "Developed responsive websites and React components for diverse client projects.",
    },
    {
      year: "2022",
      title: "Started Coding",
      company: "Self-Taught Journey",
      desc: "Began learning web development. Completed multiple bootcamps and built personal projects.",
    },
  ];

  return (
    <>
      {/* 📖 About Hero */}
      <section className="about-hero page-section">
        <div className="container">
          <div className="about-hero-grid">
            <div className="about-hero-content animate-fade-in-left">
              <p className="hero-greeting">📖 About Me</p>
              <h1>
                Turning Ideas Into{" "}
                <span className="gradient-text">Digital Experiences</span>
              </h1>
              <p className="about-hero-desc">
                I'm a passionate Frontend Developer with 3+ years of experience
                crafting beautiful, functional, and user-centered digital
                experiences. I specialize in React ecosystem and modern
                JavaScript.
              </p>
              <p className="about-hero-desc">
                I believe in writing clean, maintainable code and building
                products that make a real difference. When I'm not coding,
                you'll find me exploring new technologies, contributing to open
                source, or writing technical articles.
              </p>
              <div className="about-hero-cta">
                <a href="#" className="btn btn-primary btn-lg">
                  <FaDownload /> Download Resume
                </a>
                <NavLink to="/contact" className="btn btn-outline btn-lg">
                  Contact Me <FaArrowRight />
                </NavLink>
              </div>
            </div>
            <div className="about-hero-visual animate-fade-in-right">
              <div className="about-image-card">
                <div className="about-image-placeholder">
                  <img
                    src="images/full profile.png"
                    alt="Shani Devpriya - Full Profile"
                    className="about-full-image"
                  />
                </div>
                <div className="about-image-badges">
                  <span className="badge-exp">3+ Years</span>
                  <span className="badge-exp">50+ Projects</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🛠️ Skills Section */}
      <section className="about-skills page-section">
        <div className="container">
          <div className="section-title">
            <span className="subtitle">My Toolkit</span>
            <h2>Technical Skills & Expertise</h2>
            <p>Technologies I work with on a daily basis</p>
          </div>

          <div className="about-skills-grid">
            {skills.map((skill, idx) => (
              <div
                className="about-skill-card animate-fade-in-up"
                key={skill.name}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div
                  className="about-skill-icon"
                  style={{ color: skill.color }}
                >
                  {skill.icon}
                </div>
                <div className="about-skill-info">
                  <h4>{skill.name}</h4>
                  <div className="about-skill-bar">
                    <div
                      className="about-skill-fill"
                      style={{
                        width: `${skill.level}%`,
                        background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
                      }}
                    />
                  </div>
                </div>
                <span className="about-skill-level">{skill.level}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⏰ Experience Timeline */}
      <section className="about-timeline page-section">
        <div className="container">
          <div className="section-title">
            <span className="subtitle">My Journey</span>
            <h2>Work Experience</h2>
            <p>My professional journey so far</p>
          </div>

          <div className="timeline">
            {timeline.map((item, idx) => (
              <div
                className="timeline-item animate-fade-in-up"
                key={item.year + item.title}
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="timeline-dot" />
                <div className="timeline-content card">
                  <span className="timeline-year">{item.year}</span>
                  <h4>{item.title}</h4>
                  <span className="timeline-company">{item.company}</span>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 💡 Fun Facts */}
      <section className="about-facts page-section">
        <div className="container">
          <div className="section-title">
            <span className="subtitle">Beyond Code</span>
            <h2>More About Me</h2>
          </div>

          <div className="facts-grid">
            <div className="fact-card glass">
              <span className="fact-emoji">☕</span>
              <h4>Coffee Fueled</h4>
              <p>I run on coffee and clean code. 5+ cups a day!</p>
            </div>
            <div className="fact-card glass">
              <span className="fact-emoji">📚</span>
              <h4>Continuous Learner</h4>
              <p>Always exploring new tech and reading tech blogs.</p>
            </div>
            <div className="fact-card glass">
              <span className="fact-emoji">🌍</span>
              <h4>Remote Work</h4>
              <p>Based in India, available for remote opportunities.</p>
            </div>
            <div className="fact-card glass">
              <span className="fact-emoji">🎮</span>
              <h4>Gaming</h4>
              <p>When not coding, I'm leveling up in games.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
