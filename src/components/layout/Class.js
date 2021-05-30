import React from "react";
import "../../styles/Class.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useAtom } from "jotai";
import { currentPlanAtom } from "../atom/plans";

const Class = ({ classState, isPreview = false }) => {
  const [currentPlan, setCurrentPlan] = useAtom(currentPlanAtom);

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
          return (
            c.subject !== classState.subject ||
            c.section.split("-")[0] !== classState.section.split("-")[0]
          );
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
      style={{
        height: isPreview ? `calc(8% * ${diff} )` : `calc(7.5% * ${diff} )`,
        top: isPreview
          ? `calc(3.8% + ${offset} * 8.02% )`
          : `calc(3.8% + ${offset} * 7.6% )`,
        background: classState.color,
        opacity: isPreview ? "0.5" : "1",
      }}
    >
      <div className="top-section">
        <div className="subject-text">{classState.subject}</div>
        <div>
          {!isPreview && (
            <button className="class-close-button" onClick={deleteClass}>
              <FontAwesomeIcon
                icon={faTimes}
                className="class-close-icon"
                size="lg"
              />
            </button>
          )}
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
