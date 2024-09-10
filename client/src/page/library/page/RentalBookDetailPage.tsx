import BookInfo from "page/library/components/BookInfo";
import CenterCropImage from "page/library/components/CenterCropImage";
import DetailRecommendBook from "page/library/components/DetailRecommendBook";
import DetectionInfo from "page/library/components/DetectionInfo";
import SellerInfo from "page/library/components/SellerInfo";
import SellerReview from "page/library/components/SellerReview";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const RentalBookDetailPage = () => {
  const navigate = useNavigate();

  const bookData = {
    title: "안녕, 푸바오",
    author: ["장린 지음"],
    genre: "에세이",
    category: ["동물 에세이", "포토 에세이"],
    content: "푸바오 귀여워요.",
    price: 15000,
  };

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
        <BookInfo book={bookData} rental />
        <DetectionInfo />
        <SellerReview />
        <DetailRecommendBook />
      </div>
    </div>
  );
};

export default RentalBookDetailPage;
