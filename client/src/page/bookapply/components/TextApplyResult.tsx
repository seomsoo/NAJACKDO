import CategoryTag from "components/common/CategoryTag";
import { useNavigate } from "react-router-dom";

interface TextApplyResultProps {
  book: any;
}

const TextApplyResult = ({ book }: TextApplyResultProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/apply/book", { state: { kind: "isbn", keyword: book.isbn } });
  };
  return (
    <div
      className="flex flex-row text-sm border-b-[1px] border-[#D9D9D9] pb-4"
      onClick={handleClick}
    >
      <img src={book.cover} alt="책 이미지" width={70} height={108} />
      <div className="ml-2 flex flex-col items-start">
        <p className="text-left font-bold">{book.title}</p>
        <span className="my-2 text-left">{book.author}</span>
        <div className="flex flex-row mt-1 flex-wrap">
          <CategoryTag category={book.genre} />
        </div>
      </div>
    </div>
  );
};

export default TextApplyResult;
