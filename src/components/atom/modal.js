import { atom } from "jotai";

// flag for modal to open
export const isOpenAtom = atom(false);

// flags for enabling day
export const isDayEnabledAtom = atom({
  sunday: false,
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
});

export const formInputsAtom = atom({
  subject: "",
  section: "",
  startTime: null,
  endTime: null
});