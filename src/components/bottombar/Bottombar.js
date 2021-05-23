import React from "react";
import Tab from "./Tab";
import { useAtom } from "jotai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/Layout.css";
import { currentPlanAtom, plansAtom } from "../atom/plans";

const Bottombar = () => {
  const [plans, setPlans] = useAtom(plansAtom);
  const [currentPlan] = useAtom(currentPlanAtom);

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
        style={{width: "50px"}}
      >
        <FontAwesomeIcon icon={faPlus} size="xs" />
      </div>
      <div className="plans">
        {plans.map((plan, idx) => {
          return (
            <Tab key={idx} plan={plan} current={plan === currentPlan ? true : false} />
          );
        })}
      </div>
    </div>
  );
}

export default Bottombar;