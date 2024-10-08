import { useSuspenseQuery } from "@tanstack/react-query";
import { getChatRoom } from "api/chatApi";
import { IChat } from "atoms/Chat.type";
import ChatList from "page/chatting/components/ChatList";
import { PiChatsCircleFill } from "react-icons/pi";

const ChatRoomList = () => {
  const { data: chatRoomInfo } = useSuspenseQuery<IChat>({
    queryKey: ["chatList"],
    queryFn: getChatRoom,
  });

  return (
    <div>
      {chatRoomInfo.chatRoomList.length !== 0 ? (
        chatRoomInfo.chatRoomList.map((chat, index) => (
          <ChatList key={index} chat={chat} userId={chatRoomInfo.userId} />
        ))
      ) : (
        <div
          className="flex flex-col justify-center items-center space-y-3"
          style={{ height: "calc(100vh - 150px)" }}
        >
          <PiChatsCircleFill size={100} color="#79AC78" />
          <p className="font-bold text-xl">채팅방이 없습니다</p>
        </div>
      )}
    </div>
  );
};

export default ChatRoomList;
