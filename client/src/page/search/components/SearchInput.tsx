import { Input } from "components/ui/input";
import { IoIosArrowBack, IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

interface SearchInputProps {
  handleSearchText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchText: string;
}

const SearchInput = ({ handleSearchText, searchText }: SearchInputProps) => {
  const navigate = useNavigate();

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

  return (
    <div className="flex flex-row items-center relative">
      <div onClick={handleMoveBack}>
        <IoIosArrowBack
          size={25}
          color="#545454"
          className="mr-2 cursor-pointer"
        />
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
  );
};

export default SearchInput;