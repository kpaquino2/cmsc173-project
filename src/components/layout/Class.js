import React, { useState, useEffect } from "react";
import "../../styles/Class.css";
import moment from "moment";

const Class = ({ classes, subject, section, start, end }) => {
  const [classCell, setClassCell] = useState([]);
  const [diff, setDiff] = useState([3]);
  const [offset, setOffSet] = useState([1]);

  const data = {
    subject: "CMSC 123",
    section: "X-1L",
    from: "11:00",
    to: "13:00",
  };

  const startMin =
    parseInt(data.from.split(":")[0]) * 60 + parseInt(data.from.split(":")[1]);

  const endMin =
    parseInt(data.to.split(":")[0]) * 60 + parseInt(data.to.split(":")[1]);

  const offsetDiff = () => {
    setOffSet((startMin - 420) / 60);
  };

  const timeDiff = () => {
    setDiff((endMin - startMin) / 60);
  };

  useEffect(() => {
    timeDiff();
    offsetDiff();
  }, []);

  const addClass = (subject, section, start, end) => {
    setClassCell([
      ...classCell,
      {
        subject: subject,
        section: section,
        from: start,
        to: end,
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
      <div className="subject-text">{data.subject}</div>
      <div className="data-text">{data.section}</div>
    </div>
  );
};

export default Class;
