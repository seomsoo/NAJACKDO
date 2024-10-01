import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserBookDetail } from "api/bookApi";
import { postAddCartItem } from "api/cartApi";
import AddCart from "page/library/components/AddCart";
import RentalBookDetail from "page/library/components/RentalBookDetail";
import { useNavigate, useParams } from "react-router-dom";
import SellerInfo from "../components/SellerInfo";
import DetectionInfo from "../components/DetectionInfo";
import SellerReview from "../components/SellerReview";
import DetailRecommendBook from "../components/DetailRecommendBook";
import { getUserInfo } from "api/profileApi";
import UpdatePrice from "../components/UpdatePrice";

const RentalBookDetailPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const bookIdAsNumber = parseInt(bookId, 10);
  

  // 대여 도서 상세 정보 조회
  const {
    data: bookData,
    isLoading: isDetailLoading,
    isError: isDetailError,
  } = useQuery({
    queryKey: ['bookdetail', bookIdAsNumber],
    queryFn: () => getUserBookDetail(bookIdAsNumber),
  });
  
  // 로그인된 사용자 정보 가져오기
  const {
    data: loggedInUser,
    isLoading: isUserInfoLoading,
    isError: isUserInfoError,
  } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });
  
  
  
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
  
  if (isDetailLoading || isUserInfoLoading) {
    return <div>Loading...</div>;
  }
  
  if (isDetailError || isUserInfoError) {
    return <div>오류가 발생했습니다.</div>;
  }
  
  const isMyBook = bookData.ownerId === loggedInUser.userId;

  console.log("내 책인가?", bookData.ownerId === loggedInUser.userId);

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
          <SellerReview nickname={bookData?.nickname}/>
          <p className="mt-5 font-bold mb-3">추천 도서</p>
          <DetailRecommendBook bookId={bookIdAsNumber} />
      </div>
      </div>
      <div className="fixed bg-[#F8F6F3] bottom-0 w-screen max-w-[430px] border-t-[1px] pt-3 flex flex-row justify-center pb-7">
        <div onClick={() => handleAddCartItem(bookIdAsNumber)}>
          { !isMyBook ? <AddCart /> : (
            <UpdatePrice userBookId={bookIdAsNumber} price={bookData.ondayPrice / 100} />
          )
          }
        </div>
      </div>
    </div>
  );
};

export default RentalBookDetailPage;
