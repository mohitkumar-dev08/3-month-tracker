import { useState, useEffect } from "react";

export default function StreakHeatmap({ streakData = {} }) {
  const [weeks, setWeeks] = useState([]);
  const [monthMarkers, setMonthMarkers] = useState([]);
  const [stats, setStats] = useState({
    totalActive: 0,
    totalMissed: 0,
    currentStreak: 0,
    longestStreak: 0,
    consistency: 0
  });
  const [hoveredCell, setHoveredCell] = useState(null);

  const START_DATE = new Date(2026, 2, 23);
  const TOTAL_DAYS = 56;
  
  // RESPONSIVE CELL SIZES
  const CELL_SIZE = typeof window !== 'undefined' && window.innerWidth < 640 ? 16 : 22;
  const CELL_GAP = typeof window !== 'undefined' && window.innerWidth < 640 ? 3 : 5;

  const COLORS = {
    0: '#ebedf0',
    1: '#9be9a8',
    2: '#40c463',
    3: '#30a14e',
    4: '#216e39'
  };

  const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    generateHeatmapData();
    
    // Window resize par cells resize ho jayenge
    const handleResize = () => {
      generateHeatmapData();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [streakData]);

  const generateHeatmapData = () => {
    const allDays = [];
    const startDate = new Date(START_DATE);
    const startDayOfWeek = startDate.getDay(); 
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < TOTAL_DAYS; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      currentDate.setHours(0, 0, 0, 0);
      
      const dateStr = currentDate.toDateString();
      const isActive = streakData[dateStr] || false;
      
      // ✅ Check if date is missed (past date and not active)
      const isMissed = currentDate < today && !isActive;
      
      // Real intensity based on activity
      const intensity = isActive ? Math.floor(Math.random() * 4) + 1 : 0;
      
      const totalOffset = i + startDayOfWeek;
      const weekIndex = Math.floor(totalOffset / 7);
      const dayOfWeek = totalOffset % 7;
      
      allDays.push({
        date: new Date(currentDate),
        dateStr: dateStr,
        day: i + 1,
        active: isActive,
        missed: isMissed,
        intensity: intensity,
        month: currentDate.toLocaleString('default', { month: 'short' }),
        year: currentDate.getFullYear(),
        weekIndex: weekIndex,
        dayOfWeek: dayOfWeek
      });
    }

    const totalWeeks = Math.ceil((TOTAL_DAYS + startDayOfWeek) / 7);
    const weeksArray = Array(totalWeeks).fill().map(() => 
      Array(7).fill(null).map(() => ({ empty: true }))
    );
    
    allDays.forEach(day => {
      weeksArray[day.weekIndex][day.dayOfWeek] = day;
    });
    
    setWeeks(weeksArray);

    const markers = [];
    let currentMonth = "";
    
    allDays.forEach((day) => {
      if (day.month !== currentMonth) {
        markers.push({
          month: day.month,
          weekIndex: day.weekIndex
        });
        currentMonth = day.month;
      }
    });
    
    setMonthMarkers(markers);
    calculateStats(allDays);
  };

  const calculateStats = (data) => {
    const active = data.filter(d => d.active).length;
    const missed = data.filter(d => d.missed).length;
    let current = 0;
    let longest = 0;
    let temp = 0;
    
    for (let i = 0; i < data.length; i++) {
      if (data[i].active) {
        temp++;
        longest = Math.max(longest, temp);
      } else {
        temp = 0;
      }
    }
    
    const today = new Date().toDateString();
    const todayData = data.find(d => d.dateStr === today);
    if (todayData) {
      const todayIndex = data.findIndex(d => d.dateStr === today);
      for (let i = todayIndex; i >= 0; i--) {
        if (data[i].active) current++;
        else break;
      }
    }
    
    setStats({
      totalActive: active,
      totalMissed: missed,
      currentStreak: current,
      longestStreak: longest,
      consistency: Math.round((active / TOTAL_DAYS) * 100) || 0
    });
  };

  const getWeekLeftPosition = (weekIndex) => {
    return weekIndex * (CELL_SIZE + CELL_GAP);
  };

  const endDate = new Date(START_DATE);
  endDate.setDate(START_DATE.getDate() + TOTAL_DAYS - 1);
  const endDateStr = endDate.toLocaleDateString('en-US', { 
    month: 'short', day: 'numeric', year: 'numeric' 
  });
  const startDateStr = START_DATE.toLocaleDateString('en-US', { 
    month: 'short', day: 'numeric', year: 'numeric' 
  });

  return (
    <div className="heatmap-page">
      {/* Header - No animations */}
      <div className="heatmap-header">
        <div>
          <h1>🔥 56 Days Challenge</h1>
          <p className="heatmap-subtitle">
            {startDateStr} - {endDateStr}
          </p>
        </div>
        <div className="heatmap-badge">
          Day {stats.totalActive || 0}/{TOTAL_DAYS}
        </div>
      </div>

      {/* Stats Cards - Simple hover effect only */}
      <div className="heatmap-stats">
        {[
          { icon: "✅", value: stats.totalActive, label: "Days Active" },
          { icon: "❌", value: stats.totalMissed, label: "Days Missed" },
          { icon: "🔥", value: stats.currentStreak, label: "Current Streak" },
          { icon: "🏆", value: stats.longestStreak, label: "Longest Streak" },
          { icon: "📊", value: `${stats.consistency}%`, label: "Consistency" }
        ].map((stat, i) => (
          <div key={i} className="stat-card">
            <span className="stat-icon">{stat.icon}</span>
            <div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Heatmap Container */}
      <div className="heatmap-container">
        
        {/* Center Wrapper */}
        <div className="heatmap-center-wrapper">
          <div className="heatmap-inner-content">
            
            {/* Month Labels */}
            <div className="month-track">
              {monthMarkers.map((marker, index) => {
                const leftPos = getWeekLeftPosition(marker.weekIndex);
                return (
                  <div
                    key={index}
                    className="month-marker"
                    style={{ left: `${leftPos}px` }}
                  >
                    {marker.month}
                  </div>
                );
              })}
            </div>

            {/* Main Heatmap */}
            <div className="heatmap-main">
              {/* Weekday Labels */}
              <div className="weekday-labels">
                {WEEKDAYS.map((day, i) => (
                  <div 
                    key={i} 
                    className="weekday-label"
                    style={{ 
                      height: `${CELL_SIZE}px`, 
                      lineHeight: `${CELL_SIZE}px`
                    }}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Grid Container with cells */}
              <div className="grid-container" style={{ gap: `${CELL_GAP}px` }}>
                {weeks.map((week, weekIdx) => (
                  <div 
                    key={weekIdx} 
                    className="week-column" 
                    style={{ gap: `${CELL_GAP}px`, width: `${CELL_SIZE}px` }}
                  >
                    {WEEKDAYS.map((_, dayIdx) => {
                      const day = week[dayIdx];
                      const isHovered = hoveredCell === `${weekIdx}-${dayIdx}`;
                      
                      return (
                        <div
                          key={dayIdx}
                          className={`heatmap-cell ${!day || day.empty ? 'empty' : ''} 
                            ${day?.active ? 'active-cell' : ''} 
                            ${day?.missed ? 'missed-cell' : ''}`}
                          style={{
                            width: `${CELL_SIZE}px`,
                            height: `${CELL_SIZE}px`,
                            backgroundColor: day && !day.empty 
                              ? (day.missed ? '#fee2e2' : COLORS[day.intensity]) 
                              : COLORS[0],
                            opacity: day && !day.empty ? 1 : 0.3,
                            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                            boxShadow: isHovered ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
                            zIndex: isHovered ? 10 : 1,
                            position: 'relative'
                          }}
                          onMouseEnter={() => setHoveredCell(`${weekIdx}-${dayIdx}`)}
                          onMouseLeave={() => setHoveredCell(null)}
                          title={day && !day.empty ? 
                            `${day.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}\nDay ${day.day}\n${day.active ? '✅ Completed' : day.missed ? '❌ Missed' : '⏳ Future'}`
                            : ''
                          }
                        >
                          {day && day.missed && (
                            <span style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              fontSize: CELL_SIZE > 18 ? '14px' : '10px',
                              color: '#ef4444',
                              fontWeight: 'bold'
                            }}>❌</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Legend */}
        <div className="heatmap-legend">
          <span>Less</span>
          {[0,1,2,3,4].map(level => (
            <div
              key={level}
              className="legend-box"
              style={{ backgroundColor: COLORS[level] }}
            />
          ))}
          <span>More</span>
      </div>
      </div>

      {/* Daily Breakdown */}
      <div className="daily-breakdown">
        <h3>📅 Daily Breakdown (Last 30 Days)</h3>
        <div className="breakdown-grid">
          {weeks.flat()
            .filter(day => day && !day.empty)
            .slice(0, 30)
            .map((day, idx) => (
              <div 
                key={idx} 
                className="breakdown-item"
                style={{ 
                  background: day.missed ? '#fee2e2' : '#f9fafb'
                }}
              >
                <span className="breakdown-date">
                  {day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
                <div 
                  className="breakdown-dot"
                  style={{ 
                    backgroundColor: day.active ? COLORS[day.intensity] : (day.missed ? '#ef4444' : COLORS[0])
                  }}
                />
                <span className="breakdown-day" style={{ color: day.missed ? '#ef4444' : '#9ca3af' }}>
                  Day {day.day}
                </span>
              </div>
            ))}
        </div>
      </div>

      <style jsx>{`
        .heatmap-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
        }

        /* ===== HEADER STYLES ===== */
        .heatmap-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .heatmap-header h1 {
          font-size: 1.8rem;
          margin: 0;
          color: #10b981;
        }

        .heatmap-subtitle {
          color: #6b7280;
          font-size: 0.9rem;
          margin-top: 0.2rem;
        }

        .heatmap-badge {
          background: #10b981;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          font-weight: 600;
          font-size: 0.9rem;
        }

        /* ===== STATS CARDS ===== */
        .heatmap-stats {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.8rem;
          margin-bottom: 1.5rem;
        }

        .stat-card {
          background: #ffffff;
          border-radius: 0.8rem;
          padding: 0.8rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          border: 1px solid #f3f4f6;
          transition: transform 0.2s ease;
          cursor: pointer;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .stat-icon {
          font-size: 1.5rem;
          background: #f9fafb;
          width: 2.8rem;
          height: 2.8rem;
          border-radius: 0.6rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-value {
          font-size: 1.2rem;
          font-weight: 700;
          color: #111827;
          line-height: 1.2;
        }

        .stat-label {
          font-size: 0.65rem;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          margin-top: 0.1rem;
        }

        /* ===== HEATMAP CONTAINER ===== */
        .heatmap-container {
          background: #ffffff;
          border-radius: 1.2rem;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
          border: 1px solid #f3f4f6;
          overflow-x: auto;
        }

        .heatmap-center-wrapper {
          display: flex;
          justify-content: center;
          width: 100%;
          overflow-x: auto;
          padding-bottom: 8px;
          -webkit-overflow-scrolling: touch;
        }

        .heatmap-inner-content {
          display: flex;
          flex-direction: column;
          width: fit-content;
          min-width: min-content;
        }

        /* ===== MONTH MARKERS ===== */
        .month-track {
          margin-left: 40px;
          height: 22px;
          position: relative;
          margin-bottom: 6px;
          min-width: fit-content;
        }

        .month-marker {
          position: absolute;
          top: 0;
          font-size: 11px;
          font-weight: 600;
          color: #6b7280;
          letter-spacing: 0.3px;
          white-space: nowrap;
        }

        /* ===== HEATMAP GRID ===== */
        .heatmap-main {
          display: flex;
          min-width: fit-content;
        }

        .weekday-labels {
          width: 35px;
          margin-right: 8px;
          display: flex;
          flex-direction: column;
          gap: ${typeof CELL_GAP !== 'undefined' ? CELL_GAP : 5}px;
          flex-shrink: 0;
        }

        .weekday-label {
          font-size: 10px;
          color: #9ca3af;
          text-align: right;
          font-weight: 500;
          white-space: nowrap;
        }

        .grid-container {
          display: flex;
          width: fit-content;
          gap: ${typeof CELL_GAP !== 'undefined' ? CELL_GAP : 5}px;
        }

        .week-column {
          display: flex;
          flex-direction: column;
          gap: ${typeof CELL_GAP !== 'undefined' ? CELL_GAP : 5}px;
          width: ${typeof CELL_SIZE !== 'undefined' ? CELL_SIZE : 22}px;
          flex-shrink: 0;
        }

        /* ===== HEATMAP CELLS ===== */
        .heatmap-cell {
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .heatmap-cell.missed-cell {
          background-color: #fee2e2 !important;
        }

        .heatmap-cell:not(.empty):hover {
          transform: scale(1.1);
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          z-index: 10;
        }

        .heatmap-cell.empty {
          transition: opacity 0.2s ease;
        }

        .heatmap-cell.empty:hover {
          opacity: 0.5 !important;
        }

        /* ===== LEGEND ===== */
        .heatmap-legend {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid #f3f4f6;
          flex-wrap: wrap;
        }

        .legend-box {
          width: 14px;
          height: 14px;
          border-radius: 3px;
          position: relative;
          flex-shrink: 0;
        }

        .heatmap-legend span {
          font-size: 11px;
          color: #6b7280;
          margin: 0 4px;
        }

        /* ===== DAILY BREAKDOWN ===== */
        .daily-breakdown {
          background: #ffffff;
          border-radius: 1.2rem;
          padding: 1.2rem;
          border: 1px solid #f3f4f6;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }

        .daily-breakdown h3 {
          margin: 0 0 1rem 0;
          font-size: 1rem;
          color: #374151;
        }

        .breakdown-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 0.6rem;
          max-height: 220px;
          overflow-y: auto;
          padding-right: 0.5rem;
        }

        .breakdown-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem;
          background: #f9fafb;
          border-radius: 0.4rem;
          font-size: 0.7rem;
          transition: all 0.2s ease;
        }

        .breakdown-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        .breakdown-date {
          min-width: 40px;
          font-weight: 600;
          color: #4b5563;
          font-size: 0.65rem;
        }

        .breakdown-dot {
          width: 8px;
          height: 8px;
          border-radius: 2px;
          transition: transform 0.2s ease;
        }

        .breakdown-item:hover .breakdown-dot {
          transform: scale(1.2);
        }

        .breakdown-day {
          color: #9ca3af;
          font-size: 0.65rem;
        }

        /* ===== SCROLLBAR ===== */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 8px;
        }

        ::-webkit-scrollbar-thumb {
          background: #10b981;
          border-radius: 8px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #059669;
        }

        /* ===== RESPONSIVE BREAKPOINTS ===== */
        @media (max-width: 1024px) {
          .heatmap-stats {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .heatmap-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .heatmap-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.6rem;
          }
          
          .stat-card {
            padding: 0.6rem;
          }
          
          .stat-icon {
            width: 2.2rem;
            height: 2.2rem;
            font-size: 1.2rem;
          }
          
          .stat-value {
            font-size: 1rem;
          }
          
          .stat-label {
            font-size: 0.6rem;
          }
          
          .month-track {
            margin-left: 35px;
          }
          
          .weekday-labels {
            width: 30px;
            margin-right: 6px;
          }
          
          .weekday-label {
            font-size: 9px;
          }
        }

        @media (max-width: 480px) {
          .heatmap-page {
            padding: 0.8rem;
          }
          
          .heatmap-container {
            padding: 1rem;
          }
          
          .breakdown-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .month-track {
            margin-left: 30px;
          }
          
          .month-marker {
            font-size: 10px;
          }
          
          .heatmap-legend {
            gap: 3px;
          }
          
          .legend-box {
            width: 12px;
            height: 12px;
          }
          
          .heatmap-legend span {
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  );
}