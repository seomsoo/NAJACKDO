import React from "react";
import { useLocation } from "react-router-dom";

const KaPaySuccessPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pgToken = searchParams.get("pg_token");

  React.useEffect(() => {
    // 여기서 백엔드 API를 호출하여 결제 승인 처리를 합니다.
    if (pgToken) {
      // approvePayment(pgToken);
    }
  }, [pgToken]);

  return (
    <div>
      <h1>결제 완료</h1>
      <p>결제가 성공적으로 완료되었습니다.</p>
      {/* 주문 상세 정보 등을 표시할 수 있습니다 */}
    </div>
  );
};

export default KaPaySuccessPage;
