import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

import "../../styles/Subject.css";

import { useAtom } from "jotai";
import { subjectsAtom } from "../atom/subjects";
import { currentPlanAtom } from "../atom/plans";
import {
  isSubjectOpenAtom,
  editSubjectAtom,
  isDayEnabledSubjectAtom,
} from "../atom/modal";
import {
  isLabOpenAtom,
  editLabAtom,
  isDayEnabledLabAtom,
} from "../atom/labmodal";
import { showInitialGuideAtom } from "../atom/initialguides";

const Subject = ({ index, subject, bgColor }) => {
  const [subjects, setSubjects] = useAtom(subjectsAtom);
  const [currentPlan, setCurrentPlan] = useAtom(currentPlanAtom);
  const [isConflicting, setIsConflicting] = useState(false);
  const [, setIsSubjectOpen] = useAtom(isSubjectOpenAtom);
  const [, setSubjectEdit] = useAtom(editSubjectAtom);

  const [, setIsLabOpen] = useAtom(isLabOpenAtom);
  const [, setLabEdit] = useAtom(editLabAtom);

  const [, setIsDayEnabledSubject] = useAtom(isDayEnabledSubjectAtom);
  const [, setIsDayEnabledLab] = useAtom(isDayEnabledLabAtom);
  const [, setShowInitialGuide] = useAtom(showInitialGuideAtom);

  useEffect(() => {
    checkConflicting();
  }, [subjects, currentPlan]);

  const checkConflicting = () => {
    var conf = false;
    var subjStart =
      parseInt(subject.startTime.split(":")[0]) * 60 +
      parseInt(subject.startTime.split(":")[1]);

    var subjEnd =
      parseInt(subject.endTime.split(":")[0]) * 60 +
      parseInt(subject.endTime.split(":")[1]);

    Object.keys(subject.daysOccur).forEach((day, i) => {
      if (subject.daysOccur[day]) {
        currentPlan.schedule[i].classes.forEach((clas) => {
          var classStart =
            parseInt(clas.from.split(":")[0]) * 60 +
            parseInt(clas.from.split(":")[1]);
          var classEnd =
            parseInt(clas.to.split(":")[0]) * 60 +
            parseInt(clas.to.split(":")[1]);
          if (subjStart < classEnd && subjEnd > classStart) {
            conf = true;
          }
        });
      }
    });
    setIsConflicting(conf);
  };

  const addSubjectToSchedule = (lab) => {
    if (isConflicting) return;
    var newClass = {
      subject: subject.name,
      section: subject.section,
      from: subject.startTime,
      to: subject.endTime,
      color: bgColor,
    };

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
        to: lab.labEndTime,
        color: bgColor,
      };
      Object.keys(lab.labDaysOccur).forEach((day, i) => {
        if (lab.labDaysOccur[day]) {
          newSched[i].classes = [...newSched[i].classes, newLabClass];
        }
      });
    }

    // Hide the user hint on the plan area.
    setShowInitialGuide(false);

    setCurrentPlan({ ...currentPlan, schedule: newSched });
  };

  const deleteSubject = (e) => {
    e.stopPropagation();
    const newSubjects = subjects.slice();
    newSubjects.splice(index, 1);
    setSubjects(newSubjects);
  };

  const deleteLab = (idx) => {
    const newSubjects = subjects.slice();
    newSubjects[index].labSections.splice(idx, 1);
    setSubjects(newSubjects);
  };

  return (
    <>
      <div
        className={`subject-container ${
          isConflicting ? "subject-container-disabled" : ""
        }`}
        style={{ background: bgColor }}
        onClick={
          subject.labSections.length ? null : () => addSubjectToSchedule(null)
        }
      >
        <div className="subject-text">
          <h2>{subject.name}</h2>
          <FontAwesomeIcon
            icon={faEdit}
            className="edit-icon"
            onClick={() => {
              setIsSubjectOpen(true);
              setSubjectEdit(index);
              setIsDayEnabledSubject({
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
              Every{" "}
              {subject.daysOccur &&
                Object.keys(subject.daysOccur)
                  .filter((day) => {
                    return subject.daysOccur[day];
                  })
                  .join(", ")}
            </span>
          </div>
        </div>
        <div className="all-lab-sect-container">
          <button
            className="add-lab-button lab-section-container"
            onClick={(e) => {
              e.stopPropagation();
              setIsLabOpen(true);
              setLabEdit([0, index, 0]);
            }}
            disabled={isConflicting}
          >
            <FontAwesomeIcon icon={faPlus} className="plus-icon" />
            Add Lab Section
          </button>
          {subject.labSections &&
            subject.labSections.map((labSection, idx) => (
              <div
                key={idx}
                className="lab-section-container lab-section-container-disabled"
                onClick={() => addSubjectToSchedule(labSection)}
              >
                <div className="lab-section-text">
                  <strong>{`${subject.section}-${labSection.labSec}`}</strong>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="edit-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsLabOpen(true);
                      setLabEdit([1, index, idx]);
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
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteLab(idx);
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
            ))}
        </div>
      </div>
    </>
  );
};

export default Subject;
