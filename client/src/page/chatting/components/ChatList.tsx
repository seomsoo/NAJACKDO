import { IChatRoom } from "atoms/Chat.type";
import useTime from "hooks/useTime";
import { useNavigate } from "react-router-dom";

interface ChatListProps {
  chat: IChatRoom;
  userId: number;
}

const ChatList = ({ chat, userId }: ChatListProps) => {
  const navigate = useNavigate();
  const isOwner = userId === chat.ownerId;
  // user가 빌려주는 사람이면 true, 빌리는 사람이면 false
  // 그럼 true일 때는 profile -> customerProfile
  // false일 때는 profile -> ownerProfile

  const receivedTime = useTime(chat.lastChatTime);
  const location = (isOwner ? chat.customerLocation : chat.ownerLocation).split(
    " "
  )[2];

  const goChattingRoom = () => {
    navigate(`/chat/${chat.roomId}`, {
      state: { cartId: chat.cartId, ownerName: chat.ownerNickname },
    });
  };

  return (
    <div
      className="border-b-[1px] flex flex-row justify-between items-center px-3 py-5"
      onClick={goChattingRoom}
    >
      <div className="flex flex-row items-center">
        <img
          src={isOwner ? chat.customerProfile : chat.ownerProfile}
          alt={isOwner ? chat.customerNickname : chat.ownerNickname}
          className="rounded-full w-12 h-12 mr-4"
        />
        <div className="flex flex-col justify-start">
          <div className="flex flex-row font-bold items-center">
            <span className="mr-2">
              {isOwner ? chat.customerNickname : chat.ownerNickname}
            </span>
            <span className="text-black/60 text-sm">
              {location} · {receivedTime}
            </span>
          </div>
          <span className="mt-1">{chat.lastChatMessage}</span>
        </div>
      </div>
      <img
        src={chat.displayImagePath}
        alt="rental-book"
        className="w-14 h-14 rounded-lg"
      />
    </div>
  );
};

export default ChatList;
