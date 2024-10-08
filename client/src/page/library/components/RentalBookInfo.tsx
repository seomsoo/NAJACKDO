import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { getUserBookDetail, postTimeSpent } from "api/bookApi";
import CategoryTag from "components/common/CategoryTag";
import DetectionInfo from "page/library/components/DetectionInfo";
import RentalBookDetail from "page/library/components/RentalBookDetail";
import SellerInfo from "page/library/components/SellerInfo";
import SellerReview from "page/library/components/SellerReview";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface RentalBookInfoProps {
  bookId: number;
  userId: number;
  setIsOwner: (isOwner: boolean) => void;
  setPrice: (price: number) => void;
  setBookGenre: (genre: string) => void;
}

const RentalBookInfo = ({
  bookId,
  userId,
  setIsOwner,
  setPrice,
  setBookGenre,
}: RentalBookInfoProps) => {
  const navigate = useNavigate();

  // 대여 도서 상세 정보 조회
  const { data: userBookData } = useSuspenseQuery({
    queryKey: ["bookdetail", "rental"],
    queryFn: () => getUserBookDetail(bookId),
  });

  if (userBookData) {
    setBookGenre(userBookData.genre);
  }

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

    const handleTimeSpent = () => {
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
    userBookData.inspectBackImagePath,
  ];
  return (
    <div>
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
      </div>
    </div>
  );
};

export default RentalBookInfo;
