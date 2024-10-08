import ClipLoading from "components/common/ClipLoading";
import Loading from "components/common/Loading";
import SmallError from "components/common/SmallError";
import AddCart from "page/library/components/AddCart";
import DetailRecommendBook from "page/library/components/DetailRecommendBook";
import RentalBookInfo from "page/library/components/RentalBookInfo";
import { Fragment, Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router-dom";
import { useUserStore } from "store/useUserStore";
import UpdatePrice from "../components/UpdatePrice";

const RentalBookDetailPage = () => {
  const { bookId } = useParams();
  const userId = useUserStore.getState().userId;
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);
  const [bookGenre, setBookGenre] = useState<string>("");
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  if (bookGenre) {
    console.log("bookGenre", bookGenre);
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const offset = window.innerHeight - window.visualViewport.height;
        setKeyboardOffset(offset > 0 ? offset : 0);
      }
    };

    window.visualViewport?.addEventListener("resize", handleResize);
    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <Fragment>z
      <ErrorBoundary fallback={<SmallError />}>
        <Suspense fallback={<Loading />}>
          <RentalBookInfo
            bookId={Number(bookId)}
            userId={userId}
            setIsOwner={setIsOwner}
            setPrice={setPrice}
            setBookGenre={setBookGenre}
          />
          <div
            className="fixed bottom-0 bg-[#F8F6F3] w-screen max-w-[430px] pt-3 flex flex-row justify-center pb-7"
            style={{
              transform: `translateY(-${keyboardOffset}px)`,
            }}>
            {!isOwner ? (
              <AddCart ownerbookId={Number(bookId)} />
            ) : (
              <UpdatePrice userBookId={Number(bookId)} price={price} />
            )}
          </div>
        </Suspense>
      </ErrorBoundary>

      <div className="mx-[25px] mb-2">
        <span className="font-bold">추천 도서</span>
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

export default RentalBookDetailPage;
