import React from "react";
import Sidebar from "./layout/Sidebar";
import Bottombar from "./bottombar/Bottombar";
import Main from "./layout/Main";
import "../styles/Layout.css"

const Layout = () => {
  return (
    <div className="outside-container">
      <Sidebar />
      <div className="schedule-panel">
        <Main />
        <Bottombar />
      </div>
    </div>
  )
}

export default Layout;