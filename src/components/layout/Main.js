import React from "react";
import "../../styles/Layout.css";
import Class from "./Class.js";

const Main = ({ currentPlan }) => {
  return (
    <div className="main">
      <div className="time-column">
        <div className="column-header">Time</div>
        <div className="time">7:00 - 8:00</div>
        <div className="time">8:00 - 9:00</div>
        <div className="time">9:00 - 10:00</div>
        <div className="time">10:00 - 11:00</div>
        <div className="time">11:00 - 12:00</div>
        <div className="time">12:00 - 13:00</div>
        <div className="time">13:00 - 14:00</div>
        <div className="time">14:00 - 15:00</div>
        <div className="time">15:00 - 16:00</div>
        <div className="time">16:00 - 17:00</div>
        <div className="time">17:00 - 18:00</div>
        <div className="time">18:00 - 19:00</div>
      </div>
      {currentPlan.schedule.map((day, idx) => (
        <div key={idx} className="column">
          <div className="column-header">{day.name}</div>
          <Class />

          {/* <Class /> */}
        </div>
      ))}
    </div>
  );
};

export default Main;
