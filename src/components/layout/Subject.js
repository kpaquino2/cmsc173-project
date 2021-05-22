import React from 'react';
import '../../styles/Subject.css'
import { useAtom } from "jotai";
import { isOpenAtom } from "../atom/labmodal"
import { LabModal } from "./LabModal";

const Subject = ({courseName, courseSection, startTime, endTime, daysOccur}) => {
  const [, setIsOpen] = useAtom(isOpenAtom);

  return (
    <>
      <div className="subject-container" >
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
        <button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          + Add a Lab
        </button>
      </div>
    </>
  );
}

export default Subject;