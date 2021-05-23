import { atom } from "jotai";

// flag for modal to open
export const editLabIsOpenAtom = atom(false);

// flags for enabling day
export const editLabIsDayEnabledAtom = atom({
  Monday: false,
  Tuesday: false,
  Wednesday: false,
  Thursday: false,
  Friday: false,
  Saturday: false,
});

export const editLabFormInputsAtom = atom({
  section: "",
  startTime: "",
  endTime: ""
});