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
        <ChatList roomId={1}/>
        <ChatList roomId={2}/>
        <ChatList roomId={3}/>
        <ChatList roomId={4}/>
        <ChatList roomId={5}/>
        <ChatList roomId={6}/>
      </div>
    </div>
  );
};

export default ChattingPage;
