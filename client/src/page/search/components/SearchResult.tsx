import { getSearch } from "api/searchApi";
import { ISearch } from "atoms/Search.type";
import SearchResultBook from "page/search/components/SearchResultBook";
import { useQuery } from "react-query";

interface SearchResultProps {
  keyword: string;
}

const SearchResult = ({ keyword }: SearchResultProps) => {
  console.log("keyword1", keyword);
  const {
    data: searchData,
    isLoading: searchLoading,
    isError: searchError,
  } = useQuery<ISearch[]>({
    queryKey: ["search", "result"],
    queryFn: () => getSearch(keyword),
  });

  if (searchLoading) {
    return <div>검색 중...</div>;
  }

  if (searchData) {
    console.log("searchData", searchData);
  }

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
