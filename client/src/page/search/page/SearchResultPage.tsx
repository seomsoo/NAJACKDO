import { Input } from "components/ui/input";
import SearchResult from "page/search/components/SearchResult";
import { useState } from "react";
import { IoIosArrowBack, IoIosSearch } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchResultPage = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  const handlerSearchText = (e) => {
    const value = e.target.value;
    setSearchText(value);
  };

  const goSearchResult = () => {
    navigate(`/search/result?keyword=${searchText}`);
  };

  return (
    <div className="mx-4 mt-8">
      {/* 검색어 입력 창 */}
      <div className="flex flex-row items-center relative">
        <div onClick={() => navigate(-1)}>
          <IoIosArrowBack
            size={25}
            color="#545454"
            className="mr-2 cursor-pointer"
          />
        </div>
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
      {/* 검색 결과 */}
      <SearchResult keyword={keyword} />
    </div>
  );
};

export default SearchResultPage;
