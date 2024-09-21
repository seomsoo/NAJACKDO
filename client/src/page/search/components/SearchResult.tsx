import { getSearch } from "api/searchApi";
import { ISearch } from "atoms/Search.type";
import SearchResultBook from "page/search/components/SearchResultBook";
import { useQuery } from "react-query";

interface SearchResultProps {
  keyword: string;
}

const SearchResult = ({ keyword }: SearchResultProps) => {
  // const {
  //   data: searchData,
  //   isLoading,
  //   isError,
  // } = useQuery<ISearch[]>({
  //   queryKey: ["search", "result"],
  //   queryFn: getSearch(keyword),
  // });

  return (
    <div>
      <div className="ml-1 mt-4">
        <span>총 352개의 검색 결과가 있습니다.</span>
      </div>
      <SearchResultBook />
      <SearchResultBook />
      <SearchResultBook />
      <SearchResultBook />
      <SearchResultBook />
    </div>
  );
};

export default SearchResult;
