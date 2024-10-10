import { IBookDetail } from "atoms/Book.type";
import CategoryTag from "components/common/CategoryTag";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

interface ApplyBookInfoProps {
  book: IBookDetail;
  bookcase?: boolean;
  isChecked?: boolean;
  handleCheckboxChange?: (bookId: number) => void;
}

const ApplyBookInfo = ({
  book,
  bookcase = false,
  isChecked = false,
  handleCheckboxChange,
}: ApplyBookInfoProps) => {
  return (
    <div className="relative flex flex-row items-center bg-[#CED59D]/50 rounded-2xl shadow-lg px-6 py-5">
      {bookcase && (
        <div
          className={`flex items-center justify-center w-5 h-5 border-2 rounded-lg cursor-pointer border-main absolute top-5 right-6 ${isChecked ? "bg-main" : "bg-transparent"}`}
          onClick={() => handleCheckboxChange && handleCheckboxChange(book.bookId)}
        >
          {isChecked && <FaCheck size={11} color="white" />}
        </div>
      )}
      <img src={book.cover} alt={book.title} width={90} height={125} />
      <div className={`flex flex-col text-sm ml-3 ${bookcase && "pr-5"}`}>
        <span className="text-base font-bold">{book.title}</span>
        <div className="flex flex-row">{book.author.split(",").join(" | ")}</div>
        <span className="pb-2">ISBN: {book.isbn}</span>
        <div className="flex flex-wrap text-xs">
          <CategoryTag category={book.genre} />
        </div>
      </div>
    </div>
  );
};

export default ApplyBookInfo;
