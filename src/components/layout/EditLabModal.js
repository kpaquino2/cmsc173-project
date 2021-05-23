import React, { useEffect } from "react";
import { Dialog, Transition, Switch } from '@headlessui/react'
import { Fragment } from 'react'
import { useAtom } from "jotai";
import { editLabIsOpenAtom, editLabIsDayEnabledAtom, editLabFormInputsAtom } from "../atom/editlabmodal"
import "../../styles/Modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export const EditLabModal = ({ labSection }) => {
	const [isOpen, setIsOpen] = useAtom(editLabIsOpenAtom);
	const [isDayEnabled, setIsDayEnabled] = useAtom(editLabIsDayEnabledAtom);
	const [formInputs, setFormInputs] = useAtom(editLabFormInputsAtom);

  useEffect(() => {
    setFormInputs(() => ({
      section: labSection.labSec, 
      startTime: labSection.labStartTime, 
      endTime: labSection.labEndTime
    }));

    setIsDayEnabled(labSection.labDaysOccur);
  },[labSection, setIsDayEnabled, setFormInputs])

  const closeModal = () => {
    setIsOpen(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormInputs((prev) => ({
      ...prev
    }));

    labSection.labSec = formInputs.section;
    labSection.labStartTime = formInputs.startTime;
    labSection.labEndTime = formInputs.endTime;
    labSection.labDaysOccur = isDayEnabled;

    setIsOpen(false);
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
              Edit Lab
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
                
                <div>
                  {/* SECTION INPUT */}
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
                      value={formInputs.section}
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
                      value={formInputs.startTime}
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
                      value={formInputs.endTime}
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

export default EditLabModal;