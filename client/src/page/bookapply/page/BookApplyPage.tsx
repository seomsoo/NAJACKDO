import { useMutation, useQuery } from "@tanstack/react-query";
import { getBookInfo, postRegisterBook } from "api/bookApi";
import ApplyBookInfo from "page/bookapply/components/ApplyBookInfo";
import { HiOutlineCamera } from "react-icons/hi2";
import { IoChevronBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

const BookApplyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { kind, keyword } = location.state;
  console.log("kind", kind);
  console.log("keyword", keyword);

  const {
    data: bookInfo,
    isLoading: bookInfoLoading,
    isError,
  } = useQuery({
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
      console.log("apply error", error)
    }
  });

  const handleApply = () => {
    console.log("isbn", bookInfo.isbn);
    if (bookInfo.isbn) {
      mutation.mutate(bookInfo.isbn);
    }
  };

  if (bookInfoLoading) {
    return <div>Loading...</div>;
  }

  if (bookInfo) {
    console.log("bookInfo", bookInfo);
  }

  return (
    <div>
      <div
        onClick={() => navigate(-1)}
        className="cursor-pointer p-4 flex flex-row items-center"
      >
        <IoChevronBack size={25} color="#545454" />
        <span className="font-bold text-xl ml-2">
          도서 등록 - 도서 단일 촬영
        </span>
      </div>
      <div className="px-[25px]">
        <div className="flex flex-col items-center">
          <span className="font-bold text-base mb-4">도서 표지</span>
          <img
            src={bookInfo.cover}
            alt={bookInfo.title}
            width={200}
            height={270}
          />
        </div>
        <div>
          <p className="font-bold text-base text-center my-4">등록 도서 정보</p>
          <ApplyBookInfo book={bookInfo} />
          <div className="flex flex-row justify-center items-center  ml-auto bg-[#C0C78C] py-1 mt-2 rounded-lg w-5/12" onClick={() => navigate("/apply/isbn")}>
            <span className="text-white font-bold text-sm">
              도서 다시 촬영하기
            </span>
            <HiOutlineCamera color="white" className="ml-1" />
          </div>
        </div>
        <div className="flex flex-row justify-center space-x-6 my-8">
          <button
            className="bg-[#D96363] text-white text-sm font-bold rounded-lg px-8 py-3"
            onClick={() => navigate("/library")}
          >
            등록 취소
          </button>
          <button
            className="bg-[#776B5D] text-white text-sm font-bold rounded-lg px-8 py-3"
            onClick={handleApply}
          >
            등록하기(총 1권)
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookApplyPage;
