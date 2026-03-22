// components/tasks/TodoMaster.jsx
import { useState, useEffect } from "react";

const TABS = [
  { id: "todo", name: "Todo", icon: "📝", color: "primary" },
  { id: "rules", name: "Rules", icon: "⚡", color: "warning" },
  { id: "skin", name: "Skin", icon: "🧴", color: "info" },
  { id: "gym", name: "Gym", icon: "💪", color: "success" },
  { id: "diet", name: "Diet", icon: "🥗", color: "amber" }
];

const TASKS = {
  todo: [
    { id: "WaterTip", text: "Water Tip:- Paani dabakar piyo: Din bhar mein 4 litre paani ka target rakho. Agar paani kam pioge toh itni garmi body handle nahi kar payegi aur shayad 1-2 bareek pimple aa jayein." },
    { id: "med1", text: "Meditation 5 Min (3 finger straight + 2 min visualize) - Morning" },
    { id: "english", text: "English Practice" },
    { id: "read", text: "Read Children English stories book" },
    { id: "med2", text: "Meditation 5 Min Simple + Face Yoga" },
    { id: "water", text: "4 liter+ water track with app" },
    { id: "Yoga", text: "Face Yoga 5 Min only 1 exercise which i sent in WhatsApp" },
    { id: "face", text: "Face Structure Exercise (WhatsApp saved video)" },
    { id: "ice", text: "One min Ice Cube on face" },
    { id: "grooming", text: "Grooming & well fitted outfits / old money / formal classy look" },
    { id: "Sit", text: "Sit with yourself for 10-15 mins without doing anything, simply sit with yourself" },
  ],
  rules: [
    { id: "earbuds", text: "No Earbuds (use wire earphones if needed)" },
    { id: "phone", text: "No Phone Use without Reason" },
    { id: "social", text: "No social media and No Music" },
    { id: "sugar", text: "No Sugar and No Junk Food" },
    { id: "impress", text: "Stop trying to impress" },
    { id: "stress", text: "No Stress of anything" },
    { id: "mature", text: "Be mature - don't act like kid" },
    { id: "kind", text: "Be Kind & Positive Attitude with Everyone" },
    { id: "confidence", text: "Full Confidence & Roab" },
    { id: "mindset", text: "Ajj he hai jo hai, kal kuch nahi - enjoy" },
    { id: "lust", text: "No lust of girls" },
    { id: "negativity", text: "No negative talk of anyone" },
    { id: "expectations", text: "No expectations & no attachment" }
  ],
  skin: [
    { id: "rice", text: "Daily rice water Spray (1 time a day) if possible" },
    { id: "mon_thu", text: "Mon & Thu: besan + milk + honey + haldi (15 min)" },
    { id: "beard", text: "Beard oil & Eye cream before sleep" },
    { id: "feet", text: "Talwe clean + 5 min coconut oil massage before sleep" },
    { id: "hair", text: "Hair remedy: Amla, Reetha, Shikakai + vit E - Tue & Fri (20 min)" }
  ],
  gym: [
    { id: "push", text: "Push Day: Chest(2), Shoulder(2), Triceps(2) + 100 Incline Push Ups" },
    { id: "pull", text: "Pull Day: Back(3) + Biceps(2) + Forearms(2) + Traps" },
    { id: "leg", text: "Leg Day: Leg + Abs + Sprint (30 sec × 4) + 3 set of glute bridge" }
  ],
  diet: [
    { id: "soaked", text: "5 long + Souf soak overnight OR Sounf powder + gur powder + 4 small gond kitira (alternate days)" },
    { id: "khajoor", text: "1 long, 1 Elaichi, 1 ginger, 1 lemon in khajoor - eat morning" },
    { id: "Munakka", text: "3 Munakka (without beej eat) + 1 anjeer with water(oversoaked) at morning before going to college" },
    { id: "supplements", text: "One spoon creatine + one whey protein" },
    { id: "milk", text: "Milk + haldi + ginger before sleep (if possible)" },
    { id: "cucumber", text: "One Cucumber Daily" },
    { id: "fruits", text: "2-3 banana + one anaar (sometimes pineapple chaat)" },
    { id: "bread", text: "4 bread pack with college tiffin" },
    { id: "juice", text: "Juice: beetroot, carrot, tomato, orange, lemon, mint, turmeric" },
    { id: "chia", text: "½ tsp chia seeds soaked + curd (one time daily)" },
    { id: "lassi", text: "Kachi Lassi: 200ml water + 50ml milk + salt + 3-4 ice cubes" },
    { id: "mint", text: "Mint Chutni with meals (2 days a week)" }
  ]
};

