import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "components/ui/carousel";
import { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { IoIosArrowBack, IoIosLeaf } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";

const AICheckResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resultData } = location.state || {};

  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);

  if (!resultData) {
    return <p>결과를 불러오는 중 오류가 발생했습니다.</p>;
  }

  const getImageUrl = (filename: string) => {
    return `https://d16os79fbmszq4.cloudfront.net/${filename}`;
  };

  const oneDayPrice = Math.round(resultData.one_day_price);

  useEffect(() => {
    if (carouselApi) {
      carouselApi.on("select", () => {
        setCarouselIndex(carouselApi.selectedScrollSnap());
      });
    }
  }, [carouselApi]);

  return (
    <div>
      <div
        onClick={() => navigate(-1)}
        className="cursor-pointer p-6 py-4 flex flex-row items-center"
      >
        <IoIosArrowBack className="text-2xl" color="#545454" />
        <span className="font-bold text-2xl ml-2">
          도서 등록 - AI 인증 결과
        </span>
      </div>

      <div>
        <Carousel className="w-full max-w-md" setApi={setCarouselApi}>
          <CarouselContent>
            {resultData.uploaded_files
              .slice(2, 4)
              .map((file: any, index: number) => (
                <CarouselItem
                  key={index}
                  className="flex flex-col items-center"
                >
                  <img
                    src={getImageUrl(file.filename)}
                    alt={`Uploaded file ${index + 3}`}
                    className="w-full h-[248px] mb-4"
                  />
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious className="ml-12" />
          <CarouselNext className="mr-12" />
        </Carousel>

        <div className="flex justify-center py-4">
          <FaCircle
            size={10}
            className="mr-3"
            color={carouselIndex === 0 ? "#000000" : "#888888"}
          />
          <FaCircle
            size={10}
            color={carouselIndex === 1 ? "#000000" : "#888888"}
          />
        </div>
      </div>

      {/* 도서 정보 및 일일 대여료 */}
      <div className="flex flex-col items-center gap-6 ">
        <div className="flex justify-center gap-12">
          <div className="flex flex-col items-center border justify-center text-[#e32929] border-[#e32929] hakgyo w-20 h-20 rounded-2xl gap-2 text-2xl text-nowrap">
            <span>닳음</span>
            {resultData.count_wornout}
          </div>
          <div className="flex flex-col items-center border justify-center text-[#b9ad26] border-[#e1cf0c] hakgyo w-20 h-20 rounded-2xl gap-2 text-2xl text-nowrap">
            <span>찢김</span>
            {resultData.count_ripped}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold">
            책정 일일 대여료:{" "}
            <IoIosLeaf className="inline-block mb-2 text-4xl text-sub8" />
            {oneDayPrice}
            <span className="text-xl text-[#868686]"> / 일</span>
          </span>
          <span className="text-xs text-[#656565]">
            (추후 대여 상세 페이지에서 수정 가능)
          </span>
        </div>
      </div>

      <div className="px-6">
        <button
          onClick={() => navigate("/library/my-bookcase")}
          className="text-center bg-sub7 w-full mt-10 rounded-xl text-white font-bold py-3 cursor-pointer"
        >
          등록 완료
        </button>
      </div>
    </div>
  );
};

export default AICheckResultPage;
