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

    if (isLendError) {
      return <div>대출 기록을 가져오는 데 오류가 발생했습니다.</div>;
    }

  return <HistoryList historyData={lendHistory} />;
};

export default LendBook;
