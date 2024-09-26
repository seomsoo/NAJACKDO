// src/App.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IValid } from "atoms/Valid.type";
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import MainRoute from "components/routes/MainRoute";
import { useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "store/useAuthStore";
import { useValidStore } from "store/useValidStore";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";


function App() {

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Firebase Cloud Messaging and get a reference to the service
  const messaging = getMessaging(app);

  console.log(messaging);

  const setupNotifications = async () => {
    try {
      // Request permission for notifications
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        // Get the FCM token
        const token = await getToken(messaging, {vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY})
        console.log('FCM Token:', token);
      } else {
        console.log('Notification permission denied.');
      }
      // Handle foreground notifications
      onMessage(messaging, (payload) => {
        console.log('Foreground Message:', payload);
        console.log('app.tsx');
        // Handle the notification or update your UI
      });
      
    } catch (error) {
      console.error('Error setting up notifications:', error);
    }
  };                

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const queryClient = new QueryClient();

  const popupPaths = ["/kapay/approve", "/kapay/cancel", "/kapay/fail"];
  const showHeaderPaths = ["/"];
  const hideFooterPaths = ["/sign-in", "/book/:bookId/rental", "/book/:bookId/mybook"];

  const { accessToken } = useAuthStore.getState();
  const { isSurvey, isLocation, setIsSurvey, setIsLocation } =
    useValidStore.getState();
  // const [loading, setLoading] = useState<boolean>(false);
  const [validData, setValidData] = useState<IValid | null>(null);

  // useEffect(() => {
  //   const checkValidation = async () => {
  //     try {
  //       console.log("accessToken", accessToken);
  //       console.log("isSurvey", isSurvey);
  //       console.log(accessToken && isSurvey);
  //       // 로그인 안되어있을 때
  //       if (!accessToken) {
  //         navigate("/sign-in");
  //         return;
  //       }

  //       if (accessToken && isSurvey) {
  //         if (currentPath === "/sign-in" || currentPath === "/survey") {
  //           navigate("/");
  //           return;
  //         }
  //       }

  //       // setLoading(true);

  //       const response = await getValid();
  //       setValidData(response);

  //       if (!response.survey) {
  //         // setLoading(false);
  //         navigate("/survey");
  //         return;
  //       }

  //       // if (!response.isLocation) {
  //       //   // 위치 설정 페이지로 이동
  //       //   return;
  //       // }

  //       if (accessToken && response.survey) {
  //         setIsSurvey(true);
  //         // setIsLocation(true);
  //         if (currentPath === "/sign-in" || currentPath === "/survey") {
  //           // setLoading(false);
  //           navigate("/");
  //           return;
  //         }
  //       }
  //       // setLoading(false);
  //     } catch (error) {
  //       console.error("유효성 검사 실패", error);
  //       // setLoading(false);
  //       navigate("/sign-in");
  //     }
  //   };
  //   checkValidation();
  // }, [currentPath, navigate, accessToken, isSurvey, setIsSurvey]);

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
