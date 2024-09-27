import { useQuery } from "@tanstack/react-query";
import { getChatRoom } from "api/chatApi";
import { IChat } from "atoms/Chat.type";
import ChatList from "page/chatting/components/ChatList";
import { IoNotificationsOutline } from "react-icons/io5";
import { PiChatsCircleFill } from "react-icons/pi";
import { Link } from "react-router-dom";

const ChattingPage = () => {
  const {
    data: chatRoomInfo,
    isLoading,
    isError,
  } = useQuery<IChat>({
    queryKey: ["chatList"],
    queryFn: getChatRoom,
  });

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (chatRoomInfo) {
    console.log("chatroom", chatRoomInfo);
  }

  return (
    <div className="mx-[25px] relative">
      <div className="flex flex-row justify-between items-center py-4">
        <span className="font-bold text-2xl">채팅</span>
        <Link to="/alarm">
          <IoNotificationsOutline className="text-3xl text-[#545454]" />
        </Link>
      </div>
      {/* <ChatList roomId={1} /> */}
      <div>
        {chatRoomInfo.chatRoomList?.length ? (
          chatRoomInfo.chatRoomList.map((chat, index) => (
            <ChatList key={index} chat={chat} userId={chatRoomInfo.userId}/>
          ))
        ) : (
          <div
            className="flex flex-col justify-center items-center space-y-3"
            style={{ height: "calc(100vh - 150px)" }}
          >
            <PiChatsCircleFill size={100} color="#A6B37D" />
            <p className="font-bold text-xl">채팅방이 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChattingPage;
