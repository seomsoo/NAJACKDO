import { useState } from "react";

const CategoryRecommend = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("어린이");

  const select =
    "bg-sub2 border-2 border-sub2 text-white px-2 py-0.5 rounded-lg mx-2 my-3";
  const notSelect =
    "text-sub2 border-[1px] border-sub2 px-2  py-0.5 rounded-lg mx-2 my-3";

  const categories = [
    "어린이",
    "소설/시/희곡",
    "경제경영",
    "과학",
    "사회과학",
    "역사",
    "에세이",
    "자기계발",
    "여행"
  ];

  return (
    <div>
      <div
        className="flex overflow-x-auto whitespace-nowrap mt-3 scrollbar-hide"
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
      <p className="font-bold text-xl mt-2">
        오늘의
        <span className="bg-sub2 border-2  border-sub2 font-medium text-white px-3 py-0.5 rounded-full mx-1">
          {selectedCategory}
        </span>
        추천도서는?
      </p>
      <div
        className="flex overflow-x-auto whitespace-nowrap scrollbar-hide"
      >
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
    </div>
  );
};

export default CategoryRecommend;
