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
  const [keyboard, setKeyboard] = useState(0); // 키보드 높이를 저장하는 상태



  if (bookGenre) {
    console.log("bookGenre", bookGenre);
  }


  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const keyboardHeight = window.innerHeight - window.visualViewport.height;
        setKeyboard(keyboardHeight > 0 ? keyboardHeight : 0);
      }
    };

    window.visualViewport?.addEventListener("resize", handleResize);
    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Fragment>
      <ErrorBoundary fallback={<SmallError />}>
        <Suspense fallback={<Loading />}>
          <RentalBookInfo
            bookId={Number(bookId)}
            userId={userId}
            setIsOwner={setIsOwner}
            setPrice={setPrice}
            setBookGenre={setBookGenre}
          />
          <div className="fixed bg-[#F8F6F3] bottom-0 w-screen max-w-[430px] pt-3 flex flex-row justify-center pb-7"
            style={{
              transform: `translateY(-${keyboard}px)`,
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
