import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "components/ui/accordion";
import BookCover from "page/library/components/BookCover";

const RentableBook = () => {
  const rentalBook = [
    {
      imgUrl: "/pubao.png",
      detection: "상",
      price: 450,
    },
    {
      imgUrl: "/pubao.png",
      detection: "중",
      price: 450,
    },
    {
      imgUrl: "/pubao.png",
      detection: "하",
      price: 450,
    },
    {
      imgUrl: "/pubao.png",
      detection: "중",
      price: 450,
    },
    {
      imgUrl: "/pubao.png",
      detection: "중",
      price: 450,
    },
    {
      imgUrl: "/pubao.png",
      detection: "중",
      price: 450,
    },
    {
      imgUrl: "/pubao.png",
      detection: "중",
      price: 450,
    },
    {
      imgUrl: "/pubao.png",
      detection: "중",
      price: 450,
    },
    {
      imgUrl: "/pubao.png",
      detection: "중",
      price: 450,
    },
    {
      imgUrl: "/pubao.png",
      detection: "중",
      price: 450,
    },
    {
      imgUrl: "/pubao.png",
      detection: "중",
      price: 450,
    },
  ];

  return (
    <Accordion type="single" collapsible className="mt-4">
      <AccordionItem value="item-1">
        <AccordionTrigger className="font-bold text-md">
          <p>대여 가능 도서</p>
        </AccordionTrigger>
        <div className="grid grid-cols-4 gap-x-2 gap-y-5">
          {rentalBook.slice(0, 4).map((book, index) => {
            return <BookCover key={index} book={book} />;
          })}
        </div>
        <AccordionContent className="mt-5">
          <div className="grid grid-cols-4 gap-x-2 gap-y-5">
            {rentalBook.slice(4).map((book, index) => {
              return <BookCover key={index} book={book} />;
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default RentableBook;
