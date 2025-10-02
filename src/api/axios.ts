import axios from 'axios';
import type { AxiosInstance,AxiosRequestConfig } from 'axios';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
instance.interceptors.request.use(
  (config) => {
    const userInfoString = localStorage.getItem('userInfo');
    if (userInfoString) {
      try {
        const userInfo = JSON.parse(userInfoString);
        const token = userInfo.accessToken;
        if (
          token &&
          config.url &&
          !config.url.includes('/api/user/login') &&
          !config.url.includes('/api/user/register')
        ) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (e) {
        console.warn('無法解析 userInfo', e);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// === refreshToken 機制 ===
let isRefreshing = false;
let refreshSubscribers: Function[] = [];

function onRefreshed(newToken: string) {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
}

function addRefreshSubscriber(callback: Function) {
  refreshSubscribers.push(callback);
}

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    // ➤ 如果是 401 且還沒 retry 過
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const userInfoString = localStorage.getItem('userInfo');
      if (!userInfoString) {
        window.location.href = '/login?redirect=' + encodeURIComponent(location.pathname);
        return Promise.reject(error);
      }

      const userInfo = JSON.parse(userInfoString);

      // ➤ 如果已經正在刷新，就等待
      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((newToken: string) => {
            originalRequest.headers = originalRequest.headers ?? {};
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(instance(originalRequest));
          });
        });
      }

      // ➤ 否則主動觸發刷新
      isRefreshing = true;
      try {
        const response = await instance.post("/api/user/refresh");
        if (response.data.code === '000') {
          const newAccessToken = response.data.data.accessToken;

          // ➤ 更新 localStorage
          userInfo.accessToken = newAccessToken;
          localStorage.setItem("userInfo", JSON.stringify(userInfo));

          // ➤ 通知等待中的請求
          onRefreshed(newAccessToken);

          // ➤ 重新嘗試原始請求
          originalRequest.headers = originalRequest.headers ?? {};
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        }
      } catch (err) {
        console.error('Token refresh failed:', err);
        localStorage.removeItem('userInfo');
        localStorage.setItem("toastMessage", "登入已過期，請重新登入");
        window.location.href = '/login?redirect=' + encodeURIComponent(location.pathname);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
export default instance;