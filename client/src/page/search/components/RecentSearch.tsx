import { useSuspenseQuery } from "@tanstack/react-query";
import { getRecentSearch } from "api/searchApi";
import RecentSearchText from "page/search/components/RecentSearchText";

const RecentSearch = () => {
  const { data: recentSearchData } = useSuspenseQuery<string[]>({
    queryKey: ["search", "recent"],
    queryFn: getRecentSearch,
  });

  return (
    <div className="my-6 flex flex-col">
      <span className="font-bold">최근 검색</span>
      <div>
        {recentSearchData.length === 0 ? (
          <p className="my-[100px] text-center">최근 검색어가 없습니다.</p>
        ) : (
          recentSearchData.map((text, index) => (
            <RecentSearchText key={index} text={text} />
          ))
        )}
      </div>
    </div>
  );
};

export default RecentSearch;
