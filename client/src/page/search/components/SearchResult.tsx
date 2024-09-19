import SearchResultBook from "page/search/components/SearchResultBook";

const SearchResult = () => {
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
