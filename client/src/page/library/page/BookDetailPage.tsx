import { getBookDetail, postTimeSpent } from "api/bookApi";
import BookInfo from "page/library/components/BookInfo";
import CenterCropImage from "page/library/components/CenterCropImage";
import DetailRecommendBook from "page/library/components/DetailRecommendBook";
import RentableBook from "page/library/components/RentableBook";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from '@tanstack/react-query';
import useTimeSpent from "hooks/useTimeSpent";
import { useEffect } from "react";


const BookDetailPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const bookIdAsNumber = parseInt(bookId, 10);
  console.log("bookIdAsNumber", bookIdAsNumber);


  // 도서 상세 정보 조회
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

  

  const mutation = useMutation({
      mutationKey: ["RentalCostData"],
      mutationFn: postTimeSpent,
  
      onSuccess: () => {
        console.log("체류 시간 저장 성공");
      },
  
      onError: (error) => {
        console.log("체류 시간 저장 실패", error);
      },
    });


  // 페이지 체류 시간 계산
  useEffect(() => {
    const startTime = new Date();
    console.log("시작 시간:", startTime);

    const handleTimeSpent = () => {
      console.log("페이지 이탈");
      const endTime = new Date();
      const timeSpent =  Math.floor((endTime.getTime() - startTime.getTime())/1000); // sec
      if (bookData?.genre) {
        mutation.mutate({
          bookId: bookId,
          genre: bookData.genre,
          timeSpent: timeSpent
        });
      }

      console.log("페이지 체류 시간(ms):", timeSpent);

    };


    window.addEventListener('beforeunload', handleTimeSpent);

    return () => {
      handleTimeSpent(); 
      window.removeEventListener('beforeunload', handleTimeSpent);
    };

  }, [navigate]);
  

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }

  // useTimeSpent(bookIdAsNumber, bookData.genre);

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
        <p className="mt-5 font-bold mb-3">추천 도서</p>
        <DetailRecommendBook bookId={bookIdAsNumber} />
      </div>
    </div>
  );
};

export default BookDetailPage;
