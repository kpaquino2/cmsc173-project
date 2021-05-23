import { atom } from "jotai";

// flag for modal to open
export const isSubjectOpenAtom = atom(false);

// flag for modal type
export const editAtom = atom(-1);

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
  subject: "",
  section: "",
  startTime: "",
  endTime: ""
});