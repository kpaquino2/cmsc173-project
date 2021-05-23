import React, { useState, useEffect } from "react";
import "../../styles/Class.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useAtom } from "jotai";

const Class = ({ classState }) => {
  const [classes, setClasses] = useState([]);
  const [classCell, setClassCell] = useState([]);
  const [diff, setDiff] = useState([3]);
  const [offset, setOffSet] = useState([1]);
  const [show, setShow] = useState(false);
  const [view, setView] = useState(true);

  // const deleteClass = () => {
  //   const newClasses = ["a", "b"];
  //   newClasses.splice(index, 1);
  //   setClasses(newClasses);
  // };

  // dummy data
  // const classState = {
  //   subject: "CMSC 123",
  //   section: "X-1L",
  //   from: "11:00",
  //   to: "13:00",
  //   days: [""],
  // };

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

  // determines the vertical position of the cell
  const offsetDiff = () => {
    setOffSet((startMin - 420) / 60);
  };

  // determines the size of the cell
  const timeDiff = () => {
    setDiff((endMin - startMin) / 60);
  };

  useEffect(() => {
    addClass();
    timeDiff();
    offsetDiff();
  }, []);

  const addClass = () => {
    setClassCell([
      ...classCell,
      {
        subject: classState.subject,
        section: classState.section,
        from: classState.from,
        to: classState.to,
      },
    ]);
  };

  return (
    <div
      className="class-container"
      onMouseEnter={() => setShow(!show)}
      onMouseLeave={() => setShow(!show)}
      style={{
        height: `calc(7.5% * ${diff} )`,
        top: `calc(3.8% + ${offset} * 7.6% )`,
      }}>
      <div className="top-section">
        <div className="subject-text">{classState.subject}</div>
        <div>
          {show && (
            <button className="close-button">
              <FontAwesomeIcon
                icon={faTimes}
                className="close-icon"
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
