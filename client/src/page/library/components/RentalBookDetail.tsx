import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import CenterCropImage from "page/library/components/CenterCropImage";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

interface BookInfoProps {
  images: string[];
}

const RentalBookDetail = ({ images }: BookInfoProps) => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const bookIdAsNumber = parseInt(bookId, 10);

  return (
    <div>
      <div className="relative w-full h-72 object-cover">
        <div
          onClick={() => navigate(-1)}
          className="cursor-pointer absolute left-0 top-0 z-10 p-4"
        >
          <IoChevronBack size={25} />
        </div>

        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent>
            {images.map((imageUrl, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-72">
                  <CenterCropImage imageUrl={imageUrl} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={imageUrl}
                      alt={`도서 이미지 ${index + 1}`}
                      className="z-20 w-72 h-60"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default RentalBookDetail;
