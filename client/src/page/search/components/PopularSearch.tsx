import PopularSearchText from "page/search/components/PopularSearchText";

interface IPopularSearchTextProps {
  popularData: string[];
}

const PopularSearch = ({ popularData }: IPopularSearchTextProps) => {
  return (
    <div className="my-4">
      <span className="font-bold">인기 검색</span>
      <div
        className="flex overflow-x-auto whitespace-nowrap space-x-3 mt-2"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {popularData.length === 0 ? (
          <p className="w-full text-center">인기 검색어가 없습니다.</p>
        ) : (
          popularData.map((text, index) => (
            <PopularSearchText key={index} text={text} />
          ))
        )}
      </div>
    </div>
  );
};

export default PopularSearch;
