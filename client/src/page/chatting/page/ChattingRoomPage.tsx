import { Client } from "@stomp/stompjs";
import Loading from "components/common/Loading";
import ChatBookInfo from "page/chatting/components/ChatBookInfo";
import ChattingBox, { Message } from "page/chatting/components/ChattingBox";
import ChattingRoomHeader from "page/chatting/components/ChattingRoomHeader";
import { Suspense, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { useUserStore } from "store/useUserStore";

const ChattingRoomPage = () => {
  const { roomId } = useParams();
  const {
    state: { cartId, ownerName },
  } = useLocation();
  const [isPay, setIsPay] = useState<boolean>(null);
  const [isReturn, setIsReturn] = useState<boolean>(null);
  const [totalLeaf, setTotalLeaf] = useState<number>(0);
  const senderNickname = useUserStore.getState().nickname;
  const senderId = useUserStore.getState().userId;

  // 웹소켓
  const [client, setClient] = useState<Client | null>(null);

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

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <ChattingRoomHeader ownerName={ownerName} />
      <ChatBookInfo
        client={client}
        cartId={cartId}
        roomId={Number(roomId)}
        ownerName={ownerName}
        setIsPay={setIsPay}
        setIsReturn={setIsReturn}
        totalLeaf={totalLeaf}
        setTotalLeaf={setTotalLeaf}
      />
      <ChattingBox
        client={client}
        roomId={Number(roomId)}
        isPay={isPay}
        isReturn={isReturn}
        totalLeaf={totalLeaf}
        messages={messages}
      />
    </Suspense>
  );
};

export default ChattingRoomPage;
