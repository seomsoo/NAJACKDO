import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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

export const useValidStore = create(
  persist<ValidState>(
    (set) => ({
      isSurvey: false,
      isLocation: false,
      setIsSurvey: (isSurvey) => {
        set({ isSurvey });
      },
      setIsLocation: (isLocation) => {
        set({ isLocation });
      },
    }),
    {
      name: "valid-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useIsValidStore = create(
  persist<IsValidState>(
    (set) => ({
      isValid: false,
      setIsValid: (isValid) => {
        set({ isValid });
      },
    }),
    {
      name: "is-valid-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
