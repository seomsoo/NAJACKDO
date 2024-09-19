import { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

interface BookcaseContainerProps {
  name: string;
  imageArray: string[];
}
const BookcaseContainer = ({ name, imageArray }: BookcaseContainerProps) => {
  const [heart, setHeart] = useState(false);

  const handleHeart = () => {
    setHeart(!heart);
  };

  return (
    <div className=" my-5 bg-white/30 shadow rounded-lg p-4">
      <div className="flex flex-row justify-between">
        <p className="text-[15px] font-medium mb-2">{name}님의 책장</p>
        <div onClick={handleHeart}>
          {heart ? (
            <IoHeartOutline size={15} color="#D96363" />
          ) : (
            <IoHeart size={15} color="#D96363" />
          )}
        </div>
      </div>
      <div
        className="flex overflow-x-auto whitespace-nowrap space-x-3"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {imageArray.map((item, index) => {
          return <img key={index} src={item} alt="book" />;
        })}
      </div>
    </div>
  );
};

export default BookcaseContainer;
