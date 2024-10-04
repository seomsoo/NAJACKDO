import { useQuery } from "@tanstack/react-query";
import { getAutoSearchText, getPopularSearch, getRecentSearch } from "api/searchApi";
import { IAutoArray } from "atoms/Search.type";
import Loading from "components/common/Loading";
import { Input } from "components/ui/input";
import AutoSearch from "page/search/components/AutoSearch";
import PopularSearch from "page/search/components/PopularSearch";
import RecentSearch from "page/search/components/RecentSearch";
import RecommendBook from "page/search/components/RecommendBook";
import { useState } from "react";
import { IoIosArrowBack, IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [autoSearchText, setAutoSearchText] = useState<IAutoArray>({
    list: [],
  });

  const handleMoveBack = () => {
    if (window.location.pathname === "/search/result") {
      navigate("/search");
    } else if (window.location.pathname.startsWith("/search")) {
      navigate(-1);
    }
  };

  const goSearchResult = () => {
    if (searchText === "") {
      return alert("검색어를 입력해주세요.");
    }

    navigate(`/search/result?keyword=${searchText}`);
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

    // 완성된 한글인지 확인
    const isCompletedText = /^[가-힣]+$/.test(value);

    // 조합 중이 아니고 한글이 완성된 상태일 때만 검색 쿼리 전송
    if (isCompletedText) {
      fetchAutoSearchText(value);
    }
  };

  if (popularSearchLoading || recentSearchLoading) {
    return <Loading />;
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
        <div onClick={handleMoveBack}>
          <IoIosArrowBack size={25} color="#545454" className="mr-2 cursor-pointer" />
        </div>
        <Input
          className="bg-[#D9D9D9] border-none"
          placeholder="검색어를 입력해주세요."
          onChange={handleSearchText}
        />
        <div className="absolute right-2 cursor-pointer" onClick={goSearchResult}>
          <IoIosSearch size={25} color="#545454" />
        </div>
      </div>
      <div
        className="flex-grow overflow-y-auto flex flex-col justify-between"
        style={{ height: "calc(100vh - 150px)" }}
      >
        {/* 검색어가 없을 때 */}
        {!searchText ? (
          <div>
            <PopularSearch popularData={popularSearchData} />
            <RecentSearch recentData={recentSearchData} />
          </div>
        ) : (
          autoSearchText?.list && <AutoSearch autoSearch={autoSearchText.list} />
        )}
        <RecommendBook />
      </div>
    </div>
  );
};

export default SearchPage;
