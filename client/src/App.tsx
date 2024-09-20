// src/App.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import MainRoute from "components/routes/MainRoute";
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  const queryClient = new QueryClient();

  const popupPaths = ["/kapay/approve", "/kapay/cancel", "/kapay/fail"];
  const showHeaderPaths = ["/"];
  const hideFooterPaths = ["/sign-in", "/bookdetail/rental", "/bookdetail/mybook"];

  const isPopup = window.opener !== null && !window.opener.closed;
  const shouldHideHeaderFooter = popupPaths.includes(currentPath) && isPopup;
  return (
    <QueryClientProvider client={queryClient}>
      <div className="pb-[86px] relative">
      {!shouldHideHeaderFooter && showHeaderPaths.includes(currentPath) && <Header />}
      <Routes>
        <Route path="/*" element={<MainRoute />} />
      </Routes>
      {!shouldHideHeaderFooter && !hideFooterPaths.includes(currentPath) && <Footer />}
    </div>
    </QueryClientProvider>
    
  );
}

export default App;
