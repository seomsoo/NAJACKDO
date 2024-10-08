import { useQuery } from "@tanstack/react-query";
import { getBestSeller } from "api/bookApi";
import Loading from "components/common/Loading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import CenterCropImage from "page/library/components/CenterCropImage";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaStarHalfAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const MainCarousel = () => {
  const navigate = useNavigate();

  const {
    data: BestSeller,
    isLoading: isBestSellerLoading,
    isError: isBestSellerError,
  } = useQuery({
    queryKey: ["BestSeller"],
    queryFn: getBestSeller,
  });

  if (isBestSellerLoading) return <Loading />;

  if (isBestSellerError) return <div>오류가 발생했습니다.</div>;
  const renderStars = (starPoint) => {
    const starRating = starPoint / 2;
    const fullStars = Math.floor(starRating);
    const hasHalfStar = starRating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<AiFillStar key={`full-${i}`} className="text-[#ebd576]" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-[#ebd576]" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <AiOutlineStar key={`empty-${i}`} className="text-gray-200" />
      );
    }

    return stars;
  };
  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`); // 책 클릭 시 해당 책 상세 페이지로 이동
  };
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent>
        {BestSeller?.map((book, index) => {
          return (
            <CarouselItem
              key={book.bookId}
              onClick={() => handleBookClick(book.bookId)}
              className="cursor-pointer relative w-full h-80 flex items-center"
            >
              <CenterCropImage imageUrl={book.cover} />

              <div className="relative ml-4 w-40 h-full z-10 overflow-hidden flex-shrink-0 ">
                <img
                  src={book.cover}
                  alt="책 커버"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="mx-4 flex flex-col pb-6 text-white z-10">
                <span
                  className="text-2xl font-bold"
                  style={{
                    textShadow: "1px 2px 4px rgba(0, 1, 1, 0.5)",
                  }}
                >
                  {book.title}
                </span>

                <div className="flex items-center mt-2">
                  {renderStars(book.starPoint)}
                  <span className="text-sm ml-4 font-extrabold text-sub3  ">
                    {book.genre}
                  </span>
                </div>
                <span className="mt-2 text-sm font-medium">{book.author}</span>
                <span
                  style={{
                    textShadow: "2px 2px 2px black",
                  }}
                  className="mt-2 text-xl font-extrabold"
                >
                  정가 : {book.priceStandard.toLocaleString()}원
                </span>
              </div>

              <span
                className="absolute text-[105px] text-white font-black z-20"
                style={{
                  textShadow: "2px 2px 4px black",
                  bottom: "0px",
                  left: "25px",
                }}
              >
                {index + 1}
              </span>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
};

export default MainCarousel;
