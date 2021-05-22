import React from "react";
import Tab from "./Tab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/Layout.css";

const Bottombar = ({ plans, setPlans, currentPlan, setCurrentPlan }) => {
  return (
    <div className="bottombar">
      <div
        className="tab"
        onClick={() => {
          setPlans([...plans, {
            number: plans[plans.length-1].number+1,
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
          }]);
        }}
        style={{ width: "50px", color: "white", fontSize: "20px" }}
      >
        <FontAwesomeIcon icon={faPlus} size="xs" />
      </div>
      {plans.map((plan, idx) => {
        return (
          plan === currentPlan
          ? <Tab key={idx} plan={plan} currentPlan={currentPlan} setCurrentPlan={setCurrentPlan} plans={plans} setPlans={setPlans} current={true} />
          : <Tab key={idx} plan={plan} currentPlan={currentPlan} setCurrentPlan={setCurrentPlan} plans={plans} setPlans={setPlans} />
        );
      })}
      
    </div>
  );
}

export default Bottombar;