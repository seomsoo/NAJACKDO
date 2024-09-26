import CategoryTag from "components/common/CategoryTag";
import { IoHeartOutline } from "react-icons/io5";

interface BookInfoProps {
  book: {
    bookId: number;
    title: string;
    author: string;
    cover: string;
    genre: string;
    description: string;
    publisher: string;
    priceStandard: number;
    itemPage: number;
    starPoint: number;
    pubDate: string;
    isbn: number;
  };
  rental?: boolean;
}
  // const bookData = {
  //   title: "안녕, 푸바오",
  //   author: ["장린 지음"],
  //   genre: "에세이",
  //   category: ["동물 에세이", "포토 에세이"],
  //   content:
  //     "우리가 낳아 키운 푸바오는 한국을 떠나 잘 지내고 있을까? <br/> 5개월간 우리 곁을 떠났던 푸바오, <br/> 기나긴 그리움을 뚫고 포토에세이 《안녕, 푸바오》로 돌아왔다.",
  //   price: 15000,
  // };
const BookInfo = ({ book, rental }: BookInfoProps) => {
  const authorList = book.author.replace(" (지은이)", "").split(", ");
  const author = authorList.length > 1 ? authorList[0]+" 외 "+ (authorList.length-1) + "명" : authorList[0]
  const genreList = book.genre.split(">");
  const genre = genreList.length > 2 ? genreList.slice(1, 3) : genreList;
  console.log("genre", genre);
  console.log("genreList", genreList);
  
  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <p className="text-xl font-bold">{book.title}</p>
        {!rental && <IoHeartOutline size={25} />}
      </div>
      <p>{author} 지음</p>

      {genre.map((genre, index) => {
        return <CategoryTag key={index} category={genre} />;
      })}
      <p
        dangerouslySetInnerHTML={{ __html: book.description }}
        className="my-8"
      ></p>
      {/* <p>{book.content}</p> */}
      <p className="font-bold">중고가 : {book.priceStandard}</p>
    </div>
  );
};

export default BookInfo;
