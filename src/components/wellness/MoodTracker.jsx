// components/wellness/MoodTracker.jsx
import { useState } from "react";

const MOODS = [
  { emoji: "😊", label: "Great", value: 5, color: "#10b981" },
  { emoji: "🙂", label: "Good", value: 4, color: "#34d399" },
  { emoji: "😐", label: "Okay", value: 3, color: "#f59e0b" },
  { emoji: "😔", label: "Sad", value: 2, color: "#f97316" },
  { emoji: "😫", label: "Struggling", value: 1, color: "#ef4444" }
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [reason, setReason] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!selectedMood) {
      alert("Please select a mood!");
      return;
    }
    
    // Save to localStorage
    const moodData = {
      mood: selectedMood,
      reason: reason,
      date: new Date().toDateString(),
      timestamp: new Date().toISOString()
    };
    
    console.log("Saving mood:", moodData);
    setSaved(true);
    
    // Reset after 3 seconds
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="mood-tracker">
      <h3 className="section-title">How are you feeling today?</h3>
      
      <div className="mood-grid">
        {MOODS.map(mood => (
          <button
            key={mood.label}
            className={`mood-btn ${selectedMood?.label === mood.label ? 'selected' : ''}`}
            style={{
              borderColor: selectedMood?.label === mood.label ? mood.color : 'var(--border-light)',
              background: selectedMood?.label === mood.label ? `${mood.color}20` : 'transparent'
            }}
            onClick={() => setSelectedMood(mood)}
          >
            <span className="mood-emoji">{mood.emoji}</span>
            <span className="mood-label">{mood.label}</span>
          </button>
        ))}
      </div>

      {/* Reason Input */}
      <div className="reason-input">
        <label htmlFor="reason">Reason (optional)</label>
        <textarea
          id="reason"
          placeholder="Why are you feeling this way?"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows="3"
        />
      </div>

      {/* Save Button */}
      <button 
        className={`save-mood-btn ${saved ? 'saved' : ''}`}
        onClick={handleSave}
        disabled={!selectedMood}
      >
        {saved ? '✅ Saved!' : '💾 Save Mood'}
      </button>
    </div>
  );
}