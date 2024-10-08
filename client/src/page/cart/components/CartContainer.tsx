import { useMutation } from "@tanstack/react-query";
import { postCreateChatRoom } from "api/chatApi";
import { ICartItem } from "atoms/Cart.type";
import ConfirmModal from "components/common/ConfirmModal";
import { useState } from "react";
import { IoIosLeaf } from "react-icons/io";
import BookRentalInfo from "./BookRentalInfo";

interface CartContainerProps {
  cartId: number;
  ownerId: number;
  ownerUsername: string;
  cartItems: ICartItem[];
}

const CartContainer = ({
  cartId,
  ownerId,
  ownerUsername,
  cartItems,
}: CartContainerProps) => {
  const [open, setOpen] = useState(false);
  const sumPrice = cartItems.reduce((sum, cartItem) => sum + cartItem.price, 0);

  const mutation = useMutation({
    mutationKey: ["chat", "create"],
    mutationFn: () => postCreateChatRoom({ ownerId, cartId }),

    onSuccess: () => {
      setOpen(true);
    },
  });

  const handleCreateChatRoom = () => {
    mutation.mutate();
  };

  return (
    <div className="mx-3 mb-5 bg-white/30 shadow rounded-lg p-4">
      <div className="flex flex-row item-center justify-between">
        <span className="flex font-semibold text-lg mb-2">
          <p className="text-sub8 font-bold">{ownerUsername}</p>
          님의 책장
        </span>
      </div>
      <div className="border-y-[1px] border-sub7/50" id={cartId.toString()}>
        {cartItems.map((item, index) => {
          return (
            <div className="w-[95%] mx-auto" key={index}>
              <BookRentalInfo
                key={item.cartItemId}
                cartItemId={item.cartItemId}
                bookTitle={item.bookTitle}
                author={item.author}
                price={item.price}
                bookImage={item.bookImage}
              />
              <div
                className={`${index !== cartItems.length - 1 ? "border-b opacity-50 border-sub7/30" : ""}`}
              />
            </div>
          );
        })}
      </div>
      <div className="flex flex-row font-bold justify-between mt-3 px-3">
        <p>금액</p>
        <div className="flex flex-row justify-end items-center mt-auto">
          <IoIosLeaf size={16} color="#79AC78" />
          <p className="items-center flex">
            {sumPrice.toLocaleString()}{" "}
            <span className="text-[12px] ml-1 font-light">/ 일</span>
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="w-full bg-sub7 text-sm font-bold text-white rounded-xl p-2 text-center"
          onClick={handleCreateChatRoom}
        >
          도서 대출 신청
        </button>
      </div>
      <ConfirmModal
        content="도서 대출 신청이 완료되었습니다."
        open={open}
        setOpen={setOpen}
        urlPath="/chat"
      />
    </div>
  );
};

export default CartContainer;
