
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { isLabOpenAtom, editLabAtom, isDayEnabledLabAtom } from "../atom/labmodal"

import { useAtom } from "jotai";

// Drag-and-Drop Functionality
import { useDraggable } from "@dnd-kit/core";

export const LabSection = ({ bgColor, lab_index, subject_index, subject, labSection, addSubjectToSchedule, deleteLab }) => {
  
  const [, setIsLabOpen] = useAtom(isLabOpenAtom);
  const [, setLabEdit] = useAtom(editLabAtom);
  const [, setIsDayEnabledLab] = useAtom(isDayEnabledLabAtom);
  
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: `draggable-lab-${subject_index}-${lab_index}`,
    data: {
      isConflicting: false,
      subject_index: subject_index,
      lab_section: lab_index,
      bgColor: bgColor,
    }
  });

  return (
    <div
      key={lab_index}
      className="lab-section-container"
      ref={setNodeRef}
      style={
        {
          transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : "",
          position: transform ? "absolute" : "static",
          width: transform ? "calc(20% - 5rem)" : "",
          zIndex: transform ? "100" : "auto",
          borderRadius: transform ? "1rem" : undefined,
        }
      }
    >
      <div className="lab-grip-line" {...attributes} {...listeners} >
        <FontAwesomeIcon icon={faGripVertical} />
      </div>
      <div className="lab-section-information" onClick={() => addSubjectToSchedule(labSection)}>
        <div className="lab-section-text">
          <strong>{`${subject.section}-${labSection.labSec}`}</strong>
          <FontAwesomeIcon
            icon={faEdit}
            className="edit-icon"
            onClick={() => {
              setIsLabOpen(true);
              setLabEdit([1, subject_index, lab_index]);
              setIsDayEnabledLab({
                Monday: labSection.labDaysOccur.Monday,
                Tuesday: labSection.labDaysOccur.Tuesday,
                Wednesday: labSection.labDaysOccur.Wednesday,
                Thursday: labSection.labDaysOccur.Thursday,
                Friday: labSection.labDaysOccur.Friday,
                Saturday: labSection.labDaysOccur.Saturday,
              });
            }}
          />
          <FontAwesomeIcon
            icon={faTrashAlt}
            className="delete-icon"
            onClick={() => {
              deleteLab(lab_index);
            }}
          />
        </div>
        <div className="lab-time-text">
          <span>{` ${labSection.labStartTime}-${labSection.labEndTime}`}</span>
        </div>
        <div className="lab-day-text">
          <span>
            Every{" "}
            {labSection.labDaysOccur &&
              Object.keys(labSection.labDaysOccur)
                .filter((day) => {
                  return labSection.labDaysOccur[day];
                })
                .join(", ")}
          </span>
        </div>
      </div>
    </div>
  );
};
