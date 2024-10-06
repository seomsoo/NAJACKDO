import { useMutation } from "@tanstack/react-query";
import { deleteInterestbook, postInterestbook } from "api/bookApi";
import { ISearch } from "atoms/Search.type";
import AlertModal from "components/common/AlertModal";
import CategoryTag from "components/common/CategoryTag";
import { useState } from "react";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface SearchResultBookProps {
  search: ISearch;
}

const SearchResultBook = ({ search }: SearchResultBookProps) => {
  const navigate = useNavigate();
  const [interestBook, setInterestBook] = useState(search.interest);
  const [open, setOpen] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<string>("");

  const applyInterest = useMutation({
    mutationKey: ["book", "interest", "apply"],
    mutationFn: () => postInterestbook(search.bookId),

    onSuccess: () => {
      setInterestBook(true);
      setAlertContent("관심 도서로 등록되었습니다.");
      setOpen(true);
    },
  });

  const cancelInterest = useMutation({
    mutationKey: ["book", "interest", "cancel"],
    mutationFn: () => deleteInterestbook(search.bookId),

    onSuccess: () => {
      setInterestBook(false);
      setAlertContent("관심 도서에서 해제되었습니다.");
      setOpen(true);
    },
  });

  const handleInterest = () => {
    if (interestBook) {
      cancelInterest.mutate();
    } else {
      applyInterest.mutate();
    }
  };

  const handleClick = () => {
    navigate(`/book/${search.bookId}`);
  };

  return (
    <div className="flex flex-row relative py-4 border-b-[1px]">
      <img
        src={search.cover}
        alt={search.title}
        width={108}
        height={168}
        onClick={handleClick}
      />
      <div className="px-3 py-1" onClick={handleClick}>
        <p className="font-bold">{search.title}</p>
        <p className="my-2 text-sm">{search.author}</p>
        <p>중고가 : {search.priceStandard}원</p>
        <div className="flex flex-row mt-1">
          <CategoryTag category={search.genre} />
        </div>
      </div>
      <div onClick={handleInterest}>
        {interestBook ? (
          <IoHeartSharp
            size={25}
            color="#D96363"
            className="absolute right-0 bottom-4 cursor-pointer"
          />
        ) : (
          <IoHeartOutline
            size={25}
            color="#D96363"
            className="absolute right-0 bottom-4 cursor-pointer"
          />
        )}
      </div>
      {open && (
        <AlertModal open={open} setOpen={setOpen} content={alertContent} />
      )}
    </div>
  );
};

export default SearchResultBook;
