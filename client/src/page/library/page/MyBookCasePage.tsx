import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { BiBookAdd } from 'react-icons/bi';
import { IoIosArrowBack } from 'react-icons/io';
import { IoNotificationsOutline } from 'react-icons/io5';
import BookGrid from '../components/BookGrid'; // BookGrid 컴포넌트 불러오기
import { getMyBookCase } from 'api/bookcaseApi'; // API 호출 함수

const MyBookCasePage = () => {
  const navigate = useNavigate();

  // 나의 책장 데이터 조회 (단일 객체로 처리)
  const {
    data: bookcase, // 단일 객체로 반환됨
    isLoading: isBookcaseLoading,
    isError: isBookcaseError,
  } = useQuery({
    queryKey: ['myBookCase'],
    queryFn: getMyBookCase,
  });

  const goBack = () => {
    navigate(-1);
  };

  if (isBookcaseLoading) {
    return <div>로딩 중...</div>;
  }

  if (isBookcaseError) {
    return <div>에러가 발생했습니다.</div>;
  }

  // 책 데이터가 없으면 메시지 표시
  const hasBooks = bookcase && bookcase.displayBooks?.length > 0;

  return (
    <div>
      <header className='sticky top-0 z-10 bg-[#F8F6F3] flex items-center justify-between p-6 py-4'>
        <div className='items-center flex gap-2'>
          <button onClick={goBack} className='text-2xl'>
            <IoIosArrowBack />
          </button>
        </div>
        <div className='flex justify-between text-3xl gap-5 text-[#545454]'>
          <Link to='/apply/book'>
            <BiBookAdd />
          </Link>
          <Link to='/alarm'>
            <IoNotificationsOutline />
          </Link>
        </div>
      </header>

      <main className='px-6'>
        <article className='flex items-center w-full justify-between font-extrabold text-2xl mb-5'>
          <div className='flex items-center'>
            <span>나의 책장</span>
          </div>
          <button>
            <img
              src={bookcase?.profileImage || '/basic_profile.png'} // 기본 이미지 처리
              alt='profile'
              className='rounded-full w-16 h-16  '
            />
          </button>
        </article>

        <section className='flex flex-col items-center text-center mt-12 gap-6'>
          {/* 책 데이터가 있을 때 */}
          {hasBooks ? (
            <BookGrid books={bookcase.displayBooks} isMyBookCase={true} />
          ) : (
            // 책 데이터가 없을 때
            <div className='flex flex-col items-center mt-16'>
              <img src='/book_icon.png' alt='book' className='w-40 h-40 mb-6' />
              <p className='text-lg font-semibold'>
                책장이 텅 비었네요! 첫 책을 추가해보세요.
              </p>
              <Link
                to='/apply/book'
                className='mt-14 p py-4 w-full bg-[#5f6f52] text-white rounded-lg hover:bg-[#4e5e42]'
              >
                책 추가하기
              </Link>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default MyBookCasePage;