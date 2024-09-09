import { IoIosArrowBack } from 'react-icons/io';
import Consent from '../components/Consent';
import Age from '../components/Age';
import Gender from '../components/Gender';
import Nickname from '../components/Nickname';
import Interest from '../components/Interest';
const SurveyPage = () => {
  return (
    <div className='flex flex-col px-4 h-screen '>
      <button className='pt-7'>
        <IoIosArrowBack className='text-4xl' />
      </button>
      {/* <Consent /> */}
      {/* <Age /> */}
      {/* <Gender /> */}
      {/* <Nickname/> */}
      {/* <Interest /> */}
      <div className='mt-auto w-full mb-32'>
        <button className='bg-[#776B5D] font-bold w-full text-lg text-white py-3 rounded-lg'>
          다음
        </button>
      </div>
    </div>
  );
};

export default SurveyPage;
