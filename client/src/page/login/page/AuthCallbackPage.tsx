import instance from "api/clientApi";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "store/useAuthStore";

const setupNotifications = async () => {
  const messaging = getMessaging();
  try {
    // Request permission for notifications
    const permission = await Notification.requestPermission();
    const BASE_URL = process.env.REACT_APP_BACKEND_PROD_HOST;

    if (permission === "granted") {
      // Get the FCM token
      const token = await getToken(messaging, {
        vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
      });
      instance
        .post("/user/pushToken", {
          token: token,
        })
        .then(function (response) {})
        .catch(function (error) {});
    } else {
    }
    // Handle foreground notifications
    onMessage(messaging, (payload) => {
      // Handle the notification or update your UI
    });
  } catch (error) {}
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
