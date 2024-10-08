import { useQuery } from "@tanstack/react-query";
import { getOtherProfile } from "api/profileApi";
import Error from "components/common/Error";
import Loading from "components/common/Loading";
import { TbMessage } from "react-icons/tb";

interface SellerReviewProps {
  nickname: string;
}

const SellerReview = ({ nickname }: SellerReviewProps) => {
  const {
    data: profileInfo,
    isLoading: isOtherProfileLoading,
    isError: isOtherProfileError,
  } = useQuery({
    queryKey: ["profile", nickname],
    queryFn: () => getOtherProfile(nickname),
  });

  if (isOtherProfileLoading) {
    return <Loading />;
  }

  if (isOtherProfileError) {
    return <Error />;
  }

  const hasReview =
    profileInfo?.goodReviewInfo.length > 0 ||
    profileInfo?.badReviewInfo.length > 0;
  const hasGoodReview = profileInfo?.goodReviewInfo.length > 0;
  const hasBadReview = profileInfo?.badReviewInfo.length > 0;

  return (
    <div className="pb-2">
      <p className="font-bold mt-10 mb-3">받은 판매자 리뷰</p>
      {hasReview ? null : <p>리뷰가 없습니다.</p>}
      <div>
        {hasGoodReview
          ? profileInfo?.goodReviewInfo.map((review, index) => {
              return (
                <div
                  className="justify-between bg-[green]/10 flex flex-row items-center rounded-lg mx-1 my-3 p-2"
                  key={index}
                >
                  <div className="flex items-center">
                    <TbMessage size={20} className="mr-2" />
                    {review.content}
                  </div>
                  <span className="font-bold mr-4">{review.count}</span>
                </div>
              );
            })
          : null}
      </div>
      <div>
        {hasBadReview
          ? profileInfo?.badReviewInfo.map((review, index) => {
              return (
                <div
                  className="justify-between bg-[red]/5 flex flex-row items-center rounded-lg mx-1 my-3 p-2"
                  key={index}
                >
                  <div className="flex items-center">
                    <TbMessage size={20} className="mr-2" />
                    {review.content}
                  </div>
                  <span className="font-bold mr-4">{review.count}</span>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default SellerReview;
