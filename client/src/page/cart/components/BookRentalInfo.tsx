import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postDeleteCartItem } from "api/cartApi";
import { ICartList } from "atoms/Cart.type";
import AlertModal from "components/common/AlertModal";
import { useState } from "react";
import { IoIosLeaf } from "react-icons/io";
import { PiXBold } from "react-icons/pi";

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
  const [open, setOpen] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<string>("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["cartItemId"],
    mutationFn: postDeleteCartItem,

    onSuccess: () => {
      setAlertContent(`${bookTitle} <br />삭제 성공`);
      setOpen(true);
      queryClient.setQueryData<ICartList[]>(["cartList"], (oldData) => {
        if (!oldData) return [];
        return oldData.map((cart) => ({
          ...cart,
          cartItems: cart.cartItems.filter(
            (item) => item.cartItemId !== cartItemId
          ),
        }));
      });
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
          <p className="text-sm font-semibold line-clamp-1 h-[1.2rem] flex-grow">
            {bookTitle}
          </p>
          {!chatting && (
            <div className="flex items-center">
              <PiXBold
                size={25}
                color="black"
                className="self-center"
                onClick={() => handleDeleteCartItem(cartItemId)}
              />
            </div>
          )}
        </div>
        <p className="text-xs w-[90%] line-clamp-1 h-[1.2rem]">{author}</p>
        <div className="flex justify-end items-center mt-auto ">
          <IoIosLeaf className="text-sub8" />
          <p className="text-xs">{price.toLocaleString()}</p>
        </div>
      </div>
      {open && (
        <AlertModal open={open} setOpen={setOpen} content={alertContent} />
      )}
    </div>
  );
};

export default BookRentalInfo;
