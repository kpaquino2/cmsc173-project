import React from "react";
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

const Subject = ({ index, subject, bgColor, isConflicting = true }) => {
  const [subjects, setSubjects] = useAtom(subjectsAtom);
  const [currentPlan, setCurrentPlan] = useAtom(currentPlanAtom);

  const [, setIsSubjectOpen] = useAtom(isSubjectOpenAtom);
  const [, setSubjectEdit] = useAtom(editSubjectAtom);

  const [, setIsLabOpen] = useAtom(isLabOpenAtom);
  const [, setLabEdit] = useAtom(editLabAtom);

  const [, setIsDayEnabledSubject] = useAtom(isDayEnabledSubjectAtom);
  const [, setIsDayEnabledLab] = useAtom(isDayEnabledLabAtom);

  const addSubjectToSchedule = (lab) => {
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

    setCurrentPlan({ ...currentPlan, schedule: newSched });
  };

  const createTempUser = (subj, sect) => {
    return {
      subject: subj,
      section: sect,
    };
  };

  const deleteClass = (toBeDeleted) => {
    var newSched = currentPlan.schedule;
    for (let day in newSched) {
      if (newSched[day].classes.length !== 0) {
        var temp = newSched[day].classes.filter((c) => {
          console.log("c", c);
          return (
            c.subject !== toBeDeleted.subject &&
            c.section !== toBeDeleted.section
          );
        });
        newSched[day].classes = temp;
      }
    }
    setCurrentPlan({ ...currentPlan, schedule: newSched });
    console.log("currplan:\n", currentPlan);
  };

  return (
    <>
      <div
        className={`subject-container ${
          !isConflicting ? "subject-container-disabled" : ""
        }`}
        style={{ background: bgColor }}
        onClick={
          subject.labSections.length ? null : () => addSubjectToSchedule(null)
        }>
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
            onClick={(e) => {
              var tbd;
              e.stopPropagation();
              const newSubjects = subjects.slice();

              if (newSubjects[index].labSections.length !== 0) {
                for (let i in newSubjects.labSections) {
                  tbd = createTempUser(
                    newSubjects[index].name,
                    `${newSubjects[index].section}-${newSubjects[index].labSections[i].labSec}`
                  );
                  console.log("all lab", tbd);

                  deleteClass(tbd);
                  newSubjects[index].labSections.splice(i, 1);
                }
              }
              tbd = createTempUser(
                subjects[index].name,
                subjects[index].section
              );
              // console.log("tobedeleted", tbd);
              deleteClass(tbd);
              newSubjects.splice(index, 1);
              setSubjects(newSubjects);
            }}
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
            onClick={(e) => {
              e.stopPropagation();
              setIsLabOpen(true);
              setLabEdit([0, index, 0]);
            }}
            disabled={!isConflicting}>
            <FontAwesomeIcon icon={faPlus} className="plus-icon" />
            Add Lab
          </button>
        </div>
        <div className="all-lab-sect-container">
          {subject.labSections &&
            subject.labSections.map((labSection, idx) => (
              <div
                key={idx}
                className="lab-section-container"
                onClick={() => addSubjectToSchedule(labSection)}>
                <div className="lab-section-text">
                  <span>Lab Section: {` ${labSection.labSec}`}</span>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="edit-icon"
                    onClick={() => {
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

                      const newSubjects = subjects.slice();
                      console.log(index, idx);
                      console.log(subjects[0].labSections[0]);
                      const labSec = `${subjects[index].section}-${subjects[index].labSections[idx].labSec}`;
                      console.log(labSec);
                      // console.log(subjects[index].labSections);
                      var tbd = createTempUser(
                        // subjects[index].labSections[idx].name,
                        subjects[index].name,
                        labSec
                      );
                      console.log("delete lab", tbd);
                      deleteClass(tbd);

                      newSubjects[index].labSections.splice(idx, 1);
                      setSubjects(newSubjects);
                    }}
                  />
                </div>
                <div className="lab-time-text">
                  <span>
                    Time:{" "}
                    {` ${labSection.labStartTime}-${labSection.labEndTime}`}
                  </span>
                </div>
                <div className="lab-day-text">
                  <span>
                    Day/s:{" "}
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
