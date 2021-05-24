import React, { useState, useEffect } from "react";
import { LabSection } from "./LabSection";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrashAlt,
  faEdit,
  faGripLines,
} from "@fortawesome/free-solid-svg-icons";

import "../../styles/Subject.css";

import { useAtom } from "jotai";
import { subjectsAtom } from "../atom/subjects";
import { currentPlanAtom, plansAtom } from "../atom/plans";
import {
  isSubjectOpenAtom,
  editSubjectAtom,
  isDayEnabledSubjectAtom,
} from "../atom/modal";
import { isLabOpenAtom, editLabAtom } from "../atom/labmodal";
import { showInitialGuideAtom } from "../atom/initialguides";
// Drag-and-Drop Functionality
import { useDraggable } from "@dnd-kit/core";

const Subject = ({ index, subject, bgColor }) => {
  const [subjects, setSubjects] = useAtom(subjectsAtom);
  const [currentPlan, setCurrentPlan] = useAtom(currentPlanAtom);
  const [plans, setPlans] = useAtom(plansAtom);
  const [isConflicting, setIsConflicting] = useState(false);
  const [, setIsSubjectOpen] = useAtom(isSubjectOpenAtom);
  const [, setSubjectEdit] = useAtom(editSubjectAtom);

  const [, setIsLabOpen] = useAtom(isLabOpenAtom);
  const [, setLabEdit] = useAtom(editLabAtom);

  const [, setIsDayEnabledSubject] = useAtom(isDayEnabledSubjectAtom);
  const [, setShowInitialGuide] = useAtom(showInitialGuideAtom);

  // check conflicts
  const checkConflicting = () => {
    var conf = false; // default value of conflicts

    // computes for int value of subj start and end
    var subjStart =
      parseInt(subject.startTime.split(":")[0]) * 60 +
      parseInt(subject.startTime.split(":")[1]);

    var subjEnd =
      parseInt(subject.endTime.split(":")[0]) * 60 +
      parseInt(subject.endTime.split(":")[1]);

    // checks for conflict for each day of the subject
    Object.keys(subject.daysOccur).forEach((day, i) => {
      if (subject.daysOccur[day]) {
        currentPlan.schedule[i].classes.forEach((clas) => {
          var classStart =
            parseInt(clas.from.split(":")[0]) * 60 +
            parseInt(clas.from.split(":")[1]);
          var classEnd =
            parseInt(clas.to.split(":")[0]) * 60 +
            parseInt(clas.to.split(":")[1]);

          // will be true when the subject and class conflict
          if (subjStart < classEnd && subjEnd > classStart) {
            conf = true;
          }
        });
      }
    });

    setIsConflicting(conf); // set the state of isConflicting to true
  };

  // checks for changes in subjects and current plan
  useEffect(() => {
    checkConflicting();
  }, [subjects, currentPlan]);

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

  const createTempUser = (subj, sect) => {
    return {
      subject: subj,
      section: sect,
    };
  };

  const deleteClass = (toBeDeleted) => {
    // var newSched = currentPlan.schedule;
    for (let i = 0; i < plans.length; i++) {
      for (let day in plans[i].schedule) {
        if (plans[i].schedule[day].classes.length !== 0) {
          var temp = plans[i].schedule[day].classes.filter((c) => {
            return (
              c.subject !== toBeDeleted.subject &&
              c.section !== toBeDeleted.section
            );
          });
          plans[i].schedule[day].classes = temp;
        }
      }
    }

    // setCurrentPlan({ ...currentPlan, schedule: newSched });
  };

  const deleteLab = (idx) => {
    const newSubjects = subjects.slice();
    const labSec = `${subjects[index].section}-${subjects[index].labSections[idx].labSec}`;
    var tbd = createTempUser(
      // subjects[index].labSections[idx].name,
      subjects[index].name,
      labSec
    );
    deleteClass(tbd);

    newSubjects[index].labSections.splice(idx, 1);
    setSubjects(newSubjects);
  };

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-${index}`,
    disabled: subject.labSections.length > 0, // Disables dragging the lecture subject if it has laboratory sections.
    data: {
      isConflicting: isConflicting,
      subject_index: index,
      lab_section: null,
      bgColor: bgColor,
    },
  });

  return (
    <>
      <div
        className={`subject-container ${
          isConflicting ? "subject-container-disabled" : ""
        }`}
        style={{
          background: bgColor,
          transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : "",
          position: transform ? "absolute" : "static",
          width: transform ? "calc(20% - 5rem)" : "",
          zIndex: transform ? "100" : "auto",
        }}
        ref={setNodeRef}
      >
        {subject.labSections && subject.labSections.length === 0 && (
          <div className="drag-handle-indicator" {...listeners} {...attributes}>
            <FontAwesomeIcon icon={faGripLines} />
          </div>
        )}
        <div
          onClick={
            subject.labSections.length ? null : () => addSubjectToSchedule(null)
          }
        >
          <div className="subject-text">
            <h2>{subject.name}</h2>
            <FontAwesomeIcon
              icon={faEdit}
              className={`edit-icon ${isConflicting ? "edit-icon-disabled" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
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

                    deleteClass(tbd);
                    newSubjects[index].labSections.splice(i, 1);
                  }
                }
                setSubjects(newSubjects);

                tbd = createTempUser(
                  subjects[index].name,
                  subjects[index].section
                );
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
                <LabSection
                  bgColor={bgColor}
                  key={idx}
                  lab_index={idx}
                  subject_index={index}
                  subject={subject}
                  labSection={labSection}
                  addSubjectToSchedule={addSubjectToSchedule}
                  deleteLab={deleteLab}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Subject;
