import React from "react";

const KaPayFailPage: React.FC = () => {
  return (
    <div>
      <h1>결제 실패</h1>
      <p>결제 처리 중 오류가 발생했습니다.</p>
      {/* 오류 상세 정보를 표시하고, 다시 시도하거나 고객 지원에 문의할 수 있는 옵션을 제공할 수 있습니다 */}
    </div>
  );
};

export default KaPayFailPage;
