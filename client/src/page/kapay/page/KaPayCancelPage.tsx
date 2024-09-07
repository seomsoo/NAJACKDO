import { Button } from "components/ui/button";
import { useNavigate } from "react-router-dom";

const KaPayCancelPage = () => {
  const navigate = useNavigate();
  const canCloseWindow = window.opener !== null && !window.opener.closed;

  const handleRedirect = () => {
    navigate("/kapay");
  };

  return (
    <div>
      <h1>카페이 결제 취소 페이지</h1>
      <p>결제 취소가 완료되었습니다.</p>
      {canCloseWindow ? (
        <Button onClick={() => window.close()}>닫기</Button>
      ) : (
        <Button onClick={handleRedirect}>결제 준비 페이지로</Button>
      )}
    </div>
  );
};

export default KaPayCancelPage;
