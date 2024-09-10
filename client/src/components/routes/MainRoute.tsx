import AlarmPage from "page/alarm/page/AlarmPage";
import ChattingPage from "page/chatting/page/ChattingPage";
import KaPayApprovePage from "page/kapay/page/KaPayApprovePage";
import KaPayCancelPage from "page/kapay/page/KaPayCancelPage";
import KaPayPage from "page/kapay/page/KaPayPage";
import BookDetailPage from "page/library/page/BookDetailPage";
import CartPage from "page/library/page/CartPage";
import LibraryPage from "page/library/page/LibraryPage";
import MyFavoritePage from "page/library/page/MyFavoritePage";
import RentalBookDetailPage from "page/library/page/RentalBookDetailPage";
import LocationPage from "page/location/page/LocationPage";
import LocationSettingPage from "page/location/page/LocationSettingPage";
import AuthCallBack from "page/login/page/AuthCallbackPage";
import LoginPage from "page/login/page/LoginPage";
import SurveyPage from "page/login/page/SurveyPage";
import MainPage from "page/main/page/MainPage";
import GradePage from "page/profile/page/GradePage";
import LeafPage from "page/profile/page/LeafPage";
import ProfilePage from "page/profile/page/ProfilePage";
import SearchPage from "page/search/page/SearchPage";
import SearchResultPage from "page/search/page/SearchResultPage";
import { Route, Routes } from "react-router-dom";

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/location" element={<LocationPage />} />
      <Route path="/location/setting" element={<LocationSettingPage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/library/my-favorite" element={<MyFavoritePage />} />
      <Route path="/chat" element={<ChattingPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/my-grade" element={<GradePage />} />
      <Route path="/profile/my-leaf" element={<LeafPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/search/result" element={<SearchResultPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/alarm" element={<AlarmPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth/callback" element={<AuthCallBack />} />
      <Route path="/kapay" element={<KaPayPage />} />
      <Route path="/kapay/approve" element={<KaPayApprovePage />} />
      <Route path="/kapay/cancel" element={<KaPayCancelPage />} />
      <Route path="/kapay/fail" element={<KaPayCancelPage />} />
      <Route path="/bookdetail" element={<BookDetailPage />} />
      <Route path="/bookdetail/rental" element={<RentalBookDetailPage />} />
      <Route path="/survey" element={<SurveyPage />} />
    </Routes>
  );
};

export default MainRoute;
