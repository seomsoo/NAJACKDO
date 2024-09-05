import ChattingPage from "components/ChattingPage";
import HomePage from "components/HomePage";
import LibraryPage from "components/LibraryPage";
import LocationPage from "components/LocationPage";
import ProfilePage from "components/ProfilePage";
import Footer from "components/common/Footer";
import { Route, Routes } from "react-router-dom";
import "./App.css";

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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
