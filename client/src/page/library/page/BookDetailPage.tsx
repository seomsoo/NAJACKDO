import { getBookDetail } from "api/bookApi";
import BookInfo from "page/library/components/BookInfo";
import CenterCropImage from "page/library/components/CenterCropImage";
import DetailRecommendBook from "page/library/components/DetailRecommendBook";
import RentableBook from "page/library/components/RentableBook";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';


const BookDetailPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const bookIdAsNumber = parseInt(bookId, 10);
  console.log("bookIdAsNumber", bookIdAsNumber);


  // 다른 사용자의 책장 정보 조회
  const {
    data: bookData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['bookdetail', bookIdAsNumber],
    queryFn: () => getBookDetail(bookIdAsNumber),
  });
  console.log("bookData", bookData);
  console.log("지은이", );


  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <div>
      <div className="relative w-full h-72 object-cover">
        <CenterCropImage imageUrl={bookData.cover} />
        <div
          onClick={() => navigate(-1)}
          className="cursor-pointer absolute left-0 top-0 z-10 p-4"
        >
          <IoChevronBack size={25} color="#FFFFFF" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={bookData.cover} alt="사진 커버" width={180} className="z-20" />
        </div>
      </div>
      <div className="m-4">
        <BookInfo book={bookData} />
        <RentableBook />
        <DetailRecommendBook bookId={bookIdAsNumber} />
      </div>
    </div>
  );
};

export default BookDetailPage;
