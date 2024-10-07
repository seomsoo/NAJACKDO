import { useQuery } from "@tanstack/react-query";
import { getRecommBooksWithGenre } from "api/bookApi";
import ClipLoading from "components/common/ClipLoading";
import { useState } from "react";
import { useUserStore } from "store/useUserStore";

const CategoryRecommend = () => {
  const userId = useUserStore().userId;

  const [selectedCategory, setSelectedCategory] = useState<string>("어린이");

  // const { data: recommendBooksData, refetch } = useSuspenseQuery({
  //   queryKey: ["recommendBooks", selectedCategory],
  //   queryFn: () => getRecommBooksWithGenre(userId, selectedCategory),
  // });

  // useEffect(() => {
  //   if (userId) {
  //     refetch();
  //   }
  // }, [selectedCategory, userId]);

  const {
    data: recommendBooksData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["recommendBooks", selectedCategory, userId],
    queryFn: () => getRecommBooksWithGenre(userId, selectedCategory),
    enabled: !!userId,
  });

  const select =
    "bg-sub2 border-2 border-sub2 text-white px-2 py-0.5 rounded-lg mx-2 my-3";
  const notSelect =
    "text-sub2 border-[1px] border-sub2 px-2  py-0.5 rounded-lg mx-2 my-3";

  const recommendedItemsWithScores =
    recommendBooksData?.recommended_items_with_scores;

  console.log("recommendedItemsWithScores : ", recommendedItemsWithScores);

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

  if (
    !isLoading &&
    recommendBooksData?.recommended_items_with_scores.length === 0
  ) {
    return refetch();
  }

  return (
    <div>
      <div className="flex overflow-x-auto whitespace-nowrap mt-3 scrollbar-hide">
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
      <p className="font-bold text-xl mt-2">
        오늘의
        <span className="bg-sub2 border-2  border-sub2 font-medium text-white px-3 py-0.5 rounded-full mx-1">
          {selectedCategory}
        </span>
        추천도서는?
      </p>
      {isLoading ? (
        <ClipLoading className="h-40" />
      ) : (
        <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide">
          {Array(10)
            .fill(null)
            .map((_, index) => {
              return (
                <img
                  src="ssafy.png"
                  alt=""
                  width={150}
                  className="mx-1 mt-5"
                  key={index}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default CategoryRecommend;
