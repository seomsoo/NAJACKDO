import { IoIosLeaf } from "react-icons/io";

const SellerInfo = () => {
  return (
    <div className="flex flex-row justify-between items-center my-5">
      <div className="flex flex-row">
        <div className="w-16 h-16 rounded-full bg-gray-300 mr-3" />
        <div className="flex flex-col">
          <span className="font-bold text-xl mb-1">서민수</span>
          <div className="flex flex-row">
            <p className="text-[#B97070] bg-[#B97070]/30 rounded-xl px-2 py-0.5 text-sm mr-2">
              38.5°C
            </p>
            <p className="text-[#5F6F52] bg-[#C0C78C] rounded-xl px-2 py-0.5 text-sm">
              장덕동
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <div className="flex flex-row items-end  justify-center">
          <IoIosLeaf size={20} color="#A6B37D" className="mb-0.5" />
          <p className="font-bold mx-1">150</p>
          <p className="text-sm text-[#A7A7A7]">/ 일</p>
        </div>
        <p className="text-white bg-[#C0C78C] rounded-xl px-2 py-0.5 my-1 text-sm text-center">
          대여 가능
        </p>
      </div>
    </div>
  );
};

export default SellerInfo;
