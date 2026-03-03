import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const raceDate = new Date('2026-06-01');
  const today = new Date();
  const daysUntilRace = Math.ceil((raceDate - today) / (1000 * 60 * 60 * 24));

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to RunTrack 🏃</h1>
        <p>Your personal half marathon training companion.</p>
        <div className="countdown">
          <span className="countdown-number">{daysUntilRace}</span>
          <span className="countdown-label">Days Until Race Day</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h2>0</h2>
          <p>Total Miles Logged</p>
        </div>
        <div className="stat-card">
          <h2>0</h2>
          <p>Runs This Week</p>
        </div>
        <div className="stat-card">
          <h2>13.1</h2>
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