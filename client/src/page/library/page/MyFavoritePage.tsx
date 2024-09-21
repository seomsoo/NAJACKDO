import { IoIosArrowBack } from 'react-icons/io';
import { IoNotificationsOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getInterestbook } from 'api/interstbookApi'; // 관심 도서 조회 API
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs';
import BookcaseContainer from '../components/BookcaseContainer';
import BookContainer from '../components/BookContainer';

const MyFavoritePage = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  // 관심 도서 목록 조회
  const {
    data: interestBooks,
    isLoading,
    isError,
  } = useQuery('interestBooks', getInterestbook);

  // 책장 관련 배열은 그대로 유지
  const bookcaseArray = [
    {
      name: '정하림',
      imageArray: [
        'https://image.aladin.co.kr/product/18190/96/cover500/e893247390_1.jpg',
        'https://image.aladin.co.kr/product/18190/96/cover500/e893247390_1.jpg',
        'https://image.aladin.co.kr/product/18190/96/cover500/e893247390_1.jpg',
        'https://image.aladin.co.kr/product/18190/96/cover500/e893247390_1.jpg',
        'https://image.aladin.co.kr/product/18190/96/cover500/e893247390_1.jpg',
        'https://image.aladin.co.kr/product/18190/96/cover500/e893247390_1.jpg',
      ],
    },
    {
      name: '김도영',
      imageArray: [
        'https://image.aladin.co.kr/product/18190/96/cover500/e893247390_1.jpg',
        'https://image.aladin.co.kr/product/18190/96/cover500/e893247390_1.jpg',
        'https://image.aladin.co.kr/product/18190/96/cover500/e893247390_1.jpg',
      ],
    },
    {
      name: '서민수',
      imageArray: [
        'https://image.aladin.co.kr/product/18190/96/cover500/e893247390_1.jpg',
        'https://image.aladin.co.kr/product/18190/96/cover500/e893247390_1.jpg',
        'https://image.aladin.co.kr/product/18190/96/cover500/e893247390_1.jpg',
      ],
    },
  ];

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>오류가 발생했습니다.</div>;

  return (
    <div>
      <header className='sticky top-0 z-10 bg-[#F8F6F3] flex items-center justify-between p-6 py-4 mb-4'>
        <div className='items-center flex gap-2'>
          <button onClick={goBack} className='text-2xl'>
            <IoIosArrowBack />
          </button>
          <span className='font-extrabold text-2xl'>My Favorite</span>
        </div>
        <div className=' text-3xl text-[#545454]'>
          <Link to='/alarm'>
            <IoNotificationsOutline />
          </Link>
        </div>
      </header>

      <main className='px-6'>
        <Tabs defaultValue='bookcase' className='w-full'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='bookcase'>책장</TabsTrigger>
            <TabsTrigger value='book'>책</TabsTrigger>
          </TabsList>

          {/* 책장(Tab 1) */}
          <TabsContent value='bookcase'>
            {bookcaseArray.map((item, index) => (
              <div
                key={index}
                className='mx-3 my-5 bg-white/30 shadow rounded-lg p-4'
              >
                <BookcaseContainer
                  name={item.name}
                  imageArray={item.imageArray}
                />
              </div>
            ))}
          </TabsContent>

          {/* 관심 도서 리스트(Tab 2) */}
          <TabsContent value='book'>
            {interestBooks?.map((book) => (
              <BookContainer
                key={book.bookId}
                bookId={book.bookId} // 도서 ID
                title={book.title} // 도서 제목
                author={book.author} // 도서 저자
                description={book.description} // 도서 설명
                cover={book.cover} // 도서 커버 이미지
                isInterested={true} // 조회된 책은 이미 관심 도서
              />
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default MyFavoritePage;
