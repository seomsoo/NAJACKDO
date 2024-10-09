import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import AiOnBoarding from "../components/AiOnBoarding";

const AICheckPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, userBookId } = location.state;

  const [api, setApi] = useState<CarouselApi>();
  const [carouselIndex, setCarouselIndex] = useState<number>(0);

  useEffect(() => {
    if (api) {
      api.on("select", () => {
        setCarouselIndex(api.selectedScrollSnap());
      });
    }
  }, [api]);

  const onBoardingArray = [
    {
      content: "앞면",
      onboardingImage: "images/onBoarding/front.png",
    },
    {
      content: "뒷면",
      onboardingImage: "images/onBoarding/back.png",
    },
  ];

  return (
    <div>
      <div
        onClick={() => navigate(-1)}
        className="cursor-pointer p-6 py-4 flex flex-row items-center"
      >
        <IoChevronBack className="text-2xl" color="#545454" />
        <span className="font-bold text-2xl ml-2">
          도서 등록 - AI 인증 가이드
        </span>
      </div>
      <div className="flex flex-col mt-2 items-center">
        <div className="  flex flex-col justify-center items-center">
          <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
            className=""
            setApi={setApi}
          >
            <CarouselContent>
              {onBoardingArray.map((onBoarding, index) => {
                return (
                  <CarouselItem key={index}>
                    <AiOnBoarding
                      content={onBoarding.content}
                      onboardingImage={onBoarding.onboardingImage}
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="ml-12" />
            <CarouselNext className="mr-12" />
          </Carousel>

          <div className="flex flex-col font-medium items-center ">
            <span className="font-bold text-3xl my-4">사진 촬영 가이드</span>
            <p className="mb-1">
              위 사진과 같이 도서의 <span className=" text-sub8">앞, 뒷면</span>
              을 촬영해주세요!
            </p>
            <p className=" text-center">
              AI의 분석을 통해 <span className="text-sub8 ">도서의 손상도</span>
              를 체크해주고, <br />
              <span className="text-sub8 ">일일 대여료</span>를 추천해드려요!
            </p>
          </div>
        </div>
      </div>
      <div className="px-6">
        <button
          onClick={() =>
            navigate(`/ai-check/upload`, { state: { userId, userBookId } })
          }
          className="text-center bg-sub7 w-full  mt-[41px] rounded-xl text-white font-bold py-3"
        >
          AI 인증 하러 가기
        </button>
      </div>
    </div>
  );
};

export default AICheckPage;
