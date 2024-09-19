import { IoIosArrowBack, IoIosLeaf } from "react-icons/io";
import History from "../components/History";

import { useNavigate } from "react-router-dom";

const LeafPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  const goLeafCharge = () => {
    navigate("/profile/my-leaf/charge");
  };

  // const {
  //   data: leafLog,
  //   isLoading,
  //   isError,
  // } = useQuery<ILeafLog[]>({
  //   queryKey: ["leafLog"],
  //   queryFn: getLeafLog,
  // });

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (leafLog) {
  //   console.log("책잎 로그", leafLog);
  // }

  const myLeaf = 1200;
  const historyArray = [
    {
      date: "09-24",
      name: "도서 대출",
      detail: "프랭클린 익스프레스 123 123 1234123 외 3권",
      leaf: 10000,
    },
    { date: "09-24", name: "책잎 충전", detail: "", leaf: 100 },
    {
      date: "09-24",
      name: "도서 대여",
      detail: "프랭클린 익스프레스 외 2권",
      leaf: 250,
    },
  ];

  return (
    <div className="mx-[25px] mt-6">
      <button onClick={goBack}>
        <IoIosArrowBack />
      </button>
      <div className="flex flex-row justify-start mt-5 mb-7">
        <p className="text-xl font-semibold ">
          {"서민수"}님의 <span className="text-[#79AC78]">책잎</span>
        </p>
      </div>

      <div className="p-3 rounded-t-lg bg-[#A6B37D]/50 flex flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          <IoIosLeaf size={30} color="#79AC78" />
          <p className="text-[25px] text-[#776B5D]">
            {myLeaf.toLocaleString()}
          </p>
        </div>
        <button
          className="w-[62px] h-[23px] bg-[#F8F6F3] rounded-lg  text-[#5F6F52] text-[12px]"
          onClick={goLeafCharge}
        >
          충전하기
        </button>
      </div>
      <div className="w-[340px]">
        {historyArray.map((item, index) => {
          return (
            <History
              key={index}
              date={item.date}
              name={item.name}
              detail={item.detail}
              leaf={item.leaf}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LeafPage;
