import ChatList from "page/chatting/components/ChatList";
import { IoNotificationsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const ChattingPage = () => {
  return (
    <div className="mx-[25px]">
      <div className="flex flex-row justify-between my-4">
        <span className="font-bold text-2xl">채팅</span>
        <Link to="/alarm">
          <IoNotificationsOutline size={27} color="#545454" />
        </Link>
      </div>
      <div>
        <ChatList />
        <ChatList />
        <ChatList />
        <ChatList />
        <ChatList />
        <ChatList />
      </div>
    </div>
  );
};

export default ChattingPage;
