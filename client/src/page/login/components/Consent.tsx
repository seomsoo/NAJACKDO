import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import useSurveyStore from "store/useSurveyStore";

const Consent = () => {
  const [allChecked, setAllChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [marketingChecked, setMarketingChecked] = useState(false);

  const setConsentAccepted = useSurveyStore(
    (state) => state.setConsentAccepted
  );

  useEffect(() => {
    setConsentAccepted(termsChecked && privacyChecked);
  }, [termsChecked, privacyChecked, setConsentAccepted]);

  const handleAllCheck = (checked: boolean) => {
    setAllChecked(checked);
    setTermsChecked(checked);
    setPrivacyChecked(checked);
    setMarketingChecked(checked);
  };

  useEffect(() => {
    setAllChecked(termsChecked && privacyChecked && marketingChecked);
  }, [termsChecked, privacyChecked, marketingChecked]);

  return (
    <div className="py-8 pl-4 mt-16">
      <span className="text-2xl font-semibold">서비스 이용동의</span>

      <div className="flex flex-col gap-5 pl-2 pt-12">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="allCheck"
            className="hidden peer"
            checked={allChecked}
            onChange={(e) => handleAllCheck(e.target.checked)}
          />
          <label
            htmlFor="allCheck"
            className={`flex items-center justify-center w-6 h-6 border-2 rounded-lg cursor-pointer ${
              allChecked ? "border-main bg-main" : "border-gray-400"
            }`}
          >
            {allChecked && <FaCheck className="text-white w-4 h-4" />}
          </label>
          <span className="ml-3 text-lg font-bold">약관 전체 동의</span>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="termsCheck"
            className="hidden peer"
            checked={termsChecked}
            onChange={(e) => setTermsChecked(e.target.checked)}
          />
          <label
            htmlFor="termsCheck"
            className={`flex items-center justify-center w-6 h-6 border-2 rounded-lg cursor-pointer ${
              termsChecked ? "border-main bg-main" : "border-gray-400"
            }`}
          >
            {termsChecked && <FaCheck className="text-white w-4 h-4" />}
          </label>
          <span className="ml-3 text-lg">(필수) 서비스 이용 약관</span>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="privacyCheck"
            className="hidden peer"
            checked={privacyChecked}
            onChange={(e) => setPrivacyChecked(e.target.checked)}
          />
          <label
            htmlFor="privacyCheck"
            className={`flex items-center justify-center w-6 h-6 border-2 rounded-lg cursor-pointer ${
              privacyChecked ? "border-main bg-main" : "border-gray-400"
            }`}
          >
            {privacyChecked && <FaCheck className="text-white w-4 h-4" />}
          </label>
          <span className="ml-3 text-lg">(필수) 개인정보 처리방침</span>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="marketingCheck"
            className="hidden peer"
            checked={marketingChecked}
            onChange={(e) => setMarketingChecked(e.target.checked)}
          />
          <label
            htmlFor="marketingCheck"
            className={`flex items-center justify-center w-6 h-6 border-2 rounded-lg cursor-pointer ${
              marketingChecked ? "border-main bg-main" : "border-gray-400"
            }`}
          >
            {marketingChecked && <FaCheck className="text-white w-4 h-4" />}
          </label>
          <span className="ml-3 text-lg">(선택) 푸시 알림 수신 동의</span>
        </div>
      </div>
    </div>
  );
};

export default Consent;
