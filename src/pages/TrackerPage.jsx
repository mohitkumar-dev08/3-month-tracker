// pages/TrackerPage.jsx
import QuoteBanner from "../components/common/QuoteBanner";
import AchievementsGrid from "../components/tracker/AchievementsGrid";
// ✅ Calendar import hata diya

export default function TrackerPage({ data, onSurvive, onRelapse }) {
  const remainingDays = Math.max(0, 191 - data.currentStreak);
  const progressPercent = (data.currentStreak / 191) * 100;
  
  // ✅ Check if today is already marked
  const today = new Date().toDateString();
  const isTodayMarked = data.lastCheckIn === today;
  
  const milestones = [
    { days: 7, emoji: "🌿", name: "Sprout", unlocked: data.currentStreak >= 7 },
    { days: 15, emoji: "🌲", name: "Sapling", unlocked: data.currentStreak >= 15 },
    { days: 30, emoji: "🌳", name: "Tree", unlocked: data.currentStreak >= 30 },
    { days: 60, emoji: "🏆", name: "Strong", unlocked: data.currentStreak >= 60 },
    { days: 90, emoji: "⭐", name: "Star", unlocked: data.currentStreak >= 90 },
    { days: 120, emoji: "🔥", name: "Fire", unlocked: data.currentStreak >= 120 },
    { days: 150, emoji: "💪", name: "Warrior", unlocked: data.currentStreak >= 150 },
    { days: 180, emoji: "👑", name: "Legend", unlocked: data.currentStreak >= 180 },
    { days: 191, emoji: "🏅", name: "Champion", unlocked: data.currentStreak >= 191 }
  ];

  return (
    <div className="tracker-page">
      <QuoteBanner streak={data.currentStreak} />
      
      <div className="tracker-grid">
        {/* Left Column */}
        <div className="tracker-left">
          <div className="progress-card">
            <h2 className="card-title">191 Days Challenge</h2>
            
            <div className="progress-circle-large">
              <svg viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#e0e0e0" strokeWidth="12" />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="12"
                  strokeDasharray="339.292"
                  strokeDashoffset={339.292 * (1 - data.currentStreak / 191)}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
                <text x="60" y="60" textAnchor="middle" dy="0.3em" fontSize="24" fontWeight="bold">
                  {data.currentStreak}
                </text>
              </svg>
            </div>
            
            <div className="days-remaining">
              <span className="remaining-number">{remainingDays}</span>
              <span className="remaining-label">Days Remaining</span>
            </div>
          </div>
          
          <div className="stats-card">
            <h3 className="card-title">Quick Stats</h3>
            <div className="stats-list">
              <div className="stat-row">
                <span>Current Streak</span>
                <strong>{data.currentStreak} days</strong>
              </div>
              <div className="stat-row">
                <span>Best Streak</span>
                <strong>{data.bestStreak} days</strong>
              </div>
              <div className="stat-row">
                <span>Total Days</span>
                <strong>{data.totalDays} days</strong>
              </div>
              <div className="stat-row">
                <span>Relapses</span>
                <strong className="text-danger">{data.relapseCount}</strong>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="tracker-right">
          <AchievementsGrid milestones={milestones} />
          
          {/* ✅ Calendar section hata diya */}
          
          <div className="action-card">
            <h3 className="card-title">Daily Check-in</h3>
            <div className="action-buttons">
              {/* Show different button if already marked */}
              {isTodayMarked ? (
                <button 
                  className="btn btn-success btn-block" 
                  disabled
                  style={{ opacity: 0.7, cursor: 'not-allowed' }}
                >
                  ✅ Already Marked Today
                </button>
              ) : (
                <button onClick={onSurvive} className="btn btn-primary btn-block">
                  ✅ I Survived Today
                </button>
              )}
              
              <button onClick={onRelapse} className="btn btn-danger btn-block">
                ⚠️ Relapse
              </button>
            </div>
            
            {/* Show last check-in time */}
            {data.lastCheckIn && (
              <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--text-light)' }}>
                Last check-in: {new Date(data.lastCheckIn).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}