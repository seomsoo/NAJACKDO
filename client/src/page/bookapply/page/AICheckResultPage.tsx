import AIResult from 'page/bookapply/components/AIResult';
import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const AICheckResultPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div
        onClick={() => navigate(-1)}
        className="cursor-pointer p-6 py-4 flex flex-row items-center"
      >
        <IoChevronBack className="text-2xl" color="#545454" />
        <span className="font-bold text-2xl ml-2">도서 등록 - AI 인증</span>
      </div>
      <AIResult />
      <div className="font-bold my-5 flex flex-col items-center">
        <div className="flex flex-row justify-center items-end">
          <span className="text-xl">책정 일일 대여료 : 150 </span>
          <span className="text-[#868686] ml-1">/ 일</span>
        </div>
        <span className="text-[#656565] text-xs">
          (추후 대여 상세 페이지에서 수정 가능)
        </span>
      </div>
      <div className="px-6">
        <p className="text-center bg-[#776B5D] w-full  mt-10 rounded-xl text-white font-bold py-3 ">
          등록 완료
        </p>
      </div>
    </div>
  );
};

export default AICheckResultPage;
