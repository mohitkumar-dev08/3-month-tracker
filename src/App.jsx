import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Pages
import Dashboard from "./pages/Dashboard";
import TrackerPage from "./pages/TrackerPage";
import TasksPage from "./pages/TasksPage";
import GymPage from "./pages/GymPage";
import EnglishPage from "./pages/EnglishPage";
import WellnessPage from "./pages/WellnessPage";
import InspirationPage from "./pages/InspirationPage";
import AdvicePage from "./pages/AdvicePage";
import PsychologyPage from "./pages/PsychologyPage";
// Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import PINLock from "./components/auth/PINLock"; // ✅ PIN Lock import
import HeatmapPage from "./pages/HeatmapPage";

const todayString = () => new Date().toDateString();

const defaultData = {
  currentStreak: 0,
  bestStreak: 0,
  totalDays: 0,
  relapseCount: 0,
  lastCheckIn: null,
  weeklyData: Array(7).fill(0),
  darkMode: false,
  goalStartDate: new Date().toDateString(),
  goalDuration: 56
};

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false); // ✅ PIN unlock state
  const [data, setData] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("seedrise93"));
    return saved ? { ...defaultData, ...saved } : defaultData;
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("seedrise93", JSON.stringify(data));
    
    // Apply dark mode class to body
    if (data.darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [data]);

  const handleSurvived = () => {
    if (data.lastCheckIn === todayString()) {
      setMessage("✅ Already marked today!");
      setTimeout(() => setMessage(""), 2500);
      return;
    }

    const newStreak = data.currentStreak + 1;

    setData({
      ...data,
      currentStreak: newStreak,
      bestStreak: Math.max(newStreak, data.bestStreak),
      totalDays: data.totalDays + 1,
      lastCheckIn: todayString()
    });

    setMessage("🔥 Great job! Keep going!");
    setTimeout(() => setMessage(""), 2500);
  };

  const handleRelapse = () => {
    if (!window.confirm("Are you sure you want to relapse? This will reset your streak.")) return;
    
    setData({
      ...data,
      currentStreak: 0,
      relapseCount: data.relapseCount + 1,
      lastCheckIn: todayString()
    });
    
    setMessage("⚠️ Streak reset. Start again stronger!");
    setTimeout(() => setMessage(""), 2500);
  };

  const toggleDarkMode = () => {
    setData({ ...data, darkMode: !data.darkMode });
  };

  // ✅ Agar unlock nahi hai to PIN Lock dikhao
  if (!isUnlocked) {
    return (
      <BrowserRouter>
        <PINLock onUnlock={() => setIsUnlocked(true)} />
      </BrowserRouter>
    );
  }

  // ✅ Agar unlock hai to normal app dikhao
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar 
          streak={data.currentStreak} 
          darkMode={data.darkMode} 
          toggleDarkMode={toggleDarkMode} 
        />
        
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <Dashboard 
                  data={data} 
                  onSurvive={handleSurvived} 
                  onRelapse={handleRelapse} 
                  message={message}
                />
              } 
            />
            <Route 
              path="/tracker" 
              element={
                <TrackerPage 
                  data={data} 
                  onSurvive={handleSurvived} 
                  onRelapse={handleRelapse} 
                />
              } 
            />
            <Route path="/tasks" element={<TasksPage streak={data.currentStreak} />} />
            <Route path="/gym" element={<GymPage streak={data.currentStreak} />} />
            <Route path="/english" element={<EnglishPage streak={data.currentStreak} />} />
            
            {/* ✅ FIXED: Pass complete data object to WellnessPage */}
            <Route 
              path="/wellness" 
              element={<WellnessPage streakData={data} />} 
            />
            
            <Route path="/inspiration" element={<InspirationPage streak={data.currentStreak} />} />
            <Route path="/advice" element={<AdvicePage streak={data.currentStreak} />} />
            <Route path="/psychology" element={<PsychologyPage streak={data.currentStreak} />} />
            <Route path="/heatmap" element={<HeatmapPage streak={data.currentStreak} />} />
            
          </Routes>

        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;