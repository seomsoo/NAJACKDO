// src/App.tsx
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import MainRoute from "components/routes/MainRoute";

import "./App.css";

function App() {
  const location = useLocation();
  const currentPath = location.pathname;

  const popupPaths = ["/kapay/approve", "/kapay/cancel", "/kapay/fail"];
  const isPopup = window.opener !== null && !window.opener.closed;
  const shouldHideHeaderFooter = popupPaths.includes(currentPath) && isPopup;

  return (
    <div className="App relative">
      {!shouldHideHeaderFooter && <Header />}
      <Routes>
        <Route path="/*" element={<MainRoute />} />
      </Routes>
      {!shouldHideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
