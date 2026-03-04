import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const API = 'http://localhost:3000';

function Dashboard() {
  const [runs, setRuns] = useState([]);

  useEffect(() => {
    const fetchRuns = async () => {
      try {
        const res = await axios.get(`${API}/runs`);
        setRuns(res.data);
      } catch (err) {
        console.error('Failed to fetch runs', err);
      }
    };
    fetchRuns();
  }, []);

  const totalMiles = runs.reduce((sum, r) => sum + parseFloat(r.distance_miles || 0), 0).toFixed(1);
  const totalRuns = runs.length;
  const longestRun = runs.length > 0
    ? Math.max(...runs.map(r => parseFloat(r.distance_miles || 0))).toFixed(1)
    : 0;

  const avgPace = runs.length > 0
    ? (() => {
        const totalSeconds = runs.reduce((sum, r) => {
          return sum + (r.duration_minutes * 60) / r.distance_miles;
        }, 0);
        const avgSeconds = totalSeconds / runs.length;
        const mins = Math.floor(avgSeconds / 60);
        const secs = Math.round(avgSeconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs} /mi`;
      })()
    : 'N/A';

  const chartRuns = [...runs].slice(0, 6).reverse();
  const maxDistance = Math.max(...chartRuns.map(r => parseFloat(r.distance_miles || 0)), 1);

  return (
    <div className="dashboard">
      <h1>Progress Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h2>{totalMiles}</h2>
          <p>Total Miles</p>
        </div>
        <div className="stat-card">
          <h2>{totalRuns}</h2>
          <p>Total Runs</p>
        </div>
        <div className="stat-card">
          <h2>{avgPace}</h2>
          <p>Avg Pace</p>
        </div>
        <div className="stat-card">
          <h2>{longestRun} mi</h2>
          <p>Longest Run</p>
        </div>
      </div>

      <div className="chart-section">
        <h2>Recent Runs — Distance</h2>
        {chartRuns.length === 0 ? (
          <p className="no-data">No runs logged yet. Start logging to see your progress!</p>
        ) : (
          <div className="bar-chart">
            {chartRuns.map((run, i) => (
              <div key={i} className="bar-group">
                <div className="bar-label">{parseFloat(run.distance_miles).toFixed(1)} mi</div>
                <div className="bar" style={{ height: `${(parseFloat(run.distance_miles) / maxDistance) * 160}px` }} />
                <div className="bar-date">
                  {new Date(run.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="recent-runs">
        <h2>Recent Runs</h2>
        {runs.length === 0 ? (
          <p className="no-data">No runs yet!</p>
        ) : (
          <table className="runs-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Distance</th>
                <th>Duration</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {runs.slice(0, 5).map(run => (
                <tr key={run._id}>
                  <td>{new Date(run.date).toLocaleDateString()}</td>
                  <td>{run.distance_miles} mi</td>
                  <td>{run.duration_minutes} min</td>
                  <td>{run.runType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;