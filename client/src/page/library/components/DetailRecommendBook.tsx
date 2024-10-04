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

  // if (isError) {
  //   return (
  //     <div>
  //       <p className="mt-5 font-bold mb-3">추천 도서</p>
  //       <p>추천 도서가 없습니다.</p>
  //     </div>
  //   );
  // }

  const handleBookClick = (userBookId: number) => {
    navigate(`/book/${userBookId}`);
  };

  return (
    <div className="mt-10 mb-6">
      <p className="mt-5 font-bold mb-3">추천 도서</p>
      <div className="grid grid-cols-4 gap-3">
        {recommendData ? (
          recommendData.map((book, index) => {
            return (
              <img
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
    </div>
  );
};

export default DetailRecommendBook;
