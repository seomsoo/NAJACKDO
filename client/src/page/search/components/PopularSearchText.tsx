import { useNavigate } from "react-router-dom";

interface IPopularSearchTextProps {
  text: string;
}

const PopularSearchText = ({ text }: IPopularSearchTextProps) => {
  const navigate = useNavigate();
  return (
    <div className="border-[1.5px] border-[#B0A695] rounded-2xl px-4 py-1 cursor-pointer">
      <p onClick={() => navigate(`/search/result?keyword=${text}`)}>{text}</p>
    </div>
  );
};

export default PopularSearchText;
