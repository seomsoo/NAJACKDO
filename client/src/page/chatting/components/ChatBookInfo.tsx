import { useMutation } from "@tanstack/react-query";
import { postRental } from "api/rentalApi";
import RentalModal from "page/chatting/components/RentalModal";
import ReviewButton from "page/chatting/components/ReviewButton";
import BookRentalApply from "page/library/components/BookRentalApply";
import { useState } from "react";
import { IoIosLeaf } from "react-icons/io";

interface ChatBookInfoProps {
  book: {
    title: string;
    dayPrice: number;
    imageUrl: string;
  };
}

export enum ChatRentalStep {
  CHECK = "대여기간 체크",
  PAY = "송금하기",
  NO_LEAF = "책잎 부족",
  RETURN = "반납하기",
  REVIEW = "후기 보내기",
}

const ChatBookInfo = ({ book }: ChatBookInfoProps) => {
  const [step, setStep] = useState<ChatRentalStep>(ChatRentalStep.CHECK);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [totalLeaf, setTotalLeaf] = useState<number>(book.dayPrice * 14);
  const [rentalPeriod, setRentalPeriod] = useState<number[]>([14]);
  const isOwner = false;

  const payMutation = useMutation({
    mutationKey: ["rental", "pay"],
    mutationFn: postRental,

    onSuccess: () => {
      setStep(ChatRentalStep.RETURN);
    },

    onError: (error) => {
      setStep(ChatRentalStep.NO_LEAF);
      setModalOpen(true);
      setTimeout(() => {
        setModalOpen(false);
        setStep(ChatRentalStep.CHECK);
      }, 2000);
    },
  });

  const handleClick = () => {
    if (step === ChatRentalStep.CHECK) {
      setStep(ChatRentalStep.PAY);
      setModalOpen(true);
    } else if (step === ChatRentalStep.PAY) {
      payMutation.mutate({
        cartId: 3,
        rentalCost: book.dayPrice,
        rentalPeriod: 14,
        totalPrice: totalLeaf,
      });
    } else if (step === ChatRentalStep.RETURN) {
      setStep(ChatRentalStep.REVIEW);
    }
  };

  return (
    <div className="bg-[#DBD6D3] w-full h-24 px-4 flex flex-row items-center justify-between">
      <div className="flex flex-row items-center">
        <img src={book.imageUrl} alt="사진" className="rounded-2xl w-16 h-16" />
        <div className="ml-2">
          <span>{book.title}</span>
          <div className="flex flex-row items-center">
            <span className="text-black/50 text-sm">일일</span>
            <span className="ml-2 mr-1 font-bold">{book.dayPrice}</span>
            <IoIosLeaf color="#79AC78" size={20} />
          </div>
        </div>
      </div>
      {step === ChatRentalStep.CHECK && !isOwner && (
        <BookRentalApply
          dayprice={book.dayPrice}
          handleClick={handleClick}
          totalLeaf={totalLeaf}
          setTotalLeaf={setTotalLeaf}
          rentalPeriod={rentalPeriod}
          setRentalPeriod={setRentalPeriod}
        />
      )}
      {step === ChatRentalStep.PAY && !isOwner && (
        <RentalModal
          totalLeaf={totalLeaf}
          step={step}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setStep={setStep}
          handleClick={handleClick}
        />
      )}
      {step === ChatRentalStep.RETURN && isOwner && (
        <RentalModal
          step={step}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setStep={setStep}
          handleClick={handleClick}
        />
      )}
      {step === ChatRentalStep.REVIEW && !isOwner && <ReviewButton />}
    </div>
  );
};

export default ChatBookInfo;
