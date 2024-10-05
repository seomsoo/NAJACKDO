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
    location,
    setLocation,
  } = useUserStore.getState();

  if (!userId || !nickname || !profileImage || !location) {
    const { data: userInfo } = useSuspenseQuery({
      queryKey: ["user", "info"],
      queryFn: getUserInfo,
    });

    setUserId(userInfo.userId);
    setNickname(userInfo.nickname);
    setProfileImage(userInfo.profileImage);
    setLocation(userInfo.locationName);
  }
  return <></>;
};
