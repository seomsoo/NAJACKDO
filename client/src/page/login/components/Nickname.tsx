import React from 'react'

const Nickname = () => {
  return (
    <div className='flex flex-col items-center text-2xl py-8 font-semibold'>
      <header>닉네임을 입력해 주세요.</header>
      <div className='text-[#737373] font-light mt-4 text-xs flex flex-col items-center'>
        <span>닉네임은 나중에 언제든지 바꿀수 있어요.</span>
        <span>공백없이 8자 이하 기호는 -_. 만 사용 가능 합니다.</span>
      </div>
        <div className='mt-16'>
          <input type="text" className='text-5xl text-center bg-transparent text-[#B0A695]'
          placeholder='닉네임' />
        </div>
    
    </div>
  )
}

export default Nickname
