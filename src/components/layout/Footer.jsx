// components/layout/Footer.jsx
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Footer() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateTimer = () => {
      const unlockTime = sessionStorage.getItem("app_unlock_time");
      
      if (unlockTime) {
        const now = Date.now();
        const elapsed = now - parseInt(unlockTime);
        const AUTO_LOCK_TIME = 5 * 60 * 1000; // 🔴 5 minutes
        const remaining = AUTO_LOCK_TIME - elapsed;
        
        if (remaining <= 0) {
          setTimeLeft("0m 0s");
          // Auto-lock when time's up
          setTimeout(() => {
            sessionStorage.removeItem("app_unlock_time");
            window.location.reload();
          }, 1000);
        } else {
          const totalSeconds = Math.ceil(remaining / 1000);
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60;
          setTimeLeft(`${minutes}m ${seconds}s`); // 🔴 Format: "4m 30s"
        }
      } else {
        setTimeLeft("");
      }
    };

    // Update every second
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>🌳 51 Days Challenge</h4>
          <p>Transform yourself in 3 months. Every day counts.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/tracker">Tracker</Link></li>
            <li><Link to="/tasks">Tasks</Link></li>
            <li><Link to="/gym">Gym</Link></li>
            <li><Link to="/english">English</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Resources</h4>
          <ul className="footer-links">
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Privacy</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Connect</h4>
          <div className="social-links">
            <a href="#" className="social-link">📱</a>
            <a href="#" className="social-link">🐦</a>
            <a href="#" className="social-link">📘</a>
            <a href="#" className="social-link">📸</a>
          </div>
          
          {/* 🔥 LOCK TIMER - 5 minutes */}
          {timeLeft && (
            <div className="lock-timer">
              ⏱️ Auto-lock in: {timeLeft}
            </div>
          )}
          
          <p className="copyright">© 2026 93 Days Challenge</p>
        </div>
      </div>
    </footer>
  );
}