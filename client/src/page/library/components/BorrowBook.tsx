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

  if (isBorrowError) {
    return <div>대출 기록을 가져오는 데 오류가 발생했습니다.</div>;
  }

  return <HistoryList historyData={borrowHistory}/>;
};

export default BorrowBook;
