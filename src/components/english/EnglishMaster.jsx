import { useState, useEffect } from "react";

const TONGUE_TWISTERS = [
  { day: 1, text: "🔴 TH/S/SH: Thirty-three thieves thought they thrilled the throne." },
  { day: 2, text: "🔵 R/L: Red lorry, yellow lorry." },
  { day: 3, text: "🟢 P/B/T/D: Peter Piper picked a peck of pickled peppers." },
  { day: 4, text: "🟡 V/W/F: Vincent vowed vengeance very vehemently." },
  { day: 5, text: "🟠 CH/J/Y: Chester Cheetah chews a chunk of cheap cheddar cheese." },
  { day: 6, text: "🟣 Mixed: I slit a sheet, a sheet I slit." }
];

const DAY1_TASKS = [
  { id: "d1_sentence", text: "📝 5 Words + Sentences: new 5 words, 5 sentences each" },
  { id: "d1_current", text: "📰 Current Affairs from indiabix.com" },
  { id: "d1_journal", text: "📔 5 Lines Journal: best lines you spoke/heard" },
  { id: "d1_read", text: "📚 Read Aloud - any book (10 min)" },
  { id: "d1_friends", text: "📺 Watch Friends episode - shadowing technique" },
  { id: "d1_gemini", text: "🤖 Client Meeting Simulation with Gemini AI" },
  { id: "d1_speak", text: "🎤 3min Topic + Record yourself" },
  { id: "d1_ted", text: "🎯 TED 1min + repeat with body language" },
  { id: "d1_gemini_practice", text: "🤖 Gemini English Practice (30 min)" }
];

const DAY2_TASKS = [
  { id: "d2_sentence", text: "📝 5 Words + Sentences: new 5 words, 5 sentences each" },
  { id: "d2_current", text: "📰 Current Affairs from indiabix.com" },
  { id: "d2_journal", text: "📔 5 Lines Journal: best lines you spoke/heard" },
  { id: "d2_read", text: "📚 Read Aloud - any book (10 min)" },
  { id: "d2_friends_repeat", text: "📺 Friends + Repeat dialogues 5 times" },
  { id: "d2_mirror", text: "🪞 Mirror Talk: Speak on any topic" },
  { id: "d2_interview", text: "💼 Interview Practice with Gemini based on CV" },
  { id: "d2_ppt", text: "📽️ Presentation Practice: script → with script → without script" },
  { id: "d2_explain", text: "🔧 Project/Code Explain in English" },
  { id: "d2_intro", text: "👤 Introduce yourself - Write script + recording" },
  { id: "d2_gemini_practice", text: "🤖 Gemini English Practice (30 min)" }
];

const SUNDAY_TASKS = [
  { id: "sun_dress", text: "👔 Formal dress pehno" },
  { id: "sun_camera", text: "📹 Camera ON" },
  { id: "sun_interview", text: "🎙️ 20min Mock Interview - Tech + HR mix" }
];

