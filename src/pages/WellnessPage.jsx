// pages/WellnessPage.jsx
import { useState } from "react";
import QuoteBanner from "../components/common/QuoteBanner";
import WellnessCalendar from "../components/wellness/WellnessCalendar";
import MoodTracker from "../components/wellness/MoodTracker";
import DailyJournal from "../components/wellness/DailyJournal";
import SleepTracker from "../components/wellness/SleepTracker";
import SleepAnalytics from "../components/wellness/SleepAnalytics";

export default function WellnessPage({ streak }) {
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
      <QuoteBanner streak={streak} />

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
        {activeTab === "calendar" && <WellnessCalendar />}
        {activeTab === "mood" && <MoodTracker />}
        {activeTab === "journal" && <DailyJournal />}
        {activeTab === "sleep" && <SleepTracker />}
        {activeTab === "stats" && <SleepAnalytics />}
      </div>
    </div>
  );
}