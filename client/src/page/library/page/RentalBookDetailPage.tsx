import Loading from "components/common/Loading";
import AddCart from "page/library/components/AddCart";
import RentalBookInfo from "page/library/components/RentalBookInfo";
import { Suspense, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserStore } from "store/useUserStore";
import UpdatePrice from "../components/UpdatePrice";

const RentalBookDetailPage = () => {
  const { bookId } = useParams();
  const userId = useUserStore.getState().userId;
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);

  return (
    <Suspense fallback={<Loading />}>
      <RentalBookInfo
        bookId={Number(bookId)}
        userId={userId}
        setIsOwner={setIsOwner}
        setPrice={setPrice}
      />
      <div className="fixed bg-[#F8F6F3] bottom-0 w-screen max-w-[430px] border-t-[1px] pt-3 flex flex-row justify-center pb-7">
        {!isOwner ? (
          <AddCart ownerbookId={Number(bookId)} />
        ) : (
          <UpdatePrice userBookId={Number(bookId)} price={price / 100} />
        )}
      </div>
    </Suspense>
  );
};

export default RentalBookDetailPage;
