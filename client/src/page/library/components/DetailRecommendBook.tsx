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
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <div className="mt-10 mb-6">
      <p className="font-bold mb-3">추천 도서</p>
      <div className="grid grid-cols-4 gap-3">
        {recommendData ? 
        (recommendData.map((book, index) => {
          return (
            <img
              src={book.cover}
              alt={book.title}
              width={80}
              className="rounded-e-md"
            />
        );
        })) : null}
      </div>
    </div>
  );
};

export default DetailRecommendBook;
