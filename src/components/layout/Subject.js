import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import '../../styles/Subject.css'
import { useAtom } from "jotai";
import { isOpenAtom } from "../atom/labmodal"
import { LabModal } from "./LabModal";

const Subject = ({courseName, courseSection, startTime, endTime, daysOccur, bgColor}) => {
  const labSections = [
    {labSec: "ST1L", labStartTime: "7:00", labEndTime: "10:00", day:"M"},
    {labSec: "ST2L", labStartTime: "10:00", labEndTime: "1:00", day:"M"}
  ];
  const [, setIsOpen] = useAtom(isOpenAtom);

  return (
    <>
      <div className="subject-container" style={{backgroundColor: {bgColor}}}>
        <LabModal />
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
        <div className="add-lab-container">
          <button className="add-lab-button" onClick={() => {
            setIsOpen(true);
          }}>
            <FontAwesomeIcon icon={faPlus} className="plus-icon" />
            Add Lab
          </button>
        </div>
        <div className="all-lab-sect-container">
          {
            labSections && labSections.map((labSection) => (
              <div key={`${courseName}-${labSection}`} className="lab-section-container">
                <div className="lab-section-text">
                  <span>Lab Section:</span> 
                  <span>{` ${labSection.labSec}`}</span>
                </div>
                <div className="lab-time-text">
                  <span>Time:</span> 
                  <span>{` ${labSection.labStartTime}-${labSection.labEndTime}`}</span>
                </div>
                <div className="lab-day-text">
                  <span>Day:</span> 
                  <span>{` ${labSection.day}`}</span>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}

export default Subject;