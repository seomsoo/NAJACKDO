import { useQuery } from "@tanstack/react-query";
import { getMainRecommendBook } from "api/bookApi";
import ClipLoading from "components/common/ClipLoading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "store/useUserStore";

const CategoryRecommend = () => {
  const nav = useNavigate();
  const userId = useUserStore().userId;
  const [selectedCategory, setSelectedCategory] = useState<string>("어린이");

  // const { data: recommendBooksData, isLoading } = useQuery({
  //   queryKey: ["recommendBooks", selectedCategory, userId],
  //   queryFn: () => getRecommBooksWithGenre(userId, selectedCategory),
  //   enabled: !!userId,
  // });

  const { data: recommendBooksData, isLoading } = useQuery({
    queryKey: ["recommBooks", selectedCategory],
    queryFn: () => getMainRecommendBook(selectedCategory),
    enabled: !!userId,
  });

  const selectClass =
    "bg-sub2 border-2 border-sub2 text-white px-2 py-0.5 rounded-lg mx-2 my-3";
  const notSelectClass =
    "text-sub2 border-[1px] border-sub2 px-2 py-0.5 rounded-lg mx-2 my-3";

  // const recommendedItemsWithScores = recommendBooksData?.recommended_items_with_scores;

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
      <div className="flex overflow-x-auto whitespace-nowrap mt-3 scrollbar-hide">
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
        <span className="bg-sub2 border-2 border-sub2 font-medium text-white px-3 py-0.5 rounded-full mx-1">
          {selectedCategory}
        </span>
        추천도서는?
      </p>

      {/* {isLoading ? (
        <ClipLoading className="h-40" />
      ) : (
        <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide">
          {recommendedItemsWithScores?.map((book) => (
            <img
              src={book.cover}
              alt={book.book_id.toString()}
              width={150}
              className="mx-1 mt-5"
              key={book.book_id}
              onClick={() => nav(`/book/${book.book_id}`)}
            />
          ))}
        </div>
      )} */}

      {isLoading ? (
        <ClipLoading className="h-40" />
      ) : (
        <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide">
          {recommendBooksData?.map((book) => (
            <img
              src={book.cover}
              alt={book.title}
              width={150}
              className="mx-1 mt-5"
              key={book.bookId}
              onClick={() => nav(`/book/${book.bookId}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryRecommend;
