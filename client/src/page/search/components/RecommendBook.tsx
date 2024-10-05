const RecommendBook = () => {
  const book = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="relative">
      <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide">
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
