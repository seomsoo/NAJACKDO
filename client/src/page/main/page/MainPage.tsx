// import { useNavigate } from "react-router-dom";
import C105Recommend from "page/main/components/C105Recommend";
import CategoryRecommend from "page/main/components/CategoryRecommend";
import MainCarousel from "page/main/components/MainCarousel";
import { FaRankingStar } from "react-icons/fa6";

const MainPage = () => {
  // const nav = useNavigate();

  return (
    <div className="mx-[25px]">
      {/* 메인 캐로셀 */}
      <div>
        <div className="flex flex-row items-center">
          <FaRankingStar color="#5F6F52" size={25} className="my-1 mx-2" />
          <span className="font-bold">오늘의 베스트 셀러 123</span>
        </div>
        <MainCarousel />
      </div>
      {/* 카테고리 별 추천 */}
      <CategoryRecommend />
      {/* C105 추천 */}
      <C105Recommend />
      {/* <div className="flex flex-col">
        <button onClick={() => nav("/login")}>login</button>
        <button onClick={() => nav("/bookdetail")}>bookdetail</button>
        <button onClick={() => nav("/bookdetail/rental")}>
          rentalbookdetail
        </button>
        <button onClick={() => nav("/bookdetail/mybook")}>
          myrentalbookdetail
        </button>
        <button onClick={() => nav("/apply")}>bookapply</button>
        <button onClick={() => nav("/ai-check")}>ai-check</button>
        <button onClick={() => nav("/ai-check/result")}>ai-check-result</button>
      </div> */}
    </div>
  );
};

export default MainPage;
