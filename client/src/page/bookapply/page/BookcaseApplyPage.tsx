import { useMutation } from "@tanstack/react-query";
import { postBookCaseByIds } from "api/bookcaseApi";
import { BookCaseResponse, IBookDetail } from "atoms/Book.type";
import { useState } from "react";
import { HiOutlineCamera } from "react-icons/hi2";
import { IoChevronBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

interface BookcaseApplyPageProps {
  recognizedBooks: BookCaseResponse;
}

const BookcaseApplyPage = ({ recognizedBooks }: BookcaseApplyPageProps) => {
  console.log("recognizedBooks", recognizedBooks);

  const navigate = useNavigate();

  const location = useLocation();

  const [selectedBooks, setSelectedBooks] = useState<number[]>(
    recognizedBooks.bookDataList.map((book) => book.bookId)
  );

  const { mutate, isPending, error } = useMutation({
    mutationFn: postBookCaseByIds,

    onSuccess: () => {
      console.log("success");
    },
    onError: (error) => {
      console.error("error", error);
    },
  });

  const handleCheckboxChange = (bookId: number) => {
    setSelectedBooks((prevSelected) => {
      if (prevSelected.includes(bookId)) {
        return prevSelected.filter((id) => id !== bookId);
      } else {
        return [...prevSelected, bookId];
      }
    });
  };

  console.log("selectedBooks", selectedBooks);

  return (
    <div>
      <div className="px-[25px]">
        <div>
          <p className="font-bold text-base text-center my-4">
            등록 도서 정보 (총{" "}
            {recognizedBooks.alreadyExistBooks.length + recognizedBooks.bookDataList.length}권 인식
            완료)
          </p>
          <div className="space-y-4">
            새로 인식된 도서
            {recognizedBooks.bookDataList.map((book) => (
              <div key={book.bookId} className="flex flex-col border p-4 rounded-md">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedBooks.includes(book.bookId)} // 체크 상태 설정
                    onChange={() => handleCheckboxChange(book.bookId)} // 체크박스 변화 핸들러
                    className="mr-2"
                  />
                  <img src={book.cover} alt={book.title} className="w-16 h-24 object-cover mb-2" />
                  <div>
                    <p className="font-bold">{book.title}</p>
                    <p>{book.author}</p>
                    <p>{book.isbn}</p>
                    <p>{book.genre}</p>
                  </div>
                </label>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            이미 등록된 도서
            {recognizedBooks.alreadyExistBooks.map((book, index) => (
              <div key={index} className="flex flex-col border p-4 rounded-md">
                <img src={book.cover} alt={book.title} className="w-16 h-24 object-cover mb-2" />
                <div>
                  <p className="font-bold">{book.title}</p>
                  <p>{book.author}</p>
                  <p>{book.isbn}</p>
                  <p>{book.genre}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center mx-8 my-6">
          <button
            onClick={() => {
              mutate(selectedBooks);
            }}
            className="bg-sub7 text-white font-bold text-sm rounded-lg w-full py-1.5"
          >
            등록하기(총 {selectedBooks.length}권 선택됨)
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
