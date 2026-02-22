import api, { authApi } from './axiosInstance';

export const signupUser = async (payload) => {
  const { data } = await authApi.post('/auth/signup', payload);
  return data;
};

export const loginUser = async (payload) => {
  const { data } = await authApi.post('/auth/login', payload);
  return data;
};

export const googleLoginUser = async (payload) => {
  const { data } = await authApi.post('/auth/google-login', payload);
  return data;
};

export const logoutUser = async () => {
  const { data } = await authApi.post('/auth/logout');
  return data;
};

export const refreshAccessToken = async () => {
  const { data } = await authApi.post('/auth/refresh-token');
  return data;
};

export const connectformsubmit = async (payload) => {
  const { data } = await api.post('/connectformsubmit', payload);
  return data;
};

export const getHearingAids = async () => {
  const { data } = await api.get('/hearingaids');
  return data;
};

export const getHearingAidById = async (id) => {
  const { data } = await api.get(`/hearingaids/${id}`);
  return data;
};

export const createHearingAid = async (payload) => {
  const formData = new FormData();
  formData.append('brand', payload.brand);
  formData.append('model', payload.model);
  formData.append('color', payload.color);
  formData.append('price', payload.price);
  formData.append('stock', payload.stock);
  formData.append('description', payload.description || '');

  if (payload.image) {
    formData.append('image', payload.image);
  }

  const { data } = await api.post('/hearingaids', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const { data } = await api.post('/imgupload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

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

export const updateAppointment = async (id, payload) => {
  const { data } = await api.put(`/appointments/${id}`, payload);
  return data;
};

export const getMyAppointments = async (email, phone) => {
  const { data } = await api.get('/appointments/my', {
    params: { email, phone },
  });
  return data;
};
