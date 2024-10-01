import Loading from "components/common/Loading";
import C105Recommend from "page/main/components/C105Recommend";
import CategoryRecommend from "page/main/components/CategoryRecommend";
import MainCarousel from "page/main/components/MainCarousel";
import { Suspense } from "react";
import { FaRankingStar } from "react-icons/fa6";
import LoactionRecommend from "page/main/components/LoactionRecommend";
import { GetUserInfo } from "page/main/components/GetUserInfo";

const MainPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="mx-[25px]">
        {/* 유저 정보 저장 */}
        <GetUserInfo />
        {/* 메인 캐로셀 */}
        <div>
          <div className="flex flex-row items-center">
            <FaRankingStar color="#5F6F52" size={25} className="my-1 mx-2" />
            <span className="font-bold">오늘의 베스트 셀러</span>
          </div>
          <MainCarousel />
        </div>
        <main className="flex flex-col gap-8">
          {/* 카테고리 별 추천 */}
          <CategoryRecommend />
          {/* 지역에서 인기있는 도서 추천 */}
          <LoactionRecommend />
          {/* C105 추천 */}
          <C105Recommend />
        </main>
      </div>
    </Suspense>
  );
};

export default MainPage;
