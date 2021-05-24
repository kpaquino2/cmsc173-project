import React from "react";
import { useAtom } from "jotai";
import { currentPlanAtom } from "../atom/plans";
import { showInitialGuideAtom } from "../atom/initialguides";
import "../../styles/Layout.css";
import Class from "./Class.js";

// Drag-and-drop functionality
import { useDroppable } from "@dnd-kit/core";
import { isDraggingAtom } from "../atom/dragguide";

const Main = () => {
  const [currentPlan] = useAtom(currentPlanAtom);
  const [showInitialGuide] = useAtom(showInitialGuideAtom);
  const [isDragging] = useAtom(isDraggingAtom);

  const { isOver, setNodeRef } = useDroppable({
    id: "main_table",
  });

  return (
    <div
      className="main"
      ref={setNodeRef}
      style={{ outline: isOver ? "#16b92e 2px solid" : "" }}
    >
      <div
        className={`main-drag-guide ${
          isDragging && !isOver ? "main-drag-guide-enabled" : ""
        }`}
      >
        Drag the schedule here to add it to your plan.
      </div>
      <div className="time-column">
        <div className="column-header">Time</div>
        <div className="time">7:00 - 8:00</div>
        <div className="time">8:00 - 9:00</div>
        <div className="time">9:00 - 10:00</div>
        <div className="time">10:00 - 11:00</div>
        <div className="time">11:00 - 12:00</div>
        <div className="time">12:00 - 13:00</div>
        <div className="time">13:00 - 14:00</div>
        <div className="time">14:00 - 15:00</div>
        <div className="time">15:00 - 16:00</div>
        <div className="time">16:00 - 17:00</div>
        <div className="time">17:00 - 18:00</div>
        <div className="time">18:00 - 19:00</div>
      </div>
      {currentPlan.schedule.map((day, idx) => (
        <div key={idx} className="column">
          <div className="column-header">{day.name}</div>

          {day.classes.map((classState, i) => {
            return <Class classState={classState} key={i} />;
          })}
        </div>
      ))}
      {showInitialGuide && (
        <div className="initial-plan-reminder">
          You don't have classes on this Plan yet. <br />
          Click or drag a lecture section or lab section on your subjects list
          to add it to this Plan.
        </div>
      )}
    </div>
  );
};

export default Main;
