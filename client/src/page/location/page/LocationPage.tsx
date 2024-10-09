import { useInfiniteQuery } from "@tanstack/react-query";
import { getNearBookCase } from "api/locationApi";
import Loading from "components/common/Loading";
import BookcaseContainer from "page/library/components/BookcaseContainer";
import { useCallback, useEffect, useRef } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "store/useUserStore";

const LocationPage = () => {
  const navigate = useNavigate();
  const goToLocationSetting = () => {
    navigate("/edit/location");
  };
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // 유저 위치 정보 가져오기
  const location = useUserStore.getState().location;

  // 주변 책장 목록 조회
  const {
    data: bookcaseData,
    isLoading: isBookCaseLoading,
    isError: isBookCaseError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["nearBookCaseData"],
    queryFn: ({ pageParam = 0 }) => getNearBookCase(pageParam as number),
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.last) {
        return pages.length;
      }
      return undefined;
    },
    initialPageParam: 0,
  });
  const bookcaseArray =
    bookcaseData?.pages?.flatMap((page) => page.content) || [];

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const option = {
      root: null, // viewport as root
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [handleObserver]);

  if (isBookCaseLoading) return <Loading />;
  if (isBookCaseError) return <div>오류가 발생했습니다.</div>;

  return (
    <div className="px-6 ">
      <div className="flex flex-row justify-between mt-2 mb-6 items-center">
        <div className="text-2xl font-bold">
          <span className="text-sub8">
            {" "}
            {location.split(" ").slice(-1)[0] || " "}
          </span>
          <span className="font-extrabold">&nbsp;주변 책장</span>
        </div>
        <IoSettingsOutline
          size={20}
          className="text-3xl ml-2"
          onClick={goToLocationSetting}
        />
      </div>

      {bookcaseArray.length ? (
        <div>
          <ul>
            {bookcaseArray.map((bookcase, index) => (
              <li key={index}>
                {bookcase.displayBooks?.length > 0 ? (
                  <BookcaseContainer
                    key={index}
                    userId={bookcase.userId}
                    name={bookcase.nickname}
                    imageArray={bookcase.displayBooks.map((book) => book.cover)}
                    isFollowed={bookcase.follow}
                  />
                ) : null}
              </li>
            ))}
          </ul>
          <div ref={loadMoreRef} className="loading">
            {isFetchingNextPage ? "Loading more..." : ""}
          </div>
        </div>
      ) : (
        // 주변 책장 데이터가 없을 때
        <div className="flex flex-col items-center mt-40">
          <img src="/book_icon.png" alt="book" className="w-40 h-40 mb-6" />
          <p className="text-lg font-semibold">
            아직 주변 책장이 없어요! 조금 더 기다려주세요.
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationPage;
