import { useSuspenseQuery } from "@tanstack/react-query";
import { getRecommendbook } from "api/bookApi";
import { useNavigate } from "react-router-dom";

interface DetailRecommendBookProps {
  bookId: number;
  bookGenre: string;
}

const DetailRecommendBook = ({
  bookId,
  bookGenre,
}: DetailRecommendBookProps) => {
  const navigate = useNavigate();
  console.log("detail recommend book", bookGenre, typeof bookGenre);

  // 비슷한 책 추천 조회
  const { data: recommendData } = useSuspenseQuery({
    queryKey: ["recommend", bookId],
    queryFn: () => getRecommendbook(bookId, bookGenre),
  });
  // console.log("recommendData", recommendData);

  const handleBookClick = (userBookId: number) => {
    navigate(`/book/${userBookId}`);
  };

  return (
    <div className="grid mt-4 grid-cols-4 gap-3">
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
              style={{
                boxShadow:
                  "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
              }}
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
