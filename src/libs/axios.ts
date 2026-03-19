import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "#/store/authStore";

// flag untuk mencegah multiple refresh token request saat banyak request gagal barengan
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/v1",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Otomatis tempelkan token jika ada
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.url?.includes("/auth/session/refresh")) return config;

    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// --- RESPONSE INTERCEPTOR ---
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (originalRequest?.url?.includes("/auth/session/refresh")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axiosInstance.post(
          "/auth/session/refresh",
          {},
          { withCredentials: true },
        );

        const newAccessToken = data.data.token;

        // ✅ simpan ke store
        useAuthStore.getState().setAccessToken(newAccessToken);

        // ✅ resolve semua queue
        processQueue(null, newAccessToken);

        // ✅ pastikan header ke-overwrite
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (error: any) {
        processQueue(error, null);

        // ❌ clear auth kalau refresh gagal
        useAuthStore.getState().setAccessToken(null);

        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
