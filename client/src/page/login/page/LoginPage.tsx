import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "components/ui/carousel";
import KakaoLogin from "page/login/components/KakaoLogin";
import OnBoarding from "page/login/components/OnBoarding";
import { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";

interface onBoardingData {
  title: string;
  content: string;
  onboardingImage: string;
}

const LoginPage = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCarouselIndex(api.selectedScrollSnap());
    });
  }, [api]);

  const onBoardingArray: onBoardingData[] = [
    {
      title: "Read",
      content:
        "당신의 주변에 있는 다양한 책을 발견해 보세요. <br/> 이웃과 함께 책을 나누고, <br/> 새로운 독서 경험을 시작하세요.",
      onboardingImage: "images/onBoarding/onboarding_first.png",
    },
    {
      title: "Share",
      content:
        "책장에 잠들어 있는 책을 등록하고, <br/> 다른 사용자와 공유하세요. <br/> 나의 책이 누군가의 새로운 이야기가 될 수 있습니다.",
      onboardingImage: "images/onBoarding/onboarding_second.png",
    },
    {
      title: "Connect",
      content:
        "책을 통해 이웃과 연결되고, <br/> 신뢰를 쌓으며 책을 대여하거나 판매하세요. <br/> 함께 독서를 통해 더 가까워집니다.",
      onboardingImage: "images/onBoarding/onboarding_third.png",
    },
  ];

  useEffect(() => {
    if (carouselIndex === 2) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [carouselIndex]);

  return (
    <div className="mx-6 h-[calc(screen-86px)] flex flex-col justify-between">
      <div className="flex flex-row justify-end mt-16 mb-2">
        <FaCircle
          size={10}
          className="mr-2"
          color={carouselIndex === 0 ? "#000000" : "#888888"}
        />
        <FaCircle
          size={10}
          className="mr-2"
          color={carouselIndex === 1 ? "#000000" : "#888888"}
        />
        <FaCircle
          size={10}
          color={carouselIndex === 2 ? "#000000" : "#888888"}
        />
      </div>
      <Carousel className="mb-20" setApi={setApi}>
        <CarouselContent>
          {onBoardingArray.map((onBoarding, index) => {
            return (
              <CarouselItem key={index}>
                <OnBoarding
                  title={onBoarding.title}
                  content={onBoarding.content}
                  onboardingImage={onBoarding.onboardingImage}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="ml-10" />
        <CarouselNext className="mr-10" />
      </Carousel>
      <KakaoLogin active={active} />
    </div>
  );
};

export default LoginPage;
