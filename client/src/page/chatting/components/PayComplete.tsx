import { IoIosLeaf } from "react-icons/io";

interface PayCompleteProps {
  totalLeaf: number;
}

const PayComplete = ({ totalLeaf }: PayCompleteProps) => {
  return (
    <div className="w-[180px] h-[170px] border-2 border-[#B9B7B7] rounded-xl flex flex-col items-center justify-center space-y-3">
      <span className="font-bold">송금이 완료되었습니다.</span>
      <div className="flex items-center space-x-1">
        <span className="font-bold">{totalLeaf}</span>
        <IoIosLeaf color="#79AC78" size={24} />
      </div>
      <p>
        <span className="text-main">500</span> X
        <span className="text-main"> 14</span> 일
      </p>
      <p className="text-main">
        <span className="text-lg mr-2 font-bold">반납일</span> 2024.10.01
      </p>
    </div>
  );
};

export default PayComplete;
