import { create } from "zustand";

interface ValidState {
  isSurvey: boolean;
  isLocation: boolean;
  setIsSurvey: (isSurvey: boolean) => void;
  setIsLocation: (isLocation: boolean) => void;
}

interface IsValidState {
  isValid: boolean;
  setIsValid: (isValid: boolean) => void;
}

export const useValidStore = create<ValidState>((set) => ({
  isSurvey: false,
  isLocation: false,
  setIsSurvey: (isSurvey) => {
    set({ isSurvey });
  },
  setIsLocation: (isLocation) => {
    set({ isLocation });
  },
}));

export const useIsValidStore = create<IsValidState>((set) => ({
  isValid: false,
  setIsValid: (isValid) => {
    set({ isValid });
  },
}));
