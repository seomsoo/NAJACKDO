import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const AICheckPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        onClick={() => navigate(-1)}
        className="cursor-pointer p-4 flex flex-row items-center"
      >
        <IoChevronBack size={25} color="#545454" />
        <span className="font-bold text-xl ml-2">도서 등록 - AI 인증</span>
      </div>
      <div className="flex flex-col items-center font-bold">
        <p className="font-bold text-2xl text-center mt-8 mb-5">GUIDE</p>
        <div className="border-[1px] border-[#776B5D] rounded-xl w-[330px] h-[400px] flex flex-col justify-center items-center">
          <div className="flex flex-row justify-center space-x-4">
            <div className="w-[116px] h-40 bg-gray-300">책 앞면 사진</div>
            <div className="w-[116px] h-40  bg-gray-300">책 뒷면 사진</div>
          </div>
          <p className="pt-10">
            위 사진과 같이 도서의 <span className="text-[#79AC78]">앞뒷면</span>
            을 촬영해주세요!
          </p>
          <p className="pt-8 text-center">
            AI의 분석을 통해{" "}
            <span className="text-[#79AC78]">도서의 손상도</span>를 체크해주고,{" "}
            <br />
            <span className="text-[#79AC78]">일일 대여료</span>를 추천해줍니다!
          </p>
        </div>
      </div>
      <p className="text-center bg-[#B0A695] w-[330px] mx-auto rounded-md text-white font-bold py-3 mt-8">
        AI 인증 하러 가기
      </p>
    </div>
  );
};

export default AICheckPage;
