// src/App.tsx
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import MainRoute from "components/routes/MainRoute";
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const currentPath = location.pathname;

  const popupPaths = ["/kapay/approve", "/kapay/cancel", "/kapay/fail"];
  const showHeaderPaths = ["/"];
  const hideFooterPaths = ["/login", "/bookdetail/rental", "/bookdetail/mybook"];

  const isPopup = window.opener !== null && !window.opener.closed;
  const shouldHideHeaderFooter = popupPaths.includes(currentPath) && isPopup;
  return (
    <div className="pb-[86px] relative">
      {!shouldHideHeaderFooter && showHeaderPaths.includes(currentPath) && <Header />}
      <Routes>
        .
        <Route path="/*" element={<MainRoute />} />
      </Routes>
      {!shouldHideHeaderFooter && !hideFooterPaths.includes(currentPath) && <Footer />}
    </div>
  );
}

export default App;
