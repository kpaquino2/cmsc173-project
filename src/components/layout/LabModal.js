import React, { useRef, useState } from "react";
import { Dialog, Transition, Switch } from "@headlessui/react";
import { Fragment } from "react";
import "../../styles/Modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { useAtom } from "jotai";
import {
  isLabOpenAtom,
  isDayEnabledLabAtom,
  formInputsAtom,
  editLabAtom,
} from "../atom/labmodal";
import { subjectsAtom } from "../atom/subjects";

export const LabModal = () => {
  const [isOpen, setIsOpen] = useAtom(isLabOpenAtom);
  const [isDayEnabled, setIsDayEnabled] = useAtom(isDayEnabledLabAtom);
  const [formInputs, setFormInputs] = useAtom(formInputsAtom);
  const [subjects] = useAtom(subjectsAtom);
  const [edit, setEdit] = useAtom(editLabAtom);
  const startTimeRef = useRef(null);
  const [dayError, setDayError] = useState(false);

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

    if (Object.keys(isDayEnabled).every((k) => !isDayEnabled[k])){
      setDayError(true);
    } else {
      setDayError(false);
      // adding lab
      if (edit[0] === 0) {
        const newLab = subjects[edit[1]].labSections;
        newLab.push({
          labSec: formInputs.section,
          labStartTime: formInputs.startTime,
          labEndTime: formInputs.endTime,
          labDaysOccur: isDayEnabled,
        });

        // editing lab
      } else {
        const newLab = subjects[edit[1]].labSections[edit[2]];
        newLab.labSec = formInputs.section;
        newLab.labStartTime = formInputs.startTime;
        newLab.labEndTime = formInputs.endTime;
        newLab.labDaysOccur = isDayEnabled;
      }
      setIsOpen(false);
      setEdit([0, 0, 0]);
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
              {edit[0] === 0 ? "Add a Lab" : "Edit Lab"}
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
                  {/* SUBJECT + SECTION INPUT */}
                  <div className="input-div">
                    <label htmlFor="subject" className="label">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="input"
                      defaultValue={subjects[edit[1]] && subjects[edit[1]].name + " " + subjects[edit[1]].section}
                      disabled
                    />
                  </div>

                  {/* SECTION INPUT */}
                  <div className="input-div">
                    <label htmlFor="section" className="label">
                      Lab Section
                    </label>
                    <input
                      type="text"
                      id="section"
                      className="input"
                      defaultValue={
                        edit[0] === 0
                          ? ""
                          : subjects[edit[1]].labSections[edit[2]].labSec
                      }
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
                      defaultValue={
                        edit[0] === 0
                          ? ""
                          : subjects[edit[1]].labSections[edit[2]].labStartTime
                      }
                      onChange={(e) => {
                        setFormInputs((prev) => ({
                          ...prev,
                          startTime: e.target.value,
                        }));
                      }}
                      ref={startTimeRef}
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
                      defaultValue={
                        edit[0] === 0
                          ? ""
                          : subjects[edit[1]].labSections[edit[2]].labEndTime
                      }
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
                  <div>Occurs every:</div>

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
                  {edit[0] === 0 ? "Add" : "Save"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LabModal;
