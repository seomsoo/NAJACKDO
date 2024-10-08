import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserInfo } from "api/profileApi";
import { IProfile } from "atoms/Profile.type";
import MannerTree from "page/profile/components/MannerTree";
import UserInfo from "page/profile/components/UserInfo";
import { Fragment } from "react/jsx-runtime";

const UserProfile = () => {
  const { data: profileInfo } = useSuspenseQuery<IProfile>({
    queryKey: ["profile"],
    queryFn: async () => await getUserInfo(),
  });

  return (
    <Fragment>
      {/* 유저 정보 */}
      <UserInfo
        userName={profileInfo.nickname}
        userLocation={profileInfo.locationName}
        userImage={profileInfo.profileImage}
        mannerScore={profileInfo.mannerScore}
      />
      {/* 신뢰 나무 */}
      <MannerTree
        nickname={profileInfo.nickname}
        mannerScore={profileInfo.mannerScore}
        goodReviewInfo={profileInfo.goodReviewInfo}
        badReviewInfo={profileInfo.badReviewInfo}
      />
    </Fragment>
  );
};

export default UserProfile;
