import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import BorrowBook from "page/library/components/BorrowBook";
import LendBook from "page/library/components/LendBook";

const MyHistory = () => {
  return (
    <main className="px-[25px]">
      <Tabs defaultValue="lend" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="lend">내가 빌린 책</TabsTrigger>
          <TabsTrigger value="borrow">내가 빌려준 책</TabsTrigger>
        </TabsList>
        <TabsContent value="lend">
          <LendBook />
        </TabsContent>
        <TabsContent value="borrow">
          <BorrowBook />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default MyHistory;
