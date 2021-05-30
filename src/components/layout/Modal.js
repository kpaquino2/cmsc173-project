import React, { useEffect, useRef, useState } from "react";
import { Dialog, Transition, Switch } from "@headlessui/react";
import { Fragment } from "react";
import { useAtom } from "jotai";
import {
  isSubjectOpenAtom,
  isDayEnabledSubjectAtom,
  formInputsAtom,
  editSubjectAtom,
} from "../atom/modal";
import { subjectsAtom } from "../atom/subjects";

import "../../styles/Modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export const Modal = () => {
  const [isOpen, setIsOpen] = useAtom(isSubjectOpenAtom);
  const [isDayEnabled, setIsDayEnabled] = useAtom(isDayEnabledSubjectAtom);
  const [formInputs, setFormInputs] = useAtom(formInputsAtom);
  const [subjects, setSubjects] = useAtom(subjectsAtom);
  const [edit, setEdit] = useAtom(editSubjectAtom);
  const startTimeRef = useRef(null);
  const [dayError, setDayError] = useState(false);

  useEffect(() => {
    setFormInputs({
      subject: subjects[edit]?.name,
      section: subjects[edit]?.section,
      startTime: subjects[edit]?.startTime,
      endTime: subjects[edit]?.endTime,
    });
  }, [subjects, edit, setFormInputs]);

  const resetDays = () => {
    setIsDayEnabled({
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
    });
  };

  const closeModal = () => {
    setIsOpen(false);
    resetDays();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (let i = 0; i < subjects.length; i++) {
      if (i === edit) continue;
      if (
        subjects[i].name === formInputs.subject &&
        subjects[i].section === formInputs.section
      ) {
        alert("You have already entered a subject with the same section."); // medyo scueffed kasi alert() lang gamit
        return;
      }
    }

    if (Object.keys(isDayEnabled).every((k) => !isDayEnabled[k])){
      setDayError(true);
    } else {
      setDayError(false);
      // editing subject
      if (edit !== -1) {
        const newSubject = subjects[edit];
        newSubject.name = formInputs.subject;
        newSubject.section = formInputs.section;
        newSubject.startTime = formInputs.startTime;
        newSubject.endTime = formInputs.endTime;
        newSubject.daysOccur = isDayEnabled;
        // adding subject
      } else {
        setSubjects([
          ...subjects,
          {
            name: formInputs.subject,
            section: formInputs.section,
            startTime: formInputs.startTime,
            endTime: formInputs.endTime,
            daysOccur: isDayEnabled,
            labSections: [],
          },
        ]);
      }

      setIsOpen(false);
      setEdit(-1);
      resetDays();
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="dialog" onClose={closeModal}>
        <div className="fragment">
          <span className="span" aria-hidden="true">
            &#8203;
          </span>

          <div className="modal">
            <Dialog.Title as="div" className="modal-title">
              {edit === -1 ? "Add a Subject" : "Edit Subject"}
              <button className="close-button" onClick={closeModal}>
                <FontAwesomeIcon
                  icon={faTimes}
                  className="close-icon"
                  size="lg"
                />
              </button>
            </Dialog.Title>

            {/* MODAL BODY */}
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="grid">
                  {/* SUBJECT INPUT */}
                  <div className="input-div">
                    <label htmlFor="subject" className="label">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="input"
                      defaultValue={edit !== -1 ? subjects[edit]?.name : ""}
                      onChange={(e) => {
                        setFormInputs((prev) => ({
                          ...prev,
                          subject: e.target.value,
                        }));
                      }}
                      required
                    />
                  </div>

                  {/* SECTION INPUT */}
                  <div className="input-div">
                    <label htmlFor="section" className="label">
                      Section
                    </label>
                    <input
                      type="text"
                      id="section"
                      className="input"
                      defaultValue={edit !== -1 ? subjects[edit]?.section : ""}
                      onChange={(e) => {
                        setFormInputs((prev) => ({
                          ...prev,
                          section: e.target.value,
                        }));
                      }}
                      required
                    />
                  </div>
                </div>

                <div className="grid">
                  {/* START TIME INPUT */}
                  <div className="input-div">
                    <label htmlFor="start_time" className="label">
                      Start time
                    </label>
                    <input
                      type="time"
                      id="start_time"
                      className="input"
                      ref={startTimeRef}
                      defaultValue={
                        edit !== -1 ? subjects[edit]?.startTime : ""
                      }
                      onChange={(e) => {
                        setFormInputs((prev) => ({
                          ...prev,
                          startTime: e.target.value,
                        }));
                      }}
                      min="07:00"
                      max="19:00"
                      required
                    />
                  </div>

                  {/* END TIME INPUT */}
                  <div className="input-div">
                    <label htmlFor="end_time" className="label">
                      End time
                    </label>
                    <input
                      type="time"
                      id="end_time"
                      className="input"
                      defaultValue={edit !== -1 ? subjects[edit]?.endTime : ""}
                      onChange={(e) => {
                        setFormInputs((prev) => ({
                          ...prev,
                          endTime: e.target.value,
                        }));
                      }}
                      min={startTimeRef.current?.value}
                      max="19:00"
                      required
                    />
                  </div>
                </div>

                <div className="input-div">
                  <div className="label">Occurs every</div>

                  {/* SUNDAY */}
                  <div className="switch-set">
                    {/* MONDAY */}
                    <span className="switch-button">
                      <Switch
                        checked={isDayEnabled.Monday}
                        onChange={() => {
                          setIsDayEnabled((prev) => ({
                            ...prev,
                            Monday: !isDayEnabled.Monday,
                          }));
                        }}
                        className={`${
                          isDayEnabled.Monday ? "enabled" : "disabled"
                        }`}
                      >
                        M
                      </Switch>
                    </span>

                    {/* TUESDAY */}
                    <span className="switch-button">
                      <Switch
                        checked={isDayEnabled.Tuesday}
                        onChange={() => {
                          setIsDayEnabled((prev) => ({
                            ...prev,
                            Tuesday: !isDayEnabled.Tuesday,
                          }));
                        }}
                        className={`${
                          isDayEnabled.Tuesday ? "enabled" : "disabled"
                        }`}
                      >
                        T
                      </Switch>
                    </span>

                    {/* WEDNESDAY */}
                    <span className="switch-button">
                      <Switch
                        checked={isDayEnabled.Wednesday}
                        onChange={() => {
                          setIsDayEnabled((prev) => ({
                            ...prev,
                            Wednesday: !isDayEnabled.Wednesday,
                          }));
                        }}
                        className={`${
                          isDayEnabled.Wednesday ? "enabled" : "disabled"
                        }`}
                      >
                        W
                      </Switch>
                    </span>

                    {/* THURSDAY */}
                    <span className="switch-button">
                      <Switch
                        checked={isDayEnabled.Thursday}
                        onChange={() => {
                          setIsDayEnabled((prev) => ({
                            ...prev,
                            Thursday: !isDayEnabled.Thursday,
                          }));
                        }}
                        className={`${
                          isDayEnabled.Thursday ? "enabled" : "disabled"
                        }`}
                      >
                        TH
                      </Switch>
                    </span>

                    {/* FRIDAY */}
                    <span className="switch-button">
                      <Switch
                        checked={isDayEnabled.Friday}
                        onChange={() => {
                          setIsDayEnabled((prev) => ({
                            ...prev,
                            Friday: !isDayEnabled.Friday,
                          }));
                        }}
                        className={`${
                          isDayEnabled.Friday ? "enabled" : "disabled"
                        }`}
                      >
                        F
                      </Switch>
                    </span>

                    {/* SATURDAY */}
                    <span className="switch-button">
                      <Switch
                        checked={isDayEnabled.Saturday}
                        onChange={() => {
                          setIsDayEnabled((prev) => ({
                            ...prev,
                            Saturday: !isDayEnabled.Saturday,
                          }));
                        }}
                        className={`${
                          isDayEnabled.Saturday ? "enabled" : "disabled"
                        }`}
                      >
                        S
                      </Switch>
                    </span>
                  </div>

                  <span
                    className={`${
                      dayError && Object.keys(isDayEnabled).every((k) => !isDayEnabled[k]) ? "error" : "hide"
                    }`}
                  >
                    Select at least one day.
                  </span>
                </div>

                <button className="add-button" type="submit">
                  {edit === -1 ? "Add" : "Save"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
