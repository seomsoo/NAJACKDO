import { useQuery } from "@tanstack/react-query";
import { getBorrowHistory } from "api/historyApi";
import { IHistory } from "atoms/History.type";
import Loading from "components/common/Loading";
import HistoryList from "page/library/components/HistoryList";

const BorrowBook = () => {
  const {
    data: borrowHistory,
    isLoading: isBorrowLoading,
    isError: isBorrowError,
  } = useQuery<IHistory[]>({
    queryKey: ["myBookCase"],
    queryFn: getBorrowHistory,
  });

  if (isBorrowLoading) return <Loading />;

  return <HistoryList historyData={borrowHistory} title="내가 빌린 책" />;
};

export default BorrowBook;
