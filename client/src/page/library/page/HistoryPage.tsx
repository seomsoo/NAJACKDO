import Loading from "components/common/Loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import BorrowBook from "page/library/components/BorrowBook";
import HistoryHeader from "page/library/components/HistoryHeader";
import LendBook from "page/library/components/LendBook";
import { Suspense } from "react";

const HistoryPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <HistoryHeader />
      <main className="px-[25px]">
        <Tabs defaultValue="borrow" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="borrow">내가 빌린 책</TabsTrigger>
            <TabsTrigger value="lend">내가 빌려준 책</TabsTrigger>
          </TabsList>

          <TabsContent value="borrow">
            <BorrowBook />
          </TabsContent>
          <TabsContent value="lend">
            <LendBook />
          </TabsContent>
        </Tabs>
      </main>
    </Suspense>
  );
};

export default HistoryPage;
