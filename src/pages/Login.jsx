// Login.jsx
import './Login.css';

const API = 'http://localhost:3000';

function Login() {
  const handleStravaLogin = () => {
    // Redirect browser to backend, which redirects to Strava
    window.location.href = `${API}/auth/login`;
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="brand">
          <span className="brand-icon">⟳</span>
          <span className="brand-name">PaceTrack</span>
        </div>
        <div className="tagline">
          <h2>Every mile<br />tells a story.</h2>
          <p>Track your runs, own your progress.</p>
        </div>
        <div className="stat-preview">
          <div className="preview-stat">
            <span className="preview-num">12.4</span>
            <span className="preview-label">miles this week</span>
          </div>
          <div className="preview-divider" />
          <div className="preview-stat">
            <span className="preview-num">8:42</span>
            <span className="preview-label">avg pace /mi</span>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h1 className="card-title">Get started</h1>
          <p className="card-subtitle">Connect your Strava account to view your runs.</p>

          <button className="strava-btn" onClick={handleStravaLogin}>
            <svg className="strava-logo" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0 4 13.828h4.172" />
            </svg>
            Connect with Strava
          </button>

          <p className="login-note">
            We only request read access to your activities. We never post or modify your data.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;