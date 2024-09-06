import ChattingPage from "page/chatting/page/ChattingPage";
import LibraryPage from "page/library/page/LibraryPage";
import LocationPage from "page/location/page/LocationPage";
import MainPage from "page/main/page/MainPage";
import ProfilePage from "page/profile/page/ProfilePage";
import { Route, Routes } from "react-router-dom";

const FooterRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/location" element={<LocationPage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/chat" element={<ChattingPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
};

export default FooterRoute;
