import React, { useState, useEffect } from "react";
import "../../styles/Class.css";

const Class = ({ classes, subject, section, start, end }) => {
  const [classCell, setClassCell] = useState([]);

  const data = {
    subject: "CMSC 123",
    section: "X-1L",
    from: 7,
    to: 10,
  };
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

  useEffect(() => {
    addClass("subject", "section", 1, 2);
  }, []);

  return (
    <div className="class-container">
      <div className="subject-text">{data.subject}</div>
      <div className="data-text">{data.section}</div>
    </div>
  );
};

const classCellStyle = {
  height: "7.5%",
};

export default Class;
