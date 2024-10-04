import { IBookCase } from "atoms/BookCase.type";
import { useNavigate } from "react-router-dom";

type MyBookGridProps = {
  books: IBookCase["displayBooks"];
  userId: number;
};

const MyBookGrid = ({ books, userId }: MyBookGridProps) => {
  const navigate = useNavigate();

  // 이미지를 3개씩 묶는 함수 (기존 함수 유지)
  const chunkArray = (
    arr: IBookCase["displayBooks"],
    size: number
  ): IBookCase["displayBooks"][] => {
    const result: IBookCase["displayBooks"][] = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const bookChunks = chunkArray(books, 3);

  // 책 상태에 따른 뱃지 렌더링 함수 (기존 함수 유지)
  const renderBadge = (bookStatus: string) => {
    if (bookStatus === "RENTED") {
      return (
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-main p-2 px-3 rounded-2xl text-white font-light text-xs text-nowrap mb-1">
          대여 중
        </span>
      );
    } else if (bookStatus === "UNAVAILABLE") {
      return (
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-sub9 p-2 px-3 rounded-2xl text-white font-light text-xs text-nowrap mb-1">
          대여 불가
        </span>
      );
    } else if (bookStatus === "NOT_INSPECTED") {
      return (
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#ca4477] p-2 px-3 rounded-2xl text-white font-light text-xs text-nowrap mb-1">
          인증 필요
        </span>
      );
    } else if (bookStatus === "AVAILABLE") {
      return (
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#3078E4] p-2 px-3 rounded-2xl text-white font-light text-xs text-nowrap mb-1">
          인증 완료
        </span>
      );
    }
    return null;
  };

  // 책 이미지 클릭함수
  const handleBookClick = (book: IBookCase["displayBooks"][0]) => {
    if (book.bookStatus === "NOT_INSPECTED") {
      navigate(`/ai-check`, { state: { userId, userBookId: book.userBookId } });
    } else {
      navigate(`/book/${book.userBookId}/rental`);
    }
  };

  return (
    <>
      {bookChunks.map((chunk, chunkIndex) => (
        <div key={chunkIndex} className="mb-9">
          <div className="grid grid-cols-3 gap-4">
            {chunk.map((book, index) => (
              <div key={book.bookId} onClick={() => handleBookClick(book)}>
                <div className="flex flex-col items-center relative">
                  <img
                    src={book.cover}
                    alt={`book-${index}`}
                    className="w-20 h-28 object-cover shadow-book-shadow rounded-r-lg rounded-br-lg"
                  />
                  {renderBadge(book.bookStatus)}
                </div>
              </div>
            ))}
          </div>
          <div>
            <img src="/images/Library/bar.png" alt="bar" className="w-full" />
          </div>
        </div>
      ))}
    </>
  );
};

export default MyBookGrid;
