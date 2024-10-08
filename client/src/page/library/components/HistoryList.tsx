import { IHistory } from "atoms/History.type";
import BaseProfile from "components/common/BaseProfile";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "components/ui/accordion";
import { IoIosLeaf } from "react-icons/io";

interface IHistoryListProps {
  historyData?: IHistory[];
  title: string;
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date
    .toLocaleDateString("ko-KR", {
      year: "2-digit",
      month: "long",
      day: "2-digit",
    })
    .replace(/\./g, "");
};

const HistoryList: React.FC<IHistoryListProps> = ({ historyData, title }) => {
  return (
    <div className="flex flex-col">
      {!historyData || historyData.length === 0 ? (
        <div className="text-center text-gray-500 mt-[70%]">
          데이터가 없습니다.
        </div>
      ) : (
        <Accordion type="multiple">
          {" "}
          {historyData.map((history) => (
            <AccordionItem
              key={history.rentalId.toString()}
              value={history.rentalId.toString()}
            >
              <AccordionTrigger component="history">
                <BaseProfile
                  userImage={history.otherUseProfileImg}
                  width="12"
                  height="12"
                />
                <div className="flex flex-col ml-3 ">
                  <div className="flex flex-col ">
                    <div className="font-bold text-lg flex ">
                      {history.otherUseNickName}
                    </div>
                  </div>
                  <div className="text-sm text-nowrap ">
                    {formatDate(history.rentalStartDate)} ~{" "}
                    {formatDate(history.rentalEndDate)}
                  </div>
                </div>
                <span className="flex items-center font-bold mb-6 text-lg ">
                  <IoIosLeaf className="text-sub8  " />
                  {history.rentalCost}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="mt-2">
                  {history.rentalBooks.map((book) => (
                    <div key={book.title} className="flex items-center mt-2">
                      <img
                        src={book.coverImg}
                        alt="Book cover"
                        style={{
                          boxShadow:
                            "4px 4px 8px 2px  rgba(0, 0, 0, 0.2), 0 6px 12px rgba(0, 0, 0, 0.2)",
                        }}
                        className="w-20 h-28 ml-2 object-cover mr-4"
                      />
                      <div>
                        <div className="font-semibold">{book.title}</div>
                        <div className="text-sm font-medium">{book.author}</div>
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
