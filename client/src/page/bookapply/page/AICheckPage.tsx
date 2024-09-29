import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from 'components/ui/carousel';
import { useEffect, useState } from 'react';
import { FaCircle } from 'react-icons/fa';
import AiOnBoarding from '../components/AiOnBoarding';

const AICheckPage = () => {
  interface aiOnBoardingData {
    content: string;
    onboardingImage: string;
  }

  const navigate = useNavigate();
  const [api, setApi] = useState<CarouselApi>();
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    if (!api) return;

    api.on('select', () => {
      setCarouselIndex(api.selectedScrollSnap());
    });
  }, [api]);

  const onBoardingArray: aiOnBoardingData[] = [
    {
      content: '앞면',
      onboardingImage: 'images/onBoarding/front.png',
    },
    {
      content: '뒷면',
      onboardingImage: 'images/onBoarding/back.png',
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
    <div>
      <div
        onClick={() => navigate(-1)}
        className="cursor-pointer p-6 py-4 flex flex-row items-center"
      >
        <IoChevronBack className="text-2xl" color="#545454" />
        <span className="font-bold text-2xl ml-2">도서 등록 - AI 인증</span>
      </div>
      <div className="flex flex-col mt-6 items-center">
        <div className="  flex flex-col justify-center items-center">
          <Carousel className="" setApi={setApi}>
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
            <div className="flex justify-center py-4 ">
              <FaCircle
                size={10}
                className="mr-3"
                color={carouselIndex === 0 ? '#000000' : '#888888'}
              />
              <FaCircle
                size={10}
                color={carouselIndex === 1 ? '#000000' : '#888888'}
              />
            </div>
          </Carousel>

          <div className="flex flex-col font-medium items-center gap-2">
            <span className="font-bold text-3xl">사진 촬영 가이드</span>
            <p>
              위 사진과 같이 도서의{' '}
              <span className=" text-[#79AC78]">앞, 뒷면</span>을 촬영해주세요!
            </p>
            <p className=" text-center">
              AI의 분석을 통해{' '}
              <span className="text-[#79AC78] ">도서의 손상도</span>를
              체크해주고, <br />
              <span className="text-[#79AC78] ">일일 대여료</span>를
              추천해드려요!
            </p>
          </div>
        </div>
      </div>
      <div className="px-6">
        <p  onClick={() => navigate("/ai-check/upload")} className="text-center bg-[#776B5D] w-full  mt-10 rounded-xl text-white font-bold py-3 ">
          AI 인증 하러 가기
        </p>
      </div>
    </div>
  );
};

export default AICheckPage;
