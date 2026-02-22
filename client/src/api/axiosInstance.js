import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const authApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let accessToken = null;
// Shared promise prevents duplicate refresh calls when multiple requests fail with 401 together.
let refreshPromise = null;
let onRefreshSuccessHandler = null;
let onAuthFailureHandler = null;

export const getAccessToken = () => accessToken;

export const setAccessToken = (token) => {
  accessToken = token || null;
};

export const registerAuthHandlers = ({ onRefreshSuccess, onAuthFailure }) => {
  onRefreshSuccessHandler = onRefreshSuccess || null;
  onAuthFailureHandler = onAuthFailure || null;
};

const shouldSkipRefresh = (url = '') => {
  return (
    url.includes('/auth/login') ||
    url.includes('/auth/signup') ||
    url.includes('/auth/google-login') ||
    url.includes('/auth/refresh-token') ||
    url.includes('/auth/logout')
  );
};

const runRefreshFlow = async () => {
  if (!refreshPromise) {
    refreshPromise = authApi
      .post('/auth/refresh-token')
      .then((response) => {
        const nextToken = response?.data?.accessToken || null;
        setAccessToken(nextToken);

        if (nextToken && onRefreshSuccessHandler) {
          onRefreshSuccessHandler({
            accessToken: nextToken,
            user: response?.data?.user || null,
          });
        }

        return nextToken;
      })
      .catch(async (error) => {
        setAccessToken(null);
        if (onAuthFailureHandler) {
          await onAuthFailureHandler();
        }
        throw error;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;
    const status = error?.response?.status;

    if (!originalRequest || originalRequest._retry || status !== 401 || shouldSkipRefresh(originalRequest.url)) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const nextToken = await runRefreshFlow();
      if (!nextToken) {
        return Promise.reject(error);
      }

      originalRequest.headers.Authorization = `Bearer ${nextToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }
);

export default api;
