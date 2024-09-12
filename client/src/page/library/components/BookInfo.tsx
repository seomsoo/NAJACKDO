import CategoryTag from "components/common/CategoryTag";
import { IoHeartOutline } from "react-icons/io5";

interface BookInfoProps {
  book: {
    title: string;
    author: string[];
    genre: string;
    category: string[];
    content: string;
    price: number;
  };
  rental?: boolean;
}

const BookInfo = ({ book, rental }: BookInfoProps) => {
  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <p className="text-xl font-bold">{book.title}</p>
        {!rental && <IoHeartOutline size={25} />}
      </div>
      {book.author.map((author, index) => {
        return (
          <p key={index} className="my-2">
            {author}
          </p>
        );
      })}
      {book.category.map((category, index) => {
        return <CategoryTag key={index} category={category} />;
      })}
      <p
        dangerouslySetInnerHTML={{ __html: book.content }}
        className="my-8"
      ></p>
      {/* <p>{book.content}</p> */}
      <p className="font-bold">중고가 : {book.price}</p>
    </div>
  );
};

export default BookInfo;
