import { FaCheck } from 'react-icons/fa';
import { IBookCase } from 'atoms/BookCase.type';
import { useNavigate } from 'react-router-dom';

type OtherBookGridProps = {
  books: IBookCase['displayBooks'];
  checked?: boolean[];
  onCheck?: (index: number) => void;
};

const OtherBookGrid = ({ books, checked, onCheck }: OtherBookGridProps) => {
  const navigate = useNavigate();
  
  // 이미지를 3개씩 묶는 함수 (기존 함수 유지)
  const chunkArray = (
    arr: IBookCase['displayBooks'],
    size: number
  ): IBookCase['displayBooks'][] => {
    const result: IBookCase['displayBooks'][] = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const bookChunks = chunkArray(books, 3);

  // 책 상태에 따른 뱃지 렌더링 함수
  const renderBadge = (bookStatus: string) => {
    if (bookStatus === 'AVAILABLE') {
      return (
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#5f6f52] p-2 px-3 rounded-2xl text-white font-light text-xs text-nowrap mb-1">
          대여 가능
        </span>
      );
    } else if (bookStatus === 'UNAVAILABLE' || bookStatus === 'RENTED' || bookStatus === 'NOT_INSPECTED') {
      return (
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#D96363] p-2 px-3 rounded-2xl text-white font-light text-xs text-nowrap mb-1">
          대여 불가
        </span>
      );
    }
    return null;
  };

  // 책 이미지 클릭함수
  const handleBookClick = (book: IBookCase['displayBooks'][0]) => {
    if (book.bookStatus === 'AVAILABLE') {
      navigate(`/book/${book.userBookId}/rental`);
    } else {
      navigate(`/book/${book.bookId}`);
    }
  };

  return (
    <>
      {bookChunks.map((chunk, chunkIndex) => (
        <div key={chunkIndex} className="mb-9">
          <div className="grid grid-cols-3 gap-4">
            {chunk.map((book, index) => (
              <div key={book.bookId} onClick={() => handleBookClick(book)}>
                
                {/* 항상 공간을 차지하되, bookStatus가 AVAILABLE일 때만 체크박스를 표시 */}
                <div className="mb-1 ml-2">
                  <input
                    type="checkbox"
                    id={`check-${chunkIndex * 3 + index}`}
                    className={`hidden peer ${
                      book.bookStatus === 'AVAILABLE' ? '' : 'invisible'
                    }`} // bookStatus가 AVAILABLE이 아니면 체크박스를 숨김
                    checked={checked?.[chunkIndex * 3 + index]}
                    onClick={(e) => e.stopPropagation()} // 이벤트 버블링 방지
                    onChange={() => onCheck?.(chunkIndex * 3 + index)}
                  />
                  <label
                    htmlFor={`check-${chunkIndex * 3 + index}`}
                    className={`flex items-center justify-center w-7 h-7 border-2 rounded-lg cursor-pointer ${
                      checked?.[chunkIndex * 3 + index]
                        ? 'border-[#5F6F52] bg-[#5F6F52]'
                        : 'border-gray-400'
                    } ${book.bookStatus !== 'AVAILABLE' ? 'invisible' : ''}`} // bookStatus가 AVAILABLE이 아니면 체크박스를 숨김
                    onClick={(e) => e.stopPropagation()} // 이벤트 버블링 방지
                  >
                    {checked?.[chunkIndex * 3 + index] && (
                      <FaCheck className="text-white w-4 h-4" />
                    )}
                  </label>
                </div>
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
            <img src="/images/library/bar.png" alt="bar" className="w-full" />
          </div>
        </div>
      ))}
    </>
  );
};

export default OtherBookGrid;