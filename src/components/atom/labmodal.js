import { atom } from "jotai";

// flag for modal to open
export const isOpenAtom = atom(false);

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