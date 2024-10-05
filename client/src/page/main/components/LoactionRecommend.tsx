import { useQuery } from "@tanstack/react-query";
import { getLocalBestSeller } from "api/bookApi";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "store/useUserStore";
import { useEffect, useRef } from "react";

const LocationRecommend = () => {
  const navigate = useNavigate();
  const location = useUserStore.getState().location;

  
  const dateTimeRef = useRef(null);
  // 현재 날짜와 시간을 가져오고 DOM에 직접 업데이트하는 함수
  const updateDateTime = () => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString(); // '년.월.일' 형식으로 날짜 표시
    const formattedTime = now.toLocaleTimeString(); // '시:분:초' 형식으로 시간 표시
    if (dateTimeRef.current) {
      dateTimeRef.current.textContent = `${formattedDate} ${formattedTime} 기준`; // DOM 업데이트
    }
  };

  useEffect(() => {
    updateDateTime(); // 컴포넌트가 처음 렌더링될 때 시간 설정
    const intervalId = setInterval(updateDateTime, 1000); 

    return () => clearInterval(intervalId);
  }, []);

  const {
    data: LocalBestSeller,
    isLoading: isLoading,
    isError: isError,
  } = useQuery({
    queryKey: ['LocalBestSeller'],
    queryFn: getLocalBestSeller,
  });
  console.log(LocalBestSeller);

  if (isLoading) return <div>인기있는 도서 불러 오는 중~~~</div>;

  if (isError) return <div>오류가 발생했습니다.</div>;

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`); // 책 클릭 시 해당 책 상세 페이지로 이동
  };

  return (
    <div>
      <div className="flex flex-col mb-4">
        <span ref={dateTimeRef} className="text-xs text-main"></span>
        <span className="text-xl font-bold">
          지금 <span className="text-sub8">{location.split(" ").slice(-1)[0] || " "}</span> 인기 있는 도서 Top 10
        </span>
      </div>

      <div className="space-y-4">
        {LocalBestSeller.map((book, index) => (
          <div
            key={book.bookId}
            onClick={() => handleBookClick(book.bookId)}
            className="flex items-center space-x-4 border-b"
          >
          <img
              src={book.cover}
              alt={book.title}
              className="w-16 h-12 object-cover rounded-tr-lg object-top"
              style={{
                boxShadow: '0 8px 8px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.1)',
              }}
            />
            <span className=" font-semibold">
              <span
                style={{
                  textShadow: '2px 2px 2px #BFAD97',
                }}
                className="text-3xl text-sub7 mr-2"
              >
                {index + 1}.
              </span>{" "}
              {book.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationRecommend;