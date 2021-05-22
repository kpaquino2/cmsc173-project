import React from "react";
import { useAtom } from "jotai";
import allowConflictAtom from "../../atoms/allowConflictAtom";
import { isOpenAtom } from "../atom/modal"
import { subjectsAtom } from "../atom/subjects";
import { Switch } from "@headlessui/react";
import { faClock, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Modal } from "./Modal";
import "../../styles/Sidebar.css";
import Subject from "./Subject";

const Sidebar = () => {
  const [, setIsOpen] = useAtom(isOpenAtom);
  const [enabled, setEnabled] = useAtom(allowConflictAtom);
  const [subjects] = useAtom(subjectsAtom);

  return (
    <div className="sidebar">
      <Modal />
      <div className="sidebar-item title">
        <FontAwesomeIcon icon={faClock} size={"4x"} /> 
      </div>
      <div className="sidebar-item subjects-list">
        <button 
          className="add-subject-button"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <FontAwesomeIcon icon={faPlus} className="plus-icon" />
          Add a Subject
        </button>
        <div className="subjects">
          {subjects.map((subject, idx) => {
            return (
              <Subject key={idx} subject={subject} />
            );
          })}
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