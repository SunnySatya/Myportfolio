import { Component } from "react";
import { NavLink } from "react-router-dom";
import { FaExclamationTriangle, FaHome, FaRedo } from "react-icons/fa";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <section className="error-boundary-page page-section">
          <div className="container">
            <div className="error-content animate-scale-in">
              <div className="error-404-wrapper">
                <span className="error-boundary-icon">
                  <FaExclamationTriangle />
                </span>
              </div>

              <div className="error-text">
                <h1>Something Went Wrong</h1>
                <p>
                  An unexpected error occurred. Please try refreshing the page
                  or go back to the homepage.
                </p>
                {process.env.NODE_ENV === "development" && (
                  <details className="error-details">
                    <summary>Error Details</summary>
                    <pre>{this.state.error?.message}</pre>
                  </details>
                )}
              </div>

              <div className="error-actions">
                <button
                  onClick={this.handleReset}
                  className="btn btn-primary btn-lg"
                >
                  <FaRedo /> Try Again
                </button>
                <NavLink to="/" className="btn btn-outline btn-lg">
                  <FaHome /> Back to Home
                </NavLink>
              </div>
            </div>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
