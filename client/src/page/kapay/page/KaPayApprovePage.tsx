import { Button } from "components/ui/button";
import { useNavigate } from "react-router-dom";

const KaPayApprovePage = () => {
  const navigate = useNavigate();
  const canCloseWindow = window.opener !== null && !window.opener.closed;

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ height: "calc(100vh - 86px)" }}
    >
      <span className="maplestory text-3xl text-[#A6B37D]">결제 완료</span>
      <p className="my-10">결제가 성공적으로 완료되었습니다.</p>
      {canCloseWindow ? (
        <Button onClick={() => window.close()}>닫기</Button>
      ) : (
        <Button onClick={handleRedirect}>메인 페이지로</Button>
      )}
    </div>
  );
};

export default KaPayApprovePage;
