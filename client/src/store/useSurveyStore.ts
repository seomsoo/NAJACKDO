import { create } from 'zustand';

interface SurveyState {
  age: string | null;
  gender: string | null;
  nickname: string;
  interests: string[];
  consentAccepted: boolean;
  setAge: (age: string) => void;
  setGender: (gender: string) => void;
  setNickname: (nickname: string) => void;
  setInterests: (interests: string[]) => void;
  setConsentAccepted: (accepted: boolean) => void;
}

const useSurveyStore = create<SurveyState>((set) => ({
  age: null,
  gender: null,
  nickname: '',
  interests: [],
  consentAccepted: false,
  setAge: (age) => set({ age }),
  setGender: (gender) => set({ gender }),
  setNickname: (nickname) => set({ nickname }),
  setInterests: (interests) => set({ interests }),
  setConsentAccepted: (accepted) => set({ consentAccepted: accepted }),
}));

export default useSurveyStore;
