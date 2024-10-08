import { IoIosSearch } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";

interface IAutoSearchTextProps {
  text: string;
}

const AutoSearchText = ({ text }: IAutoSearchTextProps) => {
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/")[1];

  const handleClick = () => {
    if (location === "apply") {
      navigate("/apply/book", { state: { kind: "title", keyword: text } });
    }
  };

  return (
    <div
      className="mx-2 my-2 flex flex-row items-center cursor-pointer"
      onClick={handleClick}
    >
      <div>
        <IoIosSearch size={25} color="#545454" />
      </div>
      <p
        className="ml-3 text-sm text-left"
        onClick={() => navigate(`/search/result?keyword=${text}`)}
      >
        {text}
      </p>
    </div>
  );
};

export default AutoSearchText;
