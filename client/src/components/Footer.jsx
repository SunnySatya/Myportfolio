import { NavLink } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaHeart,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/service" },
    { name: "Contact", path: "/contact" },
  ];

  const services = [
    "Web Development",
    "React Apps",
    "UI/UX Design",
    "Responsive Design",
  ];

  return (
    <footer className="footer">
      <div className="footer-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity="0.25"
            fill="currentColor"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity="0.5"
            fill="currentColor"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Section */}
            <div className="footer-brand">
              <h3 className="footer-logo">
                <span className="gradient-text">Shani</span> Devpriya
              </h3>
              <p className="footer-desc">
                A passionate Frontend Developer dedicated to crafting clean,
                responsive, and user-friendly web experiences. Let's build
                something amazing together.
              </p>
              <div className="footer-social">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a>
                <a
                  href="mailto:hello@shanidevpriya.dev"
                  className="social-link"
                  aria-label="Email"
                >
                  <FaEnvelope />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-links">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <NavLink to={link.path} end>
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="footer-col">
              <h4 className="footer-heading">Services</h4>
              <ul className="footer-links">
                {services.map((service, idx) => (
                  <li key={idx}>
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter / CTA */}
            <div className="footer-col footer-cta">
              <h4 className="footer-heading">Get In Touch</h4>
              <p>
                Have a project in mind? Let's work together to create something
                extraordinary.
              </p>
              <NavLink to="/contact" className="btn btn-primary btn-sm">
                <FaEnvelope /> Contact Me
              </NavLink>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <p>&copy; {currentYear} Shani Devpriya. All rights reserved.</p>
            <p className="footer-made-with">
              Made with <FaHeart className="heart-icon" /> using React
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
