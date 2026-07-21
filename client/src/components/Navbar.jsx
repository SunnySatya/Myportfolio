import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaMoon, FaSun, FaUser } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Auth state sync
  useEffect(() => {
    const updateAuthState = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
      setUserName(localStorage.getItem("userName") || "User");
    };

    updateAuthState();
    window.addEventListener("authChanged", updateAuthState);
    return () => window.removeEventListener("authChanged", updateAuthState);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Close menu and dropdown on route change
  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [navigate]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClickOutside = (e) => {
      if (!e.target.closest(".profile-menu")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    window.dispatchEvent(new Event("authChanged"));
    navigate("/");
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" onClick={closeMenu}>
            <span className="brand-first">Shani</span>
            <span className="brand-last">Devpriya</span>
          </NavLink>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="navbar-actions">
          <button
            className="theme-toggle-btn"
            onClick={toggleDarkMode}
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            title={darkMode ? "Light Mode" : "Dark Mode"}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          <button
            className={`hamburger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navigation */}
        <nav className={`navbar-nav ${menuOpen ? "nav-open" : ""}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink to="/" end onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" onClick={closeMenu}>
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/service" onClick={closeMenu}>
                Services
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" onClick={closeMenu}>
                Contact
              </NavLink>
            </li>

            {!isLoggedIn ? (
              <>
                <li className="nav-item nav-item-mobile-only">
                  <NavLink to="/login" onClick={closeMenu}>
                    Login
                  </NavLink>
                </li>
                <li className="nav-item nav-item-mobile-only">
                  <NavLink to="/register" onClick={closeMenu}>
                    Register
                  </NavLink>
                </li>
                <li className="nav-item nav-item-desktop">
                  <NavLink
                    to="/login"
                    className="btn btn-sm btn-outline"
                    onClick={closeMenu}
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item nav-item-desktop">
                  <NavLink
                    to="/register"
                    className="btn btn-sm btn-primary"
                    onClick={closeMenu}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <li
                className={`nav-item profile-item ${menuOpen ? "" : "nav-item-desktop"}`}
              >
                <div className="profile-menu">
                  <span
                    className="profile-trigger"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                  >
                    <FaUser className="profile-icon" />
                    <span className="profile-name">{userName}</span>
                  </span>
                  <div
                    className={`profile-dropdown ${dropdownOpen ? "dropdown-open" : ""}`}
                  >
                    {localStorage.getItem("isAdmin") === "true" && (
                      <NavLink
                        to="/admin"
                        className="admin-link"
                        onClick={() => {
                          setDropdownOpen(false);
                          closeMenu();
                        }}
                      >
                        Admin Panel
                      </NavLink>
                    )}
                    <button onClick={handleLogout} className="logout-btn">
                      Logout
                    </button>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </nav>

        {/* Mobile Overlay */}
        {menuOpen && <div className="nav-overlay" onClick={closeMenu} />}
      </div>
    </header>
  );
};

export default Navbar;
