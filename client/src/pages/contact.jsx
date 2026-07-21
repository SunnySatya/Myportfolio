import { useState } from "react";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaPaperPlane,
  FaSpinner,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { showToast } from "../components/Toast";
import "./contact.css";

const Contact = () => {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
    // Clear error on input
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!contact.username.trim()) {
      newErrors.username = "Username is required";
    } else if (contact.username.trim().length < 2) {
      newErrors.username = "Username must be at least 2 characters";
    }

    if (!contact.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!contact.message.trim()) {
      newErrors.message = "Message is required";
    } else if (contact.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    const { username, email, message } = contact;

    try {
      const response = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        showToast(data.message || "Message sent successfully!", "success");
        setContact({ username: "", email: "", message: "" });
        setErrors({});
      } else {
        showToast(data.message || "Failed to send message", "error");
      }
    } catch (error) {
      showToast(
        "Failed to send message. Please check if the server is running.",
        "error",
      );
      console.error("Contact form error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* 📬 Contact Hero */}
      <section className="contact-hero page-section">
        <div className="container">
          <div className="section-title">
            <span className="subtitle">Get In Touch</span>
            <h1>
              Let's <span className="gradient-text">Talk</span>
            </h1>
            <p>
              Have a project in mind or just want to say hi? I'd love to hear
              from you.
            </p>
          </div>
        </div>
      </section>

      {/* 📝 Contact Section */}
      <section className="contact-main page-section">
        <div className="container">
          <div className="contact-grid">
            {/* Left - Contact Info */}
            <div className="contact-info animate-fade-in-left">
              <h3>Contact Information</h3>
              <p className="contact-info-desc">
                Feel free to reach out through the form or any of the channels
                below.
              </p>

              <div className="contact-details">
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h4>Email</h4>
                    <a href="mailto:hello@shanidevpriya.dev">
                      hello@shanidevpriya.dev
                    </a>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h4>Location</h4>
                    <p>India (Available Worldwide)</p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <FaPhone />
                  </div>
                  <div>
                    <h4>Phone</h4>
                    <a href="tel:+919999999999">+91 99999 99999</a>
                  </div>
                </div>
              </div>

              <div className="contact-social">
                <h4>Follow Me</h4>
                <div className="contact-social-links">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-link"
                    aria-label="GitHub"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-link"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-link"
                    aria-label="Twitter"
                  >
                    <FaTwitter />
                  </a>
                </div>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div className="contact-form-wrapper animate-fade-in-right">
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="username">Your Name</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="John Doe"
                    required
                    autoComplete="name"
                    value={contact.username}
                    onChange={handleInput}
                    className={errors.username ? "input-error" : ""}
                  />
                  {errors.username && (
                    <span className="form-error">{errors.username}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="john@example.com"
                    required
                    autoComplete="email"
                    value={contact.email}
                    onChange={handleInput}
                    className={errors.email ? "input-error" : ""}
                  />
                  {errors.email && (
                    <span className="form-error">{errors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    name="message"
                    id="message"
                    cols="30"
                    rows="6"
                    placeholder="Tell me about your project..."
                    required
                    autoComplete="off"
                    value={contact.message}
                    onChange={handleInput}
                    className={errors.message ? "input-error" : ""}
                  />
                  {errors.message && (
                    <span className="form-error">{errors.message}</span>
                  )}
                </div>

                <button
                  className="btn btn-primary btn-lg"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="spinner" /> Sending...
                    </>
                  ) : (
                    <>
                      Send Message <FaPaperPlane />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
