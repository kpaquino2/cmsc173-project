import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/Layout.css";

const Tab = ({ current, plan, currentPlan, setCurrentPlan, plans, setPlans }) => {
  const currentStyle = current ? { background: "#3e98e6", color: "white" } : {};
  return(
    <div className="tab" style={currentStyle} onClick={() => setCurrentPlan(plan)}>
      <div>
        Plan {plan.number}
      </div>
      <div className="delete-tab" onClick={(e) => {
        e.stopPropagation();
        if (plans.length === 1) return;
        var newPlans = plans.filter((cplan) => { return cplan.number !== plan.number })
        if (plan === currentPlan) setCurrentPlan(plans[plans.length-1]);
        setPlans(newPlans);
      }}>
        <FontAwesomeIcon icon={faTimes} size="sm" />
      </div>
    </div>
  );
}

export default Tab;