import { useMutation } from "@tanstack/react-query";
import { postBookCaseByIds } from "api/bookcaseApi";
import { BookCaseResponse } from "atoms/Book.type";
import AlertModal from "components/common/AlertModal";
import { useState } from "react";
import ApplyBookInfo from "../components/ApplyBookInfo";

interface BookcaseApplyPageProps {
  recognizedBooks: BookCaseResponse;
}

const BookcaseApplyPage = ({ recognizedBooks }: BookcaseApplyPageProps) => {
  console.log("recognizedBooks", recognizedBooks);

  const [isRegistOpen, setIsRegistOpen] = useState<boolean>(false);
  const [isNoBookOpen, setIsNoBookOpen] = useState<boolean>(false);
  const [selectedBooks, setSelectedBooks] = useState<number[]>(
    recognizedBooks.bookDataList.map((book) => book.bookId)
  );

  const { mutate, isPending, error } = useMutation({
    mutationFn: postBookCaseByIds,

    onSuccess: () => {
      console.log("success");
      setIsRegistOpen(true);
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

  const handleRegisterClick = () => {
    if (selectedBooks.length === 0) {
      setIsNoBookOpen(true);
    } else {
      mutate(selectedBooks);
    }
  };

  console.log("selectedBooks", selectedBooks);

  return (
    <div>
      <div className="px-[25px]">
        <div>
          <AlertModal
            content="도서가 성공적으로 등록되었습니다."
            open={isRegistOpen}
            setOpen={setIsRegistOpen}
            urlPath="/library/my-bookcase"
          />
          <AlertModal
            content="등록할 책이 없습니다."
            open={isNoBookOpen}
            setOpen={setIsNoBookOpen}
          />
          <p className="font-bold text-center my-4 text-lg">
            총{" "}
            {recognizedBooks.alreadyExistBooks.length +
              recognizedBooks.bookDataList.length}
            권 인식
          </p>
          <div className="space-y-4 ">
            <div className="text-center font-bold">새로 인식된 도서</div>
            {recognizedBooks.bookDataList.length === 0 ? (
              <p className="text-center text-red-500 text-sm">
                새로 인식된 도서가 없습니다
              </p>
            ) : (
              recognizedBooks.bookDataList.map((book) => (
                <ApplyBookInfo
                  book={book}
                  bookcase
                  key={book.bookId}
                  isChecked={selectedBooks.includes(book.bookId)}
                  handleCheckboxChange={handleCheckboxChange}
                />
              ))
            )}
          </div>
          <div className="space-y-4">
            <div className="text-center pt-5 font-bold">이미 등록된 도서</div>
            {recognizedBooks.alreadyExistBooks.length === 0 ? (
              <p className="text-center text-red-500 text-sm">
                인식된 도서 중 이미 있는 도서는 없습니다
              </p>
            ) : (
              recognizedBooks.alreadyExistBooks.map((book, index) => (
                <ApplyBookInfo book={book} key={book.bookId} />
              ))
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center mx-8 my-6 pb-10">
          <button
            onClick={handleRegisterClick}
            className="bg-sub7 text-white font-bold text-sm rounded-lg w-full py-15"
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
