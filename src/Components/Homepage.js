import React, { useState, useEffect } from 'react';
import './css/Homepage.css'; // Import Homepage CSS
import Navbar from './Navbar';
import CurrentClass from './CurrentClass';

function Homepage() {
  const [timetable, setTimetable] = useState({});
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedClass, setSelectedClass] = useState('c1'); // Default selected class

  useEffect(() => {
    // Dynamically import the JSON file based on the selected class
    import(`../db/${selectedClass}.json`)
      .then(data => {
        setTimetable(data.timetable);
        // Get current day and set it as default selected day
        const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        setSelectedDay(currentDay);
      })
      .catch(error => console.error('Error fetching timetable:', error));
  }, [selectedClass]); // Update timetable when selected class changes

  return (
    <div>
      <Navbar onSelectClass={setSelectedClass} />
      <div className="container">
        <CurrentClass timetable={timetable} />
        <h1>Class Timetable</h1>
        <div className='select-container'>
          <label>Select Day:</label>
          <select className='select-button' value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
            {Object.keys(timetable).map((day, index) => (
              <option key={index} value={day}>{day}</option>
            ))}
          </select>
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
