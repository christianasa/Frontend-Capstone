import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const API = 'http://localhost:3000';

function Home() {
  const navigate = useNavigate();
  const [runs, setRuns] = useState([]);

  const raceDate = new Date('2026-04-19');
  const today = new Date();
  const daysUntilRace = Math.ceil((raceDate - today) / (1000 * 60 * 60 * 24));

  useEffect(() => {
    axios.get(`${API}/runs`)
      .then(res => setRuns(res.data))
      .catch(err => console.error('Failed to fetch runs', err));
  }, []);

  // Calculate stats from API data
  const totalMiles = runs.reduce((sum, run) => sum + (parseFloat(run.distance_miles) || 0), 0);

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const runsThisWeek = runs.filter(run => new Date(run.date) >= startOfWeek).length;

  const milesLeft = Math.max(0, 13.1 - totalMiles).toFixed(1);

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to RunTrack 🏃🏾‍♀️</h1>
        <p>Your personal half marathon training companion.</p>
        <div className="countdown">
          <span className="countdown-number">{daysUntilRace}</span>
          <span className="countdown-label">Days Until Race Day</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h2>{totalMiles.toFixed(1)}</h2>
          <p>Total Miles Logged</p>
        </div>
        <div className="stat-card">
          <h2>{runsThisWeek}</h2>
          <p>Runs This Week</p>
        </div>
        <div className="stat-card">
          <h2>{milesLeft}</h2>
          <p>Miles to Race</p>
        </div>
      </div>

      <div className="cta-buttons">
        <button onClick={() => navigate('/log-run')} className="btn-primary">
          + Log a Run
        </button>
        <button onClick={() => navigate('/training-plan')} className="btn-secondary">
          View Training Plan
        </button>
      </div>
    </div>
  );
}

export default Home;