import BookcaseContainer from "page/library/components/BookcaseContainer";
import MannerTree from "page/profile/components/MannerTree";
import UserInfo from "page/profile/components/UserInfo";
import { useLocation } from "react-router-dom";

const OtherProfilePage = () => {
  const nickname: string = useLocation().pathname.split("/")[1];

  // const {
  //   data: profileInfo,
  //   isLoading,
  //   isError,
  // } = useQuery<IProfile>({
  //   queryKey: ["profile", "other"],
  //   queryFn: async () => await getOtherProfile(nickname),
  // });

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (profileInfo) {
  //   console.log("유저 정보", profileInfo);
  // }

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
      <p className="text-[32px] font-extrabold tracking-wider mb-6">프로필</p>
      {/* 유저 정보 */}
      <UserInfo
        userName={user.username}
        userLocation={user.userlocation}
        userImage={user.userImage}
        gradeImage="https://placehold.co/21x21"
      />

      {/* 신뢰 나무 */}
      <MannerTree />

      {/* 책장 */}
      <BookcaseContainer name={user.username} imageArray={user.bookCase} />
    </div>
  );
};

export default OtherProfilePage;
