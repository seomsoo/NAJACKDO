import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiBookAdd } from 'react-icons/bi';
import { IoIosArrowBack } from 'react-icons/io';
import {
  IoHeart,
  IoHeartOutline,
  IoNotificationsOutline,
} from 'react-icons/io5';

const MyLibraryPage = () => {
  const [heart, setHeart] = useState(false);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const images: string[] = [
    '/ssafy.png',
    '/ssafy.png',
    '/ssafy.png',
    '/ssafy.png',
    '/ssafy.png',
    '/ssafy.png',
    '/ssafy.png',
    '/ssafy.png',
    '/ssafy.png',
    '/ssafy.png',
    '/ssafy.png',
    '/ssafy.png',
    '/ssafy.png',
  ];

  // 이미지를 3개씩 묶는 함수
  const chunkArray = (arr: string[], size: number): string[][] => {
    const result: string[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  // 3개씩 묶은 배열
  const imageChunks = chunkArray(images, 3);

  const handleHeart = () => {
    setHeart(!heart);
  };

  return (
    <div>
      <header className='sticky top-0 z-10 bg-[#F8F6F3] flex items-center justify-between p-6 mb-4'>
        <div className='items-center flex gap-2'>
          <button onClick={goBack} className='text-2xl'>
            <IoIosArrowBack />
          </button>
          <button className='flex items-center font-extrabold text-2xl'>
            {/* <span>나의</span> */}
            <span className='flex items-center'>
              {/* <img
                src='/하니.png'
                alt='profile'
                className='rounded-full w-12 h-12'
              /> */}
              <span className='hakgyo text-3xl text-[#5F6F52]'>김도영</span>님의
            </span>
            <span className='ml-2'>책장</span>
          </button>
        </div>
        <div className='flex justify-between text-2xl gap-5 text-[#545454]'>
          {/* <Link to='/book/apply'>
            <BiBookAdd />
          </Link> */}
          <div onClick={handleHeart} className='text-[#D96363]'>
            {heart ? <IoHeartOutline /> : <IoHeart />}
          </div>
          <Link to='/alarm'>
            <IoNotificationsOutline />
          </Link>
        </div>
      </header>
      <main className='px-6'>
        <section>
          <nav>
            <article>
              {imageChunks.map((chunk, chunkIndex) => (
                <div key={chunkIndex} className='mb-9'>
                  <div className='grid grid-cols-3 gap-4'>
                    {chunk.map((src, index) => (
                      <div
                        key={index}
                        className='flex flex-col items-center relative'
                      >
                        <img
                          src={src}
                          alt={`dummy-${index}`}
                          className='w-20 h-28 object-cover shadow-book-shadow rounded-r-lg rounded-br-lg'
                        />

                        {/* <span className='absolute bottom-0  left-1/2 transform -translate-x-1/2 bg-[#5f6f52] p-2 px-3 rounded-2xl text-white font-light text-xs text-nowrap mb-1'>
                          대여 중
                        </span> */}
                        {/* <span className='absolute bottom-0  left-1/2 transform -translate-x-1/2 bg-[#D96363] p-2 px-3 rounded-2xl text-white font-light text-xs text-nowrap mb-1'>
                          연체 중
                        </span> */}
                        {/* <span className='absolute bottom-0  left-1/2 transform -translate-x-1/2 bg-[#3078E4] p-2 px-3 rounded-2xl text-white font-light text-xs text-nowrap mb-1'>
                          인증 필요
                        </span> */}
                        <span className='absolute bottom-0  left-1/2 transform -translate-x-1/2 bg-[#5f6f52] p-2 px-3 rounded-2xl text-white font-light text-xs text-nowrap mb-1'>
                          대여 가능
                        </span>
                        {/* <span className='absolute bottom-0  left-1/2 transform -translate-x-1/2 bg-[#D96363] p-2 px-3 rounded-2xl text-white font-light text-xs text-nowrap mb-1'>
                          대여 불가
                        </span> */}
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
    </div>
  );
};

export default MyLibraryPage;
