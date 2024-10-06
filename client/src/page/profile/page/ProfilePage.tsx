import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "api/profileApi";
import { IProfile } from "atoms/Profile.type";
import Loading from "components/common/Loading";
import LogoutButton from "page/profile/components/LogoutButton";
import MannerTree from "page/profile/components/MannerTree";
import MyLeaf from "page/profile/components/MyLeaf";
import { useEffect } from "react";
import UserInfo from "../components/UserInfo";
import Error from "components/common/Error";

const ProfilePage = () => {
  const {
    data: profileInfo,
    isLoading,
    isError,
  } = useQuery<IProfile>({
    queryKey: ["profile"],
    queryFn: async () => await getUserInfo(),
  });

  if (isLoading) {
    return <Loading />;
  }
  if (isError) return <Error />;

  if (profileInfo) {
    console.log("유저 정보", profileInfo);
  }

  const goodReviewCount = profileInfo?.goodReviewInfo.reduce(
    (sum, review) => sum + review.count,
    0
  );

  const badReviewCount = profileInfo?.badReviewInfo.reduce(
    (sum, review) => sum + review.count,
    0
  );
  
  return (
    <div className="mx-6 my-4">
      {/* 유저 정보 */}
      <p className="font-extrabold text-2xl tracking-wider mb-10">프로필</p>
      <UserInfo
        userName={profileInfo.nickname}
        userLocation={profileInfo.locationName}
        userImage={profileInfo.profileImage}
        mannerScore={profileInfo.mannerScore} // mannerScore 전달
      />
      {/* 신뢰 나무 */}
      <MannerTree
        nickname={profileInfo.nickname}
        mannerScore={profileInfo.mannerScore}
        goodReviewInfo={profileInfo.goodReviewInfo}
        badReviewInfo={profileInfo.badReviewInfo}
      />

      {/* 나의 책잎 */}
      <MyLeaf />

      {/* 로그아웃 버튼 */}
      <LogoutButton />
    </div>
  );
};

export default ProfilePage;
