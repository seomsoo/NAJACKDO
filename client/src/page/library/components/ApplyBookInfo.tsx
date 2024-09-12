import { useState } from "react";
import { FaCheck } from "react-icons/fa";

interface ApplyBookInfoProps {
  book: {
    title: string;
    author: string[];
    isbn: string;
    imageUrl: string;
    category: string[];
  };
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
      <img src="/chemistryCover.png" alt="why 화학" width={90} height={125} />
      <div className="flex flex-col text-sm ml-3">
        <span className="text-base font-bold">{book.title}</span>
        <div className="flex flex-row">
          {book.author.map((author, index) => {
            return (
              <span key={index} className="pt-1 pb-2 pr-2">
                {author}
              </span>
            );
          })}
        </div>
        <span className="pb-2">ISBN: {book.isbn}</span>
        <div className="flex flex-wrap text-xs">
          {book.category.map((category, index) => {
            return (
              <span
                key={index}
                className="bg-[#79AC78] text-[#FEFAE0] px-2 py-1 m-0.5 rounded-xl"
              >
                {category}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ApplyBookInfo;
