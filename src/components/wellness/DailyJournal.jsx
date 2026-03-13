// components/wellness/DailyJournal.jsx
import { useState } from "react";

const PRODUCTIVITY_LEVELS = [
  { emoji: "😴", label: "Very Low", icon: "🌟", value: 1, color: "#ef4444" },
  { emoji: "😐", label: "Low", icon: "⭐", value: 2, color: "#f97316" },
  { emoji: "🙂", label: "Average", icon: "⚡", value: 3, color: "#f59e0b" },
  { emoji: "😊", label: "Good", icon: "💪", value: 4, color: "#34d399" },
  { emoji: "🤩", label: "Excellent", icon: "🚀", value: 5, color: "#10b981" }
];

export default function DailyJournal() {
  const [journalData, setJournalData] = useState({
    goals: "",
    actualWork: "",
    learnings: "",
    challenges: "",
    solutions: "",
    productivity: 3,
    nextPlan: ""
  });
  
  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => {
    setJournalData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const journalEntry = {
      ...journalData,
      date: new Date().toDateString(),
      timestamp: new Date().toISOString()
    };
    
    const existing = JSON.parse(localStorage.getItem("dailyJournal") || "{}");
    existing[new Date().toDateString()] = journalEntry;
    localStorage.setItem("dailyJournal", JSON.stringify(existing));
    
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="daily-journal">
      <h3 className="section-title">📔 Daily Journal</h3>
      
      <div className="journal-form">
        <div className="journal-field">
          <label><span className="field-icon">🎯</span> Today's Goals</label>
          <textarea
            placeholder="What do you plan to achieve today?"
            value={journalData.goals}
            onChange={(e) => handleChange("goals", e.target.value)}
            rows="2"
          />
        </div>

        <div className="journal-field">
          <label><span className="field-icon">✅</span> What did you do today?</label>
          <textarea
            placeholder="What did you actually accomplish?"
            value={journalData.actualWork}
            onChange={(e) => handleChange("actualWork", e.target.value)}
            rows="2"
          />
        </div>

        <div className="journal-field">
          <label><span className="field-icon">📚</span> What did you learn?</label>
          <textarea
            placeholder="What new things did you learn today?"
            value={journalData.learnings}
            onChange={(e) => handleChange("learnings", e.target.value)}
            rows="2"
          />
        </div>

        <div className="journal-field">
          <label><span className="field-icon">⚠️</span> Challenges / Problems</label>
          <textarea
            placeholder="What challenges did you face?"
            value={journalData.challenges}
            onChange={(e) => handleChange("challenges", e.target.value)}
            rows="2"
          />
        </div>

        <div className="journal-field">
          <label><span className="field-icon">💡</span> Solutions / Improvements</label>
          <textarea
            placeholder="How did you solve them? What can be improved?"
            value={journalData.solutions}
            onChange={(e) => handleChange("solutions", e.target.value)}
            rows="2"
          />
        </div>

        <div className="journal-field">
          <label><span className="field-icon">📊</span> Productivity Rating</label>
          <div className="productivity-grid">
            {PRODUCTIVITY_LEVELS.map(level => (
              <button
                key={level.value}
                className={`productivity-btn ${journalData.productivity === level.value ? 'selected' : ''}`}
                style={{
                  background: journalData.productivity === level.value ? level.color : 'transparent',
                  borderColor: level.color,
                  color: journalData.productivity === level.value ? 'white' : 'inherit'
                }}
                onClick={() => handleChange("productivity", level.value)}
              >
                <span className="productivity-emoji">{level.emoji}</span>
                <span className="productivity-icon">{level.icon}</span>
                <span className="productivity-label">{level.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="journal-field">
          <label><span className="field-icon">📅</span> Kal ka Plan</label>
          <textarea
            placeholder="What's your plan for tomorrow?"
            value={journalData.nextPlan}
            onChange={(e) => handleChange("nextPlan", e.target.value)}
            rows="2"
          />
        </div>

        <button 
          className={`save-journal-btn ${saved ? 'saved' : ''}`}
          onClick={handleSave}
        >
          {saved ? '✅ Saved!' : '💾 Save Journal'}
        </button>
      </div>
    </div>
  );
}