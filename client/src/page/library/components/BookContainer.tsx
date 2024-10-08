import { deleteInterestbook, postInterestbook } from "api/bookApi"; // API 호출 함수
import AlertModal from "components/common/AlertModal";
import { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface BookContainerProps {
  bookId: number;
  title: string;
  author: string;
  description: string;
  cover: string;
  isInterested: boolean;
}

const BookContainer = ({
  bookId,
  title,
  author,
  description,
  cover,
  isInterested,
}: BookContainerProps) => {
  const navigate = useNavigate();
  const [heart, setHeart] = useState(isInterested);
  const [open, setOpen] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<string>("");

  const handleHeart = async () => {
    try {
      if (heart) {
        await deleteInterestbook(bookId);
        setAlertContent("관심 도서가 해제되었습니다.");
        setOpen(true);
      } else {
        await postInterestbook(bookId);
        setAlertContent("관심 도서로 등록되었습니다.");
        setOpen(true);
      }
      setHeart(!heart);
    } catch (error) {}
  };

  const handleBookClick = () => {
    navigate(`/book/${bookId}`); // 책 클릭 시 해당 책 상세 페이지로 이동
  };

  return (
    <div className="flex py-3">
      <img
        onClick={handleBookClick}
        className="row-span-2 w-24 cursor-pointer h-40 max-h-40"
        src={cover}
        style={{
          boxShadow:
            "0 8px 8px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.1)",
        }}
        alt="BookContainer"
      />
      <div className="overflow-hidden ml-2 flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <p className="font-semibold" onClick={handleBookClick}>
            {title}
          </p>
          {/* 하트 버튼 */}
          <div className="ml-2 cursor-pointer" onClick={handleHeart}>
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
        <p className="text-sm font-medium" onClick={handleBookClick}>
          {author}
        </p>
        <p
          className="text-xs leading-normal mt-2 pr-4 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: description }}
          onClick={handleBookClick}
        ></p>
      </div>
    </div>
  );
};

export default BookContainer;
