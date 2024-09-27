import { IoIosLeaf } from "react-icons/io";

const PayComplete = () => {
  return (
    <div className="w-[180px] h-[170px] border-2 border-[#B9B7B7] rounded-xl flex flex-col items-center justify-center space-y-3">
      <span className="font-bold">송금이 완료되었습니다.</span>
      <div className="flex items-center space-x-1">
        <span className="font-bold">7000</span>
        <IoIosLeaf color="#79AC78" size={24} />
      </div>
      <p>
        <span className="text-[#5F6F52]">500</span> X
        <span className="text-[#5F6F52]"> 14</span> 일
      </p>
      <p className="text-[#5F6F52]">
        <span className="text-lg mr-2 font-bold">반납일</span> 2024.10.01
      </p>
    </div>
  );
};

export default PayComplete;
