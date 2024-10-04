import { useSuspenseQuery } from "@tanstack/react-query";
import { getLendHistory } from "api/historyApi";
import { IHistory } from "atoms/History.type";
import HistoryList from "page/library/components/HistoryList";

const LendBook = () => {
  const { data: lendHistory } = useSuspenseQuery<IHistory[]>({
    queryKey: ["myBookCase", "lend"],
    queryFn: getLendHistory,
  });

  return <HistoryList historyData={lendHistory} title="내가 빌려준 책" />;
};

export default LendBook;
