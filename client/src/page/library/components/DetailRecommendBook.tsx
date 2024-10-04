import { useQuery } from "@tanstack/react-query";
import { getRecommendbook } from "api/bookApi";
import Loading from 'components/common/Loading';


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
    return <Loading />;
  }

  if (isError) {
    return (
      <div>
        <p className="mt-5 font-bold mb-3">추천 도서</p>
        <p>추천 도서가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-6">
        <p className="mt-5 font-bold mb-3">추천 도서</p>
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
        })) : <div>추천 도서가 없습니다.</div>}
      </div>
    </div>

  );
};

export default DetailRecommendBook;
