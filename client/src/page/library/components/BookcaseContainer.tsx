import { deleteInterestBookCase, postInterestBookCase } from 'api/bookcaseApi';
import { useState } from 'react';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';

interface BookcaseContainerProps {
  userId?: number;
  name: string;
  imageArray: string[];
  isFollowed?: boolean;
}
const BookcaseContainer = ({
  userId,
  name,
  imageArray,
  isFollowed,
}: BookcaseContainerProps) => {
  // console.log('userId:', userId);
  const [heart, setHeart] = useState(isFollowed);

  const handleHeart = async () => {
    try {
      console.log('userId:', userId);

      if (heart) {
        await deleteInterestBookCase(userId);
        // console.log(`${name}님의 책장을 관심 목록에서 해제했습니다.`);
      } else {
        await postInterestBookCase(userId);
        // console.log(`${name}님의 책장을 관심 목록에 등록했습니다.`);
      }
      setHeart(!heart);
    } catch (error) {
      // console.error('관심 도서 등록/해제 중 오류 발생:', error);
    }
  };

  return (
    <div className=' my-5 bg-white/30 shadow rounded-lg p-4'>
      <div className='flex flex-row justify-between'>
        <p className='font-medium mb-2'>{name}님의 책장</p>
        <div onClick={handleHeart}>
          {heart ? (
            <IoHeart size={15} color='#D96363' />
          ) : (
            <IoHeartOutline size={15} color='#D96363' />
          )}
        </div>
      </div>
      <div
        className='flex overflow-x-auto whitespace-nowrap space-x-5'
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {imageArray.map((item, index) => {
          return (
            <img
              key={index}
              src={item}
              className='w-20  object-cover rounded-sm shadow-xl '
              alt='book'
            />
          );
        })}
      </div>
    </div>
  );
};

export default BookcaseContainer;
