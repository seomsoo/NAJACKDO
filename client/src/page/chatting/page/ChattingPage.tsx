import Loading from "components/common/Loading";
import ChatRoomList from "page/chatting/components/ChatRoomList";
import { Suspense } from "react";

const ChattingPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="mx-[25px] relative">
        <ChatRoomList />
      </div>
    </Suspense>
  );
};

export default ChattingPage;
