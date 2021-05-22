import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-item title">
        <FontAwesomeIcon icon={faClock} size={"6x"} /> 
      </div>
      <div className="sidebar-item subjects-list">
        <button className="add-subject-button">Add a Subject</button>
        <div className="subjects">
          TODO, MAP ALL SUBJECT CARDS INSIDE THIS DIV
        </div>
      </div>
      <div className="sidebar-item options">
      </div>
    </div>
  );
}

export default Sidebar;