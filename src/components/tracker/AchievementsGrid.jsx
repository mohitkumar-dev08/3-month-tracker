// components/tracker/AchievementsGrid.jsx
export default function AchievementsGrid({ milestones }) {
  return (
    <div className="achievements-grid">
      <h3 className="card-title">🏆 Achievements</h3>
      
      <div className="milestones-container">
        {milestones.map((milestone, index) => (
          <div 
            key={milestone.days}
            className={`milestone-card ${milestone.unlocked ? 'unlocked' : 'locked'}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="milestone-emoji">
              {milestone.unlocked ? milestone.emoji : '🔒'}
            </div>
            <div className="milestone-info">
              <div className="milestone-name">
                {milestone.name}
                {!milestone.unlocked && <span className="locked-badge"> Locked</span>}
              </div>
              <div className="milestone-days">
                {milestone.unlocked 
                  ? `✅ Completed - Day ${milestone.days}` 
                  : `🔒 Unlocks at Day ${milestone.days}`}
              </div>
            </div>
            {milestone.unlocked && (
              <div className="milestone-check">🏆</div>
            )}
          </div>
        ))}
      </div>

      {/* Progress Summary */}
      <div className="achievements-summary">
        <span>Progress</span>
        <div className="summary-bar">
          <div 
            className="summary-fill"
            style={{ width: `${(milestones.filter(m => m.unlocked).length / milestones.length) * 100}%` }}
          />
        </div>
        <span>{milestones.filter(m => m.unlocked).length}/{milestones.length} Unlocked</span>
      </div>
    </div>
  );
}