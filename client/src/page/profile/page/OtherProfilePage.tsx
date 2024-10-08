import { useQuery } from "@tanstack/react-query";
import { getOtherBookCase } from "api/bookcaseApi";
import { getOtherProfile } from "api/profileApi";
import { IBookCase } from "atoms/BookCase.type";
import { IProfile } from "atoms/Profile.type";
import Error from "components/common/Error";
import Loading from "components/common/Loading";
import BookcaseContainer from "page/library/components/BookcaseContainer";
import MannerTree from "page/profile/components/MannerTree";
import UserInfo from "page/profile/components/UserInfo";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useUserStore } from "store/useUserStore";

const OtherProfilePage = () => {
  const { nickname } = useParams();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  // 로그인된 사용자 정보 가져오기
  const loggedInUserNickname = useUserStore.getState().nickname;

  // 다른 사용자의 프로필 정보 가져오기
  const {
    data: profileInfo,
    isLoading: isOtherProfileLoading,
    isError: isOtherProfileError,
  } = useQuery<IProfile>({
    queryKey: ["profile", nickname],
    queryFn: () => getOtherProfile(nickname!),
  });

  // 다른 사용자의 책장 정보 가져오기
  const {
    data: bookcaseInfo,
    isLoading: isBookcaseLoading,
    isError: isBookcaseError,
  } = useQuery<IBookCase>({
    queryKey: ["otherBookCase", profileInfo?.userId],
    queryFn: () => getOtherBookCase(profileInfo?.userId!),
    enabled: !!profileInfo?.userId, // profileInfo.userId가 있을 때만 요청 실행
  });

  if (isOtherProfileLoading || isBookcaseLoading) {
    return <Loading />;
  }

  if (isOtherProfileError || isBookcaseError) {
    return <Error />;
  }

  // 로그인된 유저와 프로필의 유저가 동일하면 나의 프로필로 리다이렉트
  if (loggedInUserNickname === profileInfo?.nickname) {
    navigate("/profile");
    return null;
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
      <div className="flex items-center gap-2 mb-6">
        <button onClick={goBack} className="text-2xl">
          <IoIosArrowBack />
        </button>
        <p className="text-[32px] font-extrabold tracking-wider ">프로필</p>
      </div>
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
      {/* 타인 책장 정보 */}
      <BookcaseContainer
        userId={bookcaseInfo.userId}
        name={bookcaseInfo.nickname}
        imageArray={bookcaseInfo.displayBooks.map((book) => book.cover)}
        isFollowed={bookcaseInfo.follow}
      />
    </div>
  );
};

export default OtherProfilePage;
