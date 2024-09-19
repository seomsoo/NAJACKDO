import axios from "axios";
import { useAuthStore } from "store/useAuthStore";

const BASE_URL = process.env.REACT_APP_BACKEND_PROD_HOST;

console.log("BASE_URL", BASE_URL);

export const host =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://www.najackdo.kro.kr";

console.log("NODE_ENV", process.env.NODE_ENV);
console.log("host", host);

export const KAKAO_AUTH_URL = `${BASE_URL}/oauth2/authorization/kakao?redirect_uri=${host}`;
const REFRESH_URI = `${BASE_URL}/api/v1/auth/refresh`;

console.log("KAKAO_AUTH_URL", KAKAO_AUTH_URL);

const instance = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// 요청 전에 accessToken을 헤더에 포함시키는 인터셉터
instance.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답에서 401 오류가 발생하면 refreshToken을 사용해 토큰 재발급
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러가 발생하면 토큰 갱신 시도
    if (error.response.statue === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { refreshToken } = useAuthStore.getState();

        // refreshToken이 null인 경우 새로운 에러 반환
        if (!refreshToken) {
          throw new Error("Refresh token is null");
        }

        // refreshToken으로 새로운 accessToken 요청
        const refreshResponse = await axios.post(`${REFRESH_URI}`, {
          token: refreshToken,
        });

        const { accessToken: newAccessToken } = refreshResponse.data;

        // 새로운 accessToken 저장
        useAuthStore.getState().setAccessToken(newAccessToken);
        useAuthStore.getState().setRefreshToken(refreshToken);

        // 실패했던 요청을 다시 보내기
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return instance(originalRequest);
      } catch (refreshError) {
        // refreshToken도 만료된 경우 로그아웃 처리
        useAuthStore.getState().clearTokens();
        window.location.href = "/signin";
        alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
