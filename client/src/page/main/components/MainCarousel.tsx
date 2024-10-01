import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import CenterCropImage from "page/library/components/CenterCropImage";

const MainCarousel = () => {
  const BestSellerArr = [
    {
      bookId: 1,
      bookImg: "pubao.png",
    },
    {
      bookId: 2,
      bookImg: "harrypotter.png",
    },
    {
      bookId: 3,
      bookImg: "/pubao.png",
    }
  ];

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent>
        {BestSellerArr.map((book, index) => {
          return (
            <CarouselItem
              key={index}
              className="relative w-full h-72 object-cover"
            >
              <CenterCropImage imageUrl={book.bookImg} />
              <div className="absolute inset-0 flex items-center justify-center">
                <img src={book.bookImg} alt="푸바오" className="z-20" />
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
};

export default MainCarousel;
