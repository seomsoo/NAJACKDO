import Loading from "components/common/Loading";
import SmallError from "components/common/SmallError";
import CategoryRecommend from "page/main/components/CategoryRecommend";
import { GetUserInfo } from "page/main/components/GetUserInfo";
import LoactionRecommend from "page/main/components/LoactionRecommend";
import MainCarousel from "page/main/components/MainCarousel";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { FaRankingStar } from "react-icons/fa6";

const MainPage = () => {
  return (
    <ErrorBoundary fallback={<SmallError />}>
      <Suspense fallback={<Loading />}>
        <div className="mb-3">
          {/* 유저 정보 저장 */}
          <GetUserInfo />
          {/* 메인 캐로셀 */}
          <div>
            <div className="flex  gap-3items-center mt-3 mx-6 ">
              <FaRankingStar className="text-2xl mr-2 text-main" />
              <span className="font-extrabold text-xl mb-4">
                오늘의 베스트 셀러
              </span>
            </div>
            <MainCarousel />
          </div>
          <main className="flex flex-col mx-6 gap-2">
            {/* 카테고리 별 추천 */}
            <CategoryRecommend />
            {/* 지역에서 인기있는 도서 추천 */}
            <LoactionRecommend />
          </main>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default MainPage;
