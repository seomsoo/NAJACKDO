import HistoryPage from "page/library/page/HistoryPage";
import LibraryPage from "page/library/page/LibraryPage";
import MyBookCasePage from "page/library/page/MyBookCasePage";
import MyFavoritePage from "page/library/page/MyFavoritePage";
import OtherBookCasePage from "page/library/page/OtherBookCasePage";
import { Navigate, Route, Routes } from "react-router-dom";

const LibraryRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<LibraryPage />} />
      <Route path="/my-favorite" element={<MyFavoritePage />} />
      <Route path="/my-bookcase" element={<MyBookCasePage />} />
      <Route path="/my-history" element={<HistoryPage />} />
      <Route path="/bookcase/:userId" element={<OtherBookCasePage />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default LibraryRoute;
