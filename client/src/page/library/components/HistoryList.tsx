import { IHistory } from "atoms/History.type";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "components/ui/accordion";

interface IHistoryListProps {
  historyData?: IHistory[];
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const HistoryList: React.FC<IHistoryListProps> = ({ historyData }) => {
  return (
    <div className="flex flex-col">

      {(!historyData || historyData.length === 0) ? (
        <div className="text-center text-gray-500 mt-[70%]">데이터가 없습니다.</div>
      ) : (
      <Accordion type="multiple">
        {" "}
        {historyData.map((history) => (
          <AccordionItem
            key={history.rentalId.toString()}
            value={history.rentalId.toString()}
          >
            <AccordionTrigger className="flex items-center">
              <img
                src={history.otherUseProfileImg}
                alt="Profile"
                className="w-10 h-10 rounded-full mr-4"
              />
              <div className="flex flex-col">
                <div className="font-semibold">{history.otherUseNickName}</div>
                <div className="text-sm">
                  {formatDate(history.rentalStartDate)} ~{" "}
                  {formatDate(history.rentalEndDate)}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="mt-2">
                {history.rentalBooks.map((book) => (
                  <div key={book.title} className="flex items-center mt-2">
                    <img
                      src={book.coverImg}
                      alt="Book cover"
                      className="w-20 h-28 object-cover mr-4"
                    />
                    <div>
                      <div className="font-semibold">{book.title}</div>
                      <div className="text-sm">{book.author}</div>
                      <div className="text-sm">{book.publisher}</div>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
        </Accordion>
      )}
    </div>
  );
};

export default HistoryList;
