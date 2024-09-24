import { useState } from 'react';

const CategoryRecommend = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('로맨스');

  const select =
    'bg-[#A6B37D] border-2 border-[#A6B37D] text-white px-2 py-0.5 rounded-lg mx-2 my-3';
  const notSelect =
    'text-[#A6B37D] border-[1px] border-[#A6B37D] px-2  py-0.5 rounded-lg mx-2 my-3';

  const categories = [
    '로맨스',
    '무협',
    '판타지',
    '드라마',
    '학습',
    '과학',
    '액션',
    '호러',
  ];

  return (
    <div>
      <div
        className='flex overflow-x-auto whitespace-nowrap mt-3'
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {categories.map((category, index) => {
          return (
            <div
              key={index}
              className={selectedCategory === category ? select : notSelect}
              onClick={() => setSelectedCategory(category)}
            >
              <span>{category}</span>
            </div>
          );
        })}
      </div>
      <p className='font-bold text-xl mt-2'>
        오늘의
        <span className='bg-[#A6B37D] border-2  border-[#A6B37D] font-medium text-white px-3 py-0.5 rounded-full mx-1'>
          {selectedCategory}
        </span>
        추천도서는?
      </p>
      <div
        className='flex overflow-x-auto whitespace-nowrap'
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {Array(10)
          .fill(null)
          .map((_, index) => {
            return (
              <img
                src='ssafy.png'
                alt=''
                width={150}
                className='mx-1 mt-5'
                key={index}
              />
            );
          })}
      </div>
    </div>
  );
};

export default CategoryRecommend;
