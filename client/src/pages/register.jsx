import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSpinner,
  FaArrowRight,
} from "react-icons/fa";
import { showToast } from "../components/Toast";
import "./auth.css";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
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
    if (!user.username.trim()) newErrors.username = "Username is required";
    else if (user.username.trim().length < 2)
      newErrors.username = "Username must be at least 2 characters";
    if (!user.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email))
      newErrors.email = "Invalid email format";
    if (!user.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10,}$/.test(user.phone.replace(/[\s-]/g, "")))
      newErrors.phone = "Enter a valid phone number";
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
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", data.user?.username || user.username);
      localStorage.setItem("userEmail", data.user?.email || "");
      localStorage.setItem("isAdmin", data.user?.isAdmin || "false");
      window.dispatchEvent(new Event("authChanged"));
      showToast("Registration successful! Welcome aboard.", "success");
      setUser({ username: "", email: "", phone: "", password: "" });
      navigate("/");
    } catch (error) {
      console.error("Register fetch error:", error);
      showToast(
        error.message || "Registration failed. Please try again.",
        "error",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-page page-section">
      <div className="container">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="gradient-text">Create Account</h1>
            <p>Sign up to get started with your journey</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="username">
                <FaUser /> Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="John Doe"
                required
                autoComplete="name"
                value={user.username}
                onChange={handleInput}
                className={errors.username ? "input-error" : ""}
              />
              {errors.username && (
                <span className="form-error">{errors.username}</span>
              )}
            </div>

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
              <label htmlFor="phone">
                <FaPhone /> Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="+1 234 567 8900"
                required
                autoComplete="tel"
                value={user.phone}
                onChange={handleInput}
                className={errors.phone ? "input-error" : ""}
              />
              {errors.phone && (
                <span className="form-error">{errors.phone}</span>
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
                  placeholder="Create a strong password"
                  required
                  autoComplete="new-password"
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
                  <FaSpinner className="spinner" /> Creating Account...
                </>
              ) : (
                <>
                  Create Account <FaArrowRight />
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{" "}
              <NavLink to="/login" className="auth-link">
                Sign in
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
