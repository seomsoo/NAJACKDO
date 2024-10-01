import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserBookDetail } from "api/bookApi";
import { postAddCartItem } from "api/cartApi";
import RentalBookDetail from "page/library/components/RentalBookDetail";
import UpdatePrice from "page/library/components/UpdatePrice";
import { useNavigate, useParams } from "react-router-dom";

const MyRentalBookDetailPage = () => {

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

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }


  return (
    <div>
      <RentalBookDetail imageUrl={bookData.frontImagePath} />
      <div className="fixed bg-[#F8F6F3] bottom-0 w-screen max-w-[430px] border-t-[1px] pt-3 flex flex-row justify-center pb-7">
        <UpdatePrice userBookId={bookId} price={bookData.ondayPrice / 100} />
      </div>
    </div>
  );
};

export default MyRentalBookDetailPage;
