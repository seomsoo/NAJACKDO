import React from 'react';

const Consent = () => {
  return (
    <div>
      <div className='py-8 pl-2'>
        <span className='text-2xl font-semibold'>서비스 이용동의</span>
      </div>
      <div className='flex flex-col gap-5 pl-2 pt-7'>
        <div className='flex items-center'>
          <input type='checkbox' className='w-5 h-5 mr-3 ' />
          <span className='text-lg font-bold'>약관 전체 동의</span>
        </div>
        <div className='flex items-center'>
          <input type='checkbox' className='w-5 h-5 mr-3' />
          <span className='text-lg'>(필수) 약관 전체 동의</span>
        </div>
        <div className='flex items-center'>
          <input type='checkbox' className='w-5 h-5 mr-3' />
          <span className='text-lg'>(필수) 개인정보 처리방침</span>
        </div>
        <div className='flex items-center'>
          <input type='checkbox' className='w-5 h-5 mr-3' />
          <span className='text-lg'>(선택) 마케팅 정보 수신 동의</span>
        </div>
      </div>
    </div>
  );
};

export default Consent;
