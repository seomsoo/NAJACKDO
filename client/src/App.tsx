// src/App.tsx
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import MainRoute from "components/routes/MainRoute";
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const currentPath = location.pathname;

  const popupPaths = ["/kapay/approve", "/kapay/cancel", "/kapay/fail"];
  const hideHeaderPaths = ["/login"];
  const isPopup = window.opener !== null && !window.opener.closed;
  const shouldHideHeaderFooter =
    (popupPaths.includes(currentPath) && isPopup) ||
    hideHeaderPaths.includes(currentPath);

  return (
    <div className="pb-[86px] relative">
      {!shouldHideHeaderFooter && <Header />}
      <Routes>
        <Route path="/*" element={<MainRoute />} />
      </Routes>
      {!shouldHideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
