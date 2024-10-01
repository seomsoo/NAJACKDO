import { getUserInfo } from "api/profileApi";
import { IProfile } from "atoms/Profile.type";
import LogoutButton from "page/profile/components/LogoutButton";
import MannerTree from "page/profile/components/MannerTree";
import MyLeaf from "page/profile/components/MyLeaf";
import { useQuery } from "@tanstack/react-query";
import UserInfo from "../components/UserInfo";

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
    return <div>Loading...</div>;
  }
  if (isError) return <div>오류가 발생했습니다.</div>;

  if (profileInfo) {
    console.log("유저 정보", profileInfo);
  }


  const goodReviewCount = profileInfo?.goodReviewInfo.reduce((sum, review) => sum + review.count, 0);
  const badReviewCount = profileInfo?.goodReviewInfo.reduce((sum, review) => sum + review.count, 0);

  

  return (
    <div className="mx-6 my-4">
      {/* 유저 정보 */}
      <p className="text-3xl font-extrabold tracking-wider mb-10">프로필</p>
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
        goodReviewCount={goodReviewCount}
        badReviewCount={badReviewCount}
      />

      {/* 나의 책잎 */}
      <MyLeaf />

      {/* 로그아웃 버튼 */}
      <LogoutButton />
    </div>
  );
};

export default ProfilePage;
