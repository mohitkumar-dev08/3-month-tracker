// components/wellness/SleepAnalytics.jsx
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function SleepAnalytics() {
  const [sleepData, setSleepData] = useState([]);
  const [stats, setStats] = useState({
    average: 0,
    best: 0,
    worst: 0,
    consistency: "",
    recommendation: ""
  });

  useEffect(() => {
    // Load data from localStorage
    const saved = JSON.parse(localStorage.getItem("sleepTracker") || "{}");
    const last7Days = Object.entries(saved)
      .sort((a, b) => new Date(a[0]) - new Date(b[0])) // Sort by date ascending
      .slice(-7) // Last 7 days
      .map(([date, data]) => ({
        date,
        ...data
      }));
    
    setSleepData(last7Days);
    
    if (last7Days.length > 0) {
      const hours = last7Days.map(d => d.hours);
      const avg = hours.reduce((a, b) => a + b, 0) / hours.length;
      const best = Math.max(...hours);
      const worst = Math.min(...hours);
      
      // Calculate consistency (standard deviation)
      const variance = hours.reduce((acc, val) => acc + Math.pow(val - avg, 2), 0) / hours.length;
      const stdDev = Math.sqrt(variance);
      
      let consistency = "Good";
      if (stdDev > 1.5) consistency = "Variable";
      if (stdDev < 0.7) consistency = "Excellent";
      
      setStats({
        average: avg.toFixed(1),
        best: best,
        worst: worst,
        consistency: consistency,
        recommendation: getRecommendation(avg, stdDev)
      });
    }
  }, []);

  const getRecommendation = (avg, stdDev) => {
    if (avg >= 8) return "💪 Excellent sleep duration! Keep it up!";
    if (avg >= 7) return "😊 Good sleep! Try to maintain consistency.";
    if (avg >= 6) return "⚠️ You need 7-8 hours for optimal recovery.";
    if (avg < 6) return "🚨 Less sleep! Prioritize rest for better results.";
  };

  // Prepare chart data
  const chartData = {
    labels: sleepData.map(d => {
      const date = new Date(d.date);
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: 'Sleep Hours',
        data: sleepData.map(d => d.hours),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: sleepData.map(d => 
          d.hours >= 7 ? '#10b981' : '#f59e0b'
        ),
        pointBorderColor: 'white',
        pointRadius: 6,
        pointHoverRadius: 8,
        borderWidth: 3
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `Sleep: ${context.raw} hours`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 12,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="sleep-analytics">
      <h3 className="section-title">📊 Sleep Analytics</h3>
      
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-value">{stats.average}h</span>
          <span className="stat-label">Average</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.best}h</span>
          <span className="stat-label">Best</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.worst}h</span>
          <span className="stat-label">Worst</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.consistency}</span>
          <span className="stat-label">Consistency</span>
        </div>
      </div>

      {/* Recommendation */}
      <div className="recommendation">
        <p>{stats.recommendation}</p>
      </div>

      {/* Line Graph */}
      <div className="sleep-chart">
        <h4>📈 Sleep Trend - Last 7 Days</h4>
        <div className="chart-container">
          {sleepData.length > 0 ? (
            <Line data={chartData} options={chartOptions} />
          ) : (
            <div className="no-data-message">
              <p>No sleep data yet. Start tracking your sleep!</p>
            </div>
          )}
        </div>
      </div>

      {/* Sleep Quality Summary */}
      {sleepData.length > 0 && (
        <div className="sleep-summary">
          <h4>💤 Sleep Quality Breakdown</h4>
          <div className="quality-breakdown">
            {sleepData.slice(-3).reverse().map((day, index) => (
              <div key={index} className="quality-item">
                <span className="quality-date">
                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                <span className="quality-badge" style={{
                  background: day.quality === 'excellent' ? '#10b981' :
                              day.quality === 'good' ? '#34d399' :
                              day.quality === 'average' ? '#f59e0b' :
                              day.quality === 'poor' ? '#f97316' : '#ef4444'
                }}>
                  {day.quality}
                </span>
                <span className="quality-hours">{day.hours}h</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}