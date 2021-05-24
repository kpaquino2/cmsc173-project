import React, { useState } from "react";
import "../../styles/Class.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useAtom } from "jotai";
import { currentPlanAtom } from "../atom/plans";

const Class = ({ classState }) => {
  const [currentPlan, setCurrentPlan] = useAtom(currentPlanAtom);
  const [show, setShow] = useState("hidden");

  // calculate the number of minutes from classState.from
  // h * 60 + min
  const startMin =
    parseInt(classState.from.split(":")[0]) * 60 +
    parseInt(classState.from.split(":")[1]);

  // calculate the number of minutes from classState.to
  // h * 60 + min
  const endMin =
    parseInt(classState.to.split(":")[0]) * 60 +
    parseInt(classState.to.split(":")[1]);

  const offset = (startMin - 420) / 60;
  const diff = (endMin - startMin) / 60;

  // finds the classState in the currentPlanAtom and deletes using filter
  const deleteClass = () => {
    var newSched = currentPlan.schedule;
    for (let day in newSched) {
      if (newSched[day].classes.length !== 0) {
        var temp = newSched[day].classes.filter((c) => {
          return c !== classState;
        });
        newSched[day].classes = temp;
      }
    }
    setCurrentPlan({ ...currentPlan, schedule: newSched });
  };

  // dummy data
  // const classState = {
  //   subject: "CMSC 123",
  //   section: "X-1L",
  //   from: "11:00",
  //   to: "13:00",
  // };

  return (
    <div
      className="class-container"
      onMouseEnter={() => setShow("visible")}
      onMouseLeave={() => setShow("hidden")}
      style={{
        height: `calc(7.5% * ${diff} )`,
        top: `calc(3.8% + ${offset} * 7.6% )`,
        background: classState.color,
      }}
    >
      <div className="top-section">
        <div className="subject-text">{classState.subject}</div>
        <div>
          <button className="class-close-button" onClick={deleteClass}>
            <FontAwesomeIcon
              style={{
                visibility: show,
              }}
              icon={faTimes}
              className="class-close-icon"
              size="lg"
            />
          </button>
        </div>
      </div>
      <div className="data-text">{classState.section}</div>
      <div className="data-text">
        {classState.from} - {classState.to}
      </div>
    </div>
  );
};

export default Class;