export default function EnglishMaster() {
  const [streak, setStreak] = useState(0);
  const [checks, setChecks] = useState({});
  const [expandedTask, setExpandedTask] = useState(null);
  
  const today = new Date();
  const dayOfWeek = today.getDay();
  const dayType = dayOfWeek === 0 ? "sunday" : (dayOfWeek % 2 === 1 ? "day1" : "day2");
  
  // Get tongue twister for today
  const twisterDay = dayOfWeek === 0 ? 6 : dayOfWeek;
  const tongueTwister = TONGUE_TWISTERS.find(t => t.day === twisterDay) || TONGUE_TWISTERS[0];

  // Get tasks based on day
  let tasks = [];
  if (dayType === "sunday") tasks = SUNDAY_TASKS;
  else if (dayType === "day1") tasks = DAY1_TASKS;
  else tasks = DAY2_TASKS;

  const todayStr = today.toDateString();
  const todaysChecks = checks[todayStr] || {};
  
  const completedCount = tasks.filter(t => todaysChecks[t.id]).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("englishMaster");
    if (saved) {
      const data = JSON.parse(saved);
      setChecks(data);
      
      // Calculate streak
      const completedDates = Object.keys(data)
        .filter(date => {
          const dayData = data[date];
          return dayData && Object.values(dayData).some(v => v === true);
        })
        .map(date => new Date(date).toDateString());
      
      if (completedDates.includes(todayStr)) {
        let count = 1;
        let checkDate = new Date(today);
        
        for (let i = 1; i < 93; i++) {
          checkDate.setDate(checkDate.getDate() - 1);
          const dateStr = checkDate.toDateString();
          if (completedDates.includes(dateStr)) count++;
          else break;
        }
        setStreak(count);
      } else {
        setStreak(0);
      }
    }
  }, [todayStr]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("englishMaster", JSON.stringify(checks));
  }, [checks]);

  const toggleTask = (taskId) => {
    setChecks(prev => ({
      ...prev,
      [todayStr]: {
        ...(prev[todayStr] || {}),
        [taskId]: !(prev[todayStr]?.[taskId] || false)
      }
    }));
  };

  // Plant emoji based on streak
  const getPlantEmoji = () => {
    if (streak >= 60) return "🌳";
    if (streak >= 30) return "🌲";
    if (streak >= 15) return "🌿";
    if (streak >= 7) return "🌱";
    if (streak >= 3) return "🌰";
    return "🌰";
  };

  return (
    <div className="english-master">
      {/* Header */}
      <div className="english-header">
        <div className="header-left">
          <span className="header-icon">🇬🇧</span>
          <h2>English 3 Month</h2>
        </div>
        <div className={`day-badge ${dayType}`}>
          {dayType === "sunday" ? "🎙️ Mock Sunday" : 
           dayType === "day1" ? "📘 Day 1 (Mon/Wed/Fri)" : 
           "📗 Day 2 (Tue/Thu/Sat)"}
        </div>
      </div>

      {/* Plant & Streak */}
      <div className="english-plant">
        <div className="plant-emoji">{getPlantEmoji()}</div>
        <div className="streak-info">
          <span className="streak-fire">🔥</span>
          <span className="streak-number">{streak}</span>
          <span className="streak-label">Day Streak</span>
        </div>
      </div>

      {/* Tongue Twister */}
      <div className="tongue-twister-card">
        <span className="twister-icon">🗣️</span>
        <div className="twister-content">
          <div className="twister-label">Today's Tongue Twister</div>
          <div className="twister-text">{tongueTwister.text}</div>
        </div>
      </div>

      {/* Progress */}
      <div className="english-progress">
        <div className="progress-header">
          <span>Today's Progress</span>
          <span>{completedCount}/{tasks.length} ({progressPercent}%)</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Tasks */}
      <div className="english-tasks">
        <h3>Today's Tasks</h3>
        <div className="tasks-list">
          {tasks.map(task => (
            <div
              key={task.id}
              className={`task-item ${todaysChecks[task.id] ? 'completed' : ''}`}
              onClick={() => toggleTask(task.id)}
              onMouseEnter={() => setExpandedTask(task.id)}
              onMouseLeave={() => setExpandedTask(null)}
            >
              <span className="task-checkbox">
                {todaysChecks[task.id] ? '✅' : '⬜'}
              </span>
              <span className="task-text">
                {expandedTask === task.id ? task.text : 
                 task.text.length > 40 ? task.text.substring(0, 40) + '...' : task.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className="english-milestones">
        <h4>🏆 Milestones</h4>
        <div className="milestone-badges">
          {[7, 15, 30, 60, 93].map(days => (
            <div 
              key={days}
              className={`badge ${streak >= days ? 'unlocked' : 'locked'}`}
            >
              {streak >= days ? '🔥' : '🔒'} {days}d
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}