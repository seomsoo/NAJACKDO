import axios from "axios";
import { useAuthStore } from "store/useAuthStore";

const BASE_URL = process.env.REACT_APP_BACKEND_PROD_HOST;

export const host =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://www.najackdo.kro.kr";

export const KAKAO_AUTH_URL = `${BASE_URL}/oauth2/authorization/kakao?redirect_uri=${host}`;
const REFRESH_URI = `${BASE_URL}/api/v1/auth/refresh`;

export const pythoninstance = axios.create({
  baseURL: "https://www.najackdo.kro.kr/python",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const instance = axios.create({
  baseURL: BASE_URL + "/api/v1",
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
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // refreshToken이 쿠키에 저장되어 있으므로 쿠키를 통해 서버로 전송
        const refreshResponse = await axios.post(
          `${REFRESH_URI}`,
          {},
          {
            withCredentials: true, // 쿠키를 함께 전송
          }
        );

        const { accessToken: newAccessToken } = refreshResponse.data;

        // 새로운 accessToken 저장
        useAuthStore.getState().setAccessToken(newAccessToken);

        // 실패했던 요청을 다시 보내기
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return instance(originalRequest);
      } catch (refreshError) {
        // refreshToken도 만료된 경우 로그아웃 처리
        useAuthStore.persist.clearStorage(); // sessionStorage 초기화
        window.location.href = "/sign-in";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
