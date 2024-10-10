import AlarmPage from "page/alarm/page/AlarmPage";
import AICheckPage from "page/bookapply/page/AICheckPage";
import AICheckResultPage from "page/bookapply/page/AICheckResultPage";
import AICheckUploadPage from "page/bookapply/page/AICheckUploadPage";
import ApplyPage from "page/bookapply/page/ApplyPage";
import BookApplyPage from "page/bookapply/page/BookApplyPage";
import BookcaseApplyPage from "page/bookapply/page/BookcaseApplyPage";
import BookcaseUploadPage from "page/bookapply/page/BookcaseUploadPage";
import ISBNScanPage from "page/bookapply/page/ISBNScanPage";
import CartPage from "page/cart/page/CartPage";
import ChattingPage from "page/chatting/page/ChattingPage";
import ChattingRoomPage from "page/chatting/page/ChattingRoomPage";
import ReviewPage from "page/chatting/page/ReviewPage";
import KaPayApprovePage from "page/kapay/page/KaPayApprovePage";
import KaPayCancelPage from "page/kapay/page/KaPayCancelPage";
import KaPayFailPage from "page/kapay/page/KaPayFailPage";
import KaPayPage from "page/kapay/page/KaPayPage";
import BookDetailPage from "page/library/page/BookDetailPage";
import RentalBookDetailPage from "page/library/page/RentalBookDetailPage";
import LocationEditPage from "page/location/page/LocationEditPage";
import LocationPage from "page/location/page/LocationPage";
import AuthCallBack from "page/login/page/AuthCallbackPage";
import LocationSettingPage from "page/login/page/LocationSettingPage";
import LoginPage from "page/login/page/LoginPage";
import SurveyPage from "page/login/page/SurveyPage";
import MainPage from "page/main/page/MainPage";
import SearchPage from "page/search/page/SearchPage";
import SearchResultPage from "page/search/page/SearchResultPage";

import { Navigate, Route, Routes } from "react-router-dom";
const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/location" element={<LocationPage />} />
      <Route path="/setting/location" element={<LocationSettingPage />} />
      <Route path="/edit/location" element={<LocationEditPage />} />
      <Route path="/chat" element={<ChattingPage />} />
      <Route path="/chat/:roomId" element={<ChattingRoomPage />} />
      <Route path="/chat/review" element={<ReviewPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/search/result" element={<SearchResultPage />} />
      <Route path="/alarm" element={<AlarmPage />} />
      <Route path="/sign-in" element={<LoginPage />} />
      <Route path="/auth/callback" element={<AuthCallBack />} />
      <Route path="/kapay" element={<KaPayPage />} />
      <Route path="/kapay/approve" element={<KaPayApprovePage />} />
      <Route path="/kapay/cancel" element={<KaPayCancelPage />} />
      <Route path="/kapay/fail" element={<KaPayFailPage />} />
      <Route path="/book/:bookId" element={<BookDetailPage />} />
      <Route path="/book/:bookId/rental" element={<RentalBookDetailPage />} />
      <Route path="/apply" element={<ApplyPage />} />
      <Route path="/apply/isbn" element={<ISBNScanPage />} />
      <Route path="/apply/bookcase/upload" element={<BookcaseUploadPage />} />
      <Route path="/apply/book" element={<BookApplyPage />} />
      <Route path="/ai-check" element={<AICheckPage />} />
      <Route path="/ai-check/upload" element={<AICheckUploadPage />} />
      <Route path="/ai-check/result" element={<AICheckResultPage />} />
      <Route path="/survey" element={<SurveyPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default MainRoute;
