import { useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

const dummyBooks = [
  { title: "트렌드코리아 2025", imgUrl: "/ssafy.png", rank: 1 },
  { title: "참 좋았더라", imgUrl: "/harrypotter.png", rank: 2 },
  { title: "지금 사랑한다고 말하세요", imgUrl: "/ssafy.png", rank: 3 },
  { title: "더 기묘한 미술관", imgUrl: "/ssafy.png", rank: 4 },
  { title: "프랭클린 익스프레스", imgUrl: "/ssafy.png", rank: 5 },
  { title: "힐빌리의 노래", imgUrl: "/ssafy.png", rank: 6 },
  { title: "영원한 천국", imgUrl: "/ssafy.png", rank: 7 },
  { title: "더 좋은 문장을 쓰고 싶은 당신", imgUrl: "/ssafy.png", rank: 8 },
  { title: "감정을 안아주는 말", imgUrl: "/ssafy.png", rank: 9 },
  { title: "감정을 표현하는 법", imgUrl: "/ssafy.png", rank: 10 },
];

const LocationRecommend = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xl font-bold">
          지금 <span className="text-sub8">수완동</span> 인기 있는 도서 Top 10
        </span>
        <button onClick={toggleExpand}>
          {isExpanded ? (
            <RiArrowUpSLine className="text-2xl" />
          ) : (
            <RiArrowDownSLine className="text-2xl" />
          )}
        </button>
      </div>

      <div className="space-y-4">
        {dummyBooks.slice(0, isExpanded ? 10 : 2).map((book, index) => (
          <div key={index} className="flex items-center space-x-4 border-b">
            <img
              src={book.imgUrl}
              alt={book.title}
              className="w-16 h-12 object-cover object-top"
            />
            <span className="font-medium">
              <span className="hakgyo text-2xl text-sub7 mr-2">
                {book.rank}.
              </span>{" "}
              {book.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationRecommend;
