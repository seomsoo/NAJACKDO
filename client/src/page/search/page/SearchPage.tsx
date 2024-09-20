import {
  getAutoSearchText,
  getPopularSearch,
  getRecentSearch,
} from "api/searchApi";
import { Input } from "components/ui/input";
import PopularSearch from "page/search/components/PopularSearch";
import RecentSearch from "page/search/components/RecentSearch";
import RecommendBook from "page/search/components/RecommendBook";
import SearchResult from "page/search/components/SearchResult";
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosSearch } from "react-icons/io";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [autoSearchText, setAutoSearchText] = useState<string[]>([]);

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
  // const fetchData = useCallback(
  //   debounce(async (keyword: string) => {
  //     try {
  //       const data = await getAutoSearchText(keyword);
  //       setAutoSearchText(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }, 500),
  //   []
  // );

  const handlerSearchText = async (e) => {
    setSearchText(e.target.value);

    // try {
    //   const data = await getAutoSearchText(e.target.value);
    //   setAutoSearchText(data);
    // } catch (error) {
    //   console.log("자동완성 검색어 조회에 실패했습니다.");
    // }
  };

  // useEffect(() => {
  //   console.log("자동완성 검색어", autoSearchText);
  // }, [autoSearchText]);

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
      <PopularSearch />
      {/* 검색어가 없을 때 */}
      {searchText === "" ? (
        <>
          <RecentSearch />
          <RecommendBook />
        </>
      ) : (
        <SearchResult />
      )}
    </div>
  );
};

export default SearchPage;
