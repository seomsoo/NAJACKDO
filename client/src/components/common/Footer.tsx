import { FaUser } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { IoChatbubbleEllipses, IoLibrary } from "react-icons/io5";
import { TbLocationFilled } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation().pathname.split("/")[1];

  return (
    <footer className="fixed bg-[#F8F6F3] bottom-0 w-screen max-w-[430px] border-t-[1px] pt-3 flex flex-row justify-around pb-7">
      <Link to="/" className="flex flex-col items-center">
        <GoHomeFill size={25} color={location === "" ? "#79AC78" : "#545454"} />
        <span className="text-xs pt-1">홈</span>
      </Link>
      <Link to="/location" className="flex flex-col items-center">
        <TbLocationFilled
          size={25}
          color={location === "location" ? "#79AC78" : "#545454"}
        />
        <span className="text-xs pt-1">내 주변</span>
      </Link>
      <Link to="/library" className="flex flex-col items-center">
        <IoLibrary
          size={25}
          color={location === "library" ? "#79AC78" : "#545454"}
        />
        <span className="text-xs pt-1">서재</span>
      </Link>
      <Link to="/chat" className="flex flex-col items-center">
        <IoChatbubbleEllipses
          size={25}
          color={location === "chat" ? "#79AC78" : "#545454"}
        />
        <span className="text-xs pt-1">채팅</span>
      </Link>
      <Link to="/profile" className="flex flex-col items-center">
        <FaUser
          size={25}
          color={location === "profile" ? "#79AC78" : "#545454"}
        />
        <span className="text-xs pt-1">마이</span>
      </Link>
    </footer>
  );
};

export default Footer;
