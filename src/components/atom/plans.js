import { atom } from "jotai";

export const plansAtom = atom([
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

export const currentPlanAtom = atom(plansAtom.init[0]);