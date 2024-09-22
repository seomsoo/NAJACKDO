import { create } from "zustand";

interface SurveyState {
  age: string | null;
  gender: string | null;
  nickname: string;
  avaliableNickname: boolean | null;
  interests: number[];
  consentAccepted: boolean;
  setAge: (age: string) => void;
  setGender: (gender: string) => void;
  setNickname: (nickname: string) => void;
  setAvaliableNickname: (avaliableNickname: boolean | null) => void;
  setInterests: (interests: number[]) => void;
  setConsentAccepted: (accepted: boolean) => void;
}

const useSurveyStore = create<SurveyState>((set) => ({
  age: null,
  gender: null,
  nickname: "",
  avaliableNickname: null,
  interests: [],
  consentAccepted: false,
  setAge: (age) => set({ age }),
  setGender: (gender) => set({ gender }),
  setNickname: (nickname) => set({ nickname }),
  setAvaliableNickname: (avaliableNickname) => set({ avaliableNickname }),
  setInterests: (interests) => set({ interests }),
  setConsentAccepted: (accepted) => set({ consentAccepted: accepted }),
}));

export default useSurveyStore;
