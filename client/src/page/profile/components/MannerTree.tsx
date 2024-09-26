import Grade from 'page/profile/components/Grade';
import MannerBarGraph from 'page/profile/components/MannerBarGraph';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

interface MannerTreeProps {
  mannerScore: number;
  goodReviewCount: number;
  badReviewCount: number;
}

const MannerTree = ({
  mannerScore,
  goodReviewCount,
  badReviewCount,
}: MannerTreeProps) => {
  const navigate = useNavigate();
  const goToGrade = () => {
    navigate('/profile/my-grade');
  };

  const totalReviewCount = goodReviewCount + badReviewCount;

  return (
    <div onClick={goToGrade} className='my-6 bg-white/30 shadow rounded-lg p-4'>
      <div className='flex flex-row items-center mb-2'>
        <p className='font-bold'>신뢰 나무</p>
        <IoIosArrowForward size={15} color='black' />
      </div>
      <Grade degree={mannerScore} color={'#79ac78'} />
      <div className='pt-9'>
        <p className='font-bold'>받은 매너 평가</p>
        <MannerBarGraph
          ratio={totalReviewCount ? goodReviewCount / totalReviewCount : 0}
          value={goodReviewCount}
          label={'good'}
        />
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
