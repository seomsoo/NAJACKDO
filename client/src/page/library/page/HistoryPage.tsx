import Loading from "components/common/Loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import LibraryHeader from "page/library/components/LibraryHeader";
import { Suspense } from "react";
import BorrowBook from "page/library/components/BorrowBook";
import LendBook from "page/library/components/LendBook";

const HistoryPage = () => {
  const images: string[] = ["/화학.png", "/화학.png"];

  return (
    <Suspense fallback={<Loading />}>
      <LibraryHeader />
      <main className="px-[25px]">
        <Tabs defaultValue="book" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="borrow">내가 빌린 책</TabsTrigger>
            <TabsTrigger value="lend">내가 빌려준 책</TabsTrigger>
          </TabsList>

          <TabsContent value="lend">
            <LendBook />
          </TabsContent>
          <TabsContent value="borrow">
            <BorrowBook />
          </TabsContent>
        </Tabs>
      </main>
    </Suspense>
  );
};

export default HistoryPage;
