import { useSuspenseQuery } from '@tanstack/react-query';
import { getRecommendbook } from 'api/bookApi';
import { IBookDetail } from 'atoms/Book.type';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

interface DetailRecommendBookProps {
  bookId: number;
  bookGenre: string;
}

const DetailRecommendBook = ({
  bookId,
  bookGenre,
}: DetailRecommendBookProps) => {
  const navigate = useNavigate();

  // 비슷한 책 추천 조회
  const { data: recommendData } = useSuspenseQuery<IBookDetail[]>({
    queryKey: ['recommend', bookId, bookGenre],
    queryFn: () => getRecommendbook(bookId, bookGenre),
  });

  const handleBookClick = (userBookId: number) => {
    navigate(`/book/${userBookId}`);
  };

  return (
    <Fragment>
      {recommendData.length !== 0 ? (
        <div className="grid mt-4 grid-cols-4 gap-3">
          {recommendData.slice(0, 8).map((book, index) => {
            return (
              <img
                key={index}
                src={book.cover}
                alt={book.title}
                width={80}
                className="rounded-e-md w-[76px] h-[110px] "
                onClick={() => handleBookClick(book.bookId)}
                style={{
                  boxShadow:
                    '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)',
                }}
              />
            );
          })}
        </div>
      ) : (
        <p className="w-full flex justify-center items-center my-8">
          추천 도서가 없습니다.
        </p>
      )}
    </Fragment>
  );
};

export default DetailRecommendBook;
