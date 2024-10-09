import { useQuery } from "@tanstack/react-query";
import { getMyBookCase } from "api/bookcaseApi"; // API 호출 함수
import Error from "components/common/Error";
import Loading from "components/common/Loading";
import { BiBookAdd } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import MyBookGrid from "../components/MyBookGrid";

const MyBookCasePage = () => {
  const navigate = useNavigate();

  // 나의 책장 데이터 조회
  const {
    data: bookcase,
    isLoading: isBookcaseLoading,
    isError: isBookcaseError,
  } = useQuery({
    queryKey: ["myBookCase"],
    queryFn: getMyBookCase,
  });

  const goBack = () => {
    navigate(-1);
  };

  if (isBookcaseLoading) {
    return <Loading />;
  }

  if (isBookcaseError) {
    return <Error />;
  }

  const hasBooks = bookcase && bookcase.displayBooks?.length > 0;

  return (
    <div>
      <header className="top-0 z-10 bg-[#F8F6F3] flex items-center justify-between p-6 py-4">
        <div className="items-center flex gap-2">
          <button onClick={goBack} className="text-2xl">
            <IoIosArrowBack />
          </button>
          <span className="font-extrabold text-2xl">나의 책장</span>
        </div>
        <div className="flex justify-between text-3xl gap-5 text-[#545454]">
          <Link to="/apply">
            <BiBookAdd />
          </Link>
        </div>
      </header>

      <main className="px-6">
        <section className="flex flex-col items-center text-center mt-5 gap-4">
          {/* 책 데이터가 있을 때 */}
          {hasBooks ? (
            <MyBookGrid
              books={bookcase.displayBooks}
              userId={bookcase.userId} // userId를 BookGrid에 전달
            />
          ) : (
            // 책 데이터가 없을 때
            <div className="flex flex-col items-center mt-16">
              <img src="/book_icon.png" alt="book" className="w-40 h-40 mb-6" />
              <p className="text-lg font-semibold">
                책장이 텅 비었네요! 첫 책을 추가해보세요.
              </p>
              <Link
                to="/apply"
                className="mt-14 p py-4 w-full bg-main text-white rounded-lg hover:bg-[#4e5e42]"
              >
                책 추가하기
              </Link>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default MyBookCasePage;
