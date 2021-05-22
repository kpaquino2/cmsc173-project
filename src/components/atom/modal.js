import { atom } from "jotai";

// flag for modal to open
export const isOpenAtom = atom(false);

// flags for enabling day
export const isDayEnabledAtom = atom({
  Sunday: false,
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
  startTime: null,
  endTime: null
});