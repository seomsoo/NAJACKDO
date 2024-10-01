// src/App.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getValid } from "api/validApi";
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import NotFoundPage from "components/common/NotFoundPage";
import LibraryRoute from "components/routes/LibraryRoute";
import MainRoute from "components/routes/MainRoute";
import ProfileRoute from "components/routes/ProfileRoute";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useMatch, useNavigate } from "react-router-dom";
import { useAuthStore } from "store/useAuthStore";
import { useValidStore } from "store/useValidStore";

function App() {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Firebase Cloud Messaging and get a reference to the service
  const messaging = getMessaging(app);

  const setupNotifications = async () => {
    try {
      // Request permission for notifications
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        // Get the FCM token
        const token = await getToken(messaging, {
          vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
        });
        console.log("FCM Token:", token);
      } else {
        console.log("Notification permission denied.");
      }
      // Handle foreground notifications
      onMessage(messaging, (payload) => {
        console.log("Foreground Message:", payload);
        console.log("app.tsx");
        // Handle the notification or update your UI
      });
    } catch (error) {
      console.error("Error setting up notifications:", error);
    }
  };

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const queryClient = new QueryClient();

  const popupPaths = ["/kapay/approve", "/kapay/cancel", "/kapay/fail"];
  const showHeaderPaths = ["/"];


  const isRentalPage = useMatch("/book/:bookId/rental");
  const isMyBookPage = useMatch("/book/:bookId/mybook");

  const hideFooterPaths = [
    "/sign-in",
    "/survey",
    "/setting/location",
    "/404",
  ];

  const [isRequested, setIsRequested] = useState(false);
  const { accessToken } = useAuthStore.getState();
  const { isSurvey, isLocation, setIsSurvey, setIsLocation } =
    useValidStore.getState();

  useEffect(() => {
    if (isRequested) return;

    const checkValidation = async () => {
      try {
        console.log("accessToken", accessToken);
        // 로그인 안되어있을 때
        if (!accessToken) {
          navigate("/sign-in");
          return;
        }

        if (accessToken && isSurvey && isLocation) {
          if (
            currentPath === "/sign-in" ||
            currentPath === "/survey" ||
            currentPath === "/setting/location"
          ) {
            navigate("/");
            return;
          }
        }

        const response = await getValid();
        setIsRequested(true);

        if (!response.survey) {
          navigate("/survey");
          return;
        }

        if (!response.location) {
          navigate("/setting/location");
          return;
        }

        if (accessToken && response.survey && response.location) {
          setIsSurvey(true);
          setIsLocation(true);
          if (
            currentPath === "/sign-in" ||
            currentPath === "/survey" ||
            currentPath === "/setting/location"
          ) {
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
  }, [
    currentPath,
    navigate,
    accessToken,
    isSurvey,
    isRequested,
    setIsSurvey,
    isLocation,
    setIsLocation,
  ]);

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
          <Route path="/profile/*" element={<ProfileRoute />} />
          <Route path="/library/*" element={<LibraryRoute />} />
          <Route path="/404" element={<NotFoundPage />} />
        </Routes>
        {!isRentalPage && !isMyBookPage && !shouldHideHeaderFooter && !hideFooterPaths.includes(currentPath)  && (
          <Footer />
        )}
      </div>
    </QueryClientProvider>
  );
}

export default App;
