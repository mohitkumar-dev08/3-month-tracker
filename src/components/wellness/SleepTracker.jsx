// components/wellness/SleepTracker.jsx
import { useState, useEffect } from "react";

export default function SleepTracker() {
  const [sleepData, setSleepData] = useState({
    hours: 7,
    quality: "good",
    bedtime: "23:00",
    wakeup: "07:00",
    note: ""
  });
  
  const [saved, setSaved] = useState(false);

  const qualityOptions = [
    { value: "terrible", emoji: "💫", label: "Terrible", color: "#ef4444" },
    { value: "poor", emoji: "😫", label: "Poor", color: "#f97316" },
    { value: "average", emoji: "😐", label: "Average", color: "#f59e0b" },
    { value: "good", emoji: "😊", label: "Good", color: "#34d399" },
    { value: "excellent", emoji: "🌟", label: "Excellent", color: "#10b981" }
  ];

  const handleChange = (field, value) => {
    setSleepData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Save to localStorage
    const savedData = {
      ...sleepData,
      date: new Date().toDateString(),
      timestamp: new Date().toISOString()
    };
    
    // Get existing data
    const existing = JSON.parse(localStorage.getItem("sleepTracker") || "{}");
    existing[new Date().toDateString()] = savedData;
    localStorage.setItem("sleepTracker", JSON.stringify(existing));
    
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const getSleepAdvice = () => {
    const { hours, quality } = sleepData;
    if (hours >= 8 && quality === "excellent") 
      return "💪 Perfect sleep! You're ready to crush the day!";
    if (hours >= 7) 
      return "😊 Good sleep! Stay consistent for best results.";
    if (hours >= 6) 
      return "⚠️ Try to get 7-8 hours for better recovery.";
    return "🚨 Less sleep! Take it easy today and rest early.";
  };

  return (
    <div className="sleep-tracker">
      <h3 className="section-title">😴 Sleep Tracker</h3>
      
      <div className="sleep-form">
        {/* Hours Slider */}
        <div className="input-group">
          <label>Sleep Duration</label>
          <div className="slider-container">
            <input
              type="range"
              min="0"
              max="12"
              step="0.5"
              value={sleepData.hours}
              onChange={(e) => handleChange("hours", parseFloat(e.target.value))}
              className="slider"
            />
            <span className="slider-value">{sleepData.hours} hrs</span>
          </div>
        </div>

        {/* Quality Selection */}
        <div className="input-group">
          <label>Sleep Quality</label>
          <div className="quality-grid">
            {qualityOptions.map(option => (
              <button
                key={option.value}
                className={`quality-btn ${sleepData.quality === option.value ? 'selected' : ''}`}
                style={{
                  background: sleepData.quality === option.value ? option.color : 'transparent',
                  borderColor: option.color
                }}
                onClick={() => handleChange("quality", option.value)}
              >
                <span className="quality-emoji">{option.emoji}</span>
                <span className="quality-label">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Time Inputs */}
        <div className="time-row">
          <div className="input-group">
            <label>Bedtime</label>
            <input
              type="time"
              value={sleepData.bedtime}
              onChange={(e) => handleChange("bedtime", e.target.value)}
              className="time-input"
            />
          </div>
          <div className="input-group">
            <label>Wake up</label>
            <input
              type="time"
              value={sleepData.wakeup}
              onChange={(e) => handleChange("wakeup", e.target.value)}
              className="time-input"
            />
          </div>
        </div>

        {/* Notes */}
        <div className="input-group">
          <label>Notes (dreams, feelings, etc)</label>
          <textarea
            value={sleepData.note}
            onChange={(e) => handleChange("note", e.target.value)}
            placeholder="How did you sleep? Any dreams?"
            rows="2"
            className="sleep-note"
          />
        </div>

        {/* Sleep Advice */}
        <div className="sleep-advice">
          <p>{getSleepAdvice()}</p>
        </div>

        {/* Save Button */}
        <button 
          className={`save-sleep-btn ${saved ? 'saved' : ''}`}
          onClick={handleSave}
        >
          {saved ? '✅ Saved!' : '💾 Save Sleep Data'}
        </button>
      </div>
    </div>
  );
}