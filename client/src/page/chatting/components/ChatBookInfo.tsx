import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { getCartItem } from "api/cartApi";
import { postRental, postReturn } from "api/rentalApi";
import { ICartItem, ICartList } from "atoms/Cart.type";
import CartModal from "page/chatting/components/CartModal";
import { Message } from "page/chatting/components/ChattingBox";
import PayComplete from "page/chatting/components/PayComplete";
import RentalModal from "page/chatting/components/RentalModal";
import ReturnComplete from "page/chatting/components/ReturnComplete";
import ReviewButton from "page/chatting/components/ReviewButton";
import BookRentalApply from "page/library/components/BookRentalApply";
import { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { IoIosLeaf } from "react-icons/io";
import { useUserStore } from "store/useUserStore";

interface ChatBookInfoProps {
  client: any;
  cartId: number;
  roomId: number;
  ownerId: number;
  ownerName: string;
  customerId: number;
  customerName: string;
  totalLeaf: number;
  setTotalLeaf: (totalLeaf: number) => void;
  step: ChatRentalStep;
  setStep: (step: ChatRentalStep) => void;
}

export enum ChatRentalStep {
  READY = "대여기간 체크",
  PAY = "송금하기",
  NO_LEAF = "책잎 부족",
  RENTED = "반납하기",
  RETURNED = "후기 보내기",
}

const ChatBookInfo = ({
  client,
  cartId,
  roomId,
  ownerId,
  ownerName,
  customerId,
  customerName,
  totalLeaf,
  setTotalLeaf,
  step,
  setStep,
}: ChatBookInfoProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [rentalPeriod, setRentalPeriod] = useState<number[]>([14]);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [book, setBook] = useState<ICartItem>({
    cartItemId: 1,
    bookImage: "",
    bookTitle: "",
    author: "",
    price: 1,
  });

  const userId = useUserStore.getState().userId;

  const { data: bookData } = useSuspenseQuery<ICartList>({
    queryKey: ["cart", "book"],
    queryFn: () => getCartItem(cartId),
  });

  useEffect(() => {
    if (bookData) {
      setIsOwner(bookData.ownerId === userId);
      setBook(bookData.cartItems[0]);
      if (bookData.status === "READY") {
        setStep(ChatRentalStep.READY);
        return;
      }

      if (bookData.status === "RENTED") {
        setStep(ChatRentalStep.RENTED);
        return;
      }

      if (bookData.status === "RETURNED") {
        setStep(ChatRentalStep.RETURNED);
        return;
      }
    }
  }, [bookData]);

  const payMutation = useMutation({
    mutationKey: ["rental", "pay"],
    mutationFn: postRental,

    onSuccess: () => {
      setStep(ChatRentalStep.RENTED);
      complete("PAY");
    },

    onError: (error) => {
      console.log("error", error);
      setStep(ChatRentalStep.NO_LEAF);
    },
  });

  const returnMutation = useMutation({
    mutationKey: ["rental", "return"],
    mutationFn: postReturn,

    onSuccess: () => {
      setModalOpen(false);
      setStep(ChatRentalStep.RETURNED);
      complete("RETURN");
    },
  });

  const complete = (talkType) => {
    console.log("talkType", talkType);
    const completeMessage = ReactDOMServer.renderToString(
      talkType === "PAY" ? (
        <PayComplete totalLeaf={totalLeaf} />
      ) : (
        <ReturnComplete />
      )
    );

    // 송금 완료는 빌리는 사람이
    // 반납 완료는 빌려주는 사람이
    const messageData: Message = {
      roomId: roomId,
      senderId: talkType === "PAY" ? customerId : ownerId,
      senderNickname: talkType === "PAY" ? customerName : ownerName,
      talkType: talkType,
      message: completeMessage,
    };

    client.publish({
      destination: `/pub/chat.message.${roomId}`,
      body: JSON.stringify(messageData),
    });
  };

  const handleClick = () => {
    if (step === ChatRentalStep.READY) {
      setStep(ChatRentalStep.PAY);
      setModalOpen(true);
      return;
    }

    if (step === ChatRentalStep.PAY) {
      payMutation.mutate({
        cartId: cartId,
        rentalCost: book.price,
        rentalPeriod: rentalPeriod[0],
        totalPrice: totalLeaf,
      });
      return;
    }

    if (step === ChatRentalStep.RENTED) {
      returnMutation.mutate({
        cartId: cartId,
      });
      return;
    }
  };

  const showModal =
    (step === ChatRentalStep.PAY && !isOwner) ||
    (step === ChatRentalStep.NO_LEAF && !isOwner) ||
    (step === ChatRentalStep.RENTED && isOwner);

  return (
    <div className="bg-[#DBD6D3] w-full h-24 px-4 flex flex-row items-center justify-between">
      <div
        className="flex flex-row items-center w-7/12"
        onClick={() => setCartOpen(true)}
      >
        <img
          src={book.bookImage}
          alt="사진"
          className="rounded-2xl w-16 h-16"
        />
        <div className="ml-2">
          <span>{book.bookTitle}</span>
          <div className="flex flex-row items-center">
            <span className="text-black/50 text-sm">일일</span>
            <span className="ml-2 mr-1 font-bold">{book.price}</span>
            <IoIosLeaf color="#79AC78" size={20} />
          </div>
        </div>
      </div>
      {cartOpen && (
        <CartModal
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
          ownerUsername={bookData.ownerUsername}
          cartItems={bookData.cartItems}
        />
      )}
      {step === ChatRentalStep.READY && !isOwner && (
        <BookRentalApply
          dayprice={book.price}
          handleClick={handleClick}
          totalLeaf={totalLeaf}
          setTotalLeaf={setTotalLeaf}
          rentalPeriod={rentalPeriod}
          setRentalPeriod={setRentalPeriod}
        />
      )}
      {showModal && (
        <RentalModal
          totalLeaf={totalLeaf}
          step={step}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setStep={setStep}
          handleClick={handleClick}
          ownerName={ownerName}
        />
      )}
      {step === ChatRentalStep.RETURNED && <ReviewButton />}
    </div>
  );
};

export default ChatBookInfo;
