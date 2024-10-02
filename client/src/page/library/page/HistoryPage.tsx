import Loading from "components/common/Loading";
import LibraryHeader from "page/library/components/LibraryHeader";
import MyHistory from "page/library/components/MyHistory";
import { Suspense } from "react";

const HistoryPage = () => {
  const images: string[] = ["/화학.png", "/화학.png"];

  return (
    <Suspense fallback={<Loading />}>
      <LibraryHeader />
      <MyHistory />
      {/* <main className="px-6">
        <section> */}
      {/* 대여 중 */}
      {/* {images.map((src, index) => (
        <article key={index} className="flex flex-col mb-6  ">
          <div className="flex justify-center items-center ">
            <img
              src={src}
              alt={`book-${index}`}
              className="w-20 h-28 object-cover shadow-book-shadow mb-1 ml-2"
            />
            <article className="flex flex-col w-full">
              <span className=" bg-[#5f6f52] self-end  p-2 px-3 rounded-2xl text-white font-light text-xs">
                대여 중
              </span>
              <span className="font-semibold text-2xl ml-3 mb-2 ">
                Why? 화학
              </span>
              <span className="text-sm ml-3">스토리 조영선, 작화 이영호</span>
              <span className="text-sm self-end mr-1 mt-2 opacity-70">
                <span className="text-[#ff0000] font-semibold">3</span>일 남음
              </span>
            </article>
          </div>
          <div>
            <img src="/images/library/bar2.png" alt="bar" className="w-full " />
          </div>
        </article>
      ))} */}
      {/* 대여 완료 */}
      {/* {images.map((src, index) => (
            <article key={index} className="flex flex-col mb-6  ">
              <div className="flex justify-center items-center ">
                <img
                  src={src}
                  alt={`book-${index}`}
                  className="w-20 h-28 object-cover shadow-book-shadow mb-1 ml-2"
                />
                <article className="flex flex-col w-full">
                  <span className=" bg-[#3078E4] self-end  p-2 px-3 rounded-2xl text-white font-light text-xs">
                    대여 완료
                  </span>
                  <span className="font-semibold text-2xl ml-3 mb-2 ">
                    Why? 화학
                  </span>
                  <span className="text-sm ml-3">
                    스토리 조영선, 작화 이영호
                  </span>
                  <span className="text-sm self-end mr-1 mt-2 text-[#5f6f52]">
                    2024.09.11 ~ 2024.09.15
                  </span>
                </article>
              </div>
              <div>
                <img
                  src="/images/library/bar2.png"
                  alt="bar"
                  className="w-full "
                />
              </div>
            </article>
          ))}
        </section>
      </main> */}
    </Suspense>
  );
};

export default HistoryPage;
