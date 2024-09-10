import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';

const CustomCheckbox: React.FC = () => {
  const [allChecked, setAllChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [marketingChecked, setMarketingChecked] = useState(false);

  const handleAllCheck = () => {
    const newChecked = !allChecked;
    setAllChecked(newChecked);
    setTermsChecked(newChecked);
    setPrivacyChecked(newChecked);
    setMarketingChecked(newChecked);
  };

  const handleIndividualCheck = (
    setFunction: React.Dispatch<React.SetStateAction<boolean>>,
    value: boolean
  ) => {
    setFunction(value);
    setAllChecked(value && termsChecked && privacyChecked && marketingChecked);
  };

  return (
    <div>
      <div className='py-8 pl-2'>
        <span className='text-2xl font-semibold'>서비스 이용동의</span>
      </div>
      <div className='flex flex-col gap-5 pl-2 pt-7'>
        <div className='flex items-center'>
          <input
            type='checkbox'
            id='allCheck'
            className='hidden peer'
            checked={allChecked}
            onChange={handleAllCheck}
          />
          <label
            htmlFor='allCheck'
            className={`flex items-center justify-center w-6 h-6 border-2 rounded-lg cursor-pointer
              ${allChecked ? 'border-[#5F6F52] bg-[#5F6F52]' : 'border-gray-400'}`}
          >
            {allChecked && <FaCheck className='text-white w-4 h-4' />}
          </label>
          <span className='ml-3 text-lg font-bold'>약관 전체 동의</span>
        </div>
        <div className='flex items-center'>
          <input
            type='checkbox'
            id='termsCheck'
            className='hidden peer'
            checked={termsChecked}
            onChange={(e) =>
              handleIndividualCheck(setTermsChecked, e.target.checked)
            }
          />
          <label
            htmlFor='termsCheck'
            className={`flex items-center justify-center w-6 h-6 border-2 rounded-lg cursor-pointer
              ${termsChecked ? 'border-[#5F6F52] bg-[#5F6F52]' : 'border-gray-400'}`}
          >
            {termsChecked && <FaCheck className='text-white w-4 h-4' />}
          </label>
          <span className='ml-3 text-lg'>(필수) 약관 전체 동의</span>
        </div>
        <div className='flex items-center'>
          <input
            type='checkbox'
            id='privacyCheck'
            className='hidden peer'
            checked={privacyChecked}
            onChange={(e) =>
              handleIndividualCheck(setPrivacyChecked, e.target.checked)
            }
          />
          <label
            htmlFor='privacyCheck'
            className={`flex items-center justify-center w-6 h-6 border-2 rounded-lg cursor-pointer
              ${privacyChecked ? 'border-[#5F6F52] bg-[#5F6F52]' : 'border-gray-400'}`}
          >
            {privacyChecked && <FaCheck className='text-white w-4 h-4' />}
          </label>
          <span className='ml-3 text-lg'>(필수) 개인정보 처리방침</span>
        </div>
        <div className='flex items-center'>
          <input
            type='checkbox'
            id='marketingCheck'
            className='hidden peer'
            checked={marketingChecked}
            onChange={(e) =>
              handleIndividualCheck(setMarketingChecked, e.target.checked)
            }
          />
          <label
            htmlFor='marketingCheck'
            className={`flex items-center justify-center w-6 h-6 border-2 rounded-lg cursor-pointer
              ${marketingChecked ? 'border-[#5F6F52] bg-[#5F6F52]' : 'border-gray-400'}`}
          >
            {marketingChecked && <FaCheck className='text-white w-4 h-4' />}
          </label>
          <span className='ml-3 text-lg'>(선택) 푸시 알림 수신 동의</span>
        </div>
      </div>
    </div>
  );
};

export default CustomCheckbox;
