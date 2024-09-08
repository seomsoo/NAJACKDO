import { Button } from "components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const KaPayFailPage = () => {
  const navigate = useNavigate();
  const canCloseWindow = window.opener !== null && !window.opener.closed;

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>결제 실패</h1>
      <p>결제 처리 중 오류가 발생했습니다.</p>
      {canCloseWindow ? (
        <Button onClick={() => window.close()}>닫기</Button>
      ) : (
        <Button onClick={handleRedirect}>메인 페이지로</Button>
      )}
    </div>
  );
};

export default KaPayFailPage;
