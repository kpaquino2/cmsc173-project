import React from 'react';
import '../../styles/Subject.css'

const Subject = ({courseName, courseSection, startTime, endTime, daysOccur, bgColorVar}) => {
  return (
    <>
      <div className="subject-container" styles={{bgColor: {bgColorVar}}}>
        <div className="subject-text"> 
          <h2>{courseName}</h2>
        </div>
        <div className="section-text">
          <strong className="section-label">Section:</strong>
          <span>{` ${courseSection}`}</span>
        </div>
        <div className="time-text">
          <strong className="time-label">Time and Day:</strong>
          <span>{` ${startTime}-${endTime} `}</span>
          { daysOccur && daysOccur.map((day) => (
            <span>{day}</span>
          ))}
        </div>
      </div>
    </>
  );
}

export default Subject;