import React from "react";
import "../../styles/Layout.css";
import Class from "./Class.js";

const Main = ({ currentPlan }) => {
  return (
    <div className="main">
      <div className="time-column">
        <div className="column-header">Time</div>
        <div className="time">7:00 - 8:00 AM</div>
        <div className="time">8:00 - 9:00 AM</div>
        <div className="time">9:00 - 10:00 AM</div>
        <div className="time">10:00 - 11:00 AM</div>
        <div className="time">11:00 - 12:00 AM</div>
        <div className="time">12:00 - 1:00 PM</div>
        <div className="time">1:00 - 2:00 PM</div>
        <div className="time">2:00 - 3:00 PM</div>
        <div className="time">3:00 - 4:00 PM</div>
        <div className="time">4:00 - 5:00 PM</div>
        <div className="time">5:00 - 6:00 PM</div>
        <div className="time">6:00 - 7:00 PM</div>
      </div>
      {currentPlan.schedule.map((day, idx) => (
        <div key={idx} className="column">
          <div className="column-header">{day.name}</div>
          <Class />
        </div>
      ))}
    </div>
  );
};

export default Main;
