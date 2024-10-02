import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import BookcaseContainer from 'page/library/components/BookcaseContainer';
import { RiArrowDownSLine } from 'react-icons/ri';
import { getUserInfo } from 'api/profileApi';
import { getNearBookCase } from 'api/locationApi';
import { useCallback, useEffect, useRef } from 'react';

const LocationPage = () => {
  const navigate = useNavigate();
  const goToLocationSetting = () => {
    navigate('/setting/location');
  };
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // 유저 위치 정보 가져오기
  const {
    data: userInfo,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });
  // 주변 책장 목록 조회
  const {
    data: bookcaseData,
    isLoading: isBookCaseLoading,
    isError: isBookCaseError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['nearBookCaseData'],
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
  bookcaseArray.map((bookcase, index) => console.log(bookcase));
  console.log('length', bookcaseArray[0]);

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
      rootMargin: '20px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [handleObserver]);

  if (isUserLoading || isBookCaseLoading) return <div>로딩 중...</div>;
  if (isUserError || isBookCaseError) return <div>오류가 발생했습니다.</div>;

  // const hasNeighbor = bookcaseData && bookcaseData.displayBooks?.length > 0;

  return (
    <div className="px-6">
      <button
        onClick={goToLocationSetting}
        className="flex  items-center py-4 mb-4"
      >
        <div className="text-2xl font-bold">
          <span className="text-[#79AC78]">
            {' '}
            {userInfo?.locationName.split(' ').slice(-1)[0] || ' '}
          </span>
          <span className="font-extrabold">&nbsp;주변 책장</span>
        </div>
        <RiArrowDownSLine className="text-3xl ml-2" />
      </button>
      {bookcaseArray.length > 0 ? (
        <div>
          <ul>
            {bookcaseArray.map((bookcase, index) => (
              <li key={index}>
                {bookcase.displayBooks?.length > 0 ? (
                  <BookcaseContainer
                    key={bookcase.userId}
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
            {isFetchingNextPage ? 'Loading more...' : ''}
          </div>
        </div>
      ) : (
        <div>
          <p className="text-center mt-16 text-lg font-semibold">
            주변에 책장이 없습니다.
          </p>
        </div>
      )}

      {/* {bookcaseData?.map((bookcase) => (
        <BookcaseContainer
          key={bookcase.userId}
          userId={bookcase.userId}
          name={bookcase.nickname}
          imageArray={bookcase.displayBooks.map((book) => book.cover)}
          isFollowed={true}
        />
      ))} */}
    </div>
  );
};

export default LocationPage;
