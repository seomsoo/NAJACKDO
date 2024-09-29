import { Client } from "@stomp/stompjs";
import { Input } from "components/ui/input";
import ChatBookInfo from "page/chatting/components/ChatBookInfo";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { IoChevronBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";

export interface Message {
  roomId: number;
  senderId: number;
  senderNickname: string;
  message: string;
}

const ChattingRoomPage = () => {
  const navigate = useNavigate();
  const roomId = Number(useLocation().pathname.split("/")[2]);

  // 채팅 내역 불러오기
  // const {
  //   data: chattingList,
  //   isLoading,
  //   isError,
  // } = useQuery<IChatList>({
  //   queryKey: ["chatList"],
  //   queryFn: () => getChatList(roomId),
  // });

  // 웹소켓
  const [client, setClient] = useState<Client | null>(null);

  // 사용자가 입력한 메시지
  const [inputMessage, setInputMessage] = useState<string>("");

  // 채팅방 메시지 리스트
  const [messages, setMessages] = useState<Message[]>([]);

  // 웹소켓 연결
  const connect = () => {
    if (client) return;

    const stompClient = new Client();
    stompClient?.configure({
      webSocketFactory: () => new SockJS("https://www.najackdo.kro.kr/ws"),
    });

    stompClient.onConnect = () => {
      console.log("connected");
      // 채팅방 구독
      stompClient?.subscribe(
        `/exchange/chat.exchange/room.${roomId}`,
        (message) => {
          // 메시지를 리스트에 추가
          console.log(message);
          const newMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      );
    };

    if (!stompClient.connected) {
      stompClient.activate();
      setClient(stompClient);
    }
  };

  // 웹소켓 연결 해제
  const disconnect = () => {
    if (client) {
      client.deactivate();
    }
  };

  const sendMessage = (message: string) => {
    console.log(message);

    // const messageData: Message = {
    //   roomId: roomId,
    //   senderId: chattingList.userId,
    //   senderNickname: "dfdf",
    //   message: message,
    // };

    // console.log(messageData);

    // client.publish({
    //   destination: `/pub/chat.message.${roomId}`,
    //   body: JSON.stringify(messageData),
    // });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target) setInputMessage(e.target.value);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (inputMessage.trim() !== "") {
      console.log("send message", inputMessage);
      sendMessage(inputMessage);
      setInputMessage("");
    }
  };

  const book = {
    title: "안녕 푸바오",
    dayPrice: 150,
    imageUrl: "/pubao.png",
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => scrollToBottom, [messages]);

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  return (
    <div>
      <div
        onClick={() => navigate(-1)}
        className="cursor-pointer py-4 mx-[25px] flex flex-row items-center justify-between"
      >
        <IoChevronBack size={25} color="#545454" />
        <span className="font-bold text-xl ml-2 text-center">
          {roomId} 채팅방
        </span>
        <div />
      </div>
      {/* 채팅방 책 정보 */}
      <ChatBookInfo book={book} />
      {/* 채팅창 */}
      <div className="mx-[25px]">
        <div
          className="flex-grow overflow-y-auto py-4"
          style={{
            height: "calc(100vh - 300px)",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* <div className="space-y-4">
            {chattingList.messages.map((chat, index) => {
              const userId = chattingList.userId;
              return chat.senderId === userId ? (
                <SendMessage key={index} message={chat.message} />
              ) : (
                <ReceiveMessage key={index} message={chat.message} />
              );
            })}
            {messages.map((message, index) => {
              return message.senderId === chattingList.userId ? (
                <SendMessage key={index} message={message.message} />
              ) : (
                <ReceiveMessage key={index} message={message.message} />
              );
            })}
          </div> */}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSendMessage}>
          <div className="flex flex-row items-center">
            <Input
              placeholder="메시지를 입력해주세요."
              className="bg-[#EAE7E3] border-none"
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
    </div>
  );
};

export default ChattingRoomPage;
