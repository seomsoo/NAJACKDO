import { useSuspenseQuery } from "@tanstack/react-query";
import { getBorrowHistory } from "api/historyApi";
import { IHistory } from "atoms/History.type";
import HistoryList from "page/library/components/HistoryList";

const BorrowBook = () => {
  const { data: borrowHistory } = useSuspenseQuery<IHistory[]>({
    queryKey: ["myBookCase"],
    queryFn: getBorrowHistory,
  });

  return <HistoryList historyData={borrowHistory} title="내가 빌린 책" />;
};

export default BorrowBook;
