import { IoIosArrowBack } from 'react-icons/io';
import { IoNotificationsOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getInterestbook } from 'api/bookApi';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs';
import BookcaseContainer from '../components/BookcaseContainer';
import BookContainer from '../components/BookContainer';
import { getInterestBookCase } from 'api/bookcaseApi';

const MyFavoritePage = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  // 관심 책장 목록 조회
  const {
    data: bookcases,
    isLoading: isBookcasesLoading,
    isError: isBookcasesError,
  } = useQuery({
    queryKey: ['interestBookCase'],
    queryFn: getInterestBookCase,
  });

  // 관심 도서 목록 조회
  const {
    data: interestBooks,
    isLoading: isInterestBooksLoading,
    isError: isInterestBooksError,
  } = useQuery({
    queryKey: ['interestBooks'],
    queryFn: getInterestbook,
  });

  if (isInterestBooksLoading || isBookcasesLoading)
    return <div>로딩 중...</div>;

  if (isInterestBooksError || isBookcasesError)
    return <div>오류가 발생했습니다.</div>;

  return (
    <div>
      <header className="sticky top-0 z-10 bg-[#F8F6F3] flex items-center justify-between p-6 py-4 mb-4">
        <div className="items-center flex gap-2">
          <button onClick={goBack} className="text-2xl">
            <IoIosArrowBack />
          </button>
          <span className="font-extrabold text-2xl">내가 좋아하는 책들</span>
        </div>
        <div className=" text-3xl text-[#545454]">
          <Link to="/alarm">
            <IoNotificationsOutline />
          </Link>
        </div>
      </header>

      <main className="px-6">
        <Tabs defaultValue="book" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="book">책</TabsTrigger>
            <TabsTrigger value="bookcase">책장</TabsTrigger>
          </TabsList>

          <TabsContent value="book">
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

          <TabsContent value="bookcase">
            {bookcases?.map((bookcase) => (
              <BookcaseContainer
                key={bookcase.userId}
                userId={bookcase.userId}
                name={bookcase.nickname}
                imageArray={bookcase.displayBooks.map((book) => book.cover)}
                isFollowed={bookcase.follow}
              />
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default MyFavoritePage;
