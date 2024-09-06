import { IoIosSearch } from "react-icons/io";
import { IoCartOutline, IoNotificationsOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

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
        <Link to="/search">
          <IoIosSearch size={27} color="#545454" className="me-1" />
        </Link>
        <Link to="/cart">
          <IoCartOutline size={27} color="#545454" className="me-1" />
        </Link>
        <Link to="/alarm">
          <IoNotificationsOutline size={27} color="#545454" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
