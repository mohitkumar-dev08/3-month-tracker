// pages/Dashboard.jsx
import { Link } from "react-router-dom";
import QuoteBanner from "../components/common/QuoteBanner";

export default function Dashboard({ data, onSurvive, onRelapse, message }) {
  const remainingDays = Math.max(0, 93 - data.currentStreak);

  const features = [
    { path: "/tracker", icon: "📊", name: "Tracker", desc: "Main 93 Days" },
    { path: "/tasks", icon: "✅", name: "Tasks", desc: "Todo • Rules • Skin • Gym • Diet" },
    { path: "/gym", icon: "💪", name: "Gym", desc: "3 Month Target" },
    { path: "/english", icon: "🇬🇧", name: "English", desc: "3 Month Fluency" },
    { path: "/wellness", icon: "🧘", name: "Wellness", desc: "Mood • Journal • Sleep" },
    { path: "/inspiration", icon: "💭", name: "Inspire", desc: "Daily Quotes" },
    { path: "/advice", icon: "💡", name: "Advice", desc: "Daily Wisdom" },
    { path: "/psychology", icon: "🧠", name: "Psychology", desc: "Mind Hacks • Communication" }
  ];

  return (
    <div className="dashboard">
      {/* Quote Banner */}
      <QuoteBanner streak={data.currentStreak} />

      {/* Message Banner */}
      {message && <div className="message-banner">{message}</div>}

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card primary">
          <span className="stat-icon">🔥</span>
          <div>
            <div className="stat-value">{data.currentStreak}</div>
            <div className="stat-label">Current</div>
          </div>
        </div>
        <div className="stat-card success">
          <span className="stat-icon">🎯</span>
          <div>
            <div className="stat-value">{remainingDays}</div>
            <div className="stat-label">Days Left</div>
          </div>
        </div>
        <div className="stat-card warning">
          <span className="stat-icon">🏆</span>
          <div>
            <div className="stat-value">{data.bestStreak}</div>
            <div className="stat-label">Best</div>
          </div>
        </div>
        <div className="stat-card danger">
          <span className="stat-icon">⚠️</span>
          <div>
            <div className="stat-value">{data.relapseCount}</div>
            <div className="stat-label">Relapses</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button onClick={onSurvive} className="btn btn-primary btn-large">
          ✅ I Survived Today
        </button>
        <button onClick={onRelapse} className="btn btn-danger btn-large">
          ⚠️ Relapse
        </button>
      </div>

      {/* Features Grid */}
      <div className="features-grid">
        {features.map((feature, index) => (
          <Link 
            key={feature.path} 
            to={feature.path} 
            className="feature-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.name}</h3>
            <p>{feature.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}