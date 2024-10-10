import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { getBookInfo, postRegisterBook } from "api/bookApi";
import ApplyBookInfo from "page/bookapply/components/ApplyBookInfo";
import { HiOutlineCamera } from "react-icons/hi2";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

interface ApplyBookResultProps {
  kind: string;
  keyword: string;
  setOpen: (open: boolean) => void;
}

const ApplyBookResult = ({ kind, keyword, setOpen }: ApplyBookResultProps) => {
  const navigate = useNavigate();

  const { data: bookInfo } = useSuspenseQuery({
    queryKey: ["book", "apply"],
    queryFn: () => getBookInfo({ kind, keyword }),
  });

  const mutation = useMutation({
    mutationKey: ["book", "isbn"],
    mutationFn: postRegisterBook,

    onSuccess: () => {
      navigate("/library/my-bookcase");
    },

    onError: (error) => {
      setOpen(true);
    },
  });

  const handleApply = () => {
    if (bookInfo.isbn) {
      mutation.mutate(bookInfo.isbn);
    }
  };
  return (
    <Fragment>
      <div
        onClick={() => navigate("/apply")}
        className="cursor-pointer px-4 flex flex-row items-center"
      >
        <IoChevronBack size={25} color="#545454" />
        <span className="font-bold text-xl ml-2">도서 등록 - 도서 정보</span>
      </div>
      <div className="px-[25px]">
        <div className="flex flex-col items-center py-5">
          <img
            src={bookInfo.cover}
            alt={bookInfo.title}
            width={180}
            height={250}
          />
        </div>
        <div className="pt-5">
          <ApplyBookInfo book={bookInfo} />
        </div>
        <div className="flex flex-row justify-center space-x-4 my-8">
          <div
            className="flex flex-row justify-center items-center bg-sub1 px-5 py-2 rounded-lg cursor-pointer"
            onClick={() => navigate("/apply/isbn")}
          >
            <span className="text-white font-bold text-sm">
              도서 다시 촬영하기
            </span>
            <HiOutlineCamera color="white" className="ml-1" />
          </div>
          <button
            className="bg-sub7 text-white text-sm font-bold rounded-lg px-8 py-3"
            onClick={handleApply}
          >
            등록하기(총 1권)
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default ApplyBookResult;
