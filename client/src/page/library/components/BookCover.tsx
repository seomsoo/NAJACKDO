import { INearAvailableBook } from "atoms/Book.type";
import { IoIosLeaf } from "react-icons/io";

interface BookCoverProps {
  book: INearAvailableBook;
}

const BookCover = ({ book }: BookCoverProps) => {
  return (
    <div>
      <img src={book.imagePath} alt="이미지" />
      <div className="flex flex-row items-center justify-center">
        <IoIosLeaf color="#A6B37D" />
        <p className="mx-1">{book.oneDayPrice}</p>
      </div>
    </div>
  );
};

export default BookCover;
