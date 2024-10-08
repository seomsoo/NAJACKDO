import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const FavoriteHeader = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <header className="top-0 z-10 bg-[#F8F6F3] flex items-center justify-between p-6 py-4 mb-4">
      <div className="items-center flex gap-2">
        <button onClick={goBack} className="text-2xl">
          <IoIosArrowBack />
        </button>
        <span className="font-extrabold text-2xl">내가 좋아하는 책들</span>
      </div>
    </header>
  );
};

export default FavoriteHeader;
