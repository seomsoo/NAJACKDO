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


  if (isInterestBooksError || isMyBookCaseError)
    return <Error />

  const myBookCaseImages =
    myBookCase?.displayBooks.slice(0, 3).map((book) => book.cover) || [];

  const favoriteImages =
    interestBooks?.slice(0, 3).map((book) => book.cover) || [];

  return (
    <div>
      <LibraryHeader />
      <main className="px-6">
        <section className="flex flex-col gap-10">
          <nav>
            <button onClick={goToMyBookCase}>
              <article className="flex items-center mb-7">
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
                    <span className="hakgyo text-2xl mt-10 mb-12">
                      나의 책장이 비었어요.
                    </span>
                  )}
                </div>
                <img src="/images/Library/bar.png" alt="bar" />
              </article>
            </button>
          </nav>

          <nav>
            <button onClick={goToMyHistory}>
              <article className="flex items-center mb-7">
                <span className="font-bold text-2xl">책 히스토리</span>
                <SlArrowRight className="ml-2 text-[#807B7B] text-xl" />
              </article>
              <article>
                <div className="flex justify-start gap-8 mx-5">
                  {/* dummy 이미지 */}
                  <img
                    src="ssafy.png"
                    className="w-20 h-28 object-cover"
                    alt="dummy"
                  />
                  <img
                    src="ssafy.png"
                    className="w-20 h-28 object-cover"
                    alt="dummy"
                  />
                  <img
                    src="ssafy.png"
                    className="w-20 h-28 object-cover"
                    alt="dummy"
                  />
                </div>
                <img src="/images/Library/bar.png" alt="bar" />
              </article>
            </button>
          </nav>

          {/* My Favorite 섹션 */}
          <nav>
            <button onClick={goToMyFavorite}>
              <article className="flex items-center mb-7">
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
                    <span className="hakgyo text-2xl mt-10 mb-12">
                      관심 도서가 없습니다.
                    </span>
                  )}
                </div>
                <img src="/images/Library/bar.png" alt="bar" />
              </article>
            </button>
          </nav>
        </section>
      </main>
    </div>
  );
};

export default LibraryPage;
