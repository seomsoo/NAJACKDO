import { Link, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { IoCartOutline, IoNotificationsOutline } from "react-icons/io5";
import { SlArrowRight } from "react-icons/sl";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "api/profileApi";
import { getInterestbook } from "api/interstbookApi";

const LibraryPage = () => {
  const navigate = useNavigate();
  const goToMyFavorite = () => {
    navigate("/library/my-favorite");
  };
  const goToMyLibrary = () => {
    navigate("/library/my-library");
  };
  const goToMyHistory = () => {
    navigate("/library/my-history");
  };

  // 유저 정보 가져오기 (닉네임)
  const {
    data: userInfo,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  });

  // 관심 도서 목록 가져오기 (My Favorite)
  const {
    data: interestBooks,
    isLoading: isInterestBooksLoading,
    isError: isInterestBooksError,
  } = useQuery({
    queryKey: ["interestBooks"],
    queryFn: getInterestbook,
  });

  // 로딩 상태 처리
  if (isUserLoading || isInterestBooksLoading) return <div>로딩 중...</div>;

  // 에러 상태 처리
  if (isUserError || isInterestBooksError) return <div>오류가 발생했습니다.</div>;

  // 관심 도서 이미지 3장만 추출
  const favoriteImages = interestBooks?.slice(0, 3).map((book) => book.cover) || [];

  return (
    <div>
      <header className="flex items-center justify-between p-4 px-6 mb-3 ">
        <span className="font-extrabold text-2xl">
          <span className="hakgyo text-3xl text-[#5F6F52]">{userInfo?.nickname || "사용자"}</span>
          님의 서재
        </span>
        <div className="flex justify-between text-3xl gap-3 text-[#545454]">
          <Link to="/search">
            <IoIosSearch />
          </Link>
          <Link to="/cart">
            <IoCartOutline />
          </Link>
          <Link to="/alarm">
            <IoNotificationsOutline />
          </Link>
        </div>
      </header>
      <main className=" px-6">
        <section className="flex flex-col gap-10">
          <nav>
            <button onClick={goToMyLibrary}>
              <article className="flex items-center mb-7">
                <span className="font-bold text-2xl">나의 책장</span>
                <SlArrowRight className="ml-2 text-[#807B7B] text-xl" />
              </article>
              <article>
                <div className="flex justify-center gap-8">
                  {/* dummy 이미지 */}
                  <img src="ssafy.png" className="w-20 h-28 object-cover" alt="dummy" />
                  <img src="ssafy.png" className="w-20 h-28 object-cover" alt="dummy" />
                  <img src="ssafy.png" className="w-20 h-28 object-cover" alt="dummy" />
                </div>
                <img src="/images/library/bar.png" alt="bar" />
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
                <div className="flex justify-center gap-8">
                  {/* dummy 이미지 */}
                  <img src="ssafy.png" className="w-20 h-28 object-cover" alt="dummy" />
                  <img src="ssafy.png" className="w-20 h-28 object-cover" alt="dummy" />
                  <img src="ssafy.png" className="w-20 h-28 object-cover" alt="dummy" />
                </div>
                <img src="/images/library/bar.png" alt="bar" />
              </article>
            </button>
          </nav>

          {/* My Favorite 섹션 */}
          <nav>
            <button onClick={goToMyFavorite}>
              <article className="flex items-center mb-7">
                <span className="font-bold text-2xl">My Favorite</span>
                <SlArrowRight className="ml-2 text-[#807B7B] text-xl" />
              </article>
              <article>
                <div className="flex justify-center gap-8">
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
                    <p>관심 도서가 없습니다.</p>
                  )}
                </div>
                <img src="/images/library/bar.png" alt="bar" />
              </article>
            </button>
          </nav>
        </section>
      </main>
    </div>
  );
};

export default LibraryPage;
