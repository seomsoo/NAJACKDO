import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserInfo } from "api/profileApi";
import { useUserStore } from "store/useUserStore";

export const GetUserInfo = () => {
  const { userId, setUserId, nickname, setNickname, profileImage, setProfileImage, cash, setCash } =
    useUserStore.getState();

  if (!userId || !nickname || !profileImage || !cash) {
    const { data: userInfo } = useSuspenseQuery({
      queryKey: ["user", "info"],
      queryFn: getUserInfo,
    });

    setUserId(userInfo.userId);
    setNickname(userInfo.nickname);
    setProfileImage(userInfo.profileImage);
    setCash(userInfo.cash);
  }
  return <></>;
};
