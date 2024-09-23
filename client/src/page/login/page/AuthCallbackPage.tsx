import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "store/useAuthStore";

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

  useEffect(() => {
    initialize();
  }, []);
};

const AuthCallBack = () => {
  useAuthCallback();
  return <div></div>;
};

export default AuthCallBack;
