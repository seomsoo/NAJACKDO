import { useQuery } from "@tanstack/react-query";
import { getOtherProfile } from "api/profileApi";
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
    queryKey: ['profile', nickname],
    queryFn: () => getOtherProfile(nickname),
  });

  if (isOtherProfileLoading) {
    return <div>로딩 중...</div>;
  }

  if (isOtherProfileError) {
    return <div>오류가 발생했습니다.</div>;
  }

/*
"goodReviewInfo": [
      {
        "reviewId": 0,
        "content": "string",
        "count": 0
      }
    ],
    "badReviewInfo": [
      {
        "reviewId": 0,
        "content": "string",
        "count": 0
      }
    ],
*/
  return (
    <div>
      <p className="font-bold mt-10 mb-3">받은 판매자 리뷰</p>
      <div>
        {/* {profileInfo?.goodReviewInfo.map((review, index) => {
          return (
            <div
              className="bg-[#EBE3D5] flex flex-row items-center rounded-lg mx-1 my-3 p-2"
              key={index}
            >
              <TbMessage size={20} className="mr-2"/>
              {review}
            </div>
          );
        })} */}
      </div>
    </div>
  );
};

export default SellerReview;
