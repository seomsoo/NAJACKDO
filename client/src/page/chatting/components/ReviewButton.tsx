import { useNavigate } from "react-router-dom";

interface ReviewButtonProps {
  rentalId: number | null;
  ownerName: string;
}

const ReviewButton = ({ rentalId, ownerName }: ReviewButtonProps) => {
  const navigate = useNavigate();

  const handleReview = () => {
    navigate("/chat/review", { state: { rentalId, ownerName } });
  };

  return (
    <button
      className="bg-[#776B5D] text-white rounded-lg py-2 px-3"
      onClick={handleReview}
    >
      후기 보내기
    </button>
  );
};

export default ReviewButton;
