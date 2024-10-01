import { IoNotificationsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const ChattingHeader = () => {
  return (
    <div className="flex flex-row justify-between items-center py-4">
      <span className="font-bold text-2xl">채팅</span>
      <Link to="/alarm">
        <IoNotificationsOutline className="text-3xl text-[#545454]" />
      </Link>
    </div>
  );
};

export default ChattingHeader;
