import { IoIosArrowBack, IoIosLeaf } from "react-icons/io";
import History from "../components/History";

import { useQuery } from "@tanstack/react-query";
import { getCashLog } from "api/cashlogApi";
import { useLocation, useNavigate } from "react-router-dom";

const LeafPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  const goLeafCharge = () => {
    navigate("/profile/my-leaf/charge");
  };
  const location = useLocation();
  const { leaf, userName } = location.state || {};

  // 사용 내역 조회
  const {
    data: cashlogData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cashlog"],
    queryFn: getCashLog,
  });
  console.log("cashlogData", cashlogData);

  let year = "";
  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>오류가 발생했습니다.</div>;

  return (
    <div className="mx-[25px] mt-6">
      <button onClick={goBack}>
        <IoIosArrowBack />
      </button>
      <div className="flex flex-row justify-start mt-5 mb-7">
        <p className="text-xl font-semibold ">
          {userName}님의 <span className="text-sub8">책잎</span>
        </p>
      </div>

      <div className="p-3 rounded-t-lg bg-sub2/50 flex flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          <IoIosLeaf size={30} color="#79AC78" />
          <p className="text-[25px] text-sub7">{leaf.toLocaleString()}</p>
        </div>
        <button
          className="w-[62px] h-[23px] bg-[#F8F6F3] rounded-lg  text-main text-[12px]"
          onClick={goLeafCharge}
        >
          충전하기
        </button>
      </div>
      <div className="w-full p-1 border-b-[1px] pt-1 border-sub7/30">
        {cashlogData.map((cashlog, index) => {
          const currentYear = cashlog.createdAt.split("T")[0].split("-")[0];
          console.log("currentYear", currentYear);
          let showYear = false;

          if (currentYear !== year) {
            showYear = true;
            year = currentYear;
          }

          return (
            <div key={index}>
              {showYear && (
                <p className="text-lg font-bold mt-4 border-t-[1px] pt-3 border-sub7/30 ">
                  {currentYear}년
                </p>
              )}
              <History
                cash={cashlog.cash}
                resultCash={cashlog.resultCash}
                type={cashlog.type}
                createdAt={cashlog.createdAt}
              />
            </div>
          );
        })}

        {/* {cashlogData.map((cashlog, index) => {
          return (
            <History
            cash={ cashlog.cash}
            resultCash={ cashlog.resultCash}
            type={ cashlog.type}
            createdAt={ cashlog.createdAt}
            />
          );
        })} */}
      </div>
    </div>
  );
};

export default LeafPage;
