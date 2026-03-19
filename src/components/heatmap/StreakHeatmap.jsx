import { useState, useEffect } from "react";

export default function StreakHeatmap({ streakData = {} }) {
  const [weeks, setWeeks] = useState([]);
  const [monthMarkers, setMonthMarkers] = useState([]);
  const [stats, setStats] = useState({
    totalActive: 0,
    currentStreak: 0,
    longestStreak: 0,
    consistency: 0
  });

  // 🔥 START DATE - 15 March 2026
  const START_DATE = new Date(2026, 2, 20);
  const TOTAL_DAYS = 191;
  const CELL_SIZE = 14; // px
  const CELL_GAP = 3; // px

  // Color shades based on activity
  const COLORS = {
    0: '#ebedf0',
    1: '#9be9a8',
    2: '#40c463',
    3: '#30a14e',
    4: '#216e39'
  };

  // ✅ FULL WEEKDAY NAMES - 7 rows
  const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    generateHeatmapData();
  }, [streakData]);

  const generateHeatmapData = () => {
    // Generate all days
    const allDays = [];
    const startDate = new Date(START_DATE);
    
    for (let i = 0; i < TOTAL_DAYS; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      const dateStr = currentDate.toDateString();
      const isActive = streakData[dateStr] || false;
      const intensity = isActive ? Math.floor(Math.random() * 4) + 1 : 0;
      
      allDays.push({
        date: new Date(currentDate),
        dateStr: dateStr,
        day: i + 1,
        active: isActive,
        intensity: intensity,
        month: currentDate.toLocaleString('default', { month: 'short' }),
        year: currentDate.getFullYear(),
        weekIndex: Math.floor((i + startDate.getDay()) / 7),
        dayOfWeek: currentDate.getDay()
      });
    }

    // Organize into weeks (7 days per week)
    const weeksArray = [];
    let currentWeek = new Array(7).fill(null).map(() => ({ empty: true }));
    
    allDays.forEach(day => {
      const weekIdx = day.weekIndex;
      const dayIdx = day.dayOfWeek;
      
      if (!weeksArray[weekIdx]) {
        weeksArray[weekIdx] = new Array(7).fill(null).map(() => ({ empty: true }));
      }
      
      weeksArray[weekIdx][dayIdx] = day;
    });
    
    setWeeks(weeksArray.filter(week => week.some(day => !day.empty)));

    // Calculate month markers
    const markers = [];
    let currentMonth = '';
    
    allDays.forEach((day, index) => {
      const monthKey = `${day.month} ${day.year}`;
      if (monthKey !== currentMonth) {
        markers.push({
          month: monthKey,
          weekIndex: day.weekIndex,
          dayIndex: index
        });
        currentMonth = monthKey;
      }
    });
    
    setMonthMarkers(markers);
    calculateStats(allDays);
  };

  const calculateStats = (data) => {
    const active = data.filter(d => d.active).length;
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
      currentStreak: current,
      longestStreak: longest,
      consistency: Math.round((active / TOTAL_DAYS) * 100)
    });
  };

  const getWeekLeftPosition = (weekIndex) => {
    return weekIndex * (CELL_SIZE + CELL_GAP);
  };

  return (
    <div className="heatmap-page">
      {/* Header */}
      <div className="heatmap-header">
        <div>
          <h1>🔥 191 Days Challenge</h1>
          <p className="heatmap-subtitle">20 March 2026 - 26 September 2026</p>
        </div>
        <div className="heatmap-badge">
          Day {Math.min(stats.totalActive, 191)}/191
        </div>
      </div>

      {/* Stats Cards */}
      <div className="heatmap-stats">
        {[
          { icon: "✅", value: stats.totalActive, label: "Days Active" },
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
        {/* Month Labels - Perfectly positioned */}
        <div className="month-track" style={{ 
          marginLeft: '45px', // Match weekday label width
          height: '25px',
          position: 'relative',
          marginBottom: '8px'
        }}>
          {monthMarkers.map((marker, index) => {
            const leftPos = getWeekLeftPosition(marker.weekIndex);
            
            return (
              <div
                key={index}
                className="month-marker"
                style={{
                  position: 'absolute',
                  left: `${leftPos}px`,
                  top: 0,
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap'
                }}
              >
                {marker.month.split(' ')[0]}
              </div>
            );
          })}
        </div>

        {/* Main Heatmap */}
        <div className="heatmap-main" style={{ display: 'flex' }}>
          {/* ✅ Weekday Labels - ALL 7 DAYS */}
          <div className="weekday-labels" style={{ 
            width: '45px',
            marginRight: '5px',
            display: 'flex',
            flexDirection: 'column',
            gap: `${CELL_GAP}px`
          }}>
            {WEEKDAYS.map((day, i) => (
              <div
                key={i}
                style={{
                  height: `${CELL_SIZE}px`,
                  fontSize: '11px',
                  color: '#6b7280',
                  textAlign: 'right',
                  paddingRight: '8px',
                  lineHeight: `${CELL_SIZE}px`,
                  fontWeight: i === 0 || i === 6 ? 400 : 500 // Sun/Sat slightly lighter
                }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Grid Container */}
          <div className="grid-container" style={{ 
            display: 'flex',
            gap: `${CELL_GAP}px`,
            overflowX: 'auto',
            paddingBottom: '5px',
            flex: 1
          }}>
            {weeks.map((week, weekIdx) => (
              <div key={weekIdx} className="week-column" style={{
                display: 'flex',
                flexDirection: 'column',
                gap: `${CELL_GAP}px`
              }}>
                {/* ✅ 7 rows - one for each day of week */}
                {WEEKDAYS.map((_, dayIdx) => {
                  const day = week[dayIdx];
                  return (
                    <div
                      key={dayIdx}
                      className={`heatmap-cell ${!day || day.empty ? 'empty' : ''}`}
                      style={{
                        width: `${CELL_SIZE}px`,
                        height: `${CELL_SIZE}px`,
                        backgroundColor: day && !day.empty 
                          ? COLORS[day.intensity] 
                          : COLORS[0],
                        opacity: day && !day.empty ? 1 : 0.15,
                        borderRadius: '3px',
                        cursor: day && !day.empty ? 'pointer' : 'default'
                      }}
                      title={day && !day.empty ? 
                        `${day.date.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}\nDay ${day.day}\n${day.active ? '✅ Completed' : '❌ Missed'}`
                        : ''
                      }
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="heatmap-legend" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '4px',
          marginTop: '20px',
          paddingTop: '15px',
          borderTop: '1px solid var(--border-light)'
        }}>
          <span style={{ fontSize: '11px', color: '#6b7280', marginRight: '5px' }}>Less</span>
          {[0,1,2,3,4].map(level => (
            <div
              key={level}
              style={{ 
                backgroundColor: COLORS[level],
                width: `${CELL_SIZE}px`,
                height: `${CELL_SIZE}px`,
                borderRadius: '3px'
              }}
            />
          ))}
          <span style={{ fontSize: '11px', color: '#6b7280', marginLeft: '5px' }}>More</span>
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
              <div key={idx} className="breakdown-item">
                <span className="breakdown-date">
                  {day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
                <div 
                  className="breakdown-dot"
                  style={{ 
                    backgroundColor: day.active ? COLORS[day.intensity] : COLORS[0],
                    width: '12px',
                    height: '12px',
                    borderRadius: '3px'
                  }}
                />
                <span className="breakdown-day">Day {day.day}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Footer */}
      <div className="heatmap-footer">
        <p>
          <span>📌</span> 
          Started: <strong>15 March 2026</strong> • 
          Target: <strong>21 September 2026</strong> • 
          <span className={stats.totalActive >= 191 ? 'text-success' : ''}>
            {stats.totalActive >= 191 ? ' 🎉 COMPLETED!' : ` ${191 - stats.totalActive} days remaining`}
          </span>
        </p>
      </div>

      <style jsx>{`
        .heatmap-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1.5rem;
        }

        .heatmap-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .heatmap-header h1 {
          font-size: 2rem;
          margin: 0;
          background: linear-gradient(135deg, #10b981, #34d399);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .heatmap-subtitle {
          color: #6b7280;
          font-size: 0.9rem;
          margin-top: 0.3rem;
        }

        .heatmap-badge {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          padding: 0.6rem 1.2rem;
          border-radius: 2rem;
          font-weight: 600;
        }

        .heatmap-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: var(--card-light);
          border-radius: 1rem;
          padding: 1rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          border: 1px solid var(--border-light);
        }

        .dark .stat-card {
          background: var(--card-dark);
          border-color: var(--border-dark);
        }

        .stat-icon {
          font-size: 1.8rem;
          background: #f3f4f6;
          width: 3rem;
          height: 3rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dark .stat-icon {
          background: #2d2d2d;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-h);
          line-height: 1.2;
        }

        .stat-label {
          font-size: 0.7rem;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .heatmap-container {
          background: var(--card-light);
          border-radius: 1.5rem;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
          border: 1px solid var(--border-light);
        }

        .dark .heatmap-container {
          background: var(--card-dark);
          border-color: var(--border-dark);
        }

        .heatmap-cell {
          transition: all 0.2s ease;
        }

        .heatmap-cell:not(.empty):hover {
          transform: scale(1.2);
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          z-index: 10;
        }

        .daily-breakdown {
          background: var(--card-light);
          border-radius: 1.5rem;
          padding: 1.5rem;
          margin-bottom: 2rem;
          border: 1px solid var(--border-light);
        }

        .dark .daily-breakdown {
          background: var(--card-dark);
          border-color: var(--border-dark);
        }

        .daily-breakdown h3 {
          margin: 0 0 1rem 0;
          font-size: 1.1rem;
        }

        .breakdown-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
          gap: 0.5rem;
          max-height: 200px;
          overflow-y: auto;
          padding-right: 0.5rem;
        }

        .breakdown-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem;
          background: #f9fafb;
          border-radius: 0.5rem;
          font-size: 0.7rem;
        }

        .dark .breakdown-item {
          background: #2d2d2d;
        }

        .breakdown-date {
          min-width: 45px;
          font-weight: 600;
        }

        .breakdown-dot {
          border-radius: 3px;
        }

        .breakdown-day {
          color: #6b7280;
        }

        .heatmap-footer {
          text-align: center;
          padding: 1.5rem;
          background: linear-gradient(135deg, #10b98110, #34d39910);
          border-radius: 1rem;
          font-size: 0.9rem;
        }

        .text-success {
          color: #10b981;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .heatmap-stats {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .heatmap-header {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
          
          .breakdown-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .heatmap-cell {
            width: 12px !important;
            height: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}