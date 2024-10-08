import { IoLibrary } from "react-icons/io5";

import { useNavigate } from "react-router-dom";
const NotFoundPage = () => {
  const navigate = useNavigate();
  const goMain = () => {
    navigate("/");
  };

  return (
    <div
      className="mx-[25px] flex justify-center items-center"
      style={{ height: "calc(100vh - 86px)" }}
    >
      <div className="space-y-10 flex flex-col items-center">
        <div className="flex flex-row items-end gap-3 justify-center mt-10">
          <IoLibrary color="#5F6F52" size={50} />
          <p className="text-[28px] text-main font-bold">나의 작은 도서관</p>
        </div>
        <div className="justify-self-center">
          <p className="maplestory text-[24px] text-sub  text-left">404</p>
          <p className="text-[20px] text-sub text-left ">
            사이트에 연결할 수 없습니다.
          </p>
        </div>
        <button
          className="px-10 h-[32px] mx-auto bg-sub5 rounded-lg font-medium text-[#50402f] text-[14px] hover:bg-sub hover:text-white"
          onClick={goMain}
        >
          메인 페이지로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
