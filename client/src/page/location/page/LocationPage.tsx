import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import BookcaseContainer from 'page/library/components/BookcaseContainer';
import { RiArrowDownSLine } from 'react-icons/ri';
import { getUserInfo } from 'api/profileApi';
import { getNearBookCase } from 'api/locationApi';


const LocationPage = () => {
  const navigate = useNavigate();
  const goToLocationSetting = () => {
    navigate('/location/setting');
  };
  const user = {
    location: '수완동',
  };
  const bookcaseArray = [
    {
      name: '김도영',
      imageArray: [
        'https://placehold.co/71x104',
        'https://placehold.co/71x104',
        'https://placehold.co/71x104',
        'https://placehold.co/71x104',
        'https://placehold.co/71x104',
        'https://placehold.co/71x104',
      ],
    },
    {
      name: '이도영',
      imageArray: [
        'https://placehold.co/71x104',
        'https://placehold.co/71x104',
        'https://placehold.co/71x104',
      ],
    },
    {
      name: '박도영',
      imageArray: [
        'https://placehold.co/71x104',
        'https://placehold.co/71x104',
        'https://placehold.co/71x104',
      ],
    },
    {
      name: '정도영',
      imageArray: [
        'https://placehold.co/71x104',
        'https://placehold.co/71x104',
        'https://placehold.co/71x104',
      ],
    },
  ];
  // 유저 위치 정보 가져오기 
  const {
    data: userInfo,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });
  // 주변 책장 목록 조회
  const {
    data: bookcases,
    isLoading: isBookCaseLoading,
    isError: isBookCaseError,
  } = useQuery({
    queryKey: ['nearBookCase'],
    queryFn: getNearBookCase,
  });

  console.log(bookcases);
  
  if (isUserLoading || isBookCaseLoading)
    return <div>로딩 중...</div>;
  if (isUserError || isBookCaseError)
    return <div>오류가 발생했습니다.</div>;

  return (
    <div className='px-6'>
      <button
        onClick={goToLocationSetting}
        className='flex  items-center py-4 mb-4'
      >
        <div className='text-2xl font-bold'>
          <span className='text-[#79AC78]'> {userInfo?.locationName.split(' ').slice(-1)[0] || ' '}</span>
          <span className='font-extrabold'>&nbsp;주변 책장</span>
        </div>
        {/* <div className="flex flex-row justify-start">
        <p className="text-[20px] font-semibold  text-[#79AC78]">{user.location}</p>
        <p className="text-[20px] font-semibold ">&nbsp;주변 책장</p>
      </div> */}
        <RiArrowDownSLine className='text-3xl ml-2' />
      </button>
      <div />
        {bookcases?.map((bookcase) => (
          <BookcaseContainer
            key={bookcase.userId}
            userId={bookcase.userId}
            name={bookcase.nickname}
            imageArray={bookcase.displayBooks.map((book) => book.cover)}
            isFollowed={true}
          />
        ))}
      {/* {bookcaseArray.map((item, index) => {
        return (
          <div className='mb-4  border-b border-opacity-70 '>
            <BookcaseContainer
              key={index}
              name={item.name}
              imageArray={item.imageArray}
            />
          </div>
        );
      })} */}
    </div>
  );
};

export default LocationPage;
