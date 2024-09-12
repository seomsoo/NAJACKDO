const DetailRecommendBook = () => {
  const bookData = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="mt-10 mb-6">
      <p className="font-bold mb-3">추천 도서</p>
      <div className="grid grid-cols-4 gap-3">
        {bookData.map((_, index) => {
          return (
            <img
              src="/harrypotter.png"
              alt="해리포터"
              width={80}
              className="rounded-e-md"
            />
          );
        })}
      </div>
    </div>
  );
};

export default DetailRecommendBook;
