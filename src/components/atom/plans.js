import { atom } from "jotai";

export const plansAtom = atom([
  {
    number: 1,
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
    ]
  },
]);

export const currentPlanAtom = atom(plansAtom.init[0]);