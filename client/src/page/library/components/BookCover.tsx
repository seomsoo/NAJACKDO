import { IoIosLeaf } from "react-icons/io";

interface BookCoverProps {
  book: {
    imgUrl: string;
    detection: string;
    price: number;
  };
}

const BookCover = ({ book }: BookCoverProps) => {
  return (
    <div>
      <img src={book.imgUrl} alt="이미지" />
      <div className="flex flex-row items-center justify-center">
        <IoIosLeaf color="#A6B37D" />
        <p className="mx-1">{book.price}</p>
        <p className="bg-[#5F6F52] text-white rounded-full px-1.5">
          {book.detection}
        </p>
      </div>
    </div>
  );
};

export default BookCover;
