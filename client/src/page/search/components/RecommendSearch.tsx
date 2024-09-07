import RecommendSearchText from "page/search/components/RecommendSearchText";

const RecommendSearch = () => {
  return (
    <div className="my-4">
      <span className="font-bold">추천 검색</span>
      <div
        className="flex overflow-x-auto whitespace-nowrap m-1.5"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <RecommendSearchText />
        <RecommendSearchText />
        <RecommendSearchText />
        <RecommendSearchText />
        <RecommendSearchText />
        <RecommendSearchText />
        <RecommendSearchText />
      </div>
    </div>
  );
};

export default RecommendSearch;
