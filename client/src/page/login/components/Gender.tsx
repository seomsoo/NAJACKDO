import React, { useState } from 'react';

const Gender = () => {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const handleSelectGender = (gender: string) => {
    setSelectedGender(gender);
  };

  const getButtonClass = (gender: string) => {
    return `border-4 rounded-full  ${
      selectedGender === gender ? 'border-[#a6b37d]' : 'border-transparent'
    }`;
  };

  return (
    <div className='flex flex-col items-center text-2xl py-8 font-semibold'>
      <header>성별을 선택해주세요</header>
      <div className='text-[#737373] font-light mt-4 text-xs flex flex-col items-center'>
        <span>성별은 공개되지 않아요</span>
        <span>더 좋은 책과 문장을 추천드리기 위해 활용됩니다.</span>
      </div>

      <div className='grid grid-cols-2 gap-14 mt-28 w-full max-w-sm'>
        <div className='flex flex-col items-center gap-4 '>
          <button
            className={getButtonClass('male')}
            onClick={() => handleSelectGender('male')}
          >
            <img src='/images/survey/male.png' alt='male'/>
          </button>
          <span className='text-xl font-semibold'>남성</span>
        </div>
        <div className='flex flex-col items-center gap-4 '>
          <button
            className={getButtonClass('female')}
            onClick={() => handleSelectGender('female')}
          >
            <img src='/images/survey/female.png' alt='female' />
          </button>
          <span className='text-xl font-semibold'>여성</span>
        </div>
      </div>
    </div>
  );
};

export default Gender;
