import { useQuery } from "@tanstack/react-query";
import { getLocalBestSeller } from "api/bookApi";
import ClipLoading from "components/common/ClipLoading";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "store/useUserStore";

const LocationRecommend = () => {
  const navigate = useNavigate();
  const location = useUserStore.getState().location;
  const dateTimeRef = useRef(null);

  const updateDateTime = () => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString();
    const formattedTime = now.toLocaleTimeString();
    if (dateTimeRef.current) {
      dateTimeRef.current.textContent = `${formattedDate} ${formattedTime} 기준`;
    }
  };

  useEffect(() => {
    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const {
    data: LocalBestSeller,
    isLoading: isLoading,
    isError: isError,
  } = useQuery({
    queryKey: ["LocalBestSeller"],
    queryFn: getLocalBestSeller,
  });

  if (isLoading) return <ClipLoading />;
  if (isError) return <div>오류가 발생했습니다.</div>;

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <div>
      <div className="flex flex-col mb-4">
        <span ref={dateTimeRef} className="text-xs text-main"></span>
        <span className="text-xl font-bold">
          지금{" "}
          <span className="text-sub8">
            {location.split(" ").slice(-1)[0] || " "}
          </span>{" "}
          인기 있는 도서 Top 10
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
                boxShadow:
                  "0 8px 8px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.1)",
              }}
            />
            <div className="flex font-semibold items-center">
              <span
                style={{
                  textShadow: "2px 2px 2px #BFAD97",
                }}
                className="text-4xl text-sub7 mr-4"
              >
                {index + 1}.
              </span>
              <div>
                <span
                  className="block overflow-hidden text-ellipsis"
                  style={{
                    whiteSpace: "normal",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    maxWidth: "210px",
                  }}
                >
                  {book.title}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationRecommend;
