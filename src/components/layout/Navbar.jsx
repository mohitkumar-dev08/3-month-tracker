import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ streak, darkMode, toggleDarkMode }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: "/", name: "Dashboard", icon: "🏠" },
    { path: "/tracker", name: "Tracker", icon: "📊" },
    { path: "/tasks", name: "Tasks", icon: "✅" },
    { path: "/gym", name: "Gym", icon: "💪" },
    { path: "/english", name: "English", icon: "🇬🇧" },
    { path: "/wellness", name: "Wellness", icon: "🧘" },
    { path: "/inspiration", name: "Inspire", icon: "💭" }
  ];

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          {/* Brand with animation */}
          <Link to="/" className="nav-brand">
            <span className="brand-icon">🌳</span>
            <span className="brand-name">93 DAYS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-links">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="nav-icon">{link.icon}</span>
                <span className="nav-text">{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="nav-actions">
            <span className="nav-streak">
              <span className="fire-emoji">🔥</span>
              <span>{streak}</span>
            </span>
            
            <button className="theme-toggle" onClick={toggleDarkMode}>
              {darkMode ? '☀️' : '🌙'}
            </button>

            {/* Mobile menu toggle button */}
            <button 
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="nav-icon">{link.icon}</span>
              <span className="nav-text">{link.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}