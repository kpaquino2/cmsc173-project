import { atom } from "jotai";

// flag for modal to open
export const isLabAtom = atom(false);

// flag for modal type
export const editLabAtom = atom(-1);

// flags for enabling day
export const isDayEnabledAtom = atom({
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