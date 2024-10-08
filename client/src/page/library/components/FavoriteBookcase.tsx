import { useSuspenseQuery } from "@tanstack/react-query";
import { getInterestBookCase } from "api/bookcaseApi";
import BookcaseContainer from "page/library/components/BookcaseContainer";

const FavoriteBookcase = () => {
  const { data: bookcases } = useSuspenseQuery({
    queryKey: ["interestBookCase"],
    queryFn: getInterestBookCase,
  });

  return (
    <div>
      {bookcases?.map((bookcase) => (
        <BookcaseContainer
          key={bookcase.userId}
          userId={bookcase.userId}
          name={bookcase.nickname}
          imageArray={bookcase.displayBooks.map((book) => book.cover)}
          isFollowed={bookcase.follow}
        />
      ))}
    </div>
  );
};

export default FavoriteBookcase;
