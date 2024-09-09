import { RiKakaoTalkFill } from "react-icons/ri";
const KakaoLogin = () => {
  return (
    <div className="flex flex-row items-center bg-[#FEE500] px-4 py-2 rounded-xl">
      <RiKakaoTalkFill size={32} className="mr-2" color="#3B1E1E" />
      <span className="font-bold mx-auto">카카오로 시작하기</span>
    </div>
  );
};

export default KakaoLogin;
