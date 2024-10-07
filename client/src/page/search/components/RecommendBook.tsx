import { useSuspenseQuery } from "@tanstack/react-query";
import { getRecommBooks } from "api/bookApi";
import { IRecommendBooks } from "atoms/Book.type";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "store/useUserStore";

const RecommendBook = () => {
  const userId = useUserStore().userId;
  const navigate = useNavigate();

  console.log(userId);

  const { data: books } = useSuspenseQuery<IRecommendBooks>({
    queryKey: ["recommBooks"],
    queryFn: () => getRecommBooks(userId),
  });

  return (
    <div className="relative">
      <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide">
        {books.recommended_items_with_scores.map((book) => (
          <img
            key={book.book_id}
            src={book.cover}
            alt="푸바오"
            width={80}
            height={100}
            className="my-2 mx-1"
            onClick={() => navigate(`/book/${book.book_id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendBook;
