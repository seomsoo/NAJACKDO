import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getCartItem } from "api/cartApi";
import { getIsReviewed } from "api/chatApi";
import { postRental, postReturn } from "api/rentalApi";
import { ICartList } from "atoms/Cart.type";
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
  rentalId?: number;
  setTotalLeaf: (totalLeaf: number) => void;
  step: ChatRentalStep;
  setStep: (step: ChatRentalStep) => void;
}

// ! rentalId가 null이면 리뷰 작성 여부를 확인할 수 없음
// ! 고쳐야함

export enum ChatRentalStep {
  READY = "대여기간 체크",
  PAY = "송금하기",
  NO_LEAF = "책잎 부족",
  RENTED = "반납확인",
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
  const [isReview, setIsReview] = useState<boolean>(false);
  const [dayPrice, setDayPrice] = useState<number>(0);

  const { userId } = useUserStore.getState();

  const { data: bookData, refetch: refetchRentalId } =
    useSuspenseQuery<ICartList>({
      queryKey: ["cart", "book"],
      queryFn: () => getCartItem(cartId),
    });

  useEffect(() => {
    if (bookData) {
      setIsOwner(bookData.ownerId === userId);
      setDayPrice(
        bookData.cartItems.reduce((sum, cartItem) => sum + cartItem.price, 0)
      );
      switch (bookData.status) {
        case "READY":
          setStep(ChatRentalStep.READY);
          break;
        case "RENTED":
          setStep(ChatRentalStep.RENTED);
          break;
        case "RETURNED":
          setStep(ChatRentalStep.RETURNED);
          break;
        default:
          break;
      }
    }
  }, [bookData]);

  // 결제 Mutation
  const payMutation = useMutation({
    mutationKey: ["rental", "pay"],
    mutationFn: postRental,

    onSuccess: () => {
      setStep(ChatRentalStep.RENTED);
      complete("PAY");
    },

    onError: (error) => {
      setStep(ChatRentalStep.NO_LEAF);
    },
  });

  // 반납 Mutation
  const returnMutation = useMutation({
    mutationKey: ["rental", "return"],
    mutationFn: postReturn,

    onSuccess: () => {
      setModalOpen(false);
      setStep(ChatRentalStep.RETURNED);
      complete("RETURN");
    },
  });

  const revieweeId = isOwner ? customerId : ownerId;
  const rentalId = bookData?.rentalId;

  // 리뷰 작성 여부 체크하는 Mutation
  const { data: reviewData } = useQuery({
    queryKey: ["review", { rentalId, revieweeId }],
    queryFn: () => getIsReviewed(rentalId, revieweeId),
    enabled: rentalId !== null,
  });

  // 리뷰 체크 함수
  useEffect(() => {
    if (reviewData) {
      setIsReview(true); // 리뷰 상태를 true로 설정
    }
  }, [reviewData]);

  // 완료 메시지 전송
  const complete = async (talkType) => {
    await refetchRentalId();

    const completeMessage = ReactDOMServer.renderToString(
      talkType === "PAY" ? (
        <PayComplete
          totalLeaf={totalLeaf}
          rentalPeriod={rentalPeriod[0]}
          dayPrice={dayPrice}
        />
      ) : (
        <ReturnComplete />
      )
    );

    // 송금 완료는 빌리는 사람이, 반납 완료는 빌려주는 사람이
    const messageData: Message = {
      roomId: roomId,
      senderId: talkType === "PAY" ? customerId : ownerId,
      senderNickname: talkType === "PAY" ? customerName : ownerName,
      receiverId: talkType === "PAY" ? ownerId : customerId,
      receiverNickname: talkType === "PAY" ? ownerName : customerName,
      talkType: talkType,
      message: completeMessage,
    };

    client.publish({
      destination: `/pub/chat.message.${roomId}`,
      body: JSON.stringify(messageData),
    });
  };

  // 단계별 핸들러
  const handleClick = () => {
    if (step === ChatRentalStep.READY) {
      setStep(ChatRentalStep.PAY);
      setModalOpen(true);
      return;
    }

    if (step === ChatRentalStep.PAY) {
      payMutation.mutate({
        cartId: cartId,
        rentalCost: totalLeaf,
        rentalPeriod: rentalPeriod[0],
        totalPrice: dayPrice,
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

  // Modal 및 기타 렌더링
  const showModal =
    (step === ChatRentalStep.PAY && !isOwner) ||
    (step === ChatRentalStep.NO_LEAF && !isOwner) ||
    (step === ChatRentalStep.RENTED && isOwner);

  return (
    <div className="bg-[#DBD6D3] w-full h-24 px-4 flex flex-row items-center justify-between">
      <div
        className="flex flex-row items-center w-9/12"
        onClick={() => setCartOpen(true)}
      >
        <img
          src={bookData.cartItems[0].bookImage}
          alt="사진"
          className="rounded-2xl w-16 h-16"
        />
        <div className="ml-2">
          <p className="text-gray-500">
            <span className="text-black font-medium">
              {bookData.cartItems[0].bookTitle}
            </span>
            {bookData.cartItems.length > 1 &&
              `외 ${bookData.cartItems.length - 1}권`}
          </p>
          <div className="flex flex-row items-center">
            <span className="text-black/50 text-sm">일일</span>
            <IoIosLeaf className="ml-2 mr-1 mb-1" color="#79AC78" size={20} />
            <span className="font-semibold">{dayPrice}</span>
            
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
          dayprice={bookData.cartItems[0].price}
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
      {step === ChatRentalStep.RETURNED && isReview && (
        <ReviewButton
          rentalId={bookData.rentalId}
          ownerName={ownerName}
          customerName={customerName}
          bookTitle={bookData.cartItems[0].bookTitle}
          bookImageUrl={bookData.cartItems[0].bookImage}
          bookCount={bookData.cartItems.length - 1}
        />
      )}
    </div>
  );
};

export default ChatBookInfo;
