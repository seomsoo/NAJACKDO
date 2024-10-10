import { useSuspenseQuery } from '@tanstack/react-query';
import { getNearAvailableBook } from 'api/bookApi';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'components/ui/accordion';
import RentalBookCover from './RentalBookCover';

interface RentableBookProps {
  bookId: number;
}

const RentableBook = ({ bookId }: RentableBookProps) => {
  const { data: nearAvailableBookData } = useSuspenseQuery({
    queryKey: ['nearAvailableBook', bookId],
    queryFn: () => getNearAvailableBook(bookId),
  });

  return (
    <>
      {nearAvailableBookData.length === 0 && (
        <div className="mt-4 flex flex-col">
          <span className="font-bold text-md">대여 가능 도서</span>
          <span className="mt-8 text-center">대여 가능 도서가 없습니다.</span>
        </div>
      )}
      {nearAvailableBookData.length > 0 &&
        nearAvailableBookData.length <= 4 && (
          <div className="mt-4 flex flex-col">
            <span className="font-bold text-md">대여 가능 도서</span>
            <div className="grid grid-cols-4 gap-x-2 gap-y-5 mt-4">
              {nearAvailableBookData.slice(0, 4).map((book, index) => {
                return <RentalBookCover key={index} book={book} />;
              })}
            </div>
          </div>
        )}
      {nearAvailableBookData.length > 4 && (
        <Accordion type="single" collapsible className="mt-4">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-bold text-md" component="rental">
              <p className="mr-3">대여 가능 도서</p>
            </AccordionTrigger>
            <div className="grid grid-cols-4 gap-x-2 gap-y-5">
              {nearAvailableBookData.slice(0, 4).map((book, index) => {
                return <RentalBookCover key={index} book={book} />;
              })}
            </div>
            {nearAvailableBookData.length > 4 && (
              <AccordionContent className="mt-5">
                <div className="grid grid-cols-4 gap-x-2 gap-y-5">
                  {nearAvailableBookData.slice(4).map((book, index) => {
                    return <RentalBookCover key={index} book={book} />;
                  })}
                </div>
              </AccordionContent>
            )}
          </AccordionItem>
        </Accordion>
      )}
    </>
  );
};

export default RentableBook;
