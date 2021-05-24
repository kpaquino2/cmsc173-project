import React from "react";
import Sidebar from "./layout/Sidebar";
import Bottombar from "./bottombar/Bottombar";
import Main from "./layout/Main";
import "../styles/Layout.css"
import { DndContext } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { useAtom } from "jotai";
import { subjectsAtom } from "./atom/subjects";
import { currentPlanAtom } from "./atom/plans";
import { showInitialGuideAtom } from "./atom/initialguides";
import { isDraggingAtom } from "./atom/dragguide";

const handleDragEnd = (event, subjects, currentPlan, setCurrentPlan, setShowInitialGuide) => {
  if (event.active && event.over) {
    const {
      isConflicting,
      subject_index,
      lab_section,
      bgColor,
    } = event.active.data.current
    const subject = subjects[subject_index];
    const lab = subject.labSections[lab_section];
  
    if (isConflicting) return;
    var newClass = {
      subject: subject.name,
      section: subject.section,
      from: subject.startTime,
      to: subject.endTime,
      color: bgColor,
    };
  
    let newSched = [...currentPlan.schedule];
    Object.keys(subject.daysOccur).forEach((day, i) => {
      if (subject.daysOccur[day]) {
        newSched[i].classes = [...newSched[i].classes, newClass];
      }
    });
  
    if (lab) {
      var newLabClass = {
        subject: subject.name,
        section: subject.section + "-" + lab.labSec,
        from: lab.labStartTime,
        to: lab.labEndTime,
        color: bgColor,
      };
      Object.keys(lab.labDaysOccur).forEach((day, i) => {
        if (lab.labDaysOccur[day]) {
          newSched[i].classes = [...newSched[i].classes, newLabClass];
        }
      });
    }
  
    // Hide the user hint on the plan area.
    setShowInitialGuide(false);
  
    setCurrentPlan({ ...currentPlan, schedule: newSched });
  }

  return;
}

const Layout = () => {
  const [subjects, ] = useAtom(subjectsAtom);
  const [currentPlan, setCurrentPlan] = useAtom(currentPlanAtom);
  const [, setShowInitialGuide] = useAtom(showInitialGuideAtom);
  const [, setIsDragging] = useAtom(isDraggingAtom);

  return (
    <div className="outside-container">
      <DndContext modifiers={{restrictToWindowEdges}} onDragStart={() => setIsDragging(true)} onDragCancel={() => setIsDragging(false)} onDragEnd=
        {
          (e) => { 
            setIsDragging(false);
            handleDragEnd(e, subjects, currentPlan, setCurrentPlan, setShowInitialGuide)
          }
        }
      >
        <Sidebar />
        <div className="schedule-panel">
          <Main />
          <Bottombar />
        </div>
      </DndContext>
    </div>
  )
}

export default Layout;