import { useNavigate } from "react-router-dom";

interface ReviewButtonProps {
  rentalId: number | null;
  ownerName: string;
  customerName: string;
  bookTitle: string;
  bookImageUrl: string;
  bookCount: number;
}

const ReviewButton = ({
  rentalId,
  ownerName,
  customerName,
  bookTitle,
  bookImageUrl,
  bookCount,
}: ReviewButtonProps) => {
  const navigate = useNavigate();

  const handleReview = () => {
    navigate("/chat/review", {
      state: {
        rentalId,
        ownerName,
        customerName,
        bookTitle,
        bookImageUrl,
        bookCount,
      },
    });
  };

  return (
    <button
      className="bg-sub7 text-white rounded-lg py-2 px-3"
      onClick={handleReview}
    >
      후기
      <br />
      보내기
    </button>
  );
};

export default ReviewButton;
