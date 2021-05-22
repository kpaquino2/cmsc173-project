import React from "react";
import Sidebar from "./layout/Sidebar";
import Bottombar from "./bottombar/Bottombar";
import Main from "./layout/Main";
import "../styles/Layout.css"

const Layout = () => {
  return (
    <div>
      <Sidebar />
      <Main />
      <Bottombar />
    </div>
  )
}

export default Layout;