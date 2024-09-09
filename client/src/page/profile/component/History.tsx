import { IoIosLeaf } from "react-icons/io";

interface HistoryProps {
  date: string;
  name: string;
  detail: string;
  leaf: number;
}
const History = ({date, name, detail, leaf}: HistoryProps) => {

  let color = "#776B5D";
  let sign = "-";
  if (name.includes("충전")) {
    color = "#79AC78"
    sign = "+"
  }

  return (
    <div className="mt-3 flex felx-row px-4">
      <p className="w-[55px] font-['Pretendard'] text-[16px]">{date}</p>
      <div className="w-[260px] flex flex-col justify-start">
        <p className="text-[16px] font-['Pretendard'] mr-2">{name}</p>
        <p className="text-[14px] font-['Pretendard'] mr-2 font-light text-['#888888']">{detail}</p>
      </div>
      <div className="w-[100px] flex flex-row justify-end">
        <p className="text-[16px] font-['Pretendard'] text-end mr-1"
           style={{ color : `${color}` }}>
            {sign}&nbsp;{leaf}
        </p>
        <IoIosLeaf size={20} color={color} />
      </div>
    </div>
  );
};

export default History;
