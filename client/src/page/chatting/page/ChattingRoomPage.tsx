import { Client } from "@stomp/stompjs";
import { Input } from "components/ui/input";
import ReceiveMessage from "page/chatting/components/ReceiveMessage";
import SendMessage from "page/chatting/components/SendMessage";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { IoIosLeaf, IoIosSend } from "react-icons/io";
import { IoChevronBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

export interface Message {
  type: string;
  scheduleId: number;
  userId: number;
  message: string;
  createdAt: number;
}

const ChattingRoomPage = () => {
  const userId = 3;
  const navigate = useNavigate();
  const roomId = useLocation().pathname.split("/")[2];

  // 웹소켓 연결 객체
  const [stompClient, setStompClient] = useState<any>(null);

  // 메시지 리스트
  const [messages, setMessages] = useState<Message[]>([]);

  // 사용자가 입력한 메시지
  const [inputMessage, setInputMessage] = useState<string>("");

  // 웹소켓 연결
  const connect = () => {
    // 백에서 정한 웹소켓 주소로 연결
    // const socket = new WebSocket("ws://localhost:8080/ws/");
    // const socket = new SockJS();

    const stompClient = new Client();
    stompClient?.configure({
      webSocketFactory: () => new WebSocket("http://localhost:8080/ws"), // 링크 + 서버에서 설정해놓은 엔드포인트
      debug(str) {
        console.log(str);
      },
    });
    // stompClient.current = Stomp.over(socket);
    stompClient.onConnect = () => {
      // 메시지 수신
      stompClient?.subscribe(`/sub/schedule/1/chat`, (message) => {
        // 메시지를 리스트에 추가
        console.log(message);
        const newMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    };

    if (!stompClient.connected) {
      stompClient.activate();
      setStompClient(stompClient);
    }
  };

  // 기존 메시지 리스트 가져오는 함수

  // 웹소켓 연결 해제
  const disconnect = () => {
    // if (stompClient.current) {
    //   stompClient.current.disconnect();
    // }
  };

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  const sendMessage = (message: string) => {
    console.log(message);
    stompClient.publish({
      destination: "/pub/schedule/1/chat",
      body: JSON.stringify({
        type: "TALK",
        scheduleId: 1,
        userId: userId,
        message,
        createdAt: 12384123,
      }),
    });
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
      <div className="bg-[#DBD6D3] w-full h-24 px-4 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <img
            src={book.imageUrl}
            alt="사진"
            className="rounded-2xl w-16 h-16"
          />
          <div className="ml-2">
            <span>{book.title}</span>
            <div className="flex flex-row items-center">
              <span className="text-black/50 text-sm">일일</span>
              <span className="ml-2 mr-1 font-bold">{book.dayPrice}</span>
              <IoIosLeaf color="#79AC78" size={20} />
            </div>
          </div>
        </div>
        <span className="bg-[#776B5D] text-white rounded-lg py-2 px-3">
          약속 잡기
        </span>
      </div>
      <div className="mx-[25px]">
        <div
          className="flex-grow overflow-y-auto py-4"
          style={{
            height: "calc(100vh - 300px)",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="space-y-4">
            {messages.map((message, index) => {
              return message.userId === userId ? (
                <SendMessage key={index} message={message.message} />
              ) : (
                <ReceiveMessage key={index} message={message.message} />
              );
            })}
          </div>
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
