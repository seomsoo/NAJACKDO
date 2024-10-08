import { Client } from "@stomp/stompjs";
import Loading from "components/common/Loading";
import SmallError from "components/common/SmallError";
import ChatBookInfo, {
  ChatRentalStep,
} from "page/chatting/components/ChatBookInfo";
import ChattingBox, { Message } from "page/chatting/components/ChattingBox";
import ChattingRoomHeader from "page/chatting/components/ChattingRoomHeader";
import { Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useLocation, useParams } from "react-router-dom";
import SockJS from "sockjs-client";

const ChattingRoomPage = () => {
  const { roomId } = useParams();
  const {
    state: { cartId, ownerId, ownerName, customerId, customerName },
  } = useLocation();
  const [totalLeaf, setTotalLeaf] = useState<number>(0);
  const [step, setStep] = useState<ChatRentalStep>(ChatRentalStep.READY);

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
      // 채팅방 구독
      stompClient?.subscribe(
        `/exchange/chat.exchange/room.${roomId}`,
        (message) => {
          // 메시지를 리스트에 추가
          const newMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, newMessage]);

          // 메시지 타입에 따른 버튼 활성화
          if (newMessage.talkType === "PAY") {
            setStep(ChatRentalStep.RENTED);
            return;
          }

          if (newMessage.talkType === "RETURN") {
            setStep(ChatRentalStep.RETURNED);
            return;
          }
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
    <ErrorBoundary fallback={<SmallError />}>
      <Suspense fallback={<Loading />}>
        <ChattingRoomHeader ownerName={ownerName} customerName={customerName} />
        <ChatBookInfo
          client={client}
          cartId={cartId}
          roomId={Number(roomId)}
          ownerId={ownerId}
          ownerName={ownerName}
          customerId={customerId}
          customerName={customerName}
          totalLeaf={totalLeaf}
          setTotalLeaf={setTotalLeaf}
          step={step}
          setStep={setStep}
        />
        <ChattingBox
          client={client}
          roomId={Number(roomId)}
          totalLeaf={totalLeaf}
          messages={messages}
          ownerId={ownerId}
          ownerName={ownerName}
          customerId={customerId}
          customerName={customerName}
        />
      </Suspense>
    </ErrorBoundary>
  );
};

export default ChattingRoomPage;
