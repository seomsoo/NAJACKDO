import {
  getAutoSearchText,
  getPopularSearch,
  getRecentSearch,
} from "api/searchApi";
import { IAutoArray } from "atoms/Search.type";
import { Input } from "components/ui/input";
import { debounce } from "lodash";
import AutoSearch from "page/search/components/AutoSearch";
import PopularSearch from "page/search/components/PopularSearch";
import RecentSearch from "page/search/components/RecentSearch";
import RecommendBook from "page/search/components/RecommendBook";
import SearchResult from "page/search/components/SearchResult";
import { useCallback, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosSearch } from "react-icons/io";
import { useQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [autoSearchText, setAutoSearchText] = useState<IAutoArray>({
    list: [],
  });

  const [searchParam] = useSearchParams();
  const keywordText = searchParam.get("keyword");

  const goSearchResult = () => {
    navigate(`/search?keyword=${searchText}`);
  };

  // 인기 검색어 조회
  const {
    data: popularSearchData,
    isLoading: popularSearchLoading,
    isError: popularSearchError,
  } = useQuery<string[]>({
    queryKey: ["search", "popular"],
    queryFn: getPopularSearch,
  });

  // 최근 검색어 조회
  const {
    data: recentSearchData,
    isLoading: recentSearchLoading,
    isError: recentSearchError,
  } = useQuery<string[]>({
    queryKey: ["search", "recent"],
    queryFn: getRecentSearch,
  });

  // 자동완성 검색어 조회
  const fetchAutoSearchText = useCallback(
    debounce(async (keyword: string) => {
      try {
        const data = await getAutoSearchText(keyword);
        setAutoSearchText(data);
      } catch (error) {
        console.log("자동완성 검색어 조회에 실패했습니다.");
      }
    }, 500),
    []
  );

  const handlerSearchText = (e) => {
    setAutoSearchText({ list: [] });
    const value = e.target.value;
    setSearchText(value);
    fetchAutoSearchText(value);
  };

  useEffect(() => {
    return () => {
      fetchAutoSearchText.cancel(); // 컴포넌트 언마운트 시 debounce 취소
    };
  }, [fetchAutoSearchText]);

  if (popularSearchLoading || recentSearchLoading) {
    return <div>Loading...</div>;
  }

  if (recentSearchData) {
    console.log("최근 검색어", recentSearchData);
  }

  if (popularSearchData) {
    console.log("인기 검색어", popularSearchData);
  }

  return (
    <div className="mx-4 mt-8">
      {/* 검색어 입력 창 */}
      <div className="flex flex-row items-center relative">
        <IoIosArrowBack
          size={25}
          color="#545454"
          className="mr-2 cursor-pointer"
        />
        <Input
          className="bg-[#D9D9D9] border-none"
          placeholder="검색어를 입력해주세요."
          onChange={handlerSearchText}
        />
        <div
          className="absolute right-2 cursor-pointer"
          onClick={goSearchResult}
        >
          <IoIosSearch size={25} color="#545454" />
        </div>
      </div>
      {keywordText ? (
        <SearchResult keyword={keywordText} />
      ) : (
        <div
          className="flex-grow overflow-y-auto flex flex-col justify-between"
          style={{ height: "calc(100vh - 150px)" }}
        >
          {/* 검색어가 없을 때 */}
          {searchText === "" ? (
            <div>
              <PopularSearch popularData={popularSearchData} />
              <RecentSearch recentData={recentSearchData} />
            </div>
          ) : (
            autoSearchText?.list && (
              <AutoSearch autoSearch={autoSearchText.list} />
            )
          )}
          <RecommendBook />
        </div>
      )}
    </div>
  );
};

export default SearchPage;
