import CategoryTag from "components/common/CategoryTag";

interface TextApplyResultProps {
  book: {
    title: string;
    author: string[];
    category: string[];
    imageUrl: string;
  };
}

const TextApplyResult = ({ book }: TextApplyResultProps) => {
  return (
    <div className="flex flex-row text-sm">
      <img src={book.imageUrl} alt="책 이미지" width={70} height={108} />
      <div className="ml-2 flex flex-col items-start">
        <p className="text-left font-bold">{book.title}</p>
        <span className="my-2">{book.author.join(" | ")}</span>
        <div>
          {book.category.map((category, index) => {
            return (
              <CategoryTag
                category={category}
                key={index}
                className="text-xs"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TextApplyResult;
