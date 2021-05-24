import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Switch } from "@headlessui/react";

import { useAtom } from "jotai";
import allowConflictAtom from "../../atoms/allowConflictAtom";
import { isSubjectOpenAtom, editSubjectAtom } from "../atom/modal"
import { subjectsAtom } from "../atom/subjects";

import "../../styles/Sidebar.css";
import Subject from "./Subject";

import { Modal } from "./Modal";
import { LabModal } from "./LabModal";

const Sidebar = () => {
  const [, setIsOpen] = useAtom(isSubjectOpenAtom);
  const [, setEdit] = useAtom(editSubjectAtom);
  const [enabled, setEnabled] = useAtom(allowConflictAtom);
  const [subjects] = useAtom(subjectsAtom);

  const colors = [
    "linear-gradient(90deg, hsla(197, 100%, 63%, 0.875) 0%, hsla(294, 100%, 55%, 0.875) 100%)",
    "linear-gradient(90deg, hsla(284, 100%, 53%, 0.875) 0%, hsla(77, 100%, 64%, 0.875) 100%)",
    "linear-gradient(90deg, hsla(221, 45%, 73%, 0.875) 0%, hsla(220, 78%, 29%, 0.875) 100%)",
    "linear-gradient(147deg, #FFE53BE1 0%, #FF2525E1 74%)",
    "linear-gradient( 111.2deg,  rgba(232,5,5, 0.875) 1.7%, rgba(245,49,191, 0.875) 98.7% )",
    "linear-gradient(90deg, hsla(217, 100%, 50%, 0.875) 0%, hsla(186, 100%, 69%, 0.875) 100%)",
    "linear-gradient(90deg, hsla(333, 100%, 53%, 0.875) 0%, hsla(33, 94%, 57%, 0.875) 100%)",
    "linear-gradient(225deg, #FF3CACE1 0%, #784BA0E1 50%, #2B86C5E1 100%)",
    "linear-gradient(90deg, hsla(192, 80%, 51%, 0.875) 0%, hsla(355, 85%, 63%, 0.875) 100%)",
  ];

  return (
    <div className="sidebar">
      <Modal />
      <LabModal />
      <div className="sidebar-item title">
        <div style={{marginRight: "1rem"}}>
          <FontAwesomeIcon icon={faClock} size={"2x"} />
        </div>
        <h1>
          Easy Planner
        </h1>
      </div>
      <button 
        className="add-subject-button"
        onClick={() => {
          setIsOpen(true);
          setEdit(-1);
        }}
      >
        <FontAwesomeIcon icon={faPlus} className="plus-icon" />
        Add a Subject
      </button>
      <div className="sidebar-item subjects-list">
        <div className="subjects">
          {subjects.map((subject, idx) => {
            return (
              <Subject key={idx} index={idx} subject={subject} bgColor={colors[idx % colors.length]} />
            );
          })}
          {
            subjects.length === 0 && 
            <div className="initial-instructions">
              Click <strong><FontAwesomeIcon icon={faPlus} size="sm" /> Add a Subject</strong> <br /> to add to your list of subjects.
            </div>
          }
        </div>
      </div>
      <div className="sidebar-item options" style={{display: "none"}}>
        <Switch.Group as="div" className="switch-group">
          <Switch.Label className="switch-label">Allow conflicts</Switch.Label>
          <Switch
            className={`switch ${
              enabled ? "switch-enabled" : "switch-disabled"
            }`}
            checked={enabled}
            onChange={() => {
              setEnabled(!enabled);
            }}>
            <span
              className={`switch-indicator ${
                enabled
                  ? "switch-indicator-enabled"
                  : "switch-indicator-disabled"
              }`}></span>
          </Switch>
        </Switch.Group>
      </div>
    </div>
  );
};

export default Sidebar;
