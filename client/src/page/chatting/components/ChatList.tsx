import { IChatRoom } from "atoms/Chat.type";
import BaseProfile from "components/common/BaseProfile";
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

  const receivedTime = chat.lastChatTime
    ? `· ${useTime(chat.lastChatTime)}`
    : null;
  const location = (isOwner ? chat.customerLocation : chat.ownerLocation).split(
    " "
  )[2];

  const goChattingRoom = () => {
    navigate(`/chat/${chat.roomId}`, {
      state: {
        cartId: chat.cartId,
        ownerName: chat.ownerNickname,
        ownerId: chat.ownerId,
        customerName: chat.customerNickname,
        customerId: chat.customerId,
      },
    });
  };

  return (
    <div
      className="border-b-[1px] flex flex-row justify-between items-center px-3 py-5"
      onClick={goChattingRoom}
    >
      <div className="flex flex-row items-center">
        {isOwner ? (
          <BaseProfile
            userImage={chat.customerProfile}
            width="12"
            height="12"
          />
        ) : (
          <BaseProfile userImage={chat.ownerProfile} width="12" height="12" />
        )}
        <div className="flex flex-col justify-start ml-3">
          <div className="flex flex-row font-bold items-center">
            <span className="mr-2">
              {isOwner ? chat.customerNickname : chat.ownerNickname}
            </span>
            <span className="text-black/50 text-xs">
              {location} {receivedTime}
            </span>
          </div>
          <span className="mt-1">
            {chat.lastChatType === "MESSAGE"
              ? chat.lastChatMessage.length > 14
                ? chat.lastChatMessage.slice(0, 14) + "..."
                : chat.lastChatMessage
              : chat.lastChatType === "PAY"
                ? "송금이 완료되었습니다"
                : chat.lastChatType === "RETURN"
                  ? "반납 완료"
                  : null}
          </span>
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
