import ClipLoading from "components/common/ClipLoading";
import Loading from "components/common/Loading";
import SmallError from "components/common/SmallError";
import BookInfo from "page/library/components/BookInfo";
import DetailRecommendBook from "page/library/components/DetailRecommendBook";
import RentableBook from "page/library/components/RentableBook";
import { Fragment, Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router-dom";

const BookDetailPage = () => {
  const { bookId } = useParams();
  const [bookGenre, setBookGenre] = useState<string>("");

  const [isPwa, setIsPwa] = useState(false);

  useEffect(() => {
    // iOS에서 PWA로 실행되고 있는지 확인
    const checkPwaMode = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;
    setIsPwa(checkPwaMode);
  }, []);

  return (
    <Fragment>
      <ErrorBoundary fallback={<SmallError />}>
        <Suspense fallback={<Loading />}>
          <BookInfo bookId={Number(bookId)} setBookGenre={setBookGenre} />
          <div className="mx-[25px]">
            <RentableBook bookId={Number(bookId)} />
          </div>
        </Suspense>
      </ErrorBoundary>
      <div className="mx-[25px] mt-10">
        <p className="my-5 font-bold">추천 도서</p>
        {bookGenre && (
          <ErrorBoundary fallback={<SmallError />}>
            <Suspense fallback={<ClipLoading />}>
              <DetailRecommendBook
                bookId={Number(bookId)}
                bookGenre={bookGenre}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </div>
    </Fragment>
  );
};

export default BookDetailPage;
