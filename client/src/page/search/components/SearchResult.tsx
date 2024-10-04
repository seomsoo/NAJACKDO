import { useSuspenseQuery } from "@tanstack/react-query";
import { getSearch } from "api/searchApi";
import { ISearch } from "atoms/Search.type";
import SearchResultBook from "page/search/components/SearchResultBook";
import { useEffect } from "react";

interface SearchResultProps {
  keyword: string;
}

const SearchResult = ({ keyword }: SearchResultProps) => {
  const { data: searchData, refetch } = useSuspenseQuery<ISearch[]>({
    queryKey: ["search", "result"],
    queryFn: () => getSearch(keyword),
  });

  useEffect(() => {
    refetch();
  }, [keyword])

  return (
    <div>
      <div className="ml-1 mt-4">
        <span>총 {searchData.length}개의 검색 결과가 있습니다.</span>
      </div>
      {/* 검색 결과 */}
      {searchData.length > 0 &&
        searchData.map((search, index) => {
          return <SearchResultBook key={index} search={search} />;
        })}
    </div>
  );
};

export default SearchResult;
