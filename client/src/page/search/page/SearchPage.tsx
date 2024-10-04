import { getAutoSearchText } from "api/searchApi";
import { IAutoArray } from "atoms/Search.type";
import Loading from "components/common/Loading";
import AutoSearch from "page/search/components/AutoSearch";
import PopularSearch from "page/search/components/PopularSearch";
import RecentSearch from "page/search/components/RecentSearch";
import RecommendBook from "page/search/components/RecommendBook";
import SearchInput from "page/search/components/SearchInput";
import { Suspense, useState } from "react";

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
    <Suspense fallback={<Loading />}>
      <div className="mx-4 mt-8">
        {/* 검색어 입력 창 */}
        <SearchInput
          handleSearchText={handleSearchText}
          searchText={searchText}
        />
        <div
          className="flex-grow overflow-y-auto flex flex-col justify-between"
          style={{ height: "calc(100vh - 150px)" }}
        >
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
          <RecommendBook />
        </div>
      </div>
    </Suspense>
  );
};

export default SearchPage;
