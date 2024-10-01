import Loading from "components/common/Loading";
import ChatRoomList from "page/chatting/components/ChatRoomList";
import ChattingHeader from "page/chatting/components/ChattingHeader";
import { Suspense } from "react";

const ChattingPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="mx-[25px] relative">
        <ChattingHeader />
        <ChatRoomList />
      </div>
    </Suspense>
  );
};

export default ChattingPage;
