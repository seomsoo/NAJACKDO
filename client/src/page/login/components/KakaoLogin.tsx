import { KAKAO_AUTH_URL } from "api/clientApi";

import { RiKakaoTalkFill } from "react-icons/ri";
const KakaoLogin = () => {
  return (
    <button
      className="flex flex-row items-center bg-[#FEE500] px-4 py-2 rounded-xl"
      onClick={() => {
        window.location.href = KAKAO_AUTH_URL;
      }}
      type="button"
    >
      <RiKakaoTalkFill size={32} className="mr-2" color="#3B1E1E" />
      <span className="font-bold mx-auto">카카오로 시작하기</span>
    </button>
  );
};

export default KakaoLogin;
