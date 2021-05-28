import React from "react";
import ReactDOM from "react-dom";
import "../../styles/Subject.css";
import Class from "./Class";

export const SubjectPreview = ({
  currentPlan,
  subject,
  bgColor,
  lab_index = null,
}) => {
  return ReactDOM.createPortal(
    <div className="preview-block">
      <div className="preview-time-column">
        <div className="preview-column-header"></div>
        <div className="time"></div>
        <div className="time"></div>
        <div className="time"></div>
        <div className="time"></div>
        <div className="time"></div>
        <div className="time"></div>
        <div className="time"></div>
        <div className="time"></div>
        <div className="time"></div>
        <div className="time"></div>
        <div className="time"></div>
        <div className="time"></div>
      </div>
      {currentPlan.schedule.map((day, idx) => (
        <div key={idx} className="preview-column">
          <div className="preview-column-header"></div>

          {subject.daysOccur[day.name] && (
            <Class
              classState={{
                subject: subject.name,
                section: subject.section,
                from: subject.startTime,
                to: subject.endTime,
                color: bgColor,
              }}
              isPreview={true}
            />
          )}
          {subject.labSections &&
            subject.labSections[lab_index] &&
            subject.labSections[lab_index].labDaysOccur[day.name] && (
              <Class
                classState={{
                  subject: subject.name,
                  section: subject.section,
                  from: subject.labSections[lab_index].labStartTime,
                  to: subject.labSections[lab_index].labEndTime,
                  color: bgColor,
                }}
                isPreview={true}
              />
            )}
        </div>
      ))}
    </div>,
    document.body
  );
};
