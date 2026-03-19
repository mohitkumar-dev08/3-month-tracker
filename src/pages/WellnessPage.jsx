// pages/WellnessPage.jsx
import { useState } from "react";
import QuoteBanner from "../components/common/QuoteBanner";
import WellnessCalendar from "../components/wellness/WellnessCalendar";
import MoodTracker from "../components/wellness/MoodTracker";
import DailyJournal from "../components/wellness/DailyJournal";
import SleepTracker from "../components/wellness/SleepTracker";
import SleepAnalytics from "../components/wellness/SleepAnalytics";

// ✅ FIXED: Accept streakData prop (complete object)
export default function WellnessPage({ streakData }) {
  const [activeTab, setActiveTab] = useState("calendar");

  const tabs = [
    { id: "calendar", name: "Calendar", icon: "📅" },
    { id: "mood", name: "Mood", icon: "😊" },
    { id: "journal", name: "Journal", icon: "📔" },
    { id: "sleep", name: "Sleep", icon: "😴" },
    { id: "stats", name: "Stats", icon: "📊" }
  ];

  return (
    <div className="wellness-page">
      <QuoteBanner streak={streakData?.currentStreak || 0} />

      <div className="wellness-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.name}
          </button>
        ))}
      </div>

      <div className="wellness-content">
        {/* ✅ Pass streakData to Calendar */}
        {activeTab === "calendar" && <WellnessCalendar streakData={streakData} />}
        
        {/* Other components (no changes needed) */}
        {activeTab === "mood" && <MoodTracker />}
        {activeTab === "journal" && <DailyJournal />}
        {activeTab === "sleep" && <SleepTracker />}
        {activeTab === "stats" && <SleepAnalytics />}
      </div>
    </div>
  );
}