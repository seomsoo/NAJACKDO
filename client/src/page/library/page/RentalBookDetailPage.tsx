import AddCart from "page/library/components/AddCart";
import BookRentalApply from "page/library/components/BookRentalApply";
import RentalBookDetail from "page/library/components/RentalBookDetail";

const RentalBookDetailPage = () => {
  const book = {
    title: "안녕, 푸바오",
    author: ["장린 지음"],
    genre: "에세이",
    category: ["동물 에세이", "포토 에세이"],
    content: "푸바오 귀여워요.",
    price: 15000,
  };

  return (
    <div>
      <RentalBookDetail book={book} />
      <div className="fixed bg-[#F8F6F3] bottom-0 w-screen max-w-[430px] border-t-[1px] pt-3 flex flex-row justify-center pb-7">
        <AddCart />
        <BookRentalApply dayPrice={book.price / 100} triggerClassName="bg-[#776B5D] text-white font-bold px-8 py-2 rounded-lg mx-5"/>
      </div>
    </div>
  );
};

export default RentalBookDetailPage;
