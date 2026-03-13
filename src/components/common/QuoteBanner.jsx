// components/common/QuoteBanner.jsx
export default function QuoteBanner({ streak }) {
  const getPlantEmoji = () => {
    if (streak >= 60) return "🌳";
    if (streak >= 30) return "🌲";
    if (streak >= 15) return "🌿";
    if (streak >= 7) return "🌱";
    if (streak >= 3) return "🌰";
    return "🌰";
  };

  return (
    <div className="quote-banner">
      <div className="banner-content">
        <div className="quote-section">
          <span className="quote-mark">"</span>
          <h2 className="quote-title">The 40% Rule</h2>
          <p className="quote-line">
            When you think you're done, you're only at 40% 
            <span className="highlight"> of your true potential</span>
          </p>
          <p className="quote-subline">
            Your mind quits before your body does. <strong>Push Further.</strong>
          </p>
        </div>

        <div className="plant-section">
          <div className="plant-container">
            <div className="plant-emoji">{getPlantEmoji()}</div>
            <div className="plant-stage">
              {streak >= 60 ? "Tree" : 
               streak >= 30 ? "Strong" :
               streak >= 15 ? "Bush" :
               streak >= 7 ? "Sprout" :
               streak >= 3 ? "Seedling" : "Seed"}
            </div>
          </div>
          
          <div className="plant-stats">
            <div className="plant-streak">
              <span className="streak-fire">🔥</span>
              <span className="streak-number">{streak}</span>
              <span className="streak-label">Days</span>
            </div>
          </div>

          <div className="watering-animation">
            <span className="water-drop drop1">💧</span>
            <span className="water-drop drop2">💧</span>
            <span className="water-drop drop3">💧</span>
          </div>
        </div>
      </div>
    </div>
  );
}