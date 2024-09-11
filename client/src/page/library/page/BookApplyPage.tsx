import ApplyBookInfo from "page/library/components/ApplyBookInfo";
import { HiOutlineCamera } from "react-icons/hi2";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const BookApplyPage = () => {
  const navigate = useNavigate();

  const book = {
    title: "Why? 화학",
    author: ["스토리 조영선", "작화 이영호"],
    isbn: "9788930206341",
    imageUrl: "/chemistryCover.png",
    category: ["과학", "컴퓨터", "어린이 만화"],
  };

  return (
    <div>
      <div
        onClick={() => navigate(-1)}
        className="cursor-pointer p-4 flex flex-row items-center"
      >
        <IoChevronBack size={25} color="#545454" />
        <span className="font-bold text-xl ml-2">
          도서 등록 - 도서 단일 촬영
        </span>
      </div>
      <div className="px-[25px]">
        <div className="flex flex-col items-center">
          <span className="font-bold text-base mb-4">촬영한 사진</span>
          <img src="/chemistry.png" alt="책 촬영" width={200} height={270} />
        </div>
        <div>
          <p className="font-bold text-base text-center my-4">등록 도서 정보</p>
          <ApplyBookInfo book={book} />
          <div className="flex flex-row justify-center items-center  ml-auto bg-[#C0C78C] py-1 mt-2 rounded-lg w-5/12 ">
            <span className="text-white font-bold text-sm">
              도서 다시 촬영하기
            </span>
            <HiOutlineCamera color="white" className="ml-1" />
          </div>
        </div>
        <div className="flex flex-row justify-center space-x-6 my-4">
          <button className="bg-[#776B5D] text-white text-sm font-bold rounded-lg px-8 py-1.5">
            추가 등록하기
          </button>
          <button className="bg-[#776B5D] text-white text-sm font-bold rounded-lg px-8 py-1.5">
            등록하기(총 1권)
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookApplyPage;
