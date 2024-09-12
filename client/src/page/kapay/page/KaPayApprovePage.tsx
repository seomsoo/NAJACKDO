import { Button } from "components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const KaPayApprovePage = () => {
  const navigate = useNavigate();
  const canCloseWindow = window.opener !== null && !window.opener.closed;

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>결제 완료</h1>
      <p>결제가 성공적으로 완료되었습니다.</p>
      {canCloseWindow ? (
        <Button onClick={() => window.close()}>닫기</Button>
      ) : (
        <Button onClick={handleRedirect}>메인 페이지로</Button>
      )}
    </div>
  );
};

export default KaPayApprovePage;
