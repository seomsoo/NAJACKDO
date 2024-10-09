import { getAutoSearchText } from "api/searchApi";
import { IAutoArray } from "atoms/Search.type";
import ClipLoading from "components/common/ClipLoading";
import Loading from "components/common/Loading";
import SmallError from "components/common/SmallError";
import AutoSearch from "page/search/components/AutoSearch";
import PopularSearch from "page/search/components/PopularSearch";
import RecentSearch from "page/search/components/RecentSearch";
import RecommendBook from "page/search/components/RecommendBook";
import SearchInput from "page/search/components/SearchInput";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

const SearchPage = () => {
  const [searchText, setSearchText] = useState("");
  const [autoSearchText, setAutoSearchText] = useState<IAutoArray>({
    list: [],
  });

  // 자동완성 검색어 조회
  const fetchAutoSearchText = async (keyword: string) => {
    try {
      const data = await getAutoSearchText(keyword);
      setAutoSearchText(data);
    } catch (error) {
      console.log("자동완성 검색어 조회에 실패했습니다.");
    }
  };

  const handleSearchText = (e) => {
    const value = e.target.value;
    setSearchText(value);
    setAutoSearchText({ list: [] });

    const koreanCombiningRegex = /[ㄱ-ㅎㅏ-ㅣ]/;

    if (!value || koreanCombiningRegex.test(value)) {
      return;
    }

    fetchAutoSearchText(value);
  };

  return (
    <div
      className="flex flex-col flex-1 justify-between"
      style={{ height: "calc(100vh - 153px)" }}
    >
      <ErrorBoundary fallback={<SmallError />}>
        <Suspense fallback={<Loading />}>
          <div className="mx-[25px]">
            {/* 검색어 입력 창 */}
            <SearchInput
              handleSearchText={handleSearchText}
              searchText={searchText}
            />
            <div className="flex-grow overflow-y-auto flex flex-col justify-between">
              {/* 검색어가 없을 때 */}
              {!searchText ? (
                <div>
                  <PopularSearch />
                  <RecentSearch />
                </div>
              ) : (
                autoSearchText?.list && (
                  <AutoSearch autoSearch={autoSearchText.list} />
                )
              )}
            </div>
          </div>
        </Suspense>
      </ErrorBoundary>
      <div className="mx-[25px]">
        <span className="font-bold">추천 도서</span>
        <ErrorBoundary fallback={<SmallError />}>
          <Suspense fallback={<ClipLoading className="h-[100px]" />}>
            <RecommendBook />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default SearchPage;
