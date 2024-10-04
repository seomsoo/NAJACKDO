import { useSuspenseQuery } from "@tanstack/react-query";
import { getInterestbook } from "api/bookApi";
import BookContainer from "page/library/components/BookContainer";

const FavoriteBook = () => {
  const { data: interestBooks } = useSuspenseQuery({
    queryKey: ["interestBooks"],
    queryFn: getInterestbook,
  });

  return (
    <div>
      {interestBooks?.map((book) => (
        <BookContainer
          key={book.bookId}
          bookId={book.bookId} // 도서 ID
          title={book.title} // 도서 제목
          author={book.author} // 도서 저자
          description={book.description} // 도서 설명
          cover={book.cover} // 도서 커버 이미지
          isInterested={true} // 조회된 책은 이미 관심 도서
        />
      ))}
    </div>
  );
};

export default FavoriteBook;
