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

  if (profileInfo) {
    console.log("유저 정보", profileInfo);
  }

  const user = {
    username: "서민수",
    userlocation: "수완동",
    userImage: "https://placehold.co/68x68",
    myLeaf: 12000,
    isMine: false,
    bookCase: [
      "https://placehold.co/71x104",
      "https://placehold.co/71x104",
      "https://placehold.co/71x104",
      "https://placehold.co/71x104",
      "https://placehold.co/71x104",
      "https://placehold.co/71x104",
    ],
  };

  return (
    <div className="mx-[25px] mt-6">
      {/* 유저 정보 */}
      <p className="text-[32px] font-extrabold tracking-wider mb-6">프로필</p>
      <UserInfo
        userName={user.username}
        userLocation={user.userlocation}
        userImage={user.userImage}
        gradeImage="https://placehold.co/21x21"
      />
      {/* 신뢰 나무 */}
      <MannerTree />

      {/* 나의 책잎 */}
      <MyLeaf leaf={user.myLeaf} />
      <LogoutButton />
    </div>
  );
};

export default ProfilePage;
