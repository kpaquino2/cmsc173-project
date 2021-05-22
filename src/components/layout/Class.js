import React, { useState, useEffect } from "react";
import "../../styles/Class.css";

const Class = ({ classState }) => {
  const [classCell, setClassCell] = useState([]);
  const [diff, setDiff] = useState([3]);
  const [offset, setOffSet] = useState([1]);

  // dummy data
  // const classState = {
  //   subject: "CMSC 123",
  //   section: "X-1L",
  //   from: "11:00",
  //   to: "13:00",
  //   days: [""],
  // };

  const startMin =
    parseInt(classState.from.split(":")[0]) * 60 +
    parseInt(classState.from.split(":")[1]);

  const endMin =
    parseInt(classState.to.split(":")[0]) * 60 +
    parseInt(classState.to.split(":")[1]);

  const offsetDiff = () => {
    setOffSet((startMin - 420) / 60);
  };

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
      style={{
        height: `calc(7.5% * ${diff} )`,
        top: `calc(3.8% + ${offset} * 7.8% )`,
      }}>
      <div className="subject-text">{classState.subject}</div>
      <div className="data-text">{classState.section}</div>
    </div>
  );
};

export default Class;
