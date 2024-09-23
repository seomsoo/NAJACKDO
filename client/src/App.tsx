// src/App.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getValid } from "api/validApi";
import { IValid } from "atoms/Valid.type";
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import MainRoute from "components/routes/MainRoute";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "store/useAuthStore";
import { useValidStore } from "store/useValidStore";

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

  const { accessToken } = useAuthStore.getState();
  const { isSurvey, isLocation, setIsSurvey, setIsLocation } =
    useValidStore.getState();
  // const [loading, setLoading] = useState<boolean>(false);
  const [validData, setValidData] = useState<IValid | null>(null);

  useEffect(() => {
    const checkValidation = async () => {
      try {
        console.log("accessToken", accessToken);
        console.log("isSurvey", isSurvey);
        console.log(accessToken && isSurvey);
        // 로그인 안되어있을 때
        if (!accessToken) {
          navigate("/sign-in");
          return;
        }

        if (accessToken && isSurvey) {
          if (currentPath === "/sign-in" || currentPath === "/survey") {
            navigate("/");
            return;
          }
        }

        // setLoading(true);

        const response = await getValid();
        setValidData(response);

        if (!response.survey) {
          // setLoading(false);
          navigate("/survey");
          return;
        }

        // if (!response.isLocation) {
        //   // 위치 설정 페이지로 이동
        //   return;
        // }

        if (accessToken && response.survey) {
          setIsSurvey(true);
          // setIsLocation(true);
          if (currentPath === "/sign-in" || currentPath === "/survey") {
            // setLoading(false);
            navigate("/");
            return;
          }
        }
        // setLoading(false);
      } catch (error) {
        console.error("유효성 검사 실패", error);
        // setLoading(false);
        navigate("/sign-in");
      }
    };
    checkValidation();
  }, [currentPath, navigate, accessToken, isSurvey, setIsSurvey]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

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
