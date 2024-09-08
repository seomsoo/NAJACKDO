const RecommendBook = () => {
  const book = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="my-6">
      <span className="font-bold">추천 도서</span>
      <div
        className="flex overflow-x-auto whitespace-nowrap"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {book.map((i) => (
          <img
            key={i}
            src="/pubao.png"
            alt="푸바오"
            width={80}
            height={100}
            className="my-2 mx-1"
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendBook;
