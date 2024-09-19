import PopularSearchText from "page/search/components/PopularSearchText";

const PopularSearch = () => {
  return (
    <div className="my-4">
      <span className="font-bold">추천 검색</span>
      <div
        className="flex overflow-x-auto whitespace-nowrap space-x-3 mt-2"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <PopularSearchText />
        <PopularSearchText />
        <PopularSearchText />
        <PopularSearchText />
        <PopularSearchText />
        <PopularSearchText />
        <PopularSearchText />
        <PopularSearchText />
      </div>
    </div>
  );
};

export default PopularSearch;
