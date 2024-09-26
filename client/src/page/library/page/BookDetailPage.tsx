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




  // const bookData = {
  //   title: "안녕, 푸바오",
  //   author: ["장린 지음"],
  //   genre: "에세이",
  //   category: ["동물 에세이", "포토 에세이"],
  //   content:
  //     "우리가 낳아 키운 푸바오는 한국을 떠나 잘 지내고 있을까? <br/> 5개월간 우리 곁을 떠났던 푸바오, <br/> 기나긴 그리움을 뚫고 포토에세이 《안녕, 푸바오》로 돌아왔다.",
  //   price: 15000,
  // };

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
        <DetailRecommendBook />
      </div>
    </div>
  );
};

export default BookDetailPage;
