import { Stomp } from "@stomp/stompjs";
import { useRef, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

const ChattingRoomPage = () => {
  const navigate = useNavigate();
  const roomId = useLocation().pathname.split("/")[2];
  // 웹소켓 연결 객체
  const stompClient = useRef(null);
  // 메시지 리스트
  const [messages, setMessages] = useState([]);
  // 사용자가 입력한 메시지
  const [inputMessage, setInputMessage] = useState("");
  // 웹소켓 연결
  const connect = () => {
    // 백에서 정한 웹소켓 주소로 연결
    const socket = new WebSocket("ws://localhost:8080/ws/");
    // stompClient.current = Stomp.over(socket);
    // stompClient.current.connect({}, () => {});
  };
  return (
    <div className="mx-[25px]">
      <div
        onClick={() => navigate(-1)}
        className="cursor-pointer py-4 flex flex-row items-center"
      >
        <IoChevronBack size={25} color="#545454" />
        <span className="font-bold text-xl ml-2">{roomId} 채팅방</span>
      </div>
      <p>{roomId}번 채팅방</p>
    </div>
  );
};

export default ChattingRoomPage;
