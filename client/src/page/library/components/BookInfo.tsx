import CategoryTag from "components/common/CategoryTag";
import { useMutation, useQuery } from '@tanstack/react-query';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { deleteInterestbook, getInterestbook, postInterestbook } from 'api/bookApi';

interface BookInfoProps {
  book: {
    bookId: number;
    title: string;
    author: string;
    cover: string;
    genre: string;
    description: string;
    publisher: string;
    priceStandard: number;
    itemPage: number;
    starPoint: number;
    pubDate: string;
    isbn: number;
  };
  rental?: boolean;
}
const BookInfo = ({ book, rental }: BookInfoProps) => {
  const [interestBook, setInterestBook] = useState(false);
  const authorList = book.author.replace(" (지은이)", "").split(", ");
  const author = authorList.length > 1 ? authorList[0]+" 외 "+ (authorList.length-1) + "명" : authorList[0]
  const genreList = book.genre.split(">");
  const genre = genreList.length > 2 ? genreList.slice(1, 3) : genreList;
  console.log("genre", genre);
  console.log("genreList", genreList);
  const [heart, setHeart] = useState(false);
  
  const {
    data: interestBooks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['interestBooks'],
    queryFn: getInterestbook,
  });
  console.log("interestBooks", interestBooks);
  
  
  useEffect(() => {
    if (interestBooks) {
      setHeart(interestBooks.some(interestBook => interestBook.bookId === book.bookId));
    }
  }, [interestBooks, book.bookId]); 
  
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>유저 정보를 불러오지 못했습니다.</div>;
  }

  const handleHeart = async () => {
    try {
      if (heart) {
        await deleteInterestbook(book.bookId);
      } else {
        await postInterestbook(book.bookId);
      }
      setHeart(!heart);
    } catch (error) {
    }
  };



  
  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <p className="text-xl font-bold">{book.title}</p>
        {!rental ? 
          (
            <div className='ml-2' onClick={handleHeart}>
            {heart ? (
              <IoHeart size={15} color='#D96363' />
            ) : (
              <IoHeartOutline size={15} color='#D96363' />
            )}
            </div>
          ) : null}
      </div>
      <p>{author} 지음</p>

      {genre.map((genre, index) => {
        return <CategoryTag key={index} category={genre} />;
      })}
      <p
        dangerouslySetInnerHTML={{ __html: book.description }}
        className="my-8"
      ></p>
      {/* <p>{book.content}</p> */}
      <p className="font-bold">중고가 : {book.priceStandard}</p>
    </div>
  );
};

export default BookInfo;
