import { Input } from "components/ui/input";
import RecentSearch from "page/search/components/RecentSearch";
import RecommendSearch from "page/search/components/RecommendSearch";
import { IoIosArrowBack, IoIosSearch } from "react-icons/io";

const SearchPage = () => {
  return (
    <div className="mx-4 mt-3">
      <div className="flex flex-row items-center relative">
        <IoIosArrowBack size={25} color="#545454" className="mr-2" />
        <Input className="bg-[#D9D9D9] border-none" placeholder="검색어를 입력해주세요." />
        <IoIosSearch size={25} color="#545454" className="absolute right-2" />
      </div>
      <RecommendSearch />
      <RecentSearch />
    </div>
  );
};

export default SearchPage;
