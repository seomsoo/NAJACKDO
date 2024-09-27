import { useState } from "react";
import { HiOutlineCamera } from "react-icons/hi2";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const BookcaseApplyPage = () => {
  const navigate = useNavigate();

  const books = [
    {
      title: "Why? 화학",
      author: ["스토리 조영선", "작화 이영호"],
      isbn: "9788930206341",
      imageUrl: "/chemistryCover.png",
      category: ["과학", "컴퓨터", "어린이 만화"],
    },
    {
      title: "Why? 화학",
      author: ["스토리 조영선", "작화 이영호"],
      isbn: "9788930206341",
      imageUrl: "/chemistryCover.png",
      category: ["과학", "컴퓨터", "어린이 만화"],
    },
    {
      title: "Why? 화학",
      author: ["스토리 조영선", "작화 이영호"],
      isbn: "9788930206341",
      imageUrl: "/chemistryCover.png",
      category: ["과학", "컴퓨터", "어린이 만화"],
    },
  ];

  const [selectedCount, setSelectedCount] = useState<number>(books.length);

  return (
    <div>
      <div
        onClick={() => navigate(-1)}
        className="cursor-pointer p-4 flex flex-row items-center"
      >
        <IoChevronBack size={25} color="#545454" />
        <span className="font-bold text-xl ml-2">도서 등록 - 책장 촬영</span>
      </div>
      <div className="px-[25px]">
        <div className="flex flex-col items-center">
          <span className="font-bold text-base mb-4">촬영한 사진</span>
          <img src="/whybookcase.png" alt="책 촬영" width={200} height={270} />
        </div>
        <div>
          <p className="font-bold text-base text-center my-4">
            등록 도서 정보 (총 {books.length}권 인식 완료)
          </p>
          <div className="space-y-4">
            {books.map((book, index) => {
              return (
                <></>
                // <ApplyBookInfo
                //   book={book}
                //   key={index}
                //   bookcase
                //   setSelectedCount={setSelectedCount}
                // />
              );
            })}
          </div>
          <div className="flex flex-row justify-center items-center  ml-auto bg-[#C0C78C] py-1 mt-2 rounded-lg w-5/12 ">
            <span className="text-white font-bold text-sm">
              책장 다시 촬영하기
            </span>
            <HiOutlineCamera color="white" className="ml-1" />
          </div>
        </div>
        <div className="flex flex-col justify-center mx-8 my-6">
          <button className="bg-[#776B5D] text-white font-bold text-sm rounded-lg w-full py-1.5">
            등록하기(총 {selectedCount}권 선택됨)
          </button>
          <span className="text-xs text-center font-bold mt-1">
            인식되지 않은 도서는 ‘단일 도서 등록’을 이용하여 등록해주세요!
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookcaseApplyPage;
