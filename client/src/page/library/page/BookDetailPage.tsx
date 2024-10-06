import ClipLoading from "components/common/ClipLoading";
import Loading from "components/common/Loading";
import BookInfo from "page/library/components/BookInfo";
import DetailRecommendBook from "page/library/components/DetailRecommendBook";
import RentableBook from "page/library/components/RentableBook";
import { Suspense } from "react";
import { useParams } from "react-router-dom";

const BookDetailPage = () => {
  const { bookId } = useParams();

  return (
    <>
      <Suspense fallback={<Loading />}>
        <BookInfo bookId={Number(bookId)} />
        <div className="mx-[25px]">
          <RentableBook bookId={Number(bookId)} />
        </div>
      </Suspense>
      <div className="mx-[25px] mt-10 mb-6">
        <p className="my-5 font-bold ">추천 도서</p>
        <Suspense fallback={<ClipLoading />}>
          <DetailRecommendBook bookId={Number(bookId)} />
        </Suspense>
      </div>
    </>
  );
};

export default BookDetailPage;
