import Footer from "components/common/Footer";
import Header from "components/common/Header";
import MainRoute from "components/routes/MainRoute";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  // sentry test
  // function methodDoesNotExist(): void {
  //   throw new Error("Function not implemented.");
  // }

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
