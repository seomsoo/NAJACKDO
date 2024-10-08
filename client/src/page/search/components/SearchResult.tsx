import { useInfiniteQuery } from "@tanstack/react-query";
import { getSearch } from "api/searchApi";
import ClipLoading from "components/common/ClipLoading";
import Error from "components/common/Error";
import SearchResultBook from "page/search/components/SearchResultBook";
import { useCallback, useEffect, useRef } from "react";

interface SearchResultProps {
  keyword: string;
}

const SearchResult = ({ keyword }: SearchResultProps) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    data: searchData,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["search"],
    queryFn: ({ pageParam = 0 }) => getSearch(keyword, pageParam as number),
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.last) {
        return pages.length;
      }
      return undefined;
    },
    initialPageParam: 0,
    enabled: !!keyword,
  });

  useEffect(() => {
    if (keyword) {
      refetch();
    }
  }, [keyword]);

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

  const totalElements = searchData?.pages?.[0]?.totalElements ?? 0;

  if (isLoading) {
    return <ClipLoading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <div>
      <div className="ml-1 mt-4">
        <span>총 {totalElements} 개의 검색 결과가 있습니다.</span>
      </div>

      {totalElements > 0 &&
        searchData.pages.map((page, pageIndex) => (
          <div key={pageIndex}>
            {page.content.map((search) => (
              <SearchResultBook key={search.bookId} search={search} />
            ))}
          </div>
        ))}

      <div ref={loadMoreRef}>{isFetchingNextPage && <ClipLoading />}</div>
    </div>
  );
};

export default SearchResult;
