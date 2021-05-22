import React, { useState } from "react";
import Sidebar from "./layout/Sidebar";
import Bottombar from "./bottombar/Bottombar";
import Main from "./layout/Main";
import "../styles/Layout.css"

const Layout = () => {
  const [plans, setPlans] = useState([
    {
      number: 1,
      schedule: [
        {
          name: "Monday"
        },
        {
          name: "Tuesday"
        },
        {
          name: "Wednesday"
        },
        {
          name: "Thursday"
        },
        {
          name: "Friday"
        },
        {
          name: "Saturday"
        },
      ]
    },
  ]);

  const [currentPlan, setCurrentPlan] = useState(plans[0]);

  return (
    <div className="outside-container">
      <Sidebar />
      <div className="schedule-panel">
        <Main currentPlan={currentPlan} />
        <Bottombar plans={plans} setPlans={setPlans} currentPlan={currentPlan} setCurrentPlan={setCurrentPlan} />
      </div>
    </div>
  )
}

export default Layout;