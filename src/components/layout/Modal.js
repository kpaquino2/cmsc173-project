import React from "react";
import { Dialog, Transition, Switch } from '@headlessui/react'
import { Fragment } from 'react'
import { useAtom } from "jotai";
import { isOpenAtom, isDayEnabledAtom, formInputsAtom } from "../atom/modal"
import { subjectsAtom } from "../atom/subjects";
import "../../styles/Modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export const Modal = () => {
	const [isOpen, setIsOpen] = useAtom(isOpenAtom);
	const [isDayEnabled, setIsDayEnabled] = useAtom(isDayEnabledAtom);
	const [formInputs, setFormInputs] = useAtom(formInputsAtom);
  const [subjects, setSubjects] = useAtom(subjectsAtom);

  const resetDays = () => {
    setIsDayEnabled({
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
    });
  }

  const closeModal = () => {
    setIsOpen(false);
    resetDays();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubjects([...subjects, {
      name: formInputs.subject,
      section: formInputs.section,
      startTime: formInputs.startTime,
      endTime: formInputs.endTime,
      daysOccur: isDayEnabled
    }]);
    setFormInputs((prev) => ({
      ...prev, startTime: e.target.value
    }));
    setIsOpen(false);
    resetDays();
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="dialog"
        onClose={closeModal}
      >
        <div className="fragment">
          <span
            className="span"
            aria-hidden="true"
          >
            &#8203;
          </span>
        
          <div className="modal">
            <Dialog.Title
              as="div"
              className="modal-title"
            >
              Add a Subject
              <button 
                className="close-button"
                onClick={closeModal}
              >
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
                    <label
                      htmlFor="subject"
                      className="label"
                    >
                      Subject:
                    </label>
                    <input 
                      type="text"
                      id="subject"
                      className="input"
                      onChange={(e) => {
                        setFormInputs((prev) => ({
                          ...prev, subject: e.target.value
                        }));
                      }}
                      required
                    />
                  </div>

                  {/* SUBJECT INPUT */}
                  <div className="input-div">
                    <label
                      htmlFor="section"
                      className="label"
                    >
                      Section:
                    </label>
                    <input 
                      type="text"
                      id="section"
                      className="input"
                      onChange={(e) => {
                        setFormInputs((prev) => ({
                          ...prev, section: e.target.value
                        }));
                      }}
                      required
                    />
                  </div>
                </div>
                  
                <div className="grid">
                  {/* START TIME INPUT */}
                  <div className="input-div">
                    <label
                      htmlFor="start_time"
                      className="label"
                    >
                      Start time:
                    </label>
                    <input 
                      type="time"
                      id="start_time"
                      className="input"
                      onChange={(e) => {
                        setFormInputs((prev) => ({
                          ...prev, startTime: e.target.value
                        }));
                      }}
                      required
                    />
                  </div>

                  {/* END TIME INPUT */}
                  <div className="input-div">
                    <label
                      htmlFor="end_time"
                      className="label"
                    >
                      End time:
                    </label>
                    <input 
                      type="time"
                      id="end_time"
                      className="input"
                      onChange={(e) => {
                        setFormInputs((prev) => ({
                          ...prev, endTime: e.target.value
                        }));
                      }}
                      required
                    />
                  </div>
                </div>

                <div className="input-div">
                  <div>Occurs every:</div>

                  {/* SUNDAY */}
                  <div className="switch-set">
                    
                    {/* MONDAY */}
                    <span className="switch-button">
                      <Switch
                        checked={isDayEnabled.Monday}
                        onChange={() => {
                          setIsDayEnabled((prev) => ({
                            ...prev, Monday: !(isDayEnabled.Monday)
                          }));
                        }}
                        className={`${isDayEnabled.Monday ? "enabled" : "disabled"}`}
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
                            ...prev, Tuesday: !(isDayEnabled.Tuesday)
                          }));
                        }}
                        className={`${isDayEnabled.Tuesday ? "enabled" : "disabled"}`}
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
                            ...prev, Wednesday: !(isDayEnabled.Wednesday)
                          }));
                        }}
                        className={`${isDayEnabled.Wednesday ? "enabled" : "disabled"}`}
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
                            ...prev, Thursday: !(isDayEnabled.Thursday)
                          }));
                        }}
                        className={`${isDayEnabled.Thursday ? "enabled" : "disabled"}`}
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
                            ...prev, Friday: !(isDayEnabled.Friday)
                          }));
                        }}
                        className={`${isDayEnabled.Friday ? "enabled" : "disabled"}`}
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
                            ...prev, Saturday: !(isDayEnabled.Saturday)
                          }));
                        }}
                        className={`${isDayEnabled.Saturday ? "enabled" : "disabled"}`}
                      >
                        S
                      </Switch>
                    </span>
                  </div>
                </div>

                <button 
                  className="add-button"
                  type="submit"
                >
                  Add
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