import { Carousel, CarouselContent, CarouselItem } from "components/ui/carousel"
import { IoHeart } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { useState } from "react";



interface BookcaseContainerProps {
  name: string,
  imageArray: string[]
}
const BookcaseContainer = ({ name, imageArray }: BookcaseContainerProps) => {
  const [heart, setHeart] = useState(false);

  const handleHeart = () => {
    setHeart(!heart);
  }

  return (
    <>
      <div className="flex flex-row justify-between">
        <p className="text-[15px] font-medium font-['Pretendard'] mb-2">{name}님의 책장</p>
        <div onClick={handleHeart}>
          {heart ? (
            <IoHeartOutline size={15} color="#D96363" />
          ) : (
            <IoHeart size={15} color="#D96363" />
          )}
        </div>
      </div>
      <Carousel>
        <CarouselContent>
          {imageArray.map((item, index) => {
            return (
              <CarouselItem className="basis-1/4">
                <img key={index} src={item} alt="book" />
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </>

  );
};

export default BookcaseContainer;