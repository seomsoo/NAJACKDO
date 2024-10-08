import { deleteInterestBookCase, postInterestBookCase } from "api/bookcaseApi";
import AlertModal from "components/common/AlertModal";
import { useEffect, useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface BookcaseContainerProps {
  userId: number;
  name: string;
  imageArray: string[];
  isFollowed?: boolean;
}

const BookcaseContainer = ({
  userId,
  name,
  imageArray,
  isFollowed,
}: BookcaseContainerProps) => {
  const [heart, setHeart] = useState<boolean>(isFollowed);
  const [open, setOpen] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    setHeart(isFollowed); // API로부터 받은 값을 상태에 반영
  }, [isFollowed]);

  const handleHeart = async () => {
    try {
      if (heart) {
        await deleteInterestBookCase(userId); // 관심 해제
        setAlertContent(`${name}님 책장 좋아요<br /> 취소가 완료되었습니다.`);
        setOpen(true);
      } else {
        await postInterestBookCase(userId); // 관심 등록
        setAlertContent(`${name}님 책장 좋아요가<br /> 완료되었습니다.`);
        setOpen(true);
      }
      setHeart(!heart); // 상태 변경
    } catch (error) {
      console.error("관심 도서 등록/해제 중 오류 발생:", error);
    }
  };
  const handleBookcaseClick = () => {
    navigate(`/library/bookcase/${userId}`);
  };

  return (
    <div className="my-5 bg-white/30 shadow rounded-lg p-4">
      <div className="flex flex-row justify-between items-center mb-2">
        <p className="text-base font-semibold" onClick={handleBookcaseClick}>
          {name}님의 책장
        </p>
        <div onClick={handleHeart}>
          {heart ? (
            <IoHeart size={25} color="#D96363" />
          ) : (
            <IoHeartOutline size={25} color="#D96363" />
          )}
        </div>
        {open && (
          <AlertModal open={open} setOpen={setOpen} content={alertContent} />
        )}
      </div>
      <div
        onClick={handleBookcaseClick}
        className="flex overflow-x-auto cursor-pointer whitespace-nowrap space-x-5 scrollbar-hide"
      >
        {imageArray.map((item, index) => (
          <img
            key={index}
            src={item}
            className="w-20 h-28  rounded-sm shadow-xl"
            alt="book"
          />
        ))}
      </div>
    </div>
  );
};

export default BookcaseContainer;
