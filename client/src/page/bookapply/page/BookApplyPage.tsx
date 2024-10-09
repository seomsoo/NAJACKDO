import AlertModal from "components/common/AlertModal";
import Error from "components/common/Error";
import Loading from "components/common/Loading";
import ApplyBookResult from "page/bookapply/components/ApplyBookResult";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useLocation } from "react-router-dom";

const BookApplyPage = () => {
  const location = useLocation();
  const { kind, keyword } = location.state;
  const [open, setOpen] = useState<boolean>(false);

  return (
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loading />}>
        <ApplyBookResult kind={kind} keyword={keyword} setOpen={setOpen} />
        {open && (
          <AlertModal
            open={open}
            setOpen={setOpen}
            content="이미 등록된 도서입니다."
          />
        )}
      </Suspense>
    </ErrorBoundary>
  );
};

export default BookApplyPage;
