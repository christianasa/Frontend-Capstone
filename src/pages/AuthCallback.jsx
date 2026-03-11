// AuthCallback.jsx
// Add the route /callback in your App.jsx to render this component.
// It grabs the JWT from the URL, stores it, then redirects to the dashboard.
import { useEffect, useState } from 'react';

function AuthCallback({ onLoginSuccess }) {
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const err = params.get('error');

    if (err || !token) {
      setError('Strava login failed. Please try again.');
      return;
    }

    // Store token and clean the URL
    localStorage.setItem('token', token);
    window.history.replaceState({}, '', '/');
    onLoginSuccess(token);
  }, [onLoginSuccess]);

  if (error) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#dc2626', marginBottom: 16 }}>{error}</p>
          <a href="/" style={{ color: '#7B3FA0' }}>← Try again</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'sans-serif', color: '#888' }}>
      Connecting your Strava account...
    </div>
  );
}

export default AuthCallback;