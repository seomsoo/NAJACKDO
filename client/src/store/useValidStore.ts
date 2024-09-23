import { create } from "zustand";

interface ValidState {
  isLogin: boolean;
  isSurvey: boolean;
  isLocation: boolean;
  setIsLogin: (isLogin: boolean) => void;
  setIsSurvey: (isSurvey: boolean) => void;
  setIsLocation: (isLocation: boolean) => void;
}

interface IsValidState {
  isValid: boolean;
  setIsValid: (isValid: boolean) => void;
}

export const useValidStore = create<ValidState>((set) => ({
  isLogin: false,
  isSurvey: false,
  isLocation: false,
  setIsLogin: (isLogin) => {
    set({ isLogin });
  },
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
