import { useQuery } from "@tanstack/react-query";
import { getLendHistory } from "api/historyApi";
import { IHistory } from "atoms/History.type";
import Loading from "components/common/Loading";
import HistoryList from "page/library/components/HistoryList";

const LendBook = () => {
  const {
    data: lendHistory,
    isLoading: isLendLoading,
    isError: isLendError,
  } = useQuery<IHistory[]>({
    queryKey: ["myBookCase"],
    queryFn: getLendHistory,
  });

  if (isLendLoading) return <Loading />;

  return <HistoryList historyData={lendHistory} title="내가 빌려준 책" />;
};

export default LendBook;
