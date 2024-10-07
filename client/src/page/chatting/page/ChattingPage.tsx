import Loading from "components/common/Loading";
import SmallError from "components/common/SmallError";
import ChatRoomList from "page/chatting/components/ChatRoomList";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const ChattingPage = () => {
  return (
    <ErrorBoundary fallback={<SmallError />}>
      <Suspense fallback={<Loading />}>
        <div className="mx-[25px] relative">
          <ChatRoomList />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default ChattingPage;
