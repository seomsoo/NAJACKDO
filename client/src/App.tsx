// src/App.tsx
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import MainRoute from "components/routes/MainRoute";
import { Route, Routes, useLocation } from "react-router-dom";
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
        // Handle the notification or update your UI
      });
    } catch (error) {
      console.error('Error setting up notifications:', error);
    }
  };
//////
  const location = useLocation();
  const currentPath = location.pathname;

  const popupPaths = ["/kapay/approve", "/kapay/cancel", "/kapay/fail"];
  const showHeaderPaths = ["/"];
  const hideFooterPaths = ["/signin", "/bookdetail/rental", "/bookdetail/mybook"];

  const isPopup = window.opener !== null && !window.opener.closed;
  const shouldHideHeaderFooter = popupPaths.includes(currentPath) && isPopup;
  return (
    <div className="pb-[86px] relative">
      {!shouldHideHeaderFooter && showHeaderPaths.includes(currentPath) && <Header />}
      <Routes>
        <Route path="/*" element={<MainRoute />} />
      </Routes>
      {!shouldHideHeaderFooter && !hideFooterPaths.includes(currentPath) && <Footer />}
    </div>
  );
}

export default App;
