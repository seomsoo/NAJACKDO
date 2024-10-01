import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserInfo } from "api/profileApi";
import { useUserStore } from "store/useUserStore";

const GetUserInfo = () => {
  const { data: userInfo } = useSuspenseQuery({
    queryKey: ["user", "info"],
    queryFn: getUserInfo,
  });

  const { setUserId, setNickname, setProfileImage, setCash } =
    useUserStore.getState();

  setUserId(userInfo.userId);
  setNickname(userInfo.nickname);
  setProfileImage(userInfo.profileImage);
  setCash(userInfo.cash);
  return <div></div>;
};

export default GetUserInfo;
