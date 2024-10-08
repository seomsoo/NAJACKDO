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
      <div className="w-[300px] h-[430px] mx-auto flex flex-row justify-center items-center">
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <ApplyBook />
            </CarouselItem>
            <CarouselItem>
              <ApplyBookcase />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="ml-5" />
          <CarouselNext className="mr-5" />
        </Carousel>
      </div>
    </div>
  );
};

export default ApplyGuide;
