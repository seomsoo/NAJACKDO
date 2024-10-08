import { useSuspenseQuery } from "@tanstack/react-query";
import { getPopularSearch } from "api/searchApi";
import PopularSearchText from "page/search/components/PopularSearchText";

const PopularSearch = () => {
  const { data: popularSearchData } = useSuspenseQuery<string[]>({
    queryKey: ["search", "popular"],
    queryFn: getPopularSearch,
  });

  return (
    <div className="my-4">
      <span className="font-bold">인기 검색</span>
      <div className="flex overflow-x-auto whitespace-nowrap space-x-3 mt-2 scrollbar-hide">
        {popularSearchData.length === 0 ? (
          <p className="w-full text-center">인기 검색어가 없습니다.</p>
        ) : (
          popularSearchData.map((text, index) => (
            <PopularSearchText key={index} text={text} />
          ))
        )}
      </div>
    </div>
  );
};

export default PopularSearch;
