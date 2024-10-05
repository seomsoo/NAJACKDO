import { useSuspenseQuery } from "@tanstack/react-query";
import { getRecommendbook } from "api/bookApi";
import { useNavigate } from "react-router-dom";

interface DetailRecommendBookProps {
  bookId: number;
}

const DetailRecommendBook = ({ bookId }: DetailRecommendBookProps) => {
  const navigate = useNavigate();

  // 비슷한 책 추천 조회
  const { data: recommendData } = useSuspenseQuery({
    queryKey: ["recommend", bookId],
    queryFn: () => getRecommendbook(bookId),
  });
  console.log("recommendData", recommendData);

  const handleBookClick = (userBookId: number) => {
    navigate(`/book/${userBookId}`);
  };

  return (
    <div className="grid grid-cols-4 gap-3">
      {recommendData ? (
        recommendData.map((book, index) => {
          return (
            <img
              key={index}
              src={book.cover}
              alt={book.title}
              width={80}
              className="rounded-e-md"
              onClick={() => handleBookClick(book.bookId)}
            />
          );
        })
      ) : (
        <div>추천 도서가 없습니다.</div>
      )}
    </div>
  );
};

export default DetailRecommendBook;
