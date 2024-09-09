import { IoIosArrowBack } from "react-icons/io";
import History from "../component/History";

const LeafPage = () => {
  const historyArray = [
    {date : "09-24", name: "도서 대출", detail: "프랭클린 익스프레스 외 3권", leaf: 100},
    {date : "09-24", name: "책잎 충전", detail: "프랭클린 익스프레스 외 3권", leaf: 100},
  ]

  return (
    <div>
      <button>
        <IoIosArrowBack />
      </button>
      {historyArray.map((item, index) => {
            return <History key={index} date={item.date} name={item.name} detail={item.detail} leaf={item.leaf} />
          })}
      

    </div>
  );
};

export default LeafPage;
