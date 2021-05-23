import { atom } from "jotai";

// flag for modal to open
export const isLabOpenAtom = atom(false);

// flag for modal type (0 add, 1 edit), subject index, lab index
export const editLabAtom = atom([0, 0, 0]);

// flags for enabling day
export const isDayEnabledLabAtom = atom({
  Monday: false,
  Tuesday: false,
  Wednesday: false,
  Thursday: false,
  Friday: false,
  Saturday: false,
});

export const formInputsAtom = atom({
  section: "",
  startTime: "",
  endTime: ""
});