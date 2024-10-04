import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserInfoState {
  userId?: number;
  nickname?: string;
  profileImage?: string;
  location?: string;
  setUserId: (userId: number) => void;
  setNickname: (nickname: string) => void;
  setProfileImage: (profileImage: string) => void;
  setLocation: (location: string) => void;
}

export const useUserStore = create(
  persist<UserInfoState>(
    (set) => ({
      userId: null,
      nickname: null,
      profileImage: null,
      location: null,
      setUserId: (userId) => set({ userId }),
      setNickname: (nickname) => set({ nickname }),
      setProfileImage: (profileImage) => set({ profileImage }),
      setLocation: (location) => set({ location }),
    }),
    {
      name: "userInfo-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