export default function TodoMaster() {
  const [activeTab, setActiveTab] = useState("todo");
  const [checks, setChecks] = useState({});
  const [expandedTask, setExpandedTask] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false); // ✅ NEW: Track initialization
  
  const today = new Date().toDateString();
  const todaysChecks = checks[today] || {};
  
  // Calculate overall progress across all sections
  const calculateOverallProgress = () => {
    let totalCompleted = 0;
    let totalTasks = 0;
    
    // Todo section
    const todoCompleted = TASKS.todo.filter(t => todaysChecks.todo?.[t.id]).length;
    totalCompleted += todoCompleted;
    totalTasks += TASKS.todo.length;
    
    // Rules section
    const rulesCompleted = TASKS.rules.filter(t => todaysChecks.rules?.[t.id]).length;
    totalCompleted += rulesCompleted;
    totalTasks += TASKS.rules.length;
    
    // Skin section
    const skinCompleted = TASKS.skin.filter(t => todaysChecks.skin?.[t.id]).length;
    totalCompleted += skinCompleted;
    totalTasks += TASKS.skin.length;
    
    // Gym section (special - only one can be selected)
    const gymCompleted = Object.values(todaysChecks.gym || {}).some(v => v === true) ? 1 : 0;
    totalCompleted += gymCompleted;
    totalTasks += TASKS.gym.length; // Still count all 3 tasks in total
    
    // Diet section
    const dietCompleted = TASKS.diet.filter(t => todaysChecks.diet?.[t.id]).length;
    totalCompleted += dietCompleted;
    totalTasks += TASKS.diet.length;
    
    const overallPercent = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;
    
    return {
      completed: totalCompleted,
      total: totalTasks,
      percent: overallPercent
    };
  };

  const overall = calculateOverallProgress();

  // Current section tasks and progress
  const currentTasks = TASKS[activeTab] || [];
  const todaysSectionChecks = todaysChecks[activeTab] || {};
  
  // Calculate section progress
  let sectionCompleted = 0;
  if (activeTab === "gym") {
    sectionCompleted = Object.values(todaysSectionChecks).some(v => v === true) ? 1 : 0;
  } else {
    sectionCompleted = currentTasks.filter(t => todaysSectionChecks[t.id]).length;
  }
  
  const sectionProgressPercent = currentTasks.length > 0 
    ? Math.round((sectionCompleted / currentTasks.length) * 100) 
    : 0;

  // ✅ FIXED: Load from localStorage with initialization flag
  useEffect(() => {
    try {
      const saved = localStorage.getItem("todoMaster");
      console.log("Loading from localStorage:", saved);
      
      if (saved) {
        const parsed = JSON.parse(saved);
        setChecks(parsed);
        console.log("✅ Data loaded:", parsed);
      } else {
        console.log("No saved data found");
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    } finally {
      setIsInitialized(true); // Mark as initialized after load
    }
  }, []);

  // ✅ FIXED: Save to localStorage only after initialization
  useEffect(() => {
    if (!isInitialized) return; // Don't save during initial load
    
    try {
      console.log("Saving to localStorage:", checks);
      localStorage.setItem("todoMaster", JSON.stringify(checks));
      console.log("✅ Data saved successfully");
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [checks, isInitialized]);

  // Toggle function (EXACTLY AS BEFORE)
  const toggleTask = (taskId) => {
    if (activeTab === "gym") {
      // GYM SECTION - Single select with uncheck
      setChecks(prev => {
        const currentGymTasks = prev[today]?.[activeTab] || {};
        const isSelected = currentGymTasks[taskId] === true;
        
        let updatedGymTasks = {};
        
        if (isSelected) {
          // Same task click - UNSELECT all
          TASKS.gym.forEach(task => {
            updatedGymTasks[task.id] = false;
          });
        } else {
          // Different task click - SELECT only this one
          TASKS.gym.forEach(task => {
            updatedGymTasks[task.id] = task.id === taskId;
          });
        }
        
        return {
          ...prev,
          [today]: {
            ...(prev[today] || {}),
            [activeTab]: updatedGymTasks
          }
        };
      });
    } else {
      // OTHER SECTIONS - Multiple select
      setChecks(prev => ({
        ...prev,
        [today]: {
          ...(prev[today] || {}),
          [activeTab]: {
            ...(prev[today]?.[activeTab] || {}),
            [taskId]: !(prev[today]?.[activeTab]?.[taskId] || false)
          }
        }
      }));
    }
  };

  const resetToday = () => {
    if (window.confirm("Reset today's tasks?")) {
      setChecks(prev => {
        const updated = { ...prev };
        delete updated[today];
        localStorage.setItem("todoMaster", JSON.stringify(updated));
        return updated;
      });
    }
  };

  // Get history for last 7 days (EXACTLY AS BEFORE)
  const getHistory = () => {
    const history = [];
    const todayDate = new Date();
    
    for (let i = 1; i <= 7; i++) {
      const date = new Date(todayDate);
      date.setDate(date.getDate() - i);
      const dateStr = date.toDateString();
      const dayData = checks[dateStr];
      
      if (dayData) {
        // Calculate overall progress for that day
        let dayCompleted = 0;
        let dayTotal = 0;
        
        // Todo
        dayCompleted += TASKS.todo.filter(t => dayData.todo?.[t.id]).length;
        dayTotal += TASKS.todo.length;
        
        // Rules
        dayCompleted += TASKS.rules.filter(t => dayData.rules?.[t.id]).length;
        dayTotal += TASKS.rules.length;
        
        // Skin
        dayCompleted += TASKS.skin.filter(t => dayData.skin?.[t.id]).length;
        dayTotal += TASKS.skin.length;
        
        // Gym
        const gymCompleted = Object.values(dayData.gym || {}).some(v => v === true) ? 1 : 0;
        dayCompleted += gymCompleted;
        dayTotal += TASKS.gym.length;
        
        // Diet
        dayCompleted += TASKS.diet.filter(t => dayData.diet?.[t.id]).length;
        dayTotal += TASKS.diet.length;
        
        const dayPercent = dayTotal > 0 ? Math.round((dayCompleted / dayTotal) * 100) : 0;
        
        history.push({
          date: dateStr,
          progress: dayPercent,
          completed: dayCompleted,
          total: dayTotal,
          hasData: dayCompleted > 0
        });
      } else {
        history.push({
          date: dateStr,
          progress: 0,
          completed: 0,
          total: 0,
          hasData: false
        });
      }
    }
    
    return history.reverse();
  };

  const history = getHistory();

  // ✅ Loading state while initializing
  if (!isInitialized) {
    return <div className="todo-master">Loading tasks...</div>;
  }

  return (
    <div className="todo-master">
      {/* Tabs */}
      <div className="todo-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`todo-tab ${activeTab === tab.id ? 'active' : ''} ${tab.color}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-name">{tab.name}</span>
          </button>
        ))}
      </div>

      {/* OVERALL PROGRESS BAR */}
      <div className="overall-progress">
        <div className="progress-header">
          <span>📊 Overall Progress</span>
          <span>{overall.completed}/{overall.total} ({overall.percent}%)</span>
        </div>
        <div className="progress-bar overall">
          <div 
            className="progress-fill overall-fill" 
            style={{ width: `${overall.percent}%` }}
          />
        </div>
        <div className="progress-stats">
          <span>✅ Completed: {overall.completed}</span>
          <span>⏳ Pending: {overall.total - overall.completed}</span>
        </div>
      </div>

      {/* Section Progress */}
      <div className="section-progress">
        <div className="progress-header">
          <span>{TABS.find(t => t.id === activeTab)?.name} Today</span>
          <span>
            {activeTab === 'gym' 
              ? `${sectionCompleted}/1 (${sectionProgressPercent}%)` 
              : `${sectionCompleted}/${currentTasks.length} (${sectionProgressPercent}%)`}
          </span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${sectionProgressPercent}%` }}
          />
        </div>
      </div>

      {/* Tasks List */}
      <div className="tasks-list">
        {currentTasks.map(task => (
          <div
            key={task.id}
            className={`task-item ${todaysSectionChecks[task.id] ? 'completed' : ''}`}
            onClick={() => toggleTask(task.id)}
            onMouseEnter={() => setExpandedTask(task.id)}
            onMouseLeave={() => setExpandedTask(null)}
          >
            <span className="task-checkbox">
              {activeTab === 'gym' 
                ? (todaysSectionChecks[task.id] ? '⭕' : '⚪')
                : (todaysSectionChecks[task.id] ? '✅' : '⬜')}
            </span>
            <span className="task-text" title={task.text}>
              {expandedTask === task.id ? task.text : 
               task.text.length > 50 ? task.text.substring(0, 50) + '...' : task.text}
            </span>
          </div>
        ))}
      </div>

      {/* History Toggle Button */}
      <button 
        className="history-toggle-btn"
        onClick={() => setShowHistory(!showHistory)}
      >
        {showHistory ? '📋 Hide History' : '📋 Show Last 7 Days Progress'}
      </button>

      {/* History Section */}
      {showHistory && (
        <div className="tasks-history">
          <h4>📊 Daily Progress History</h4>
          <div className="history-list">
            {history.map((day, index) => (
              <div key={index} className="history-item">
                <span className="history-date">
                  {new Date(day.date).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
                <div className="history-progress">
                  <div className="history-progress-bar">
                    <div 
                      className="history-progress-fill" 
                      style={{ width: `${day.progress}%` }}
                    />
                  </div>
                  <span className="history-stats">
                    {day.hasData ? `${day.completed}/${day.total}` : 'No data'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="tasks-footer">
        <button onClick={resetToday} className="reset-btn">
          🔄 Reset Today
        </button>
        <span className="total-count">Total: {overall.total} tasks overall</span>
      </div>
    </div>
  );
}