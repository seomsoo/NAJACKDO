import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import BorrowBook from "page/library/components/BorrowBook";
import RentalBook from "page/library/components/RentalBook";

const MyHistory = () => {
  return (
    <main className="px-[25px]">
      <Tabs defaultValue="rental" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="rental">내가 빌린 책</TabsTrigger>
          <TabsTrigger value="borrow">내가 빌려준 책</TabsTrigger>
        </TabsList>

        <TabsContent value="rental">
          <RentalBook />
        </TabsContent>
        <TabsContent value="borrow">
          <BorrowBook />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default MyHistory;
