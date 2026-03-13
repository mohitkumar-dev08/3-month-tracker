// components/wellness/WellnessCalendar.jsx
import { useState } from "react";

export default function WellnessCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const monthNames = ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  // Mock data - replace with actual data from your storage
  const completedDates = ['2026-03-13', '2026-03-12', '2026-03-11', '2026-03-10']; // Completed days
  const todayStr = today.toDateString();

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
    // Missed if date is before today and not completed
    return date < today && !isCompleted(date);
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
          const today = isToday(date);
          const missed = isMissed(date);

          return (
            <div 
              key={index} 
              className={`calendar-day 
                ${completed ? 'completed' : ''} 
                ${today ? 'today' : ''} 
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
          <span>Completed</span>
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
    </div>
  );
}