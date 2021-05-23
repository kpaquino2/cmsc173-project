import React from "react";
import { useAtom } from "jotai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/Layout.css";
import { currentPlanAtom, plansAtom } from "../atom/plans";

const Tab = ({ plan, current }) => {
  const [plans, setPlans] = useAtom(plansAtom);
  const [currentPlan, setCurrentPlan] = useAtom(currentPlanAtom);

  return(
    <div className={`tab ${current ? "tab-current" : "tab-not-current"}`} onClick={() => setCurrentPlan(plan)}>
      <div>
        Plan {plan.number}
      </div>
      <div className="delete-tab" onClick={(e) => {
        e.stopPropagation();
        if (plans.length === 1) return;
        var newPlans = plans.filter((cplan) => { return cplan.number !== plan.number })
        setPlans(newPlans);
        if (plan.number === currentPlan.number) setCurrentPlan(plans[(plans.indexOf(plan)+1)%plans.length]);
      }}>
        <FontAwesomeIcon icon={faTimes} size="sm" />
      </div>
    </div>
  );
}

export default Tab;