import AlarmPage from "page/alarm/page/AlarmPage";
import ChattingPage from "page/chatting/page/ChattingPage";
import CartPage from "page/library/page/CartPage";
import LibraryPage from "page/library/page/LibraryPage";
import LocationPage from "page/location/page/LocationPage";
import MainPage from "page/main/page/MainPage";
import ProfilePage from "page/profile/page/ProfilePage";
import SearchPage from "page/search/page/SearchPage";
import SearchResultPage from "page/search/page/SearchResultPage";
import { Route, Routes } from "react-router-dom";

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/location" element={<LocationPage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/chat" element={<ChattingPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/search/result" element={<SearchResultPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/alarm" element={<AlarmPage />} />
    </Routes>
  );
};

export default MainRoute;
