import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { getUserBookDetail, postTimeSpent } from "api/bookApi";
import CategoryTag from "components/common/CategoryTag";
import DetailRecommendBook from "page/library/components/DetailRecommendBook";
import DetectionInfo from "page/library/components/DetectionInfo";
import RentalBookDetail from "page/library/components/RentalBookDetail";
import SellerInfo from "page/library/components/SellerInfo";
import SellerReview from "page/library/components/SellerReview";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RentalBookInfo = ({ bookId, userId, setIsOwner, setPrice }) => {
  const navigate = useNavigate();

  // 대여 도서 상세 정보 조회
  const { data: userBookData } = useSuspenseQuery({
    queryKey: ["bookdetail", "rental"],
    queryFn: () => getUserBookDetail(bookId),
  });

  const mutation = useMutation({
    mutationKey: ["RentalCostData"],
    mutationFn: postTimeSpent,

    onSuccess: () => {
      console.log("체류 시간 저장 성공");
    },

    onError: (error) => {
      console.log("체류 시간 저장 실패", error);
    },
  });

  // 페이지 체류 시간 계산
  useEffect(() => {
    if (userBookData?.ownerId === userId) return;

    const startTime = new Date();
    console.log("시작 시간:", startTime);

    const handleTimeSpent = () => {
      console.log("페이지 이탈");
      const endTime = new Date();
      const timeSpent = Math.floor(
        (endTime.getTime() - startTime.getTime()) / 1000
      ); // sec
      if (userBookData?.genre) {
        mutation.mutate({
          bookId: bookId,
          genre: userBookData.genre,
          timeSpent: timeSpent,
        });
      }

      console.log("페이지 체류 시간(ms):", timeSpent);
    };

    window.addEventListener("beforeunload", handleTimeSpent);

    return () => {
      handleTimeSpent();
      window.removeEventListener("beforeunload", handleTimeSpent);
    };
  }, [navigate]);

  const seller = {
    nickname: userBookData.nickname,
    profileImage: userBookData.profileImage,
    mannerScore: userBookData.mannerScore,
    locationName: userBookData.locationName,
    ondayPrice: userBookData.ondayPrice,
    bookStatus: userBookData.bookStatus,
  };

  useEffect(() => {
    setIsOwner(userBookData.ownerId === userId);
    setPrice(userBookData.ondayPrice);
  }, []);
  const images = [
    userBookData.frontImagePath,
    userBookData.backImagePath,
    userBookData.inspectFrontImagePath,
    userBookData.inspectBackImagePath
  ];
  return (
    <div className="border-2">
      <RentalBookDetail images={images} />
      <div className="m-4 mt-11">
        <SellerInfo seller={seller} />
        <div>
          <p className="text-xl font-bold">{userBookData.bookTitle}</p>
          <p className="my-2">{userBookData.bookAuthor} 지음</p>
          <CategoryTag category={userBookData.genre} />
          <p
            dangerouslySetInnerHTML={{ __html: userBookData.bookDescription }}
            className="my-8"
          ></p>
        </div>
        <DetectionInfo
          ripped={userBookData.ripped}
          wornout={userBookData.wornout}
        />
        <SellerReview nickname={userBookData.nickname} />
        <span className="font-bold">추천 도서</span>
        <DetailRecommendBook bookId={bookId} />
      </div>
    </div>
  );
};

export default RentalBookInfo;
