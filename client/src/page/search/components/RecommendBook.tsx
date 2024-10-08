import { useSuspenseQuery } from "@tanstack/react-query";
import { getRecommBooks } from "api/bookApi";
import { IRecommendBooks } from "atoms/Book.type";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "store/useUserStore";

const RecommendBook = () => {
  const userId = useUserStore.getState().userId;
  const navigate = useNavigate();

  const { data: books, refetch } = useSuspenseQuery<IRecommendBooks>({
    queryKey: ["recommBooks"],
    queryFn: () => getRecommBooks(userId),
  });

  if (books.recommended_items_with_scores.length === 0) {
    refetch();
  }

  return (
    <div className="relative">
      <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide">
        {books.recommended_items_with_scores.map((book) => (
          <img
            key={book.book_id}
            src={book.cover}
            alt={String(book.book_id)}
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
