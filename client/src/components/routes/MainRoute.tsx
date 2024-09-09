import AlarmPage from "page/alarm/page/AlarmPage";
import ChattingPage from "page/chatting/page/ChattingPage";
import KaPayApprovePage from "page/kapay/page/KaPayApprovePage";
import KaPayCancelPage from "page/kapay/page/KaPayCancelPage";
import KaPayPage from "page/kapay/page/KaPayPage";
import CartPage from "page/library/page/CartPage";
import LibraryPage from "page/library/page/LibraryPage";
import LocationPage from "page/location/page/LocationPage";
import LoginPage from "page/login/page/LoginPage";
import MainPage from "page/main/page/MainPage";
import ProfilePage from "page/profile/page/ProfilePage";
import GradePage from "page/profile/page/GradePage";
import LeafPage from "page/profile/page/LeafPage";
import SearchPage from "page/search/page/SearchPage";
import SearchResultPage from "page/search/page/SearchResultPage";
import { Route, Routes } from "react-router-dom";
import BookDetailPage from "page/library/page/BookDetailPage";
import SurveyPage from 'page/login/page/SurveyPage';
import AuthCallBack from "page/login/page/AuthCallbackPage";

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/location" element={<LocationPage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/chat" element={<ChattingPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/grade" element={<GradePage />} />
      <Route path="/profile/leaf" element={<LeafPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/search/result" element={<SearchResultPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/alarm" element={<AlarmPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth/callback" element={<AuthCallBack />}/>
      <Route path="/kapay" element={<KaPayPage />} />
      <Route path="/kapay/approve" element={<KaPayApprovePage />} />
      <Route path="/kapay/cancel" element={<KaPayCancelPage />} />
      <Route path="/kapay/fail" element={<KaPayCancelPage />} />
      <Route path="/bookdetail" element={<BookDetailPage />} />
      <Route path='/survey' element={<SurveyPage />} />
    </Routes>
  );
};

export default MainRoute;
