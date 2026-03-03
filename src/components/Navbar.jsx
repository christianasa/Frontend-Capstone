import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">RunTrack 🏃</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/training-plan">Training Plan</Link>
        <Link to="/log-run">Log a Run</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
}

export default Navbar;