import { Link, useNavigate } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';
import { IoCartOutline, IoNotificationsOutline } from 'react-icons/io5';
import { SlArrowRight } from 'react-icons/sl';
const LibraryPage = () => {
  const navigate = useNavigate();
  const goToMyFavorite = () => {
    navigate('/library/my-favorite');
  };
  const goToMyLibrary = () => {
    navigate('/library/my-library');
  };
  const goToMyHistory = () => {
    navigate('/library/my-history');
  };

  const images = ['ssafy.png', 'ssafy.png', 'ssafy.png'];

  return (
    <div>
      <header className='flex items-center justify-between p-4 px-6 mb-3 '>
        <span className='font-extrabold text-2xl'>
          <span className='hakgyo text-3xl text-[#5F6F52]'>민수</span>
          님의 서재
        </span>
        <div className='flex justify-between text-3xl gap-3 text-[#545454]'>
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
      <main className=' px-6'>
        <section className='flex flex-col gap-10'>
          <nav>
            <button onClick={goToMyLibrary}>
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
            </button>
          </nav>
          <nav>
            <button onClick={goToMyHistory}>
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
            </button>
          </nav>

          <nav>
            <button onClick={goToMyFavorite}>
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
            </button>
          </nav>
        </section>
      </main>
    </div>
  );
};

export default LibraryPage;
