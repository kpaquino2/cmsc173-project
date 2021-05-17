import React from "react";
import "../../styles/Layout.css";

const Bottombar = ({ plans, setPlans, currentPlan, setCurrentPlan }) => {
  return (
    <div className="bottombar">
      <div
        className="tab"
        onClick={() => {
          setPlans([...plans, {
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
          }]);
        }}
        style={{ width: "50px", color: "white", fontSize: "20px" }}
      >+</div>
      {plans.map((plan, idx) => {
        return (
          plan === currentPlan
          ? <div key={idx} className="tab" style={{ background: "#3e98e6", color: "white" }} onClick={() => setCurrentPlan(plan)}>{plan.name}</div>
          : <div key={idx} className="tab" onClick={() => setCurrentPlan(plan)}>{plan.name}</div>
        );
      })}
      
    </div>
  );
}

export default Bottombar;