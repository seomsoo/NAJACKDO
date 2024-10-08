import { postUserInfo } from "api/profileApi";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useSurveyStore from "store/useSurveyStore";
import Age from "../components/Age";
import Gender from "../components/Gender";
import Interest from "../components/Interest";
import Nickname from "../components/Nickname";
import StartPage from "./StartPage";

const SurveyPage = () => {
  const [currentStep, setCurrentStep] = useState(1); // 현재 단계 관리
  const {
    age,
    gender,
    nickname,
    avaliableNickname,
    interests,
    consentAccepted,
  } = useSurveyStore();
  const navigate = useNavigate();

  // 완료 버튼 클릭 시 호출되는 API
  const handleComplete = async () => {
    try {
      await postUserInfo({
        age,
        gender,
        nickname,
        interest: interests,
      });
      navigate("/setting/location");
    } catch (error) {
      console.error("설문 완료 시 오류:", error);
      // 오류 처리 로직 (예: 사용자에게 오류 메시지 표시)
    }
  };

  // "다음" 또는 "완료" 버튼 활성화 조건 확인
  const checkStepCompletion = (): boolean => {
    switch (currentStep) {
      case 1:
        return age !== null; // 나이 선택 완료 확인
      case 2:
        return gender !== null; // 성별 선택 완료 확인
      case 3:
        return nickname.length > 0 && avaliableNickname; // 닉네임 입력 완료 확인
      case 4:
        return interests.length >= 3;
      case 5:
        return true; // 관심 분야 3개 이상 선택 확인
      default:
        return false;
    }
  };

  // 다음 단계로 이동하는 함수
  const handleNextStep = () => {
    if (checkStepCompletion()) {
      if (currentStep < 5) {
        setCurrentStep((prevStep) => prevStep + 1);
      } else {
        handleComplete();
      }
    }
  };

  // 이전 단계로 이동하는 함수
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
    // todo: 1단계에서 뒤로가기 시 이전 페이지로 이동하는 로직 추가
  };

  // 각 단계 렌더링
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Age />;
      case 2:
        return <Gender />;
      case 3:
        return <Nickname />;
      case 4:
        return <Interest />;
      case 5:
        return <StartPage />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col px-4 pt-14">
      {currentStep > 1 && currentStep < 5 && (
        <button className="pt-7" onClick={handlePrevStep}>
          <IoIosArrowBack className="text-4xl" />
        </button>
      )}
      {renderStep()}
      <div className="w-full pt-12">
        <button
          onClick={handleNextStep}
          className={`bg-[#776B5D] font-bold w-full text-lg text-white py-3 rounded-lg ${
            checkStepCompletion()
              ? "opacity-100"
              : "opacity-50 cursor-not-allowed"
          }`}
          disabled={!checkStepCompletion()}
        >
          {currentStep === 5 ? "시작하기" : "다음"}
        </button>
      </div>
    </div>
  );
};

export default SurveyPage;
