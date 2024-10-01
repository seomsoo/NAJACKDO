import { useQuery } from "@tanstack/react-query";
import { getRecommendbook } from "api/bookApi";

interface DetailRecommendBookProps {
  bookId: number;
}


const DetailRecommendBook = ({ bookId }: DetailRecommendBookProps) => {

  // 비슷한 책 추천 조회
  const {
    data: recommendData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['recommend', bookId],
    queryFn: () => getRecommendbook(bookId),
  });
  console.log("recommendData", recommendData);


  if (isLoading ) {
    return <div>추천 도서 조회 중...</div>;
  }

  if (isError) {
    return <div>추천 도서가 없습니다.</div>;
  }

  return (
    <div className="mt-10 mb-6">
      
      <div className="grid grid-cols-4 gap-3">
        {recommendData.map((book, index) => {
          return (
            <img
              src={book.cover}
              alt={book.title}
              width={80}
              className="rounded-e-md"
            />
        );
        })}
      </div>
    </div>
  );
};

export default DetailRecommendBook;
