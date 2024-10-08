import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import GradeInfoModal from "../components/GradeInfoModal";
import Review from "../components/Review";

const GradePage = () => {
  const { nickname } = useParams();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const location = useLocation();
  const { mannerScore, goodReviewInfo, badReviewInfo } = location.state || {};
  const [open, setOpen] = useState(false);

  const hasGoodReview = goodReviewInfo.length > 0;
  const hasBadReview = badReviewInfo.length > 0;

  let gradeImage = "/images/mannertree/씨앗.png";
  let gradeLevel = "Lv.1 나작씨앗";
  if (mannerScore >= 80) {
    gradeImage = "/images/mannertree/숲.png";
    gradeLevel = "Lv.5 나작숲";
  } else if (mannerScore >= 60) {
    gradeImage = "/images/mannertree/나무.png";
    gradeLevel = "Lv.4 나작나무";
  } else if (mannerScore >= 40) {
    gradeImage = "/images/mannertree/가지.png";
    gradeLevel = "Lv.3 나작가지";
  } else if (mannerScore >= 20) {
    gradeImage = "/images/mannertree/새싹.png";
    gradeLevel = "Lv.2 나작새싹";
  }

  return (
    <div className="p-6">
      <GradeInfoModal open={open} setOpen={setOpen} />
      <div className="flex flex-row justify-between items-center">
        <div className="flex text-xl items-center font-bold">
          <button onClick={goBack}>
            <IoIosArrowBack size={25} />
          </button>
          <div className="flex text-xl items-center font-bold space-x-1 ml-1">
            <p>
              <span className="hakgyo text-2xl">{nickname}</span>님의
            </p>
            <p className="font-semibold text-sub8">신뢰 나무</p>
            <IoInformationCircleOutline
              size={15}
              color={"#79ac78"}
              onClick={() => setOpen(true)}
            />
          </div>
        </div>
        <span className="text-[#508d1e] font-semibold">{mannerScore} 점</span>
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
            goodReviewInfo.map((review, index) => {
              return (
                <Review
                  key={index}
                  count={review.count}
                  comment={review.content}
                />
              );
            })
          ) : (
            <p className="text-center my-6">받은 매너 칭찬이 없습니다.</p>
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <div className="w-full p-3 rounded-lg bg-sub4/20">
          <p className="text-[15px] font-medium ">받은 비매너</p>
          {hasBadReview ? (
            badReviewInfo.map((review, index) => {
              return (
                <Review
                  key={index}
                  count={review.count}
                  comment={review.content}
                />
              );
            })
          ) : (
            <p className="text-center my-6">받은 비매너 리뷰가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GradePage;
