import { INearAvailableBook } from 'atoms/Book.type';
import { IoIosLeaf } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

interface RentalBookCoverProps {
  book: INearAvailableBook;
}

const RentalBookCover = ({ book }: RentalBookCoverProps) => {
  const navigate = useNavigate();

  // 책 이미지 클릭함수
  const handleBookClick = (userBookId: number) => {
    navigate(`/book/${userBookId}/rental`);
  };
  return (
    <div onClick={() => handleBookClick(book.userBookId)}>
      <img src={book.imagePath} alt="이미지" className="w-20 h-[107px]" />
      <div className="flex flex-row items-center justify-center">
        <IoIosLeaf color="#A6B37D" />
        <p className="mx-1">{book.oneDayPrice}</p>
      </div>
    </div>
  );
};

export default RentalBookCover;
