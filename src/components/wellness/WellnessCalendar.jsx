// components/wellness/WellnessCalendar.jsx
import { useState, useEffect, useMemo } from "react";

export default function WellnessCalendar({ streakData }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const monthNames = ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const todayStr = today.toDateString();

  // ✅ Calculate completed dates based on streak
  const completedDates = useMemo(() => {
    if (!streakData || streakData.currentStreak === 0 || !streakData.lastCheckIn) {
      return [];
    }
    
    const dates = [];
    const lastDate = new Date(streakData.lastCheckIn);
    lastDate.setHours(0, 0, 0, 0);
    
    // Streak ke hisaab se pichle dates calculate karo
    for (let i = 0; i < streakData.currentStreak; i++) {
      const date = new Date(lastDate);
      date.setDate(lastDate.getDate() - i);
      dates.push(date.toDateString());
    }
    
    return dates;
  }, [streakData?.currentStreak, streakData?.lastCheckIn]);

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    days.push(date);
  }

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const isCompleted = (date) => {
    return completedDates.includes(date.toDateString());
  };

  const isToday = (date) => {
    return date.toDateString() === todayStr;
  };

  const isMissed = (date) => {
    return date < today && !isCompleted(date) && !isToday(date);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="wellness-calendar">
      <div className="calendar-header">
        <button onClick={goToPreviousMonth} className="nav-btn">←</button>
        <h3>{monthNames[month]} {year}</h3>
        <button onClick={goToNextMonth} className="nav-btn">→</button>
      </div>

      <div className="calendar-grid">
        {weekDays.map(day => (
          <div key={day} className="calendar-day header">{day}</div>
        ))}

        {days.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="calendar-day empty"></div>;
          }

          const completed = isCompleted(date);
          const todayActive = isToday(date);
          const missed = isMissed(date);

          return (
            <div 
              key={index} 
              className={`calendar-day 
                ${completed ? 'completed' : ''} 
                ${todayActive ? 'today' : ''} 
                ${missed ? 'missed' : ''}
              `}
            >
              <span className="day-number">{date.getDate()}</span>
              {completed && <span className="completed-mark">✅</span>}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="calendar-legend">
        <div className="legend-item">
          <span className="legend-color completed-color"></span>
          <span>Completed ({completedDates.length} days)</span>
        </div>
        <div className="legend-item">
          <span className="legend-color today-color"></span>
          <span>Today</span>
        </div>
        <div className="legend-item">
          <span className="legend-color missed-color"></span>
          <span>Missed</span>
        </div>
      </div>
      
      {/* ❌ Streak info completely removed */}
    </div>
  );
}