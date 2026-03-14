import { useState, useEffect } from "react";
import StreakHeatmap from "../components/heatmap/StreakHeatmap";
import QuoteBanner from "../components/common/QuoteBanner";

export default function HeatmapPage({ streak }) {
  const [streakData, setStreakData] = useState({});

  // Load actual streak data from localStorage
  useEffect(() => {
    const loadData = () => {
      // Get main challenge data
      const mainData = JSON.parse(localStorage.getItem("seedrise93") || "{}");
      
      // Get todo tasks data
      const todoData = JSON.parse(localStorage.getItem("todoMaster") || "{}");
      
      // Get gym data
      const gymData = JSON.parse(localStorage.getItem("gymTarget93") || "{}");
      
      // Get english data
      const englishData = JSON.parse(localStorage.getItem("englishMaster") || "{}");
      
      // Get psychology data
      const psychologyData = JSON.parse(localStorage.getItem("psychologyMaster") || "{}");
      
      // Combine all data to determine active days
      const allDates = new Set();
      
      // Add main challenge check-ins
      if (mainData.lastCheckIn) {
        allDates.add(mainData.lastCheckIn);
      }
      
      // Add todo completed dates
      Object.keys(todoData).forEach(date => {
        const dayData = todoData[date];
        // Check if any task completed
        const hasActivity = Object.values(dayData).some(section => 
          Object.values(section || {}).some(v => v === true)
        );
        if (hasActivity) allDates.add(date);
      });
      
      // Add gym marked dates
      if (gymData.lastMarkedDate) {
        allDates.add(gymData.lastMarkedDate);
      }
      
      // Add english completed dates
      Object.keys(englishData).forEach(date => {
        const dayData = englishData[date];
        const hasActivity = Object.values(dayData || {}).some(v => v === true);
        if (hasActivity) allDates.add(date);
      });
      
      // Add psychology completed dates
      Object.keys(psychologyData.checks || {}).forEach(date => {
        const dayData = psychologyData.checks[date];
        const hasActivity = Object.values(dayData || {}).some(v => v === true);
        if (hasActivity) allDates.add(date);
      });
      
      // Create streakData object
      const data = {};
      allDates.forEach(date => {
        data[date] = true;
      });
      
      setStreakData(data);
    };
    
    loadData();
    
    // Listen for updates
    const handleStorageChange = () => loadData();
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('gymTargetUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('gymTargetUpdated', handleStorageChange);
    };
  }, []);

  return (
    <div className="heatmap-page-wrapper">
      <QuoteBanner streak={streak} />
      <StreakHeatmap streakData={streakData} />
    </div>
  );
}