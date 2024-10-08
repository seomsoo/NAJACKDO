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
          bookId={book.bookId}
          title={book.title}
          author={book.author}
          description={book.description}
          cover={book.cover}
          isInterested={true}
        />
      ))}
    </div>
  );
};

export default FavoriteBook;
