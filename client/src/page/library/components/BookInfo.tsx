import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import {
  deleteInterestbook,
  getBookDetail,
  postInterestbook,
} from "api/bookApi";
import AlertModal from "components/common/AlertModal";
import CategoryTag from "components/common/CategoryTag";
import CenterCropImage from "page/library/components/CenterCropImage";
import { Fragment, useState } from "react";
import { IoChevronBack, IoHeart, IoHeartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface BookInfoProps {
  bookId: number;
  rental?: boolean;
}
const BookInfo = ({ bookId, rental }: BookInfoProps) => {
  // 도서 상세 정보 조회
  const { data: bookData } = useSuspenseQuery({
    queryKey: ["bookdetail"],
    queryFn: () => getBookDetail(bookId),
  });

  const authorList = bookData.author.replace(" (지은이)", "").split(", ");
  const author =
    authorList.length > 1
      ? authorList[0] + " 외 " + (authorList.length - 1) + "명"
      : authorList[0];
  const [heart, setHeart] = useState(bookData.interest);
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const deleteMutation = useMutation({
    mutationKey: ["deleteInterestbook"],
    mutationFn: deleteInterestbook,

    onSuccess: () => {
      setHeart(false);
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
          <IoChevronBack size={25} color="#FFFFFF" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center p-4 h-80">
          <img
            src={bookData.cover}
            alt="사진 커버"
            width={180}
            className="z-20"
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
                <Fragment>
                  <IoHeart size={30} color="#D96363" />
                  {open && (
                    <AlertModal
                      open={open}
                      setOpen={setOpen}
                      content="관심도서로 등록되었습니다."
                    />
                  )}
                </Fragment>
              ) : (
                <Fragment>
                  <IoHeartOutline size={30} color="#D96363" />
                  {open && (
                    <AlertModal
                      open={open}
                      setOpen={setOpen}
                      content="관심도서에서 해제되었습니다."
                    />
                  )}
                </Fragment>
              )}
            </div>
          ) : null}
        </div>
        <p>{author} 지음</p>
        <CategoryTag category={bookData.genre} />
        <p
          dangerouslySetInnerHTML={{ __html: bookData.description }}
          className="my-8"
        ></p>
        <p className="font-bold">중고가 : {bookData.priceStandard}</p>
      </div>
    </div>
  );
};

export default BookInfo;
