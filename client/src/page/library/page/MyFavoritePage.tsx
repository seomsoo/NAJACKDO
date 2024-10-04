import Loading from "components/common/Loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import FavoriteBook from "page/library/components/FavoriteBook";
import FavoriteBookcase from "page/library/components/FavoriteBookcase";
import FavoriteHeader from "page/library/components/FavoriteHeader";
import { Suspense } from "react";

const MyFavoritePage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <FavoriteHeader />

      <main className="px-6">
        <Tabs defaultValue="book" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="book">책</TabsTrigger>
            <TabsTrigger value="bookcase">책장</TabsTrigger>
          </TabsList>

          <TabsContent value="book">
            <FavoriteBook />
          </TabsContent>

          <TabsContent value="bookcase">
            <FavoriteBookcase />
          </TabsContent>
        </Tabs>
      </main>
    </Suspense>
  );
};

export default MyFavoritePage;
