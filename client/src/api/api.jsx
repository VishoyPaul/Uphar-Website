import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_USER_KEY = 'auth_user';

const getStorage = (rememberMe = true) => (rememberMe ? localStorage : sessionStorage);

export const signupUser = async (payload) => {
  const { data } = await api.post('/auth/signup', payload);
  return data;
};

export const loginUser = async (payload) => {
  const { data } = await api.post('/auth/login', payload);
  return data;
};

export const googleLoginUser = async (payload) => {
  const { data } = await api.post('/auth/google-login', payload);
  return data;
};

export const persistAuth = (authData, rememberMe = true) => {
  const storage = getStorage(rememberMe);
  const otherStorage = rememberMe ? sessionStorage : localStorage;

  otherStorage.removeItem(AUTH_TOKEN_KEY);
  otherStorage.removeItem(AUTH_USER_KEY);

  storage.setItem(AUTH_TOKEN_KEY, authData.token);
  storage.setItem(AUTH_USER_KEY, JSON.stringify(authData.user));
};

export const clearAuth = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  sessionStorage.removeItem(AUTH_TOKEN_KEY);
  sessionStorage.removeItem(AUTH_USER_KEY);
};

export const getAuthToken = () =>
  localStorage.getItem(AUTH_TOKEN_KEY) || sessionStorage.getItem(AUTH_TOKEN_KEY);

export const getAuthUser = () => {
  const raw =
    localStorage.getItem(AUTH_USER_KEY) || sessionStorage.getItem(AUTH_USER_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const getHearingAids = async () => {
  const { data } = await api.get('/hearingaids');
  return data;
};

export const createHearingAid = async (payload) => {
  const { data } = await api.post('/hearingaids', payload);
  return data;
};

export const deleteHearingAid = async (id) => {
  const { data } = await api.delete(`/hearingaids/${id}`);
  return data;
};

export const updateHearingAid = async (id, payload) => {
  const { data } = await api.put(`/hearingaids/${id}`, payload);
  return data;
};

export const createAppointment = async (payload) => {
  const { data } = await api.post('/appointments', payload);
  return data;
};

export const getAppointments = async () => {
  const { data } = await api.get('/appointments');
  return data;
};
