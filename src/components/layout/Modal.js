import React from "react";
import { Dialog, Transition, Switch } from '@headlessui/react'
import { Fragment } from 'react'
import { useAtom } from "jotai";
import { isOpenAtom, isDayEnabledAtom, formInputsAtom } from "../atom/modal"

import "../../styles/Modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export const Modal = () => {
	const [isOpen, setIsOpen] = useAtom(isOpenAtom);
	const [isDayEnabled, setIsDayEnabled] = useAtom(isDayEnabledAtom);
	const [formInputs, setFormInputs] = useAtom(formInputsAtom);

  const closeModal = () => {
    setIsOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formInputs);
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
                    />
                  </div>
                </div>

                <div className="input-div">
                  <div>Occurs every:</div>

                  {/* SUNDAY */}
                  <div className="switch-set">
                    <span className="switch-button">
                      <Switch
                        checked={isDayEnabled.sunday}
                        onChange={() => {
                          setIsDayEnabled((prev) => ({
                            ...prev, sunday: !(isDayEnabled.sunday)
                          }));
                        }}
                        className={`${isDayEnabled.sunday ? "enabled" : "disabled"}`}
                      >
                        S
                      </Switch>
                    </span>
                    
                    {/* MONDAY */}
                    <span className="switch-button">
                      <Switch
                        checked={isDayEnabled.monday}
                        onChange={() => {
                          setIsDayEnabled((prev) => ({
                            ...prev, monday: !(isDayEnabled.monday)
                          }));
                        }}
                        className={`${isDayEnabled.monday ? "enabled" : "disabled"}`}
                      >
                        M
                      </Switch>
                    </span>

                    {/* TUESDAY */}
                    <span className="switch-button">
                      <Switch
                        checked={isDayEnabled.tuesday}
                        onChange={() => {
                          setIsDayEnabled((prev) => ({
                            ...prev, tuesday: !(isDayEnabled.tuesday)
                          }));
                        }}
                        className={`${isDayEnabled.tuesday ? "enabled" : "disabled"}`}
                      >
                        T
                      </Switch>
                    </span>

                    {/* WEDNESDAY */}
                    <span className="switch-button">
                      <Switch
                        checked={isDayEnabled.wednesday}
                        onChange={() => {
                          setIsDayEnabled((prev) => ({
                            ...prev, wednesday: !(isDayEnabled.wednesday)
                          }));
                        }}
                        className={`${isDayEnabled.wednesday ? "enabled" : "disabled"}`}
                      >
                        W
                      </Switch>
                    </span>

                    {/* THURSDAY */}
                    <span className="switch-button">
                      <Switch
                        checked={isDayEnabled.thursday}
                        onChange={() => {
                          setIsDayEnabled((prev) => ({
                            ...prev, thursday: !(isDayEnabled.thursday)
                          }));
                        }}
                        className={`${isDayEnabled.thursday ? "enabled" : "disabled"}`}
                      >
                        TH
                      </Switch>
                    </span>

                    {/* FRIDAY */}
                    <span className="switch-button">
                      <Switch
                        checked={isDayEnabled.friday}
                        onChange={() => {
                          setIsDayEnabled((prev) => ({
                            ...prev, friday: !(isDayEnabled.friday)
                          }));
                        }}
                        className={`${isDayEnabled.friday ? "enabled" : "disabled"}`}
                      >
                        F
                      </Switch>
                    </span>

                    {/* SATURDAY */}
                    <span className="switch-button">
                      <Switch
                        checked={isDayEnabled.saturday}
                        onChange={() => {
                          setIsDayEnabled((prev) => ({
                            ...prev, saturday: !(isDayEnabled.saturday)
                          }));
                        }}
                        className={`${isDayEnabled.saturday ? "enabled" : "disabled"}`}
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