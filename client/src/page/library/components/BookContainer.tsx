import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { useState } from 'react';
import { postInterestbook, deleteInterestbook } from 'api/bookApi'; // API 호출 함수

interface BookContainerProps {
  bookId: number;
  title: string;
  author: string;
  description: string;
  cover: string;
  isInterested: boolean;
}

const BookContainer = ({
  bookId,
  title,
  author,
  description,
  cover,
  isInterested,
}: BookContainerProps) => {
  const [heart, setHeart] = useState(isInterested);

  const handleHeart = async () => {
    try {
      if (heart) {
        await deleteInterestbook(bookId);
      } else {
        await postInterestbook(bookId);
      }
      setHeart(!heart);
    } catch (error) {
      // console.error('관심 도서 등록/해제 중 오류 발생:', error);
    }
  };

  return (
    <div className='flex py-3 '>
      <img className='row-span-2 w-24' src={cover} alt='BookContainer' />
      <div className='overflow-hidden ml-2 flex flex-col gap-1'>
        <div className='flex justify-between items-center'>
          <p className='font-semibold'>{title}</p>
          {/* 하트 버튼 */}
          <div className='ml-2' onClick={handleHeart}>
            {heart ? (
              <IoHeart size={15} color='#D96363' />
            ) : (
              <IoHeartOutline size={15} color='#D96363' />
            )}
          </div>
        </div>
        <p className='text-sm font-medium'>{author}</p>
        <p className='text-xs leading-normal mt-2 pr-4 line-clamp-3'>
          {description}
        </p>
      </div>
    </div>
  );
};

export default BookContainer;
