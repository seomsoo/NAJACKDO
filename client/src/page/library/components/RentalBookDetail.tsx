import BookInfo from "page/library/components/BookInfo";
import CenterCropImage from "page/library/components/CenterCropImage";
import DetailRecommendBook from "page/library/components/DetailRecommendBook";
import DetectionInfo from "page/library/components/DetectionInfo";
import SellerInfo from "page/library/components/SellerInfo";
import SellerReview from "page/library/components/SellerReview";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface BookInfoProps {
  book: {
    title: string;
    author: string[];
    genre: string;
    category: string[];
    content: string;
    price: number;
  };
}

const RentalBookDetail = ({ book }: BookInfoProps) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="relative w-full h-72 object-cover">
        <CenterCropImage imageUrl="/pubao.png" />
        <div
          onClick={() => navigate(-1)}
          className="cursor-pointer absolute left-0 top-0 z-10 p-4"
        >
          <IoChevronBack size={25} color="#FFFFFF" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img src="/pubao.png" alt="푸바오" width={180} className="z-20" />
        </div>
      </div>
      <div className="m-4">
        <SellerInfo />
        <BookInfo book={book} rental />
        <DetectionInfo />
        <SellerReview />
        <DetailRecommendBook />
      </div>
      <div className="fixed bg-[#F8F6F3] bottom-0 w-screen max-w-[430px] border-t-[1px] pt-3 flex flex-row justify-center pb-7"></div>
    </div>
  );
};

export default RentalBookDetail;
