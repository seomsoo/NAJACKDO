import Loading from "components/common/Loading";
import SmallError from "components/common/SmallError";
import SearchInput from "page/search/components/SearchInput";
import SearchResult from "page/search/components/SearchResult";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useSearchParams } from "react-router-dom";

const SearchResultPage = () => {
  const [searchText, setSearchText] = useState("");

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  const handleSearchText = (e) => {
    const value = e.target.value;
    setSearchText(value);
  };

  return (
    <ErrorBoundary fallback={<SmallError />}>
      <Suspense fallback={<Loading />}>
        <div className="mx-4">
          {/* 검색어 입력 창 */}
          <SearchInput
            handleSearchText={handleSearchText}
            searchText={searchText}
          />
          {/* 검색 결과 */}
          <SearchResult keyword={keyword} />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default SearchResultPage;
