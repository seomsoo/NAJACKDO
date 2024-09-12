import { Carousel, CarouselContent, CarouselItem } from "components/ui/carousel"
import { IoHeart } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { useState } from "react";



interface BookContainerProps {
  title: string,
  author: string,
  rating: number,
  detail: string,
  image: string
}
const BookContainer = ({ title, author, rating, detail, image }: BookContainerProps) => {
  const [heart, setHeart] = useState(false);

  const handleHeart = () => {
    setHeart(!heart);
  }

  return (
    <div className="my-5 grid grid-rows-3 grid-flow-col gap-3">
      <img className="row-span-3 w-[100px]" src={image} alt="BookContainer" />
      <div className="col-span-2 mt-1">
        <div className="flex flex-row justify-between">
          <p className="text-[15px] font-semibold">{title}</p>
          <div onClick={handleHeart}>
            {heart ? (
              <IoHeartOutline size={15} color="#D96363" />
            ) : (
              <IoHeart size={15} color="#D96363" />
            )}
          </div>
        </div>
        <p className="text-[13px] font-medium">{author}</p>

      </div>
      <p className="row-span-2 col-span-2 text-[12px] line-clamp-3 h-[3.6rem]">{detail}</p>
    </div>
  );
};

export default BookContainer;
