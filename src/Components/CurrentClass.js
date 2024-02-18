import React, { useState, useEffect } from 'react';
import './css/CurrentClass.css'; // Import CurrentClass CSS

const CurrentClass = ({ timetable }) => {
  const [currentClass, setCurrentClass] = useState(null);
  const [upcomingClass, setUpcomingClass] = useState(null);

  useEffect(() => {
    console.log('Timetable:', timetable); // Check if timetable data is loaded correctly

    const interval = setInterval(() => {
      const currentTime = new Date();
      const currentDay = currentTime.toLocaleDateString('en-US', { weekday: 'long' });
      const currentHour = currentTime.getHours();
      const currentMinutes = currentTime.getMinutes();
      const currentTimeInMinutes = currentHour * 60 + currentMinutes;

      console.log('Current Day:', currentDay); // Check current day

      const classesToday = timetable[currentDay];

      console.log('Classes Today:', classesToday); // Check classes for the current day

      if (classesToday) {
        const current = classesToday.find(classTime => {
          const classStartTime = parseInt(classTime.time.split(':')[0]) * 60 + parseInt(classTime.time.split(':')[1]);
          const classEndTime = parseInt(classTime.endTime.split(':')[0]) * 60 + parseInt(classTime.endTime.split(':')[1]);
          return currentTimeInMinutes >= classStartTime && currentTimeInMinutes <= classEndTime;
        });

        setCurrentClass(current || null);

        const nextClass = classesToday.find(classTime => {
          const classStartTime = parseInt(classTime.time.split(':')[0]) * 60 + parseInt(classTime.time.split(':')[1]);
          return classStartTime > currentTimeInMinutes;
        });

        console.log('Next Class Today:', nextClass); // Check next class for today

        if (!nextClass) {
          // If there's no next class today, find the first class tomorrow
          const nextDay = new Date();
          nextDay.setDate(nextDay.getDate() + 1); // Move to the next day
          const nextDayName = nextDay.toLocaleDateString('en-US', { weekday: 'long' });
          const nextDayClasses = timetable[nextDayName];

          console.log('Next Day:', nextDayName); // Check next day

          console.log('Next Day Classes:', nextDayClasses); // Check classes for the next day

          if (nextDayClasses && nextDayClasses.length > 0) {
            setUpcomingClass(nextDayClasses[0]);
          } else {
            setUpcomingClass(null);
          }
        } else {
          setUpcomingClass(nextClass);
        }
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [timetable]);

  return (
  <div className="current-class-container">
    <div className="current-class">
      <h2>Current Class</h2>
      {currentClass ? (
        <div className="class-details">
          <h3>{currentClass.period}</h3>
          <p>{currentClass.lecturer.name}</p>
          <img src={currentClass.lecturer.picUrl} alt={currentClass.lecturer.name} />
        </div>
      ) : (
        <p>No class currently</p>
      )}
    </div>
    <div className="upcoming-class">
      <h2>Upcoming Class</h2>
      {upcomingClass ? (
        <div className="class-details">
          <h3>{upcomingClass.period}</h3>
          <p>{upcomingClass.lecturer.name}</p>
          <img src={upcomingClass.lecturer.picUrl} alt={upcomingClass.lecturer.name} />
        </div>
      ) : (
        <p>No upcoming class</p>
      )}
    </div>
    </div>
  );
};

export default CurrentClass;
