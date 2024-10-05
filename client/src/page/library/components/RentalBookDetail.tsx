import CenterCropImage from "page/library/components/CenterCropImage";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

interface BookInfoProps {
  imageUrl: string;
}

const RentalBookDetail = ({ imageUrl }: BookInfoProps) => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const bookIdAsNumber = parseInt(bookId, 10);

  return (
    <div>
      <div className="relative w-full h-72 object-cover">
        <CenterCropImage imageUrl={imageUrl} />
        <div
          onClick={() => navigate(-1)}
          className="cursor-pointer absolute left-0 top-0 z-10 p-4"
        >
          <IoChevronBack size={25} color="#A6B37D" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={imageUrl} alt="도서 이미지" width={180} className="z-20" />
        </div>
      </div>
    </div>
  );
};

export default RentalBookDetail;
