import React, { useState, useEffect } from 'react';
import './css/Homepage.css'; // Import Homepage CSS
import Navbar from './Navbar';
import CurrentClass from './CurrentClass';

function Homepage() {
  const [timetable, setTimetable] = useState({});
  const [selectedDay, setSelectedDay] = useState('');

  useEffect(() => {
    // Fetch timetable data from JSON file
    import('../db/c1.json')
      .then(data => {
        setTimetable(data.timetable);
        // Get current day and set it as default selected day
        const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        setSelectedDay(currentDay);
      })
      .catch(error => console.error('Error fetching timetable:', error));
  }, []);

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <CurrentClass timetable={timetable} />
        <h1>Class Timetable</h1>
        <div className="select-container">
          <div className="select-button" onClick={handleDayChange}>
            {selectedDay}
            <span className="select-arrow">&#9662;</span>
          </div>
          <div className="select-menu">
            {Object.keys(timetable).map((day, index) => (
              <div key={index} className="select-item" onClick={() => setSelectedDay(day)}>
                {day}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2>{selectedDay}</h2>
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Period</th>
                <th>Lecturer</th>
              </tr>
            </thead>
            <tbody>
              {timetable[selectedDay] && timetable[selectedDay].map((item, index) => (
                <tr key={index}>
                  <td>{item.time} - {item.endTime}</td>
                  <td>{item.period}</td>
                  <td>
                    <img src={item.lecturer.picUrl} alt={item.lecturer.name} />
                    <p>{item.lecturer.name}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
