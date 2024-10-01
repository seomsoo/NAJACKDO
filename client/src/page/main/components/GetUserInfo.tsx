import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserInfo } from "api/profileApi";
import { useUserStore } from "store/useUserStore";

export const GetUserInfo = () => {
  const { setUserId, setNickname, setProfileImage, setCash } = useUserStore.getState();

  if (!setUserId || !setNickname || !setProfileImage || !setCash) {
    console.log("GetUserInfo");

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
