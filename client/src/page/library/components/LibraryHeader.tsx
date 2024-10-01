import { IoIosArrowBack } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const LibraryHeader = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  
  return (
    <header className="sticky top-0 z-10 bg-[#F8F6F3] flex items-center justify-between p-6 py-4 mb-4">
      <div className="items-center flex gap-2">
        <button onClick={goBack} className="text-2xl ">
          <IoIosArrowBack />
        </button>
        <span className="font-extrabold text-2xl">책 히스토리</span>
      </div>
      <div className="text-3xl text-[#545454]">
        <Link to="/alarm">
          <IoNotificationsOutline />
        </Link>
      </div>
    </header>
  );
};

export default LibraryHeader;
