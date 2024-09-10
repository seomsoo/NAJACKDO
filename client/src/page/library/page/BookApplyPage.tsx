import ApplyGuide from "page/library/components/ApplyGuide";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const BookApplyPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        onClick={() => navigate(-1)}
        className="cursor-pointer p-4 flex flex-row items-center"
      >
        <IoChevronBack size={25} color="#545454" />
        <span className="font-bold text-xl ml-2">도서 등록</span>
      </div>
      <ApplyGuide />
      <div className="flex flex-row justify-center mt-6">
        <button className="bg-[#B0A695] text-white font-bold w-[153px] h-[54px] rounded-xl mx-2">
          도서 단일 촬영
        </button>
        <button className="bg-[#B0A695] text-white font-bold w-[153px] h-[54px] rounded-xl mx-2">
          책장 촬영
        </button>
      </div>
    </div>
  );
};

export default BookApplyPage;
