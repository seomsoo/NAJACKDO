import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserBookDetail } from "api/bookApi";
import { postAddCartItem } from "api/cartApi";
import AddCart from "page/library/components/AddCart";
import BookRentalApply from "page/library/components/BookRentalApply";
import RentalBookDetail from "page/library/components/RentalBookDetail";
import { useNavigate, useParams } from "react-router-dom";
import SellerInfo from "../components/SellerInfo";
import DetectionInfo from "../components/DetectionInfo";
import SellerReview from "../components/SellerReview";
import DetailRecommendBook from "../components/DetailRecommendBook";

const RentalBookDetailPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const bookIdAsNumber = parseInt(bookId, 10);
  console.log("bookIdAsNumber", bookIdAsNumber);
  

  // 대여 도서 상세 정보 조회
  const {
    data: bookData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['bookdetail', bookIdAsNumber],
    queryFn: () => getUserBookDetail(bookIdAsNumber),
  });
  console.log("bookData", bookData);
  console.log("지은이", );


  
  const mutation = useMutation({
    mutationKey: ["ownerbookId"],
    mutationFn: postAddCartItem,
    
    onSuccess: () => {
      if (confirm("장바구니에 추가되었습니다.\n 장바구니로 이동하시겠습니까?")) {
        navigate('/cart');
      } else {
        navigate(0);
      }
    } 
  })

  const handleAddCartItem = (ownerbookId: number) => {
    mutation.mutate(ownerbookId)
  }

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }


  const seller = {
    nickname: bookData?.nickname,
    mannerScore: bookData?.mannerScore,
    locationName: bookData?.locationName,
    ondayPrice: bookData?.ondayPrice,
    bookStatus: bookData?.bookStatus,
  };

  
  return (
    <div>
      <div className="border-2">
        <RentalBookDetail imageUrl={bookData.frontImagePath} />
        <div className="m-4">
          <SellerInfo seller={seller} />
          {/* <BookInfo book={book} rental /> */}
          <DetectionInfo ripped={bookData.ripped} wornout={bookData.wornout}/>
          <SellerReview />
          <DetailRecommendBook bookId={bookIdAsNumber} />
      </div>
      </div>
      <div className="fixed bg-[#F8F6F3] bottom-0 w-screen max-w-[430px] border-t-[1px] pt-3 flex flex-row justify-center pb-7">
        <div onClick={() => handleAddCartItem(bookIdAsNumber)}>
          <AddCart />
        </div>
      </div>
    </div>
  );
};

export default RentalBookDetailPage;
