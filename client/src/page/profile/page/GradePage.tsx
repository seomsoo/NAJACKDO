import { useQuery } from '@tanstack/react-query';
import { getOtherProfile } from 'api/profileApi';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import Review from '../components/Review';
import Loading from 'components/common/Loading';

const GradePage = () => {
  const { nickname } = useParams();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };


  /*
   const {
    data: profileInfo,
    isLoading: isOtherProfileLoading,
    isError: isOtherProfileError,
  } = useQuery({
    queryKey: ['profile', nickname],
    queryFn: () => getOtherProfile(nickname),
  });

  if (isOtherProfileLoading) {
    return <Loading />;
  }

  if (isOtherProfileError) {
    return <div>오류가 발생했습니다.</div>;
  }

  const hasReview =
  profileInfo?.goodReviewInfo.length > 0 ||
  profileInfo?.badReviewInfo.length > 0;
  const hasGoodReview = profileInfo?.goodReviewInfo.length > 0;
  const hasBadReview = profileInfo?.badReviewInfo.length > 0;



  return (
    <div>
      <p className="font-bold mt-10 mb-3">받은 판매자 리뷰</p>
      {hasReview ? null : <p>리뷰가 없습니다.</p>}
      <div>
        {hasGoodReview ? (
          profileInfo?.goodReviewInfo.map((review, index) => {
            return (
              <div
                className="bg-[green]/10 flex flex-row items-center rounded-lg mx-1 my-3 p-2"
                key={index}
              >
                <TbMessage size={20} className="mr-2" />
                {review.content}
              </div>
            );
          })
        ) : null}
      </div>
      <div>
        {hasBadReview ? (
          profileInfo?.badReviewInfo.map((review, index) => {
            return (
              <div
                className="bg-[red]/5 flex flex-row items-center rounded-lg mx-1 my-3 p-2"
                key={index}
              >
                <TbMessage size={20} className="mr-2" />
                {review.content}
              </div>
            );
          })
        ) : null}
      </div>
    </div>
  );
  */
  const {
    data: profileInfo,
    isLoading: isOtherProfileLoading,
    isError: isOtherProfileError,
  } = useQuery({
    queryKey: ['profile', nickname],
    queryFn: () => getOtherProfile(nickname || ''),
    enabled: !!nickname,
  });

  if (isOtherProfileLoading) {
    return <Loading />;
  }

  if (isOtherProfileError) {
    return <div>오류가 발생했습니다.</div>;
  }


  const hasReview =
  profileInfo?.goodReviewInfo.length > 0 ||
  profileInfo?.badReviewInfo.length > 0;

  const hasGoodReview = profileInfo?.goodReviewInfo.length > 0;
  const hasBadReview = profileInfo?.badReviewInfo.length > 0;


  let gradeImage = '/images/mannertree/씨앗.png';
  let gradeLevel = 'Lv.1 나작씨앗';
  if (profileInfo.mannerScore >= 80) {
    gradeImage = '/images/mannertree/숲.png';
    gradeLevel = 'Lv.5 나작숲';
  } else if (profileInfo.mannerScore >= 60) {
    gradeImage = '/images/mannertree/나무.png';
    gradeLevel = 'Lv.4 나작나무';
  } else if (profileInfo.mannerScore >= 40) {
    gradeImage = '/images/mannertree/가지.png';
    gradeLevel = 'Lv.3 나작가지';
  } else if (profileInfo.mannerScore >= 20) {
    gradeImage = '/images/mannertree/새싹.png';
    gradeLevel = 'Lv.1 나작씨앗';
  }


  return (
    <div className="p-6 ">
      <button onClick={goBack}>
        <IoIosArrowBack className="text-2xl" />
      </button>
      <div className="flex text-xl  items-center font-bold justify-between">
        <div className="flex flex-row justify-start my-5">
          <p>{profileInfo.nickname}님의&nbsp;</p>
          <p className=" font-semibold text-sub8">신뢰 나무</p>
        </div>
        <span className=" text-[#508d1e]">{profileInfo.mannerScore} 점</span>
      </div>

      {/* 신뢰 나무 */}
      <div className="mt-7 flex justify-center">
        <div className="w-44 h-44 rounded-full animate-glow bg-sub5/30 flex items-center justify-center">
          <img src={gradeImage} alt="grade-bg" />
        </div>
      </div>
      <p className="my-3 text-center text-xl font-bold ">
        <span>{gradeLevel}</span>
      </p>

      <div className="mt-6 flex justify-center">
        <div className="w-full p-3 rounded-lg bg-sub8/20">
          <p className="text-[15px] font-medium ">받은 매너 칭찬</p>
          {hasGoodReview ? (
            profileInfo?.goodReviewInfo.map((review, index) => {
              return (
              <Review key={index} count={review.count} comment={review.content} />
              );
            })
          ) : (<p>받은 매너 칭찬이 없습니다.</p>)}
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <div className="w-full p-3 rounded-lg bg-sub4/20">
          <p className="text-[15px] font-medium ">받은 비매너</p>
          {hasBadReview ? (
            profileInfo?.badReviewInfo.map((review, index) => {
              return (
              <Review key={index} count={review.count} comment={review.content} />
              );
            })
          ) : (<p>받은 비매너 리뷰가 없습니다.</p>)}
        </div>
      </div>
    </div>
  );
};

export default GradePage;
