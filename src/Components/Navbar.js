import React, { useState, useEffect } from 'react';
import './css/Navbar.css'; // Import Navbar CSS
import './css/Homepage.css'; // Import Homepage CSS

function Navbar({ onSelectClass }) {
  const [selectedClass, setSelectedClass] = useState('c1'); // Default selected class
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const handleClassChange = (event) => {
    const selectedClass = event.target.value;
    setSelectedClass(selectedClass);
    onSelectClass(selectedClass);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span>Akarsh So Sexy 🥵</span>
      </div>
      <div className="navbar-time">
        Current Time: {currentTime}
      </div>
      <div className="navbar-select">
        <select className='select-button' value={selectedClass} onChange={handleClassChange}>
          <option value="c1">Batch C1</option>
          <option value="c2">Batch C2</option>
          <option value="c3">Batch C3</option>
        </select>
      </div>
    </nav>
  );
}

export default Navbar;
