import Grade from 'page/profile/components/Grade';
import MannerBarGraph from 'page/profile/components/MannerBarGraph';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from 'api/profileApi';

const MannerTree = () => {
  const navigate = useNavigate();

  const goToGrade = () => {
    navigate('/profile/my-grade');
  };

  const {
    data: profileInfo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: getUserInfo,
  });

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }

  // API로부터 받은 데이터를 통해 각 변수 설정
  const mannerScore = profileInfo?.mannerScore || 0; // 기본값 0
  const goodReviewCount = profileInfo?.goodReviewCount || 0; // 기본값 0
  const badReviewCount = profileInfo?.badReviewCount || 0; // 기본값 0

  // ratio 계산을 위해 totalReviewCount 계산
  const totalReviewCount = goodReviewCount + badReviewCount;

  return (
    <div onClick={goToGrade} className='my-6 bg-white/30 shadow rounded-lg p-4'>
      <div className='flex flex-row items-center mb-2'>
        <p className='font-bold'>신뢰 나무</p>
        <IoIosArrowForward size={15} color='black' />
      </div>
      {/* mannerScore를 degree로 전달 */}
      <Grade degree={mannerScore} color={'#79ac78'} />
      <div className='pt-9'>
        <p className='font-bold'>받은 매너 평가</p>
        {/* goodReviewCount를 사용한 MannerBarGraph */}
        <MannerBarGraph
          ratio={totalReviewCount ? goodReviewCount / totalReviewCount : 0}
          value={goodReviewCount}
          label={'good'}
        />
        {/* badReviewCount를 사용한 MannerBarGraph */}
        <MannerBarGraph
          ratio={totalReviewCount ? badReviewCount / totalReviewCount : 0}
          value={badReviewCount}
          label={'bad'}
        />
      </div>
    </div>
  );
};

export default MannerTree;
