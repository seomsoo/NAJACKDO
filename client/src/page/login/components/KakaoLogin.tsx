import { KAKAO_AUTH_URL } from "api/clientApi";
import { RiKakaoTalkFill } from "react-icons/ri";

interface KakaoLoginProps {
  active: boolean;
}

const KakaoLogin = ({ active }: KakaoLoginProps) => {
  const handleClick = () => {
    if (active) {
      window.location.href = KAKAO_AUTH_URL;
    }
  };

  return (
    <button
      className={`flex flex-row items-center px-4 py-2 rounded-xl ${active ? "bg-[#FEE500]" : "bg-[#fee500] opacity-50 cursor-default"}`}
      onClick={handleClick}
      type="button"
    >
      <RiKakaoTalkFill size={32} color="#3B1E1E" />
      <span className="font-bold pr-4 mx-auto">카카오로 시작하기</span>
    </button>
  );
};

export default KakaoLogin;
