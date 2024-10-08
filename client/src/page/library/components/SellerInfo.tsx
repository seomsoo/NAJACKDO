import BaseProfile from "components/common/BaseProfile";
import { IoIosLeaf } from "react-icons/io";

interface SellerInfoProps {
  seller: {
    nickname: string;
    profileImage: string;
    mannerScore: number;
    locationName: string;
    ondayPrice: number;
    bookStatus: string;
  };
}

const SellerInfo = ({ seller }: SellerInfoProps) => {
  return (
    <div className="flex flex-row justify-between items-center my-5">
      <div className="flex flex-row">
        <BaseProfile
          userNickname={seller.nickname}
          userImage={seller.profileImage}
          width="16"
          height="16"
        />
        <div className="ml-3 flex flex-col">
          <span className="font-bold text-xl mb-1">{seller.nickname}</span>

          <div className="flex flex-row">
            <p className="text-[#B97070] bg-[#B97070]/30 rounded-xl px-2 py-0.5 text-sm mr-2">
              {seller.mannerScore} 점
            </p>
            <p className="text-main bg-sub1 rounded-xl px-2 py-0.5 text-sm">
              {seller.locationName.split(" ").slice(-1)[0]}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <div className="flex flex-row items-center  justify-center">
          <IoIosLeaf size={20} color="#A6B37D" className="mb-0.5" />
          <p className="font-bold text-lg mx-1">
            {seller.ondayPrice ? seller.ondayPrice : "준비 중"}
          </p>
          <p className="text-sm text-[#A7A7A7]">/ 일</p>
        </div>
        <p className="text-white bg-sub1 rounded-xl px-2 py-0.5 my-1 text-sm text-center">
          {seller.bookStatus === "AVAILABLE" ? "대여 가능" : "대여 불가능"}
        </p>
      </div>
    </div>
  );
};

export default SellerInfo;
