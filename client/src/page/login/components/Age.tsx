import React from 'react';
import { useState } from 'react';
const Age = () => {
  const [selectedAge, setSelectedAge] = useState<string | null>(null);

  const handleSelect = (age: string) => {
    setSelectedAge(age);
  };

  const getButtonClass = (age: string) => {
    return `border rounded-full py-4 px-3 items-center flex flex-col gap-2 ${
      selectedAge === age ? 'border-[#a6b37d]' : 'border-gray-200'
    }`;
  };
  return (
    <div className='flex flex-col items-center text-2xl py-8 font-semibold'>
      <header>연령을 선택해주세요</header>
      <div className='text-[#737373] font-light mt-4 text-xs flex flex-col items-center'>
        <span>나이는 공개되지 않아요</span>
        <span>더 좋은 책과 문장을 추천드리기 위해 활용됩니다.</span>
      </div>

      <div className='grid grid-cols-3 gap-4 mt-14'>
        <button
          onClick={() => handleSelect('유아')}
          className={getButtonClass('유아')}
        >
          <img src='/images/survey/child.png' alt='유아' className='text' />
          <span className='font-semibold text-xs whitespace-nowrap'>유아</span>
        </button>
        <button
          onClick={() => handleSelect('초등')}
          className={getButtonClass('초등')}
        >
          <img
            src='/images/survey/elementary.png'
            alt='초등'
            className='text'
          />
          <span className='font-semibold text-xs whitespace-nowrap'>
            초등(8~13세)
          </span>
        </button>
        <button
          onClick={() => handleSelect('중등')}
          className={getButtonClass('중등')}
        >
          <img src='/images/survey/middle.png' alt='중등' className='text' />
          <span className='font-semibold text-xs whitespace-nowrap'>
            중등(14~16세)
          </span>
        </button>
        <button
          onClick={() => handleSelect('고등')}
          className={getButtonClass('고등')}
        >
          <img src='/images/survey/high.png' alt='고등' className='text' />
          <span className='font-semibold text-xs whitespace-nowrap'>
            고등(17~19세)
          </span>
        </button>
        <button
          onClick={() => handleSelect('20대')}
          className={getButtonClass('20대')}
        >
          <img src='/images/survey/20.png' alt='20대' className='text' />
          <span className='font-semibold text-xs whitespace-nowrap'>20대</span>
        </button>
        <button
          onClick={() => handleSelect('30대')}
          className={getButtonClass('30대')}
        >
          <img src='/images/survey/30.png' alt='30대' className='text' />
          <span className='font-semibold text-xs whitespace-nowrap'>30대</span>
        </button>
        <button
          onClick={() => handleSelect('40대')}
          className={getButtonClass('40대')}
        >
          <img src='/images/survey/40.png' alt='40대' className='text' />
          <span className='font-semibold text-xs whitespace-nowrap'>40대</span>
        </button>
        <button
          onClick={() => handleSelect('50대')}
          className={getButtonClass('50대')}
        >
          <img src='/images/survey/50.png' alt='50대' className='text' />
          <span className='font-semibold text-xs whitespace-nowrap'>50대</span>
        </button>
        <button
          onClick={() => handleSelect('60대 이상')}
          className={getButtonClass('60대 이상')}
        >
          <img src='/images/survey/60.png' alt='60대 이상' className='text' />
          <span className='font-semibold text-xs whitespace-nowrap'>
            60대 이상
          </span>
        </button>
      </div>
    </div>
  );
};

export default Age;