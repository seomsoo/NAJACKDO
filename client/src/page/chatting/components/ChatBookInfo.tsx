import RentalModal from "page/chatting/components/RentalModal";
import { useState } from "react";
import { IoIosLeaf } from "react-icons/io";
import { useNavigate } from "react-router-dom";

interface ChatBookInfoProps {
  book: {
    title: string;
    dayPrice: number;
    imageUrl: string;
  };
}

enum ChatRentalStep {
  PAY,
  RETURN,
  REVIEW,
}

const ChatBookInfo = ({ book }: ChatBookInfoProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<ChatRentalStep>(ChatRentalStep.REVIEW);
  let rentalStep;
  const isOwner = false;

  switch (step) {
    case 0:
      rentalStep = "송금하기";
      break;

    case 1:
      rentalStep = "반납하기";
      break;

    case 2:
      rentalStep = "후기 보내기";
      break;

    default:
      rentalStep = "송금하기";
      break;
  }

  const handleReview = () => {
    navigate("/chat/review");
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
      {step !== 2 ? (
        <RentalModal step={step} rentalStep={rentalStep} isOwner={isOwner} />
      ) : (
        <button
          className="bg-[#776B5D] text-white rounded-lg py-2 px-3"
          onClick={handleReview}
        >
          {rentalStep}
        </button>
      )}
    </div>
  );
};

export default ChatBookInfo;
