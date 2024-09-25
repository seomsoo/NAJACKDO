import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "store/useAuthStore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import instance from "api/clientApi";

const setupNotifications = async () => {
  const messaging = getMessaging();
  try {
    // Request permission for notifications
    const permission = await Notification.requestPermission();
    const BASE_URL = process.env.REACT_APP_BACKEND_PROD_HOST;

    if (permission === 'granted') {
      console.log('Notification permission granted.');
      // Get the FCM token
      const token = await getToken(messaging, {vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY})
      console.log('FCM Token:', token);
      instance.post("/user/pushToken", {
        token: token
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
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

const useAuthCallback = () => {
  const [searchParam] = useSearchParams();
  const setAccessToken = useAuthStore.getState().setAccessToken;
  const navigate = useNavigate();

  const initialize = async () => {
    const accessToken = searchParam.get("accessToken");
    if (accessToken) {
      setAccessToken(accessToken);
      navigate("/survey");
    }
  };
  setupNotifications();
  useEffect(() => {
    initialize();
  }, []);
};



const AuthCallBack = () => {
  useAuthCallback();
  
  return <div></div>;
};

export default AuthCallBack;
