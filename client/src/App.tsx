// src/App.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { getValid } from "api/validApi";
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import MainRoute from "components/routes/MainRoute";
import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useIsValidStore, useValidStore } from "store/useValidStore";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  // const checkPath = currentPath.split("/")[0];
  const queryClient = new QueryClient();

  const popupPaths = ["/kapay/approve", "/kapay/cancel", "/kapay/fail"];
  const showHeaderPaths = ["/"];
  const hideFooterPaths = [
    "/sign-in",
    "/bookdetail/rental",
    "/bookdetail/mybook",
  ];

  const { isValid } = useIsValidStore.getState();
  const { setIsLogin, setIsSurvey, setIsLocation } = useValidStore.getState();
  // const setIsLogin = useValidStore.getState().setIsLogin;
  // const setIsSurvey = useValidStore.getState().setIsSurvey;
  // const setIsLocation = useValidStore.getState().setIsLocation;

  // const checkValidation = async () => {
  //   try {
  //     if (currentPath === "/survey" || currentPath === "/sign-in") {
  //       return;
  //     }

  //     if (isValid) {
  //       return;
  //     }

  //     const data = await getValid();
  //     setIsLogin(data.isLogin);
  //     setIsSurvey(data.isSurvey);
  //     setIsLocation(data.isLocation);

  //     if (!data.isLogin) {
  //       navigate("/sign-in");
  //       return;
  //     } else if (!data.isSurvey) {
  //       navigate("/survey");
  //       return;
  //     } else if (!data.isLocation) {
  //       // 위치 설정 페이지로 이동
  //       return;
  //     } else if (data.isLogin && data.isSurvey && data.isLocation) {
  //       if (currentPath === "/sign-in" || currentPath === "/survey") {
  //         navigate("/");
  //         return;
  //       }
  //     }
  //   } catch (error) {
  //     console.error("유효성 검사 실패", error);
  //     navigate("/sign-in");
  //   }
  // };

  // useEffect(() => {
  //   checkValidation();
  // }, []);

  const isPopup = window.opener !== null && !window.opener.closed;
  const shouldHideHeaderFooter = popupPaths.includes(currentPath) && isPopup;
  return (
    <QueryClientProvider client={queryClient}>
      <div className="pb-[86px] relative">
        {!shouldHideHeaderFooter && showHeaderPaths.includes(currentPath) && (
          <Header />
        )}
        <Routes>
          <Route path="/*" element={<MainRoute />} />
        </Routes>
        {!shouldHideHeaderFooter && !hideFooterPaths.includes(currentPath) && (
          <Footer />
        )}
      </div>
    </QueryClientProvider>
  );
}

export default App;
