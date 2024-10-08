import { IoIosLeaf } from "react-icons/io";

interface HistoryProps {
  cash: number;
  type: string;
  createdAt: string;
}
const History = ({ cash, type, createdAt }: HistoryProps) => {
  let color = "#776B5D";
  if (cash > 0) {
    color = "#79AC78";
  }
  function convertDate(datetime) {
    const date = datetime.split("T")[0].split("-");
    const year = date[0].replace("20", "");
    const month = date[1];
    const day = date[2];

    return month + "." + day || createdAt.split("T")[0];
  }

  function convertType(type) {
    const typeMapping = {
      ETC: "기타 적립",
      RENTAL: "도서 대여료",
      DEPOSIT: "도서 대여 보증금",
      WITHDRAW: "책잎 출금",
      PAYMENT: "책잎 충전",
    };

    return typeMapping[type] || type;
  }

  return (
    <div className="my-4 px-1 flex felx-row justify-between">
      <div className="flex felx-row gap-3 justify-start">
        <p className="text-[16px]">{convertDate(createdAt)}</p>
        <p className="text-[16px] font-semibold  mr-2">{convertType(type)}</p>
      </div>
      <div className="flex flex-row justify-end">
        <p className="text-[16px]  text-end mr-1" style={{ color: `${color}` }}>
          {cash.toLocaleString()}
        </p>
        <IoIosLeaf size={20} color={color} />
      </div>
    </div>
  );
};

export default History;
