// src/App.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getValid } from "api/validApi";
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import NotFoundPage from "components/common/NotFoundPage";
import ScrollToTopButton from "components/common/ScrollToTopButton";
import LibraryRoute from "components/routes/LibraryRoute";
import MainRoute from "components/routes/MainRoute";
import ProfileRoute from "components/routes/ProfileRoute";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useEffect } from "react";
import {
  Route,
  Routes,
  useLocation,
  useMatch,
  useNavigate,
} from "react-router-dom";
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
      } else {
      }
      // Handle foreground notifications
      onMessage(messaging, (payload) => {
        // Handle the notification or update your UI
      });
    } catch (error) {}
  };

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const queryClient = new QueryClient();

  const popupPaths = ["/kapay/approve", "/kapay/cancel", "/kapay/fail"];
  const hideHeaderPaths = [
    "/sign-in",
    "/survey",
    "/setting/location",
    "/edit/location",
    "/library",
  ];
  const isDetailPage = useMatch("/book/:bookId");
  const isRentalPage = useMatch("/book/:bookId/rental");
  const isChattingRoomPage = useMatch("/chat/:roomId");

  const hideFooterPaths = [
    "/sign-in",
    "/survey",
    "/setting/location",
    "/404",
    "",
  ];

  const isPopup = window.opener !== null && !window.opener.closed;
  const shouldHideHeaderFooter = popupPaths.includes(currentPath) && isPopup;
  const hideScrollTopButton = () => {
    return location.pathname.split("/")[1] !== "chat";
  };

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone;

    if (isStandalone) {
      setupNotifications();
    }
  }, []);

  const { accessToken } = useAuthStore.getState();
  const { isSurvey, isLocation, setIsSurvey, setIsLocation } =
    useValidStore.getState();

  const pathCheck = (accessToken, survey, location, setting) => {
    if (accessToken && survey && location) {
      if (setting) {
        setIsSurvey(true);
        setIsLocation(true);
      }

      if (
        currentPath === "/sign-in" ||
        currentPath === "/survey" ||
        currentPath === "/setting/location"
      ) {
        navigate("/");
        return;
      }
    }
  };

  useEffect(() => {
    if (isSurvey && isLocation) {
      return;
    }

    const checkValidation = async () => {
      try {
        // 로그인 안되어있을 때
        if (!accessToken) {
          navigate("/sign-in");
          return;
        }

        pathCheck(accessToken, isSurvey, isLocation, false);

        const response = await getValid();

        if (!response.survey) {
          navigate("/survey");
          return;
        }

        if (!response.location) {
          navigate("/setting/location");
          return;
        }

        pathCheck(accessToken, response.survey, response.location, true);
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
    setIsSurvey,
    isLocation,
    setIsLocation,
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <div
        className={`h-full ${isChattingRoomPage ? "pb-0" : "pb-[86px]"} relative`}
      >
        {!isDetailPage &&
          !isRentalPage &&
          !hideHeaderPaths.includes(currentPath) && <Header />}
        <Routes>
          <Route path="/*" element={<MainRoute />} />
          <Route path="/profile/*" element={<ProfileRoute />} />
          <Route path="/library/*" element={<LibraryRoute />} />
          <Route path="/404" element={<NotFoundPage />} />
        </Routes>
        {!isRentalPage &&
          !shouldHideHeaderFooter &&
          !isChattingRoomPage &&
          !hideFooterPaths.includes(currentPath) && <Footer />}
        {hideScrollTopButton() && <ScrollToTopButton />}
      </div>
    </QueryClientProvider>
  );
}

export default App;
