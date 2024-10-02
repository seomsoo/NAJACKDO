import { IBookDetail } from "atoms/Book.type";
import CategoryTag from "components/common/CategoryTag";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

interface ApplyBookInfoProps {
  book: IBookDetail;
  bookcase?: boolean;
  setSelectedCount?: (count: (prev: number) => number) => void;
}

const ApplyBookInfo = ({
  book,
  bookcase = false,
  setSelectedCount,
}: ApplyBookInfoProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(true);

  const handleClick = () => {
    setIsChecked(!isChecked);

    if (setSelectedCount === undefined) return;

    if (isChecked) {
      setSelectedCount((prev) => prev - 1);
    } else if (!isChecked) {
      setSelectedCount((prev) => prev + 1);
    }
  };

  return (
    <div className="relative flex flex-row items-center bg-[#CED59D]/50 rounded-2xl shadow-lg px-6 py-5">
      {bookcase && (
        <div
          className={`flex items-center justify-center w-5 h-5 border-2 rounded-lg cursor-pointer border-[#5F6F52] absolute top-5 right-6 ${isChecked ? "bg-[#5F6F52]" : "bg-transparent"}`}
          onClick={handleClick}
        >
          {isChecked && <FaCheck size={11} color="white" />}
        </div>
      )}
      <img src={book.cover} alt={book.title} width={90} height={125} />
      <div className="flex flex-col text-sm ml-3">
        <span className="text-base font-bold">{book.title}</span>
        <div className="flex flex-row">
          {book.author.split(",").join(" | ")}
        </div>
        <span className="pb-2">ISBN: {book.isbn}</span>
        <div className="flex flex-wrap text-xs">
          <CategoryTag category={book.genre} />
        </div>
      </div>
    </div>
  );
};

export default ApplyBookInfo;
