import { useNavigate } from 'react-router-dom';
import BookcaseContainer from 'page/library/components/BookcaseContainer';
import { RiArrowDownSLine } from 'react-icons/ri';

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

  return (
    <div className='px-6'>
      <button
        onClick={goToLocationSetting}
        className='flex  items-center py-4 mb-4'
      >
        <div className='text-2xl font-bold'>
          <span className='text-[#79AC78]'>{user.location}</span>
          <span className='font-extrabold'>&nbsp;주변 책장</span>
        </div>
        {/* <div className="flex flex-row justify-start">
        <p className="text-[20px] font-semibold  text-[#79AC78]">{user.location}</p>
        <p className="text-[20px] font-semibold ">&nbsp;주변 책장</p>
      </div> */}
        <RiArrowDownSLine className='text-3xl ml-2' />
      </button>
      <div />
      {bookcaseArray.map((item, index) => {
        return (
          <div className='mb-4  border-b border-opacity-70 '>
            <BookcaseContainer
              key={index}
              name={item.name}
              imageArray={item.imageArray}
            />
          </div>
        );
      })}
    </div>
  );
};

export default LocationPage;
