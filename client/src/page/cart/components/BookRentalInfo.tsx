import { useMutation } from "@tanstack/react-query";
import { postDeleteCartItem } from "api/cartApi";
import { IoIosLeaf } from "react-icons/io";
import { PiXBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

interface BookRentalInfoProps {
  cartItemId: number;
  bookTitle: string;
  author: string;
  price: number;
  bookImage: string;
  chatting?: boolean;
}
const BookRentalInfo = ({
  cartItemId,
  bookTitle,
  author,
  price,
  bookImage,
  chatting,
}: BookRentalInfoProps) => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["cartItemId"],
    mutationFn: postDeleteCartItem,

    onSuccess: () => {
      alert("카트 삭제 성공");
      navigate(0);
    },
  });

  const handleDeleteCartItem = (cartItemId: number) => {
    mutation.mutate(cartItemId);
  };

  return (
    <div className="flex flex-row my-2">
      <img src={bookImage} alt="book" width={71} height="auto" />
      <div className="ml-2 w-[80%] flex flex-col gap-1">
        <div className="flex flex-row gap-1 justify-between items-center">
          <p className="text-sm font-medium line-clamp-1 h-[1.2rem]">
            {bookTitle}
          </p>
          {!chatting && (
            <PiXBold
              size={13}
              color="black"
              onClick={() => handleDeleteCartItem(cartItemId)}
            />
          )}
        </div>
        <p className="text-xs w-[90%] line-clamp-1 h-[1.2rem]">{author}</p>
        <div className="flex justify-end items-center mt-auto ">
          <IoIosLeaf className="text-[#79AC78]" />
          <p className="text-xs">{price.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default BookRentalInfo;
