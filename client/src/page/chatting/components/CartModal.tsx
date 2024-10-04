import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "components/ui/dialog";
import BookRentalInfo from "page/cart/components/BookRentalInfo";
import { IoIosLeaf } from "react-icons/io";

const CartModal = ({ cartOpen, setCartOpen, ownerUsername, cartItems }) => {
  const sumPrice = cartItems.reduce((sum, cartItem) => sum + cartItem.price, 0);
  return (
    <Dialog
      open={cartOpen}
      onOpenChange={(open) => {
        !open && setCartOpen(false);
      }}
    >
      <DialogTrigger
        onClick={() => {
          setCartOpen(true);
        }}
      ></DialogTrigger>
      <DialogContent className="bg-[#F1ECE3] rounded-2xl">
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-row item-center justify-between my-3">
              <p className="font-semibold text-xl">대여 도서 목록</p>
            </div>
          </DialogTitle>
          <DialogDescription className="space-y-8 text-black">
            <div
              className="w-[95%] h-[300px] flex flex-col overflow-y-auto"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {cartItems.map((item, index) => {
                return (
                  <div key={index}>
                    <BookRentalInfo
                      key={item.cartItemId}
                      cartItemId={item.cartItemId}
                      bookTitle={item.bookTitle}
                      author={item.author}
                      price={item.price}
                      bookImage={item.bookImage}
                      chatting
                    />
                    <div
                      className={`${index !== cartItems.length - 1 ? "border-b opacity-50 border-sub7/30" : ""}`}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex flex-row justify-between mt-3 px-3">
              <p>금액</p>
              <div className="flex flex-row justify-end items-center mt-auto ">
                <IoIosLeaf size={16} color="#79AC78" />
                <p>
                  {sumPrice.toLocaleString()}{" "}
                  <span className="text-[12px]">/ 일</span>
                </p>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CartModal;
