import { Input } from "components/ui/input";
import SearchResultBook from "page/search/components/SearchResultBook";
import { IoIosArrowBack, IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SearchResultPage = () => {
  const navigate = useNavigate();
  const goSearchResult = () => {
    navigate("/search/result");
  };

  return (
    <div className="mx-4 mt-3">
      <div className="flex flex-row items-center relative">
        <IoIosArrowBack size={25} color="#545454" className="mr-2" />
        <Input
          className="bg-[#D9D9D9] border-none"
          placeholder="검색어를 입력해주세요."
        />
        <div className="absolute right-2" onClick={goSearchResult}>
          <IoIosSearch size={25} color="#545454" />
        </div>
      </div>
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

export default SearchResultPage;
