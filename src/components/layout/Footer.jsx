import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>🌳 93 Days Challenge</h4>
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
          <p className="copyright">© 2026 93 Days Challenge</p>
        </div>
      </div>
    </footer>
  );
}