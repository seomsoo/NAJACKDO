import { Input } from "components/ui/input";
import RecentSearch from "page/search/components/RecentSearch";
import RecommendBook from "page/search/components/RecommendBook";
import { IoIosArrowBack, IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const navigate = useNavigate();
  const goSearchResult = () => {
    navigate("/search/result");
  };

  return (
    <div className="mx-4 mt-8">
      <div className="flex flex-row items-center relative">
        <IoIosArrowBack
          size={25}
          color="#545454"
          className="mr-2 cursor-pointer"
        />
        <Input
          className="bg-[#D9D9D9] border-none"
          placeholder="검색어를 입력해주세요."
        />
        <div
          className="absolute right-2 cursor-pointer"
          onClick={goSearchResult}
        >
          <IoIosSearch size={25} color="#545454" />
        </div>
      </div>
      <RecentSearch />
      <RecommendBook />
    </div>
  );
};

export default SearchPage;
