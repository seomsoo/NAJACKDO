import { IoIosArrowBack } from 'react-icons/io';
import Review from '../components/Review';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getOtherProfile } from 'api/profileApi';

const GradePage = () => {
  const { nickname } = useParams();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const {
    data: profileInfo,
    isLoading: isOtherProfileLoading,
    isError: isOtherProfileError,
  } = useQuery({
    queryKey: ['profile', nickname],
    queryFn: () => getOtherProfile(nickname || ''),
    enabled: !!nickname,
  });

  if (isOtherProfileLoading) {
    return <div>로딩 중...</div>;
  }

  if (isOtherProfileError) {
    return <div>오류가 발생했습니다.</div>;
  }

  let gradeImage = '/images/mannertree/씨앗.png';
  let gradeLevel = 'Lv.1 나작씨앗';
  if (profileInfo.mannerScore >= 80) {
    gradeImage = '/images/mannertree/숲.png';
    gradeLevel = 'Lv.5 나작숲';
  } else if (profileInfo.mannerScore >= 60) {
    gradeImage = '/images/mannertree/나무.png';
    gradeLevel = 'Lv.4 나작나무';
  } else if (profileInfo.mannerScore >= 40) {
    gradeImage = '/images/mannertree/가지.png';
    gradeLevel = 'Lv.3 나작가지';
  } else if (profileInfo.mannerScore >= 20) {
    gradeImage = '/images/mannertree/새싹.png';
    gradeLevel = 'Lv.1 나작씨앗';
  }

  const reviewArray = [
    { count: 1, comment: '시간 약속을 안 지켜요.' },
    { count: 22, comment: '시간 약속을 안 지켜요.' },
    { count: 3, comment: '시간 약속을 안 지켜요.' },
  ];

  return (
    <div className='p-6 '>
      <button onClick={goBack}>
        <IoIosArrowBack className='text-2xl' />
      </button>
      <div className='flex text-xl  items-center font-bold justify-between'>
        <div className='flex flex-row justify-start my-5'>
          <p>{profileInfo.nickname}님의&nbsp;</p>
          <p className=' font-semibold text-[#79AC78]'>신뢰 나무</p>
        </div>
        <span className=' text-[#508d1e]'>{profileInfo.mannerScore} 점</span>
      </div>

      {/* 신뢰 나무 */}
      <div className='mt-7 flex justify-center'>
        <div className='w-44 h-44 rounded-full animate-glow bg-[#ebe3d5]/30 flex items-center justify-center'>
          <img src={gradeImage} alt='grade-bg' />
        </div>
      </div>
      <p className='my-3 text-center text-xl font-bold '>
        <span>{gradeLevel}</span>
      </p>

      <div className='mt-6 flex justify-center'>
        <div className='w-full p-3 rounded-lg bg-[#79AC78]/20'>
          <p className='text-[15px] font-medium '>받은 매너 칭찬</p>
          {reviewArray.map((item, index) => {
            return (
              <Review key={index} count={item.count} comment={item.comment} />
            );
          })}
        </div>
      </div>

      <div className='mt-4 flex justify-center'>
        <div className='w-full p-3 rounded-lg bg-[#B99470]/20'>
          <p className='text-[15px] font-medium '>받은 비매너</p>
          {reviewArray.map((item, index) => {
            return (
              <Review key={index} count={item.count} comment={item.comment} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GradePage;
