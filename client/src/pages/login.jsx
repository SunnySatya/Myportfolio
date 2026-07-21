import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSpinner,
  FaArrowRight,
} from "react-icons/fa";
import { showToast } from "../components/Toast";
import "./auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!user.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email))
      newErrors.email = "Invalid email format";
    if (!user.password) newErrors.password = "Password is required";
    else if (user.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, password: user.password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", data.user?.username || "User");
      localStorage.setItem("userEmail", data.user?.email || "");
      localStorage.setItem("isAdmin", data.user?.isAdmin || "false");
      window.dispatchEvent(new Event("authChanged"));
      showToast("Login successful! Welcome back.", "success");
      setUser({ email: "", password: "" });

      // Redirect admin to admin dashboard
      if (data.user?.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login fetch error:", error);
      showToast(error.message || "Login failed. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-page page-section">
      <div className="container">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="gradient-text">Welcome Back</h1>
            <p>Sign in to your account to continue</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="email">
                <FaEnvelope /> Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="john@example.com"
                required
                autoComplete="email"
                value={user.email}
                onChange={handleInput}
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && (
                <span className="form-error">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <FaLock /> Password
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  value={user.password}
                  onChange={handleInput}
                  className={errors.password ? "input-error" : ""}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <span className="form-error">{errors.password}</span>
              )}
            </div>

            <button
              className="btn btn-primary btn-lg"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="spinner" /> Signing In...
                </>
              ) : (
                <>
                  Sign In <FaArrowRight />
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account?{" "}
              <NavLink to="/register" className="auth-link">
                Create one
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
