import { useQuery } from '@tanstack/react-query';
import { getMainRecommendBook } from 'api/bookApi';
import ClipLoading from 'components/common/ClipLoading';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from 'store/useUserStore';
import useEmblaCarousel from 'embla-carousel-react';

const CategoryRecommend = () => {
  const nav = useNavigate();
  const userId = useUserStore().userId;
  const [selectedCategory, setSelectedCategory] = useState<string>('어린이');

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'center',
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(1);
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap()); // 선택된 슬라이드의 인덱스 업데이트
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect); // 슬라이드가 선택될 때마다 실행
  }, [emblaApi, onSelect]);

  // 컴포넌트가 마운트된 후 두 번째 슬라이드로 이동
  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(1); // 두 번째 슬라이드로 이동
    }
  }, [emblaApi]);

  const { data: recommendBooksData, isLoading } = useQuery({
    queryKey: ['recommBooks', selectedCategory],
    queryFn: () => getMainRecommendBook(selectedCategory),
    enabled: !!userId,
  });

  const selectClass =
    'bg-main border-2 border-main text-white px-2 py-0.5 rounded-xl mx-1.5 my-3';
  const notSelectClass =
    'text-main border-[1px] border-main px-2 py-0.5 rounded-xl mx-1.5 my-3';

  const categories = [
    '어린이',
    '소설/시/희곡',
    '경제경영',
    '과학',
    '사회과학',
    '역사',
    '에세이',
    '자기계발',
    '여행',
  ];

  // const { data: recommendBooksData, isLoading } = useQuery({
  //   queryKey: ["recommendBooks", selectedCategory, userId],
  //   queryFn: () => getRecommBooksWithGenre(userId, selectedCategory),
  //   enabled: !!userId,
  // });

  // const recommendedItemsWithScores = recommendBooksData?.recommended_items_with_scores;

  return (
    <div>
      <div className="flex overflow-x-auto mx-[-12px] whitespace-nowrap mt-1 scrollbar-hide">
        {categories.map((category) => (
          <div
            key={category}
            className={
              selectedCategory === category ? selectClass : notSelectClass
            }
            onClick={() => setSelectedCategory(category)}
          >
            <span>{category}</span>
          </div>
        ))}
      </div>

      <p className="font-bold text-xl mt-2">
        오늘의
        <span className="bg-main border-2  border-main font-medium text-white px-3 py-0.5 rounded-full mx-2">
          {selectedCategory}
        </span>
        추천도서는?
      </p>

      {isLoading ? (
        <ClipLoading className="h-40" />
      ) : (
        <div className="relative overflow-hidden h-[280px]" ref={emblaRef}>
          <div className="flex">
            {recommendBooksData?.map((book, index) => (
              <div
                className={`flex-shrink-0 mx-2   mt-5  transition-transform duration-300 ${
                  index === selectedIndex
                    ? 'transform scale-100 opacity-100'
                    : 'transform scale-75 opacity-70'
                }`}
                key={book.bookId}
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-[170px] h-[240px] object-cover"
                  onClick={() => nav(`/book/${book.bookId}`)}
                  style={{
                    boxShadow:
                      '0 8px 8px  rgba(0, 0, 0, 0.3), 0 6px 20px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryRecommend;
