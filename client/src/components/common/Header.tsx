import { IoIosSearch } from "react-icons/io";
import {
  IoCartOutline,
  IoLibrary,
  IoNotificationsOutline,
} from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const nav = useNavigate();

  return (
    <header className="flex flex-row justify-between items-center py-4 px-4">
      <div className="flex flex-row items-center" 
        onClick={() => {
            nav("/");
          }}>
        <IoLibrary size={35} color="#C0C78C" />
        <span
          className="maplestory text-main text-2xl ml-2"

        >
          나의 작은 도서관
        </span>
      </div>
      <div className="flex justify-between text-3xl gap-3 text-[#545454]">
        <Link to="/search">
          <IoIosSearch />
        </Link>
        <Link to="/cart">
          <IoCartOutline />
        </Link>
        <Link to="/alarm">
          <IoNotificationsOutline />
        </Link>
      </div>
    </header>
  );
};

export default Header;
