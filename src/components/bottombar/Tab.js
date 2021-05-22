import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/Layout.css";

const Tab = ({ current, plan, currentPlan, setCurrentPlan, plans, setPlans }) => {
  const currentStyle = current ? { background: "#03768e", color: "white" } : {};
  return(
    <div className="tab" style={currentStyle} onClick={() => setCurrentPlan(plan)}>
      <div>
        Plan {plan.number}
      </div>
      <div className="delete-tab" onClick={(e) => {
        e.stopPropagation();
        if (plans.length === 1) return;
        var newPlans = plans.filter((cplan) => { return cplan.number !== plan.number })
        setPlans(newPlans);
        if (plan === currentPlan) setCurrentPlan(plans[(plans.indexOf(plan)+1)%plans.length]);
      }}>
        <FontAwesomeIcon icon={faTimes} size="sm" />
      </div>
    </div>
  );
}

export default Tab;