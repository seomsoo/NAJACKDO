// src/App.tsx
import React from "react";
import { Route, Routes } from "react-router-dom";

import Footer from "components/common/Footer";
import Header from "components/common/Header";
import MainRoute from "components/routes/MainRoute";

import "./App.css";

function App() {
  return (
    <div className="App relative">
      <Header />
      <Routes>
        <Route path="/*" element={<MainRoute />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
