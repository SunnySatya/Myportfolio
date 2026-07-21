import { NavLink } from "react-router-dom";
import { FaHome, FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";
import "./error.css";

const Error = () => {
  return (
    <section className="error-page page-section">
      <div className="container">
        <div className="error-content animate-scale-in">
          <div className="error-404-wrapper">
            <span className="error-404">4</span>
            <span className="error-404-orb">
              <FaExclamationTriangle />
            </span>
            <span className="error-404">4</span>
          </div>
          <div className="error-text">
            <h1>Page Not Found</h1>
            <p>
              Oops! The page you're looking for doesn't exist or has been moved.
              Let's get you back on track.
            </p>
          </div>
          <div className="error-actions">
            <NavLink to="/" className="btn btn-primary btn-lg">
              <FaHome /> Back to Home
            </NavLink>
            <NavLink to="/contact" className="btn btn-outline btn-lg">
              <FaArrowLeft /> Report Issue
            </NavLink>
          </div>
          <div className="error-help">
            <p>Here are some helpful links:</p>
            <div className="error-links">
              <NavLink to="/">Home</NavLink>
              <span className="error-link-dot">-</span>
              <NavLink to="/about">About</NavLink>
              <span className="error-link-dot">-</span>
              <NavLink to="/service">Services</NavLink>
              <span className="error-link-dot">-</span>
              <NavLink to="/contact">Contact</NavLink>
            </div>
          </div>
        </div>
        <div className="error-bg-orbs">
          <div className="error-orb" />
          <div className="error-orb error-orb-2" />
        </div>
      </div>
    </section>
  );
};

export default Error;
