import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { BiBookAdd } from 'react-icons/bi';
import { IoIosArrowBack } from 'react-icons/io';
import {
  IoHeart,
  IoHeartOutline,
  IoNotificationsOutline,
} from 'react-icons/io5';
type Book = {
  src: string;
  status: string;
};
const MyBookCasePage = () => {
  const [heart, setHeart] = useState(false);
  const [checked, setChecked] = useState<boolean[]>(new Array(13).fill(false));
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const [isMyBookCase, setIsMyBookCase] = useState(true);

  const books: Book[] = [
    {
      src: isMyBookCase ? '/ssafy.png' : '/harrypotter.png',
      status: '대여 중',
    },
    {
      src: isMyBookCase ? '/ssafy.png' : '/harrypotter.png',
      status: '연체 중',
    },
    {
      src: isMyBookCase ? '/ssafy.png' : '/harrypotter.png',
      status: '인증 필요',
    },
    {
      src: isMyBookCase ? '/ssafy.png' : '/harrypotter.png',
      status: '대여 가능',
    },
    {
      src: isMyBookCase ? '/ssafy.png' : '/harrypotter.png',
      status: '대여 불가',
    },
    {
      src: isMyBookCase ? '/ssafy.png' : '/harrypotter.png',
      status: '대여 가능',
    },
    {
      src: isMyBookCase ? '/ssafy.png' : '/harrypotter.png',
      status: '대여 중',
    },
    {
      src: isMyBookCase ? '/ssafy.png' : '/harrypotter.png',
      status: '연체 중',
    },
    {
      src: isMyBookCase ? '/ssafy.png' : '/harrypotter.png',
      status: '인증 필요',
    },
    {
      src: isMyBookCase ? '/ssafy.png' : '/harrypotter.png',
      status: '대여 가능',
    },
    {
      src: isMyBookCase ? '/ssafy.png' : '/harrypotter.png',
      status: '대여 불가',
    },
    {
      src: isMyBookCase ? '/ssafy.png' : '/harrypotter.png',
      status: '대여 중',
    },
    {
      src: isMyBookCase ? '/ssafy.png' : '/harrypotter.png',
      status: '대여 중',
    },
  ];

  // 이미지를 3개씩 묶는 함수
  const chunkArray = (arr: Book[], size: number): Book[][] => {
    const result: Book[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const bookChunks = chunkArray(books, 3); // bookChunks의 타입은 Book[][]

  const handleHeart = () => {
    setHeart(!heart);
  };

  const handleCheck = (index: number) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  };

  const isAnyChecked = checked.some((item) => item);

  const renderBadge = (status: string) => {
    if (isMyBookCase) {
      if (status === '대여 중') {
        return (
          <span className='absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#5f6f52] p-2 px-3 rounded-2xl text-white font-light text-xs text-nowrap mb-1'>
            대여 중
          </span>
        );
      } else if (status === '연체 중') {
        return (
          <span className='absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#D96363] p-2 px-3 rounded-2xl text-white font-light text-xs text-nowrap mb-1'>
            연체 중
          </span>
        );
      } else if (status === '인증 필요') {
        return (
          <span className='absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#3078E4] p-2 px-3 rounded-2xl text-white font-light text-xs text-nowrap mb-1'>
            인증 필요
          </span>
        );
      }
    } else {
      if (status === '대여 가능') {
        return (
          <span className='absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#5f6f52] p-2 px-3 rounded-2xl text-white font-light text-xs text-nowrap mb-1'>
            대여 가능
          </span>
        );
      } else if (status === '대여 불가') {
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
    <div>
      <header className='sticky top-0 z-10 bg-[#F8F6F3] flex items-center justify-between p-6 py-4 '>
        <div className='items-center flex gap-2'>
          <button onClick={goBack} className='text-2xl'>
            <IoIosArrowBack />
          </button>
        </div>
        <div className='flex justify-between text-3xl gap-5 text-[#545454]'>
          {isMyBookCase ? (
            <Link to='/apply/book'>
              <BiBookAdd />
            </Link>
          ) : (
            <div onClick={handleHeart} className='text-[#D96363]'>
              {heart ? <IoHeartOutline /> : <IoHeart />}
            </div>
          )}
          <Link to='/alarm'>
            <IoNotificationsOutline />
          </Link>
        </div>
      </header>

      <main className='px-6'>
        <article className='flex items-center w-full justify-between font-extrabold text-2xl mb-5'>
          <div className='flex items-center'>
            {isMyBookCase ? (
              <span>나의 책장</span>
            ) : (
              <span>
                <span className='hakgyo text-3xl text-[#5F6F52]'>김도영님</span>
                <span className='ml-2'>책장</span>
              </span>
            )}
          </div>
          <div className='flex justify-center'>
            <button
              onClick={() => setIsMyBookCase(!isMyBookCase)}
              className='bg-[#5f6f52] font-light p-2 text-white text-xs rounded-lg'
            >
              {isMyBookCase ? '다른 사용자 보기' : '나의 책장 보기'}
            </button>
          </div>
          <button>
            <img
              src={isMyBookCase ? '/pubao.png' : '/하니.png'}
              alt='profile'
              className='rounded-full w-16 h-16'
            />
          </button>
        </article>

        <section>
          <nav>
            <article>
              {bookChunks.map((chunk, chunkIndex) => (
                <div key={chunkIndex} className='mb-9'>
                  <div className='grid grid-cols-3 gap-4'>
                    {chunk.map((book, index) => (
                      <div key={index}>
                        {!isMyBookCase && (
                          <div className='mb-1 ml-2'>
                            <input
                              type='checkbox'
                              id={`check-${chunkIndex * 3 + index}`} // 고유한 id 부여
                              className='hidden peer'
                              checked={checked[chunkIndex * 3 + index]} // 각 이미지에 대한 체크 상태
                              onChange={() =>
                                handleCheck(chunkIndex * 3 + index)
                              }
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
                            src={book.src}
                            alt={`book-${index}`}
                            className='w-20 h-28 object-cover shadow-book-shadow rounded-r-lg rounded-br-lg'
                          />
                          {renderBadge(book.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <img
                      src='/images/library/bar.png'
                      alt='bar'
                      className='w-full'
                    />
                  </div>
                </div>
              ))}
            </article>
          </nav>
        </section>
      </main>
      {isAnyChecked && !isMyBookCase && (
        <aside className='fixed bottom-20 w-full text-white flex text-lg justify-around rounded-t-xl items-center bg-[#776B5D]'>
          <button className='px-12 p-8'>담기</button>
          <span className='ml-1'>|</span>
          <button className='p-8'>대여 신청</button>
        </aside>
      )}
    </div>
  );
};

export default MyBookCasePage;
