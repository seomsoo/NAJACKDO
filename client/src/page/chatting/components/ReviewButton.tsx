import { useNavigate } from "react-router-dom";

interface ReviewButtonProps {
  rentalId: number | null;
  ownerName: string;
  customerName: string;
}

const ReviewButton = ({
  rentalId,
  ownerName,
  customerName,
}: ReviewButtonProps) => {
  const navigate = useNavigate();

  const handleReview = () => {
    navigate("/chat/review", { state: { rentalId, ownerName, customerName } });
  };

  return (
    <button
      className="bg-sub7 text-white rounded-lg py-2 px-3"
      onClick={handleReview}
    >
      후기 보내기
    </button>
  );
};

export default ReviewButton;
