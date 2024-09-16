import RecentSearchText from "page/search/components/RecentSearchText";

const RecentSearch = () => {
  return (
    <div className="my-6">
      <span className="font-bold">최근 검색</span>
      <div>
        <RecentSearchText />
        <RecentSearchText />
        <RecentSearchText />
        <RecentSearchText />
        <RecentSearchText />
        <RecentSearchText />
        <RecentSearchText />
        <RecentSearchText />
      </div>
    </div>
  );
};

export default RecentSearch;
