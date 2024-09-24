import AlarmPage from "page/alarm/page/AlarmPage";
import CartPage from "page/cart/page/CartPage";
import ChattingPage from "page/chatting/page/ChattingPage";
import ChattingRoomPage from "page/chatting/page/ChattingRoomPage";
import ReviewPage from "page/chatting/page/ReviewPage";
import KaPayApprovePage from "page/kapay/page/KaPayApprovePage";
import KaPayCancelPage from "page/kapay/page/KaPayCancelPage";
import KaPayFailPage from "page/kapay/page/KaPayFailPage";
import KaPayPage from "page/kapay/page/KaPayPage";
import AICheckPage from "page/library/page/AICheckPage";
import AICheckResultPage from "page/library/page/AICheckResultPage";
import ApplyPage from "page/library/page/ApplyPage";
import BookApplyPage from "page/library/page/BookApplyPage";
import BookDetailPage from "page/library/page/BookDetailPage";
import BookcaseApplyPage from "page/library/page/BookcaseApplyPage";
import HistoryPage from "page/library/page/HistoryPage";
import LibraryPage from "page/library/page/LibraryPage";
import MyFavoritePage from "page/library/page/MyFavoritePage";
import MyLibraryPage from "page/library/page/MyLibraryPage";
import MyRentalBookDetailPage from "page/library/page/MyRentalBookDetailPage";
import RentalBookDetailPage from "page/library/page/RentalBookDetailPage";
import LocationPage from "page/location/page/LocationPage";
import LocationSettingPage from "page/location/page/LocationSettingPage";
import RangeSettingPage from "page/location/page/RangeSettingPage";
import AuthCallBack from "page/login/page/AuthCallbackPage";
import LoginPage from "page/login/page/LoginPage";
import SurveyPage from "page/login/page/SurveyPage";
import MainPage from "page/main/page/MainPage";
import GradePage from "page/profile/page/GradePage";
import LeafChargePage from "page/profile/page/LeafChargePage";
import LeafPage from "page/profile/page/LeafPage";
import OtherProfilePage from "page/profile/page/OtherProfilePage";
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
      <Route path="/location/range" element={<RangeSettingPage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/library/my-favorite" element={<MyFavoritePage />} />
      <Route path="/library/my-library" element={<MyLibraryPage />} />
      <Route path="/library/my-history" element={<HistoryPage />} />
      <Route path="/chat" element={<ChattingPage />} />
      <Route path="/chat/:room_id" element={<ChattingRoomPage />} />
      <Route path="/chat/review" element={<ReviewPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/:nickname" element={<OtherProfilePage />} />
      <Route path="/profile/my-grade" element={<GradePage />} />
      <Route path="/profile/my-leaf" element={<LeafPage />} />
      <Route path="/profile/my-leaf/charge" element={<LeafChargePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/search/result" element={<SearchResultPage />} />
      <Route path="/alarm" element={<AlarmPage />} />
      <Route path="/sign-in" element={<LoginPage />} />
      <Route path="/auth/callback" element={<AuthCallBack />} />
      <Route path="/kapay" element={<KaPayPage />} />
      <Route path="/kapay/approve" element={<KaPayApprovePage />} />
      <Route path="/kapay/cancel" element={<KaPayCancelPage />} />
      <Route path="/kapay/fail" element={<KaPayFailPage />} />
      <Route path="/bookdetail" element={<BookDetailPage />} />
      <Route path="/bookdetail/rental" element={<RentalBookDetailPage />} />
      <Route path="/bookdetail/mybook" element={<MyRentalBookDetailPage />} />
      <Route path="/apply" element={<ApplyPage />} />
      <Route path="/apply/book" element={<BookApplyPage />} />
      <Route path="/apply/bookcase" element={<BookcaseApplyPage />} />
      <Route path="/ai-check" element={<AICheckPage />} />
      <Route path="/ai-check/result" element={<AICheckResultPage />} />
      <Route path="/survey" element={<SurveyPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
};

export default MainRoute;
