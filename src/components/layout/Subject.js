import { faPlus, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import '../../styles/Subject.css'
import { useAtom } from "jotai";
import { isLabAtom, editLabAtom } from "../atom/labmodal"
import { subjectsAtom } from "../atom/subjects";
import { isSubjectOpenAtom, editSubjectAtom, isDayEnabledAtom } from "../atom/modal";
import { EditLabModal } from "./EditLabModal";
import { editLabIsOpenAtom } from "../atom/editlabmodal";
import { currentPlanAtom } from '../atom/plans';

const Subject = ({index, subject, bgColor, isConflicting = true}) => {
  const [subjects, setSubjects] = useAtom(subjectsAtom);
  const [, setIsOpen] = useAtom(isLabAtom);
  const [, setIsSubjectOpen] = useAtom(isSubjectOpenAtom);
  const [, setEditLabIsOpen] = useAtom(editLabIsOpenAtom);
  const [, setSubjectEdit] = useAtom(editSubjectAtom);
  const [, setLabEdit] = useAtom(editLabAtom);
	const [, setIsDayEnabled] = useAtom(isDayEnabledAtom);
  const [labSections, setLabSections] = useState(subject.labSections);
  const [currentPlan, setCurrentPlan] = useAtom(currentPlanAtom);

  const addSubjectToSchedule = (lab) => {
    var newClass = {
      subject: subject.name,
      section: subject.section,
      from: subject.startTime,
      to: subject.endTime
    }

    let newSched = [...currentPlan.schedule];
    Object.keys(subject.daysOccur).forEach((day, i) => {
      if (subject.daysOccur[day]) {
        newSched[i].classes = [...newSched[i].classes, newClass];
      }
    });

    if (lab) {
      var newLabClass = {
        subject: subject.name,
        section: subject.section + "-" + lab.labSec,
        from: lab.labStartTime,
        to: lab.labEndTime
      }
      Object.keys(lab.labDaysOccur).forEach((day, i) => {
        if (lab.labDaysOccur[day]) {
          newSched[i].classes = [...newSched[i].classes, newLabClass];
        }
      })
    }

    setCurrentPlan({...currentPlan, schedule: newSched});
  }

  const deleteSubject = () => {
    const newSubjects = subjects.slice();
    newSubjects.splice(index, 1);
    setSubjects(newSubjects);
  }

  const deleteLab = (index) => {
    const newLabList = labSections.slice();
    newLabList.splice(index, 1);
    setLabSections(newLabList);
  }

  return (
    <>
      <div 
        className={`subject-container ${!isConflicting ? "subject-container-disabled" : ""}`} 
        style={{background: bgColor}}
        onClick={labSections.length ? null : () => addSubjectToSchedule(null)}
      >
        <div className="subject-text"> 
          <h2>{subject.name}</h2>
          <FontAwesomeIcon
            icon={faEdit}
            className="edit-icon"
            onClick={() => {
              setIsSubjectOpen(true);
              console.log(index);
              setSubjectEdit(index);
              setIsDayEnabled({
                Monday: subjects[index].daysOccur.Monday,
                Tuesday: subjects[index].daysOccur.Tuesday,
                Wednesday: subjects[index].daysOccur.Wednesday,
                Thursday: subjects[index].daysOccur.Thursday,
                Friday: subjects[index].daysOccur.Friday,
                Saturday: subjects[index].daysOccur.Saturday,
              });
            }}
          />
          <FontAwesomeIcon
            icon={faTrashAlt}
            className="delete-icon"
            onClick={deleteSubject}
          />
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
              { subject.daysOccur && Object.keys(subject.daysOccur).filter((day) => { return subject.daysOccur[day] }).join(", ") }
            </span>
          </div>
        </div>
        <div className="add-lab-container">
          <button 
            className="add-lab-button" 
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true); 
              setLabEdit(index);
            }} 
            disabled={!isConflicting}
          >
            <FontAwesomeIcon icon={faPlus} className="plus-icon" />
            Add Lab
          </button>
        </div>
        <div className="all-lab-sect-container">
          {
            labSections && labSections.map((labSection, idx) => (
              <div key={idx} className="lab-section-container" onClick={() => addSubjectToSchedule(labSection)}>
                <EditLabModal labSection={labSections[idx]}/>
                <div className="lab-section-text">
                  <span>Lab Section:</span> 
                  <span>{` ${labSection.labSec}`}</span>
                  <FontAwesomeIcon icon={faEdit} className="edit-icon" onClick={() => {setEditLabIsOpen(true)}}/>
                  <FontAwesomeIcon icon={faTrashAlt} className="delete-icon" onClick={() => {deleteLab(idx)}} />
                </div>
                <div className="lab-time-text">
                  <span>Time:</span> 
                  <span>{` ${labSection.labStartTime}-${labSection.labEndTime}`}</span>
                </div>
                <div className="lab-day-text">
                  <span>Day/s: </span> 
                  <span>
                    { labSection.labDaysOccur && Object.keys(labSection.labDaysOccur).filter((day) => { return labSection.labDaysOccur[day] }).join(", ") }
                  </span>
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