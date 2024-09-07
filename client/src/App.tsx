// src/App.tsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "components/HomePage";
import LibraryPage from "components/LibraryPage";
import LocationPage from "components/LocationPage";
import ProfilePage from "components/ProfilePage";
import Footer from "components/common/Footer";
import KapayPage from "page/kapay/page/KaPayPage";
import KaPayCancelPopUpPage from "page/kapay/page/KaPayCancelPage";
import KaPayFailPage from "page/kapay/page/KaPayFailPage";
import KaPayApprovePage from "page/kapay/page/KaPayApprovePage";

import "./App.css";

function App() {
  return (
    <div className="App relative">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/kapay" element={<KapayPage />} />
        <Route path="/kapay-cancel" element={<KaPayCancelPopUpPage />} />
        <Route path="/kapay-fail" element={<KaPayFailPage />} />
        <Route path="/kapay-approve" element={<KaPayApprovePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
