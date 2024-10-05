import Loading from "components/common/Loading";
import BookInfo from "page/library/components/BookInfo";
import DetailRecommendBook from "page/library/components/DetailRecommendBook";
import RentableBook from "page/library/components/RentableBook";
import { Suspense } from "react";
import { useParams } from "react-router-dom";

const BookDetailPage = () => {
  const { bookId } = useParams();

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
