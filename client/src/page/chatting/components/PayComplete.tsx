import { formatDate } from "page/library/components/HistoryList";
import { IoIosLeaf } from "react-icons/io";

interface PayCompleteProps {
  totalLeaf: number;
  rentalPeriod: number;
  dayPrice: number;
}

const PayComplete = ({
  totalLeaf,
  rentalPeriod,
  dayPrice,
}: PayCompleteProps) => {
  const today = new Date();
  const finishDate = new Date(today.setDate(today.getDate() + rentalPeriod));
  return (
    <div className="w-[180px] h-[170px] border-2 border-[#B9B7B7] rounded-xl flex flex-col items-center justify-center space-y-3">
      <span className="font-bold">송금이 완료되었습니다.</span>
      <div className="flex items-center space-x-1">
        <span className="font-bold">{totalLeaf}</span>
        <IoIosLeaf color="#79AC78" size={24} />
      </div>
      <p>
        <span className="text-main">{dayPrice}</span> X
        <span className="text-main"> {rentalPeriod}</span> 일
      </p>
      <p className="text-main">
        <span className="text-lg mr-2 font-bold">반납일</span>{" "}
        {formatDate(String(finishDate))}
      </p>
    </div>
  );
};

export default PayComplete;
