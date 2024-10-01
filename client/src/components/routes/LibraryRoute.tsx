import HistoryPage from "page/library/page/HistoryPage";
import LibraryPage from "page/library/page/LibraryPage";
import MyBookCasePage from "page/library/page/MyBookCasePage";
import MyFavoritePage from "page/library/page/MyFavoritePage";
import OtherBookCasePage from "page/library/page/OtherBookCasePage";
import { Navigate, Route, Routes } from "react-router-dom";

const LibraryRoute = () => {
  return (
    <Routes>
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/library/my-favorite" element={<MyFavoritePage />} />
      <Route path="/library/my-bookcase" element={<MyBookCasePage />} />
      <Route path="/library/my-history" element={<HistoryPage />} />
      <Route path="/library/bookcase/:userId" element={<OtherBookCasePage />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default LibraryRoute;
