import { Link, useNavigate } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';
import { IoCartOutline, IoNotificationsOutline } from 'react-icons/io5';
import { SlArrowRight } from 'react-icons/sl';
const LibraryPage = () => {
  const navigate = useNavigate();
  const goToMyFavorite = () => {
    navigate('/library/my-favorite');
  };

  const images = ['ssafy.png', 'ssafy.png', 'ssafy.png'];

  return (
    <div className='px-6 pt-8'>
      <header className='flex items-center justify-between '>
        <span className='font-bold text-2xl'>
          <span className='hakgyo text-4xl text-[#5F6F52]'>서민수</span>님의
          서재
        </span>
        <div className='flex justify-between text-4xl gap-3 text-[#545454]'>
          <Link to='/search'>
            <IoIosSearch />
          </Link>
          <Link to='/cart'>
            <IoCartOutline />
          </Link>
          <Link to='/alarm'>
            <IoNotificationsOutline />
          </Link>
        </div>
      </header>
      <main className='mt-14'>
        <section className='flex flex-col gap-4'>
          <nav>
            <article className='flex items-center mb-7'>
              <span className='font-bold text-2xl'>나의 책장</span>
              <SlArrowRight className='ml-2 text-[#807B7B] text-xl' />
            </article>
            <article>
              <div className='flex justify-center gap-8'>
                {images.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`dummy-${index}`}
                    className='w-20 h-28 object-cover shadow-book-shadow rounded-r-lg rounded-br-lg'
                  />
                ))}
              </div>
              <img src='/images/library/bar.png' alt='bar' />
            </article>
          </nav>
          <nav>
            <article className='flex items-center mb-7'>
              <span className='font-bold text-2xl'>책 히스토리</span>
              <SlArrowRight className='ml-2 text-[#807B7B] text-xl' />
            </article>
            <article>
              <div className='flex justify-center gap-8'>
                {images.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`dummy-${index}`}
                    className='w-20 h-28 object-cover shadow-book-shadow rounded-r-lg rounded-br-lg'
                  />
                ))}
              </div>
              <img src='/images/library/bar.png' alt='bar' />
            </article>
          </nav>
          <nav>
            <article className='flex items-center mb-7'>
              <span className='font-bold text-2xl'>My Favorite</span>
              <SlArrowRight className='ml-2 text-[#807B7B] text-xl' />
            </article>
            <article>
              <div className='flex justify-center gap-8'>
                {images.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`dummy-${index}`}
                    className='w-20 h-28 object-cover shadow-book-shadow rounded-r-lg rounded-br-lg'
                  />
                ))}
              </div>
              <img src='/images/library/bar.png' alt='bar' />
            </article>
          </nav>
        </section>
      </main>
      {/* <button onClick={goToMyFavorite}>My Favorite</button> */}
    </div>
  );
};

export default LibraryPage;
