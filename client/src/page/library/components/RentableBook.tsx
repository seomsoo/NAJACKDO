import { useQuery } from "@tanstack/react-query";
import { getNearAvailableBook } from "api/bookApi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "components/ui/accordion";
import RentalBookCover from "./RentalBookCover";

interface RentableBookProps {
  bookId: number;
}

const RentableBook = ({ bookId } : RentableBookProps) => {

  const {
    data: nearAvailableBookData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['nearAvailableBook', bookId],
    queryFn: () => getNearAvailableBook(bookId),
  });
  console.log("nearAvailableBookData", nearAvailableBookData);


    if (isLoading ) {
    return (
      <div>
        <p className="mt-5 font-bold mb-3">대여 가능 도서</p>
        <p>주변 대여 가능 도서 조회 중...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <p className="mt-5 font-bold mb-3">대여 가능 도서</p>
        <p>주변 대여 가능 도서가 없습니다.</p>
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible className="mt-4">
      <AccordionItem value="item-1">
        <AccordionTrigger className="font-bold text-md">
          <p>대여 가능 도서</p>
        </AccordionTrigger>
        <div className="grid grid-cols-4 gap-x-2 gap-y-5">
          {nearAvailableBookData.slice(0, 4).map((book, index) => {
            return <RentalBookCover key={index} book={book} />;
          })}
        </div>
        <AccordionContent className="mt-5">
          <div className="grid grid-cols-4 gap-x-2 gap-y-5">
            {nearAvailableBookData.slice(4).map((book, index) => {
              return <RentalBookCover key={index} book={book} />;
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default RentableBook;
