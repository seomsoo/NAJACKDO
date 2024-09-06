import { IoIosSearch } from "react-icons/io";
import { IoCartOutline, IoNotificationsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const nav = useNavigate();

  return (
    <header className="flex flex-row justify-between items-center p-3">
      <span
        className="maplestory text-[#5F6F52] text-xl"
        onClick={() => {
          nav("/");
        }}
      >
        나의 작은 도서관
      </span>
      <div className="flex flex-row">
        <IoIosSearch size={27} color="#545454" className="me-1" />
        <IoCartOutline size={27} color="#545454" className="me-1" />
        <IoNotificationsOutline size={27} color="#545454" />
      </div>
    </header>
  );
};

export default Header;
