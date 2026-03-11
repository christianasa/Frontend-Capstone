import { useState } from 'react';
import axios from 'axios';
import './Login.css';

const API = 'http://localhost:3000';

function Login({ onLoginSuccess }) {
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/register';
      const res = await axios.post(`${API}${endpoint}`, { username, password });

      if (mode === 'register') {
        setMode('login');
        setPassword('');
        setError('');
        return;
      }

      const { token } = res.data;
      localStorage.setItem('token', token);
      onLoginSuccess(token);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Animated track lines in background */}
      <div className="track-lines">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="track-line" style={{ animationDelay: `${i * 0.4}s` }} />
        ))}
      </div>

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
          <h1 className="card-title">
            {mode === 'login' ? 'Sign in' : 'Get started'}
          </h1>
          <p className="card-subtitle">
            {mode === 'login' ? 'Welcome back, runner.' : 'Create your free account.'}
          </p>

          <div className="mode-toggle">
            <button
              className={`toggle-btn ${mode === 'login' ? 'active' : ''}`}
              onClick={() => { setMode('login'); setError(''); }}
            >
              Sign In
            </button>
            <button
              className={`toggle-btn ${mode === 'register' ? 'active' : ''}`}
              onClick={() => { setMode('register'); setError(''); }}
            >
              Register
            </button>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="your_username"
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
            </div>

            {error && <div className="form-error">{error}</div>}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner" /> {mode === 'login' ? 'Signing in...' : 'Creating...'}
                </span>
              ) : (
                <span>{mode === 'login' ? 'Sign In →' : 'Create Account →'}</span>
              )}
            </button>
          </form>

          <p className="switch-mode">
            {mode === 'login' ? "New here? " : "Have an account? "}
            <button
              className="switch-link"
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
            >
              {mode === 'login' ? 'Create an account' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;