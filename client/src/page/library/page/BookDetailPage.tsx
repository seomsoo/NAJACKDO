import { useMutation, useQuery } from "@tanstack/react-query";
import { getBookDetail, postTimeSpent } from "api/bookApi";
import Loading from "components/common/Loading";
import BookInfo from "page/library/components/BookInfo";
import DetailRecommendBook from "page/library/components/DetailRecommendBook";
import RentableBook from "page/library/components/RentableBook";
import { Suspense, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BookDetailPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  // 도서 상세 정보 조회
  const {
    data: bookData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookdetail"],
    queryFn: () => getBookDetail(Number(bookId)),
  });

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

    const handleTimeSpent = () => {
      console.log("페이지 이탈");
      const endTime = new Date();
      const timeSpent = Math.floor(
        (endTime.getTime() - startTime.getTime()) / 1000
      ); // sec
      if (bookData?.genre) {
        mutation.mutate({
          bookId: bookId,
          genre: bookData.genre,
          timeSpent: timeSpent,
        });
      }
    };

    window.addEventListener("beforeunload", handleTimeSpent);

    return () => {
      handleTimeSpent();
      window.removeEventListener("beforeunload", handleTimeSpent);
    };
  }, [navigate]);

  return (
    <Suspense fallback={<Loading />}>
      <BookInfo bookId={Number(bookId)} />
      <div className="mx-[25px]">
        <RentableBook bookId={Number(bookId)} />
        <DetailRecommendBook bookId={Number(bookId)} />
      </div>
    </Suspense>
  );
};

export default BookDetailPage;
