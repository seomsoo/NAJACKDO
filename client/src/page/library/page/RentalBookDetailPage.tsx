import ClipLoading from "components/common/ClipLoading";
import Loading from "components/common/Loading";
import SmallError from "components/common/SmallError";
import AddCart from "page/library/components/AddCart";
import DetailRecommendBook from "page/library/components/DetailRecommendBook";
import RentalBookInfo from "page/library/components/RentalBookInfo";
import { Fragment, Suspense, useState } from "react";
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
          <div className="fixed bg-[#F8F6F3] bottom-0 w-screen max-w-[430px] pt-3 flex flex-row justify-center pb-7">
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
