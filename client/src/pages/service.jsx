import { NavLink } from "react-router-dom";
import {
  FaArrowRight,
  FaCode,
  FaLaptopCode,
  FaMobileAlt,
  FaPalette,
  FaRocket,
  FaShieldAlt,
  FaCogs,
} from "react-icons/fa";
import "./service.css";

const Service = () => {
  const services = [
    {
      icon: <FaLaptopCode />,
      title: "Web Development",
      desc: "Custom websites and web applications built with modern frameworks and best practices.",
      features: [
        "React / Next.js development",
        "Single Page Applications",
        "Server-side rendering",
        "Progressive Web Apps",
      ],
      price: "Starting at $500",
    },
    {
      icon: <FaCode />,
      title: "Frontend Development",
      desc: "Pixel-perfect, responsive interfaces with clean, maintainable code.",
      features: [
        "HTML5 / CSS3 / JavaScript",
        "Tailwind CSS / Bootstrap",
        "Animation & transitions",
        "Cross-browser compatibility",
      ],
      price: "Starting at $300",
    },
    {
      icon: <FaMobileAlt />,
      title: "Responsive Design",
      desc: "Mobile-first designs that look stunning on every device and screen size.",
      features: [
        "Mobile-first approach",
        "Fluid layouts",
        "Touch-friendly interfaces",
        "Performance optimization",
      ],
      price: "Starting at $250",
    },
    {
      icon: <FaPalette />,
      title: "UI/UX Design",
      desc: "User-centered designs that are both beautiful and intuitive to use.",
      features: [
        "Wireframes & prototypes",
        "User research",
        "Design systems",
        "Accessibility (a11y)",
      ],
      price: "Starting at $400",
    },
    {
      icon: <FaRocket />,
      title: "Performance Optimization",
      desc: "Speed up your website with performance audits and optimizations.",
      features: [
        "Lighthouse audits",
        "Code splitting",
        "Image optimization",
        "Caching strategies",
      ],
      price: "Starting at $200",
    },
    {
      icon: <FaShieldAlt />,
      title: "Maintenance & Support",
      desc: "Ongoing maintenance, updates, and technical support for your applications.",
      features: [
        "Bug fixes & updates",
        "Security patches",
        "Performance monitoring",
        "24/7 support",
      ],
      price: "Starting at $150/mo",
    },
  ];

  return (
    <>
      {/* 🚀 Services Hero */}
      <section className="services-hero page-section">
        <div className="container">
          <div className="section-title">
            <span className="subtitle">What I Offer</span>
            <h1>
              My <span className="gradient-text">Services</span>
            </h1>
            <p>
              From concept to deployment, I provide end-to-end web solutions
              tailored to your needs.
            </p>
          </div>
        </div>
      </section>

      {/* 🔧 Services Grid */}
      <section className="services-grid-section page-section">
        <div className="container">
          <div className="services-grid">
            {services.map((service, idx) => (
              <div
                className="service-card animate-fade-in-up"
                key={service.title}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="service-card-header">
                  <div className="service-card-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                </div>
                <p className="service-card-desc">{service.desc}</p>
                <ul className="service-card-features">
                  {service.features.map((feature) => (
                    <li key={feature}>
                      <FaArrowRight className="feature-arrow" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="service-card-footer">
                  <span className="service-price">{service.price}</span>
                  <NavLink to="/contact" className="btn btn-sm btn-primary">
                    Get Started
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⚙️ Process Section */}
      <section className="process-section page-section">
        <div className="container">
          <div className="section-title">
            <span className="subtitle">How I Work</span>
            <h2>My Development Process</h2>
            <p>A streamlined approach to deliver quality results</p>
          </div>

          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">01</div>
              <h4>Discovery</h4>
              <p>Understanding your needs, goals, and target audience.</p>
            </div>
            <div className="process-connector" />
            <div className="process-step">
              <div className="step-number">02</div>
              <h4>Design</h4>
              <p>Creating wireframes, prototypes, and visual designs.</p>
            </div>
            <div className="process-connector" />
            <div className="process-step">
              <div className="step-number">03</div>
              <h4>Develop</h4>
              <p>Building with clean code, testing, and iteration.</p>
            </div>
            <div className="process-connector" />
            <div className="process-step">
              <div className="step-number">04</div>
              <h4>Deploy</h4>
              <p>Launching, monitoring, and ongoing support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 💬 CTA */}
      <section className="services-cta page-section">
        <div className="container">
          <div className="cta-card glass">
            <div className="cta-content">
              <h2>Ready to Start Your Project?</h2>
              <p>
                Let's discuss your requirements and create something amazing
                together.
              </p>
              <div className="cta-buttons">
                <NavLink to="/contact" className="btn btn-primary btn-lg">
                  Get a Quote <FaArrowRight />
                </NavLink>
                <NavLink to="/" className="btn btn-white btn-lg">
                  Back to Home
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Service;
