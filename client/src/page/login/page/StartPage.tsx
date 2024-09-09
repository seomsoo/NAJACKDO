import React from 'react'

const StartPage = () => {
  return (
    <div className='flex flex-col items-center h-screen my-32'>
      <div className='text-2xl flex flex-col items-center gap-2 '>
      <span>
        <span className='maplestory text-4xl text-[#4E5944]'>나의 작은 도서관</span> 에
      </span>
      <span>오신 것을 환영 합니다.</span>
      
      </div>
      <img src="/images/survey/start3d.png" alt="img" className='mr-16 mt-4' />
      <p className='text-center text-sm mt-12 leading-relaxed'>
          “오늘의 나를 있게 한 것은 우리 마을 도서관이었다,<br />
          하버드 졸업장보다 소중한 것이 독서 하는 습관이다.”<br />
          <span className='font-semibold text-gray-500'>- 빌 게이츠</span>
        </p>
        <div className='mt-auto w-full '>
        <button className='bg-[#776B5D] font-bold w-full text-lg text-white py-3 rounded-lg'>
          시작하기
        </button>
      </div>
    </div>
  )
}

export default StartPage
