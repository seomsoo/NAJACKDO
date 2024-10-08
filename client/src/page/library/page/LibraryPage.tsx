import { useQuery } from "@tanstack/react-query";
import { getInterestbook } from "api/bookApi";
import { getMyBookCase } from "api/bookcaseApi";
import Error from "components/common/Error";
import Loading from "components/common/Loading";
import LibraryHeader from "page/library/components/LibraryHeader";
import { SlArrowRight } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

const LibraryPage = () => {
  const navigate = useNavigate();
  const goToMyFavorite = () => {
    navigate("/library/my-favorite");
  };
  const goToMyBookCase = () => {
    navigate("/library/my-bookcase");
  };
  const goToMyHistory = () => {
    navigate("/library/my-history");
  };

  // 나의 책장 이미지 목록 가져오기
  const {
    data: myBookCase,
    isLoading: isMyBookCaseLoading,
    isError: isMyBookCaseError,
  } = useQuery({
    queryKey: ["myBookCase"],
    queryFn: getMyBookCase,
  });

  // 관심 도서 이미지 목록 가져오기 (My Favorite)
  const {
    data: interestBooks,
    isLoading: isInterestBooksLoading,
    isError: isInterestBooksError,
  } = useQuery({
    queryKey: ["interestBooks"],
    queryFn: getInterestbook,
  });

  if (isInterestBooksLoading || isMyBookCaseLoading) return <Loading />;

  if (isInterestBooksError || isMyBookCaseError) return <Error />;

  const myBookCaseImages =
    myBookCase?.displayBooks.slice(0, 3).map((book) => book.cover) || [];

  const favoriteImages =
    interestBooks?.slice(0, 3).map((book) => book.cover) || [];

  return (
    <div>
      <LibraryHeader />
      <main className="px-6">
        <section className="flex flex-col gap-7">
          <nav>
            <button onClick={goToMyBookCase}>
              <article className="flex items-center mb-4">
                <span className="font-bold text-2xl">나의 책장</span>
                <SlArrowRight className="ml-2 text-[#807B7B] text-xl" />
              </article>
              <article>
                <div className="flex justify-start gap-8 mx-5">
                  {myBookCaseImages.length > 0 ? (
                    myBookCaseImages.map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt={`bookcase-${index}`}
                        className="w-20 h-28 object-cover shadow-book-shadow rounded-r-lg rounded-br-lg"
                      />
                    ))
                  ) : (
                    <span className="hakgyo text-2xl items-center ml-16 mt-10 mb-12">
                      나의 책장이 비었어요.
                    </span>
                  )}
                </div>
                <img src="/images/Library/bar.png" alt="bar" />
              </article>
            </button>
          </nav>

          {/* My Favorite 섹션 */}
          <nav>
            <button onClick={goToMyFavorite}>
              <article className="flex items-center mb-4">
                <span className="font-bold text-2xl">내가 좋아하는 책들</span>
                <SlArrowRight className="ml-2 text-[#807B7B] text-xl" />
              </article>
              <article>
                <div className="flex justify-start gap-8 mx-5">
                  {favoriteImages.length > 0 ? (
                    favoriteImages.map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt={`favorite-${index}`}
                        className="w-20 h-28 object-cover shadow-book-shadow rounded-r-lg rounded-br-lg"
                      />
                    ))
                  ) : (
                    <span className="hakgyo text-2xl  ml-16 mt-10 mb-12">
                      관심 도서가 없습니다.
                    </span>
                  )}
                </div>
                <img src="/images/Library/bar.png" alt="bar" />
              </article>
            </button>
          </nav>

          <nav>
            <button onClick={goToMyHistory}>
              <article className="flex items-center mb-3">
                <span className="font-bold text-2xl">책 히스토리</span>
                <SlArrowRight className="ml-2 text-[#807B7B] text-xl" />
              </article>
              <article
                style={{
                  boxShadow:
                    "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
                }}
                className=" rounded-lg pb-3 bg-[#edebe8] "
              >
                <div className="flex w-[340px] justify-around ml-1 ">
                  <img
                    src="/images/mannertree/씨앗.png"
                    className="w-4 h-4 mt-[106px]  "
                    alt="씨앗"
                  />

                  <img
                    src="/images/mannertree/새싹.png"
                    className="w-12 h-9 opacity-0 mt-[86px] animate-fadeIn delay-0"
                    alt="새싹"
                  />

                  <img
                    src="/images/mannertree/가지.png"
                    className="w-14 h-14 mt-[66px] opacity-0  animate-fadeIn delay-1"
                    alt="가지"
                  />
                  <img
                    src="/images/mannertree/나무.png"
                    className="w-[70px] h-[70px] mt-[52px] opacity-0  animate-fadeIn delay-2"
                    alt="나무"
                  />
                  <img
                    src="/images/mannertree/숲.png"
                    className="w-[85px] h-[85px] mt-[37px] opacity-0   animate-fadeIn delay-3"
                    alt="숲"
                  />
                </div>
                <img
                  src="/images/Library/bar.png"
                  className="w-[342px]"
                  alt="bar"
                />
              </article>
            </button>
          </nav>
        </section>
      </main>
    </div>
  );
};

export default LibraryPage;
