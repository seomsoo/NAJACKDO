import { deleteInterestBookCase, postInterestBookCase } from 'api/bookcaseApi';
import { useState, useEffect } from 'react';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

interface BookcaseContainerProps {
  userId: number;
  name: string;
  imageArray: string[];
  isFollowed?: boolean;
}

const BookcaseContainer = ({
  userId,
  name,
  imageArray,
  isFollowed = false, // 기본값을 false로 설정
}: BookcaseContainerProps) => {
  const [heart, setHeart] = useState(isFollowed);
  const navigate = useNavigate();


  useEffect(() => {
    setHeart(isFollowed); // API로부터 받은 값을 상태에 반영
  }, [isFollowed]);

  const handleHeart = async () => {
    try {
      if (heart) {
        await deleteInterestBookCase(userId); // 관심 해제
      } else {
        await postInterestBookCase(userId); // 관심 등록
      }
      setHeart(!heart); // 상태 변경
    } catch (error) {
      console.error('관심 도서 등록/해제 중 오류 발생:', error);
    }
  };

  return (
    <div className='my-5 bg-white/30 shadow rounded-lg p-4'>
      <div className='flex flex-row justify-between'>
        <p className='font-medium mb-2' onClick={() => navigate(`/library/bookcase/${userId}`)}>{name}님의 책장</p>
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
        onClick={() => navigate(`/library/bookcase/${userId}`)}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {imageArray.map((item, index) => (
          <img
            key={index}
            src={item}
            className='w-20 h-28  rounded-sm shadow-xl'
            alt='book'
          />
        ))}
      </div>
    </div>
  );
};

export default BookcaseContainer;
