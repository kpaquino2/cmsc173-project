import React from "react";
import Sidebar from "./layout/Sidebar";
import Bottombar from "./bottombar/Bottombar";
import Main from "./layout/Main";
import "../styles/Layout.css"
import { DndContext } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

const handleDragEnd = (event) => {
  return;
}

const Layout = () => {
  return (
    <div className="outside-container">
      <DndContext modifiers={{restrictToWindowEdges}} onDragEnd={handleDragEnd}>
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