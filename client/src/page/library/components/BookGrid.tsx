import { FaCheck } from 'react-icons/fa';
import { IBookCase } from 'atoms/BookCase.type';

type BookGridProps = {
  books: IBookCase['displayBooks'];
  isMyBookCase: boolean;
  checked?: boolean[]; // 체크 상태를 받음
  onCheck?: (index: number) => void; // 체크박스 변경 핸들러
};

const BookGrid = ({ books, isMyBookCase, checked, onCheck }: BookGridProps) => {
  // 이미지를 3개씩 묶는 함수
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

  const bookChunks = chunkArray(books, 3); // 3개의 책을 한 그룹으로 묶음

  // 책 상태에 따른 뱃지 렌더링 함수
  const renderBadge = (bookStatus: string) => {
    if (isMyBookCase) {
      if (bookStatus === '대여 중') {
        return (
          <span className='absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#5f6f52] p-2 px-3 rounded-2xl text-white font-light text-xs text-nowrap mb-1'>
            대여 중
          </span>
        );
      } else if (bookStatus === '연체 중') {
        return (
          <span className='absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#D96363] p-2 px-3 rounded-2xl text-white font-light text-xs text-nowrap mb-1'>
            연체 중
          </span>
        );
      } else if (bookStatus === '인증 필요') {
        return (
          <span className='absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#3078E4] p-2 px-3 rounded-2xl text-white font-light text-xs text-nowrap mb-1'>
            인증 필요
          </span>
        );
      }
    } else {
      if (bookStatus === '대여 가능') {
        return (
          <span className='absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#5f6f52] p-2 px-3 rounded-2xl text-white font-light text-xs text-nowrap mb-1'>
            대여 가능
          </span>
        );
      } else if (bookStatus === '대여 불가') {
        return (
          <span className='absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#D96363] p-2 px-3 rounded-2xl text-white font-light text-xs text-nowrap mb-1'>
            대여 불가
          </span>
        );
      }
    }
    return null;
  };

  return (
    <>
      {bookChunks.map((chunk, chunkIndex) => (
        <div key={chunkIndex} className='mb-9'>
          <div className='grid grid-cols-3 gap-4'>
            {chunk.map((book, index) => (
              <div key={book.bookId}>
                {!isMyBookCase && onCheck && checked && (
                  <div className='mb-1 ml-2'>
                    <input
                      type='checkbox'
                      id={`check-${chunkIndex * 3 + index}`} // 고유한 id 부여
                      className='hidden peer'
                      checked={checked[chunkIndex * 3 + index]} // 각 이미지에 대한 체크 상태
                      onChange={() => onCheck(chunkIndex * 3 + index)} // 체크박스 상태 변경 핸들러
                    />
                    <label
                      htmlFor={`check-${chunkIndex * 3 + index}`}
                      className={`flex items-center justify-center w-6 h-6 border-2 rounded-lg cursor-pointer ${
                        checked[chunkIndex * 3 + index]
                          ? 'border-[#5F6F52] bg-[#5F6F52]'
                          : 'border-gray-400'
                      }`}
                    >
                      {checked[chunkIndex * 3 + index] && (
                        <FaCheck className='text-white w-4 h-4' />
                      )}
                    </label>
                  </div>
                )}

                <div className='flex flex-col items-center relative'>
                  <img
                    src={book.cover}
                    alt={`book-${index}`}
                    className='w-20 h-28 object-cover shadow-book-shadow rounded-r-lg rounded-br-lg'
                  />
                  {renderBadge(book.bookStatus)} {/* 책 상태 뱃지 표시 */}
                </div>
              </div>
            ))}
          </div>
          <div>
            <img src='/images/library/bar.png' alt='bar' className='w-full' />
          </div>
        </div>
      ))}
    </>
  );
};

export default BookGrid;
