import { PiXBold } from "react-icons/pi";
import { IoIosLeaf } from "react-icons/io";
interface BookRentalInfoProps {
  title: string,
  author: string,
  price: number,
  status: string,
  image: string
}
const BookRentalInfo = ({ title, author, price, status, image }: BookRentalInfoProps) => {


  return (
    <div className="flex flex-row my-2">
      <img src={image} alt="book" />
      <div className="ml-1 w-[80%] flex flex-col">
        <div className="flex flex-row gap-1 justify-between items-center">
          <p className="text-[13px] line-clamp-1 h-[1.2rem]">{title}</p>
          <PiXBold size={13} color="black" />  
        </div>
        <p className="text-[11px] w-[90%] line-clamp-1 h-[1.2rem]">{author}</p>
        <div className="flex flex-row justify-end items-center mt-auto ">
          <IoIosLeaf size={11} color="#79AC78" />
          <p className="text-[11px]">{price.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default BookRentalInfo;
