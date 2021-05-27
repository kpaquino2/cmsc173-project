import React from "react";
import Tab from "./Tab";
import { useAtom } from "jotai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../../styles/Layout.css";

import { AboutUsModal } from "../layout/AboutUsModal";
import { currentPlanAtom, plansAtom } from "../atom/plans";
import { isOpenAtom } from "../atom/aboutusmodal";

const Bottombar = () => {
  const [plans, setPlans] = useAtom(plansAtom);
  const [currentPlan] = useAtom(currentPlanAtom);
  const [, setIsOpen] = useAtom(isOpenAtom);

  return (
    <div className="bottombar">
      <div
        className="tab"
        onClick={() => {
          setPlans([
            ...plans,
            {
              number: plans[plans.length - 1].number + 1,
              schedule: [
                {
                  name: "Monday",
                  classes: [],
                },
                {
                  name: "Tuesday",
                  classes: [],
                },
                {
                  name: "Wednesday",
                  classes: [],
                },
                {
                  name: "Thursday",
                  classes: [],
                },
                {
                  name: "Friday",
                  classes: [],
                },
                {
                  name: "Saturday",
                  classes: [],
                },
              ],
            },
          ]);
        }}
        style={{ width: "110px" }}
      >
        <FontAwesomeIcon icon={faPlus} size="xs" />
        <span style={{ padding: "0.5rem" }}>Add a Plan</span>
      </div>
      <div className="plans">
        {plans.map((plan, idx) => {
          return (
            <Tab
              key={idx}
              plan={plan}
              current={plan.number === currentPlan.number ? true : false}
            />
          );
        })}
      </div>
      <div className="about-us-area">
        <AboutUsModal />
        <button
          className="about-us-button tab tab-not-current"
          onClick={() => setIsOpen(true)}
        >
          About Us
        </button>
      </div>
    </div>
  );
};

export default Bottombar;
