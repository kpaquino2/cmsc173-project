import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "../../styles/Subject.css";
import { useAtom } from "jotai";
import { isOpenAtom } from "../atom/labmodal";
import { LabModal } from "./LabModal";

const Subject = ({ subject, bgColor, isConflicting = false }) => {
  const [, setIsOpen] = useAtom(isOpenAtom);
  const [labSections, setLabSections] = useState(subject.labSections);

  return (
    <>
      <div
        className={`subject-container ${
          isConflicting ? "subject-container-disabled" : ""
        }`}
        style={{ background: bgColor }}>
        <LabModal labSections={labSections} setLabSections={setLabSections} />
        <div className="subject-text">
          <h2>{subject.name}</h2>
        </div>
        <div className="subject-details">
          <div className="section-text">
            <strong className="section-label">Section:</strong>
            <span>{` ${subject.section}`}</span>
          </div>
          <div className="time-text">
            <strong className="time-label">Time:</strong>
            <span>{` ${subject.startTime}-${subject.endTime} `}</span>
          </div>
          <div className="time-text">
            <strong className="time-label">Day/s: </strong>
            <span>
              {subject.daysOccur &&
                Object.keys(subject.daysOccur)
                  .filter((day) => {
                    return subject.daysOccur[day];
                  })
                  .join(", ")}
            </span>
          </div>
        </div>
        <div className="add-lab-container">
          <button
            className="add-lab-button"
            onClick={() => {
              setIsOpen(true);
            }}
            disabled={isConflicting}>
            <FontAwesomeIcon icon={faPlus} className="plus-icon" />
            Add Lab
          </button>
        </div>
        <div className="all-lab-sect-container">
          {labSections &&
            labSections.map((labSection, idx) => (
              <div key={idx} className="lab-section-container">
                <div className="lab-section-text">
                  <span>Lab Section:</span>
                  <span>{` ${labSection.labSec}`}</span>
                </div>
                <div className="lab-time-text">
                  <span>Time:</span>
                  <span>{` ${labSection.labStartTime}-${labSection.labEndTime}`}</span>
                </div>
                <div className="lab-day-text">
                  <span>Day/s: </span>
                  <span>
                    {labSection.labDaysOccur &&
                      Object.keys(labSection.labDaysOccur)
                        .filter((day) => {
                          return labSection.labDaysOccur[day];
                        })
                        .join(", ")}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Subject;
