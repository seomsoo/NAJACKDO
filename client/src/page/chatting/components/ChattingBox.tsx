import { useSuspenseQuery } from "@tanstack/react-query";
import { getChatList } from "api/chatApi";
import { IChatList } from "atoms/Chat.type";
import { Input } from "components/ui/input";
import ReceiveMessage from "page/chatting/components/ReceiveMessage";
import SendMessage from "page/chatting/components/SendMessage";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useUserStore } from "store/useUserStore";

export interface Message {
  roomId: number;
  senderId: number;
  senderNickname: string;
  receiverId: number;
  receiverNickname: string;
  talkType: "MESSAGE" | "PAY" | "RETURN";
  message: string;
}

interface ChattingBoxProps {
  client: any;
  roomId: number;
  totalLeaf: number;
  messages: Message[];
  ownerId: number;
  ownerName: string;
  customerId: number;
  customerName: string;
}

const ChattingBox = ({
  client,
  roomId,
  messages,
  ownerId,
  ownerName,
  customerId,
  customerName,
}: ChattingBoxProps) => {
  const senderId = useUserStore.getState().userId;
  const senderNickname = useUserStore.getState().nickname;

  const receiverId = senderId === ownerId ? customerId : ownerId;
  const receiverNickname =
    senderNickname === ownerName ? customerName : ownerName;

  // 채팅 내역 불러오기
  const { data: chattingList } = useSuspenseQuery<IChatList>({
    queryKey: ["chatList"],
    queryFn: () => getChatList(roomId),
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 15,
  });

  // 사용자가 입력한 메시지
  const [inputMessage, setInputMessage] = useState<string>("");

  const sendMessage = (message: string) => {
    const messageData: Message = {
      roomId: roomId,
      senderId: senderId,
      senderNickname: senderNickname,
      receiverId: receiverId,
      receiverNickname: receiverNickname,
      talkType: "MESSAGE",
      message: message,
    };

    client.publish({
      destination: `/pub/chat.message.${roomId}`,
      body: JSON.stringify(messageData),
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target) setInputMessage(e.target.value);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (inputMessage.trim() !== "") {
      sendMessage(inputMessage);
      setInputMessage("");
    }
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [first, setFirst] = useState<boolean>(true);

  useEffect(() => {
    scrollToBottom();

    if (first) {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
      setFirst(false);
    }
  }, [messages]);

  const [isPwa, setIsPwa] = useState(false);

  useEffect(() => {
    // iOS에서 PWA로 실행되고 있는지 확인
    const checkPwaMode = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;
    setIsPwa(checkPwaMode);
  }, []);

  const initHeight = isPwa ? "calc(100vh - 204px)" : "calc(100vh - 290px)";

  return (
    <div className="mx-[25px]">
      <div
        className="flex-grow overflow-y-auto py-4 scrollbar-hide"
        style={{ height: initHeight }}
      >
        <div className="space-y-4">
          {chattingList.messages.map((chat, index) => {
            return chat.senderId === senderId ? (
              <SendMessage
                key={index}
                message={chat.message}
                talkType={chat.talkType}
              />
            ) : (
              <ReceiveMessage
                key={index}
                message={chat.message}
                talkType={chat.talkType}
              />
            );
          })}
          {messages.map((message, index) => {
            return message.senderId === senderId ? (
              <SendMessage
                key={index}
                message={message.message}
                talkType={message.talkType}
              />
            ) : (
              <ReceiveMessage
                key={index}
                message={message.message}
                talkType={message.talkType}
              />
            );
          })}
        </div>
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage}>
        <div className="flex flex-row items-center my-4 fixed bottom-2 bg-najackdo-background">
          <Input
            placeholder="메시지를 입력해주세요."
            className="bg-[#EAE7E3] border-none w-[310px]"
            value={inputMessage}
            onChange={handleInputChange}
          />
          <button type="submit">
            <IoIosSend
              color="#5F6F52"
              size={30}
              className="ml-2 cursor-pointer"
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChattingBox;
