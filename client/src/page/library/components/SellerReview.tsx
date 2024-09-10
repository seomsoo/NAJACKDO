import { TbMessage } from "react-icons/tb";
const SellerReview = () => {
  const reviews = [
    "응답이 빨라요",
    "친절하고 매너가 좋아요.",
    "시간 약속을 잘 지켜요",
    "제가 있는 곳까지 와서 거래했어요.",
  ];
  return (
    <div>
      <p className="font-bold mt-10 mb-3">받은 판매자 리뷰</p>
      <div>
        {reviews.map((review, index) => {
          return (
            <div
              className="bg-[#EBE3D5] flex flex-row items-center rounded-lg mx-1 my-3 p-2"
              key={index}
            >
              <TbMessage size={20} className="mr-2"/>
              {review}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SellerReview;
