import KakaoMap from '../components/KakaoMap';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

const LocationSettingPage = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <div className='flex flex-row mx-6 py-4'>
        <button onClick={goBack}>
          <IoIosArrowBack />
        </button>
        <p className='text-2xl font-bold ml-2'>지역 설정</p>
      </div>
      <KakaoMap />
    </div>
  );
};

export default LocationSettingPage;
