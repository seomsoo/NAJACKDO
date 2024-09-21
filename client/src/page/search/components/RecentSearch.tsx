import RecentSearchText from "page/search/components/RecentSearchText";

interface IRecentSearchTextProps {
  recentData: string[];
}

const RecentSearch = ({ recentData }: IRecentSearchTextProps) => {
  return (
    <div className="my-6 flex flex-col">
      <span className="font-bold">최근 검색</span>
      <div>
        {recentData.length === 0 ? (
          <p className="my-[100px] text-center">최근 검색어가 없습니다.</p>
        ) : (
          recentData.map((text, index) => (
            <RecentSearchText key={index} text={text} />
          ))
        )}
      </div>
    </div>
  );
};

export default RecentSearch;
