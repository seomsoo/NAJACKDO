import confetti from "canvas-confetti";
import React, { useEffect } from "react";

const StartPage: React.FC = () => {
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
    });
  }, []);

  return (
    <div className="flex flex-col items-center mt-20">
      <div className="text-2xl flex flex-col items-center gap-2 animate-fadeIn">
        <span>
          <span className="maplestory text-4xl text-[#4E5944]">
            나의 작은 도서관
          </span>{" "}
          에
        </span>
        <span>오신 것을 환영 합니다.</span>
      </div>

      <img
        src="/images/survey/start3d.png"
        alt="img"
        className="mr-16 mt-4 animate-slideUp"
      />
      <p className="text-center text-sm mt-12 leading-relaxed animate-fadeIn">
        “오늘의 나를 있게 한 것은 우리 마을 도서관이었다,
        <br />
        하버드 졸업장보다 소중한 것이 독서 하는 습관이다.”
        <br />
        <span className="font-semibold text-gray-500">- 빌 게이츠</span>
      </p>
    </div>
  );
};

export default StartPage;
