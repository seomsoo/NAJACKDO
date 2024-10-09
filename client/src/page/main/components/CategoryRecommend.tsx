import { useQuery } from "@tanstack/react-query";
import { getMainRecommendBook } from "api/bookApi";
import ClipLoading from "components/common/ClipLoading";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "store/useUserStore";

const CategoryRecommend = () => {
  const nav = useNavigate();
  const userId = useUserStore().userId;
  const [selectedCategory, setSelectedCategory] = useState<string>("어린이");

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(1);
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(1);
    }
  }, [emblaApi]);

  const {
    data: recommendBooksData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["recommBooks", selectedCategory],
    queryFn: () => getMainRecommendBook(selectedCategory),
    enabled: !!userId,
    retry: 0,
  });

  const selectClass =
    "bg-main border-2 border-main text-white px-2 py-0.5 rounded-xl mx-1.5 my-3";
  const notSelectClass =
    "text-main border-[1px] border-main px-2 py-0.5 rounded-xl mx-1.5 my-3";

  const categories = [
    "어린이",
    "소설/시/희곡",
    "경제경영",
    "과학",
    "사회과학",
    "역사",
    "에세이",
    "자기계발",
    "여행",
  ];

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
      ) : isError ? (
        <p className="text-red-500 mt-5 h-40 flex items-center justify-center text-center hakgyo text-xl">
          최소 하나의 책에 하트를 눌러주세요. <br />
          바로 추천받을 수 있습니다.
        </p>
      ) : (
        <div className="relative overflow-hidden h-[280px]" ref={emblaRef}>
          <div className="flex">
            {recommendBooksData?.slice(0, 8).map((book, index) => (
              <div
                className={`flex-shrink-0 mx-2   mt-5  transition-transform duration-300 ${
                  index === selectedIndex
                    ? "transform scale-100 opacity-100"
                    : "transform scale-75 opacity-70"
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
                      "0 8px 8px  rgba(0, 0, 0, 0.3), 0 6px 20px rgba(0, 0, 0, 0.1)",
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
