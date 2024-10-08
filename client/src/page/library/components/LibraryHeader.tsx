import { IoIosSearch } from "react-icons/io";
import { IoCartOutline, IoNotificationsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useUserStore } from "store/useUserStore";

const LibraryHeader = () => {
  const nickname = useUserStore.getState().nickname;

  return (
    <header className="flex items-center justify-between p-4 px-6 mb-1 ">
      <span className="font-extrabold text-2xl">
        <span className="hakgyo text-3xl text-main">{nickname}</span>
        님의 서재
      </span>
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

export default LibraryHeader;
