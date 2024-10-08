import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import {
  deleteInterestbook,
  getBookDetail,
  postInterestbook,
  postTimeSpent,
} from "api/bookApi";
import AlertModal from "components/common/AlertModal";
import CategoryTag from "components/common/CategoryTag";
import CenterCropImage from "page/library/components/CenterCropImage";
import { useEffect, useState } from "react";
import { IoChevronBack, IoHeart, IoHeartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface BookInfoProps {
  bookId: number;
  rental?: boolean;
  setBookGenre?: (genre: string) => void;
}
const BookInfo = ({ bookId, rental, setBookGenre }: BookInfoProps) => {
  const navigate = useNavigate();

  // 도서 상세 정보 조회
  const { data: bookData } = useSuspenseQuery({
    queryKey: ["bookdetail", bookId],
    queryFn: () => getBookDetail(bookId),
  });

  if (bookData) {
    setBookGenre(bookData.genre);
  }

  const mutation = useMutation({
    mutationKey: ["RentalCostData"],
    mutationFn: postTimeSpent,
  });

  // 페이지 체류 시간 계산
  useEffect(() => {
    const startTime = new Date();

    const handleTimeSpent = () => {
      const endTime = new Date();
      const timeSpent = Math.floor(
        (endTime.getTime() - startTime.getTime()) / 1000
      ); // sec
      if (bookData?.genre) {
        mutation.mutate({
          bookId: bookId,
          genre: bookData.genre,
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

  const authorList = bookData.author.replace(" (지은이)", "").split(", ");
  const author =
    authorList.length > 1
      ? authorList[0] + " 외 " + (authorList.length - 1) + "명"
      : authorList[0];
  const [heart, setHeart] = useState(bookData.interest);
  const [open, setOpen] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<string>("");

  useEffect(() => {
    setHeart(bookData.interest);
  }, [bookData.interest]);

  const deleteMutation = useMutation({
    mutationKey: ["deleteInterestbook"],
    mutationFn: deleteInterestbook,

    onSuccess: () => {
      setHeart(false);
      setAlertContent("관심 도서에서 삭제되었습니다.");
      setOpen(true);
    },

    onError: (error) => {
      console.log("관심도서 삭제 실패", error);
    },
  });

  const postMutation = useMutation({
    mutationKey: ["postInterestbook"],
    mutationFn: postInterestbook,

    onSuccess: () => {
      setHeart(true);
      setAlertContent("관심 도서로 등록되었습니다.");
      setOpen(true);
    },

    onError: (error) => {
      console.log("관심도서 추가 실패", error);
    },
  });

  const handleHeart = () => {
    if (heart) {
      deleteMutation.mutate(bookData.bookId);
    } else {
      postMutation.mutate(bookData.bookId);
    }
  };

  return (
    <div>
      {/* 상단 이미지 */}
      <div className="relative w-full h-72 object-cover">
        <CenterCropImage imageUrl={bookData.cover} />
        <div
          onClick={() => navigate(-1)}
          className="cursor-pointer absolute left-0 top-0 z-10 p-4"
        >
          <IoChevronBack size={25} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center p-4 h-80">
          <img
            src={bookData.cover}
            alt="사진 커버"
            width={180}
            className="z-20"
            style={{
              boxShadow:
                "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>
      </div>
      {/* 하단 책 정보 */}
      <div className="mx-[25px] mt-11">
        <div className="flex flex-row justify-between items-center">
          <p className="text-xl font-bold">{bookData.title}</p>
          {!rental ? (
            <div className="ml-2" onClick={handleHeart}>
              {heart ? (
                <IoHeart size={30} color="#D96363" />
              ) : (
                <IoHeartOutline size={30} color="#D96363" />
              )}
            </div>
          ) : null}
          {open && (
            <AlertModal open={open} setOpen={setOpen} content={alertContent} />
          )}
        </div>
        <p className="my-2">{author} 지음</p>
        <CategoryTag category={bookData.genre} />
        <p
          dangerouslySetInnerHTML={{ __html: bookData.description }}
          className="my-6"
        ></p>
        <p className="font-extrabold text-lg text-right">
          중고가 : {bookData.priceStandard.toLocaleString()}원
        </p>
      </div>
    </div>
  );
};

export default BookInfo;
