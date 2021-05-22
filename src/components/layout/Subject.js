import React from 'react';
import '../../styles/Subject.css'

const Subject = ({courseName, courseSection, startTime, endTime, daysOccur}) => {
  return (
    <>
      <div className="subject-container" >
        <div className="subject-text"> 
          <h2>{courseName}</h2>
        </div>
        <div className="section-text">
          <strong className="section-label">Section:</strong>
          <span>{` ${courseSection}`}</span>
        </div>
        <div className="time-text">
          <strong className="time-label">Time:</strong>
          <span>{` ${startTime}-${endTime} `}</span>
          
        </div>
        <div className="time-text">
          <strong className="time-label">Days: </strong>
          <span>
            { daysOccur && Object.keys(daysOccur).filter((day) => { return daysOccur[day] }).join(", ") }
          </span>
        </div>
      </div>
    </>
  );
}

export default Subject;