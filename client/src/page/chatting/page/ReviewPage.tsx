import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { PiSmileySadThin, PiSmileyThin } from 'react-icons/pi';
import { FaCheck } from 'react-icons/fa';
import { useState } from 'react';
const ReviewPage = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <header className='p-6 text-2xl font-semibold flex items-center '>
        <button onClick={goBack}>
          <IoIosArrowBack />
        </button>
        <span className='ml-20'>거래 후기 보내기</span>
      </header>
      <section className='pb-4 border-b'>
        <div className='flex ml-7 items-center'>
          <img
            src='/화학.png'
            alt='화학'
            className='object-cover rounded-xl w-16 h-16'
          />
          <div className='flex flex-col gap-2 ml-4 font-medium'>
            <span>90일 완성 돈버는 습관</span>
            <span className='text-xs'>
              <span className='text-gray-500'>거래한 이웃 </span>
              정하림
            </span>
          </div>
        </div>
      </section>
      <main className='px-6'>
        <div className='flex flex-col gap-2 py-11 text-2xl font-semibold'>
          <span>
            <span className='text-[#5F6F52]'>김도영</span>님,
          </span>
          <span className='text-base'>정하림님과 거래 어떠셨나요?</span>
        </div>
        <article>
          <div className='flex items-center justify-between px-5'>
            <div className='flex flex-col items-center'>
              <button className='text-[#989898] text-9xl'>
                <PiSmileyThin />
              </button>
              <span className='hakgyo text-2xl'>좋아요!</span>
            </div>
            <div className='flex flex-col items-center'>
              <button className='text-[#989898] text-9xl'>
                <PiSmileySadThin />
              </button>
              <span className='hakgyo text-2xl'>별로예요</span>
            </div>
          </div>
          <div className='gap-2 flex flex-col'>
            <div className='font-semibold text-lg pt-7 pb-4'>
              <span>어떤 점이 좋았나요?</span>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                id='check'
                className='hidden peer'
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
              <label
                htmlFor='check'
                className={`flex items-center justify-center w-6 h-6 border-2 rounded-lg cursor-pointer ${
                  checked ? 'border-[#5F6F52] bg-[#5F6F52]' : 'border-gray-400'
                }`}
              >
                {checked && <FaCheck className='text-white w-4 h-4' />}
              </label>
              <span className='text-sm font-medium'>책이 매우 깨끗해요.</span>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                id='check'
                className='hidden peer'
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
              <label
                htmlFor='check'
                className={`flex items-center justify-center w-6 h-6 border-2 rounded-lg cursor-pointer ${
                  checked ? 'border-[#5F6F52] bg-[#5F6F52]' : 'border-gray-400'
                }`}
              >
                {checked && <FaCheck className='text-white w-4 h-4' />}
              </label>
              <span className='text-sm font-medium'>
                시간 약속을 잘 지켜요.
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                id='check'
                className='hidden peer'
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
              <label
                htmlFor='check'
                className={`flex items-center justify-center w-6 h-6 border-2 rounded-lg cursor-pointer ${
                  checked ? 'border-[#5F6F52] bg-[#5F6F52]' : 'border-gray-400'
                }`}
              >
                {checked && <FaCheck className='text-white w-4 h-4' />}
              </label>
              <span className='text-sm font-medium'>
                친절하고 매너가 좋아요.
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                id='check'
                className='hidden peer'
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
              <label
                htmlFor='check'
                className={`flex items-center justify-center w-6 h-6 border-2 rounded-lg cursor-pointer ${
                  checked ? 'border-[#5F6F52] bg-[#5F6F52]' : 'border-gray-400'
                }`}
              >
                {checked && <FaCheck className='text-white w-4 h-4' />}
              </label>
              <span className='text-sm font-medium'>응답이 빨라요.</span>
            </div>
            <button className='bg-[#776B5D] font-bold w-full text-lg mt-8 text-white py-3 rounded-lg'>
              후기 보내기
            </button>
          </div>
        </article>
      </main>
    </div>
  );
};

export default ReviewPage;
