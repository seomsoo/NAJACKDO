import Loading from "components/common/Loading";
import ChatBookInfo from "page/chatting/components/ChatBookInfo";
import ChattingBox from "page/chatting/components/ChattingBox";
import ChattingRoomHeader from "page/chatting/components/ChattingRoomHeader";
import { Suspense } from "react";
import { useParams } from "react-router-dom";

const ChattingRoomPage = () => {
  const { roomId } = useParams();
  const book = {
    title: "안녕 푸바오",
    dayPrice: 150,
    imageUrl: "/pubao.png",
  };

  return (
    <Suspense fallback={<Loading />}>
      <ChattingRoomHeader roomId={Number(roomId)} />
      <ChatBookInfo book={book} />
      <ChattingBox roomId={Number(roomId)} />
    </Suspense>
  );
};

export default ChattingRoomPage;
