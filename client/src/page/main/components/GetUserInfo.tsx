import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserInfo } from "api/profileApi";
import { useUserStore } from "store/useUserStore";

export const GetUserInfo = () => {
  const {
    userId,
    setUserId,
    nickname,
    setNickname,
    profileImage,
    setProfileImage,
  } = useUserStore.getState();

  if (!userId || !nickname || !profileImage) {
    const { data: userInfo } = useSuspenseQuery({
      queryKey: ["user", "info"],
      queryFn: getUserInfo,
    });

    setUserId(userInfo.userId);
    setNickname(userInfo.nickname);
    setProfileImage(userInfo.profileImage);
  }
  return <></>;
};
