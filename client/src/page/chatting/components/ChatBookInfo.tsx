import { IoIosLeaf } from "react-icons/io";

interface ChatBookInfoProps {
  book: {
    title: string;
    dayPrice: number;
    imageUrl: string;
  };
}

const ChatBookInfo = ({ book }: ChatBookInfoProps) => {
  return (
    <div className="bg-[#DBD6D3] w-full h-24 px-4 flex flex-row items-center justify-between">
      <div className="flex flex-row items-center">
        <img src={book.imageUrl} alt="사진" className="rounded-2xl w-16 h-16" />
        <div className="ml-2">
          <span>{book.title}</span>
          <div className="flex flex-row items-center">
            <span className="text-black/50 text-sm">일일</span>
            <span className="ml-2 mr-1 font-bold">{book.dayPrice}</span>
            <IoIosLeaf color="#79AC78" size={20} />
          </div>
        </div>
      </div>
      <span className="bg-[#776B5D] text-white rounded-lg py-2 px-3">
        약속 잡기
      </span>
    </div>
  );
};

export default ChatBookInfo;
