import { useEffect, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

const ScrollToTopButton = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // 스크롤 상태 감지 및 "맨 위로" 버튼 표시 여부 관리
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollToTop(true); // 스크롤이 일정 높이 이상 내려갔을 때 버튼 보이기
    } else {
      setShowScrollToTop(false); // 그 외에는 숨기기
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // 부드럽게 맨 위로 이동
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll); // 스크롤 이벤트 추가
    return () => {
      window.removeEventListener("scroll", handleScroll); // 언마운트 시 이벤트 제거
    };
  }, []);

  return (
    <>
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-28 right-5 z-50 p-3 bg-main text-white opacity-65 rounded-full shadow-lg hover:bg-main-dark md:hidden"
        >
          <AiOutlineArrowUp size={24} />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
