import CategoryTag from "components/common/CategoryTag";
import { IoHeartOutline } from "react-icons/io5";

const SearchResultBook = () => {
  return (
    <div className="flex flex-row relative py-4 border-b-[1px]">
      <img src="/harrypotter.png" alt="해리포터" width={108} height={168} />
      <div className="px-3 py-1">
        <p className="font-bold">
          해리포터와 마법사의 돌 1(해리포터 20주년 개정판)
        </p>
        <p className="my-2 text-sm">J. K. 롤링 글 | 강동혁 번역</p>
        <p>중고가 : 8100원</p>
        <div className="flex flex-row mt-1">
          <CategoryTag category="드라마" />
          <CategoryTag category="영화" />
          <CategoryTag category="판타지" />
        </div>
      </div>
      <IoHeartOutline size={25} className="absolute right-0 bottom-4" />
    </div>
  );
};

export default SearchResultBook;
