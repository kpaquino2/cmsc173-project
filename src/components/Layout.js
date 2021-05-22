import React, { useState } from "react";
import Sidebar from "./layout/Sidebar";
import Bottombar from "./layout/Bottombar";
import Main from "./layout/Main";
import "../styles/Layout.css"

const Layout = () => {
  const [plans, setPlans] = useState([
    {
      name: "Plan A",
      schedule: [
        {
          name: "Sunday"
        },
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
    <div>
      <Sidebar />
      <Main currentPlan={currentPlan} />
      <Bottombar plans={plans} setPlans={setPlans} currentPlan={currentPlan} setCurrentPlan={setCurrentPlan} />
    </div>
  )
}

export default Layout;