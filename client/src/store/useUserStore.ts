import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserInfoState {
  userId?: number;
  nickname?: string;
  profileImage?: string;
  cash?: number;
  setUserId: (userId: number) => void;
  setNickname: (nickname: string) => void;
  setProfileImage: (profileImage: string) => void;
  setCash: (cash: number) => void;
}

export const useUserStore = create(
  persist<UserInfoState>(
    (set) => ({
      userId: null,
      nickname: null,
      profileImage: null,
      cash: 0,
      setUserId: (userId) => set({ userId }),
      setNickname: (nickname) => set({ nickname }),
      setProfileImage: (profileImage) => set({ profileImage }),
      setCash: (cash) => set({ cash }),
    }),
    {
      name: "userInfo-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
