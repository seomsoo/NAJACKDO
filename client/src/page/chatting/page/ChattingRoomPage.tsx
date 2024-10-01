import Loading from "components/common/Loading";
import ChatBookInfo from "page/chatting/components/ChatBookInfo";
import ChattingBox from "page/chatting/components/ChattingBox";
import ChattingRoomHeader from "page/chatting/components/ChattingRoomHeader";
import { Suspense } from "react";
import { useLocation, useParams } from "react-router-dom";

const ChattingRoomPage = () => {
  const { roomId } = useParams();
  const {
    state: { cartId, ownerName },
  } = useLocation();

  return (
    <Suspense fallback={<Loading />}>
      <ChattingRoomHeader ownerName={ownerName} />
      <ChatBookInfo cartId={cartId} ownerName={ownerName} />
      <ChattingBox roomId={Number(roomId)} />
    </Suspense>
  );
};

export default ChattingRoomPage;
