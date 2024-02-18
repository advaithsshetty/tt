import React, { useState, useEffect } from 'react';
import './css/Navbar.css'; // Import Navbar CSS

function Navbar() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span>Akarsh So Sexy 🥵</span>
      </div>
      <div className="navbar-time">
        Current Time: {currentTime}
      </div>
    </nav>
  );
}

export default Navbar;
