import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "components/ui/carousel";
import ApplyBook from "page/bookapply/components/ApplyBook";
import ApplyBookcase from "page/bookapply/components/ApplyBookcase";

const ApplyGuide = () => {
  return (
    <div>
      <p className="font-bold text-xl text-center mt-3 mb-5">GUIDE</p>
      <div className="border-2 border-sub7 w-[300px] h-[430px] rounded-3xl mx-auto flex flex-row justify-center items-center">
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <ApplyBook />
            </CarouselItem>
            <CarouselItem>
              <ApplyBookcase />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <p className="text-xs text-center mt-1.5">
        책등: 책을 책꽂이에 꽂았을 때의 보이는, 책 제목 등이 쓰여 있는 옆면
      </p>
    </div>
  );
};

export default ApplyGuide;
