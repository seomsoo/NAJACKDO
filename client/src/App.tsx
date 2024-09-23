// src/App.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getValid } from "api/validApi";
// import { getValid } from "api/validApi";
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import MainRoute from "components/routes/MainRoute";
import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "store/useAuthStore";
import { useIsValidStore, useValidStore } from "store/useValidStore";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const queryClient = new QueryClient();

  const popupPaths = ["/kapay/approve", "/kapay/cancel", "/kapay/fail"];
  const showHeaderPaths = ["/"];
  const hideFooterPaths = [
    "/sign-in",
    "/bookdetail/rental",
    "/bookdetail/mybook",
  ];

  const { isValid } = useIsValidStore.getState();
  const { setIsSurvey, setIsLocation } = useValidStore.getState();

  useEffect(() => {
    const checkValidation = async () => {
      try {
        const { accessToken } = useAuthStore.getState();

        if (currentPath === "/survey" || currentPath === "/sign-in") {
          return;
        }

        if (isValid) {
          return;
        }

        if (!accessToken) {
          navigate("/sign-in");
          return;
        }

        const data = await getValid();
        setIsSurvey(data.survey);
        setIsLocation(data.location);

        if (!data.survey) {
          navigate("/survey");
          return;
        }

        if (!data.location) {
          // 위치 설정 페이지로 이동
          return;
        }

        if (accessToken && data.survey && data.location) {
          if (currentPath === "/sign-in" || currentPath === "/survey") {
            navigate("/");
            return;
          }
        }
      } catch (error) {
        console.error("유효성 검사 실패", error);
        navigate("/sign-in");
      }
    };
    checkValidation();
  }, [currentPath, isValid, navigate, setIsSurvey, setIsLocation]);

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
