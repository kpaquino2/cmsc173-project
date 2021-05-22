import React from "react";
import { useAtom } from "jotai";
import allowConflictAtom from "../../atoms/allowConflictAtom";

import { Switch } from "@headlessui/react";
import { faClock, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/Sidebar.css";

const Sidebar = () => {
  const [enabled, setEnabled] = useAtom(allowConflictAtom);
  return (
    <div className="sidebar">
      <div className="sidebar-item title">
        <FontAwesomeIcon icon={faClock} size={"4x"} /> 
      </div>
      <div className="sidebar-item subjects-list">
        <button className="add-subject-button">
          <FontAwesomeIcon icon={faPlus} className="plus-icon" />
          Add a Subject
        </button>
        <div className="subjects">
          TODO, MAP ALL SUBJECT CARDS INSIDE THIS DIV
        </div>
      </div>
      <div className="sidebar-item options">
        <Switch.Group as="div" className="switch-group">
          <Switch.Label className="switch-label">
            Allow conflicts
          </Switch.Label>
          <Switch className={`switch ${enabled ? "switch-enabled" : "switch-disabled"}`} checked={enabled} onChange={() => {setEnabled(!enabled)}}>
            <span className={`switch-indicator ${enabled ? "switch-indicator-enabled" : "switch-indicator-disabled"}`}></span>
          </Switch>
        </Switch.Group>
      </div>
    </div>
  );
}

export default Sidebar;