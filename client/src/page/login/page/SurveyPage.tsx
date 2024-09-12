import { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import Consent from '../components/Consent';
import Age from '../components/Age';
import Gender from '../components/Gender';
import Nickname from '../components/Nickname';
import Interest from '../components/Interest';
import useSurveyStore from 'store/useSurveyStore';

const SurveyPage = () => {
  const [currentStep, setCurrentStep] = useState(0); // 현재 단계 관리
  const { age, gender, nickname, interests, consentAccepted } =
    useSurveyStore();

  // "다음" 버튼 활성화 조건 확인
  const checkStepCompletion = (): boolean => {
    switch (currentStep) {
      case 0:
        return consentAccepted; // 동의 단계 완료 확인
      case 1:
        return age !== null; // 나이 선택 완료 확인
      case 2:
        return gender !== null; // 성별 선택 완료 확인
      case 3:
        return nickname.length > 0; // 닉네임 입력 완료 확인
      case 4:
        return interests.length >= 3; // 관심 분야 3개 이상 선택 확인
      default:
        return false;
    }
  };

  // 다음 단계로 이동하는 함수
  const handleNextStep = () => {
    if (checkStepCompletion()) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  // 이전 단계로 이동하는 함수
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  // 각 단계 렌더링
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Consent />;
      case 1:
        return <Age />;
      case 2:
        return <Gender />;
      case 3:
        return <Nickname />;
      case 4:
        return <Interest />;
      default:
        return <Consent />;
    }
  };

  return (
    <div className='flex flex-col px-4 h-screen'>
      {currentStep > 0 && (
        <button className='pt-7' onClick={handlePrevStep}>
          <IoIosArrowBack className='text-4xl' />
        </button>
      )}
      {renderStep()}
      <div className='mt-auto w-full mb-32'>
        <button
          onClick={handleNextStep}
          className={`bg-[#776B5D] font-bold w-full text-lg text-white py-3 rounded-lg ${
            checkStepCompletion()
              ? 'opacity-100'
              : 'opacity-50 cursor-not-allowed'
          }`}
          disabled={!checkStepCompletion()}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default SurveyPage;
