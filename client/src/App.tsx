import ChattingPage from "components/ChattingPage";
import HomePage from "components/HomePage";
import LibraryPage from "components/LibraryPage";
import LocationPage from "components/LocationPage";
import ProfilePage from "components/ProfilePage";
import Footer from "components/common/Footer";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import KaPayReadyPage from "page/kapay/page/KaPayReadyPage";
import KaPayApprovePage from "page/kapay/page/KaPayApprovePage";
import KaPayCancelPage from "page/kapay/page/KaPayCancelPage";
import KaPayFailPage from "page/kapay/page/KaPayFailPage";

function App() {
  // sentry test
  // function methodDoesNotExist(): void {
  //   throw new Error("Function not implemented.");
  // }

  return (
    <div className="App relative">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/chat" element={<ChattingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* 카카오 페이 전용 페이지 */}
        <Route
          path="/kapay/ready"
          element={<KaPayReadyPage redirectUrl={`${window.location.origin}/kapay/ready`} />}
        />
        <Route path="/kapay/approve" element={<KaPayApprovePage />} />
        <Route path="/kapay/cancel" element={<KaPayCancelPage />} />
        <Route path="/kapay/fail" element={<KaPayFailPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
