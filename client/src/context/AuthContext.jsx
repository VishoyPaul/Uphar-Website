import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { authApi, registerAuthHandlers, setAccessToken as setAxiosAccessToken } from '../api/axiosInstance';
import AuthContext from './authContextValue';

const getDefaultState = () => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: true,
});

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(getDefaultState);

  const applySession = useCallback(({ accessToken, user }) => {
    setAxiosAccessToken(accessToken || null);
    setAuthState({
      user: user || null,
      accessToken: accessToken || null,
      isAuthenticated: Boolean(accessToken && user),
      isLoading: false,
    });
  }, []);

  const clearSession = useCallback(() => {
    setAxiosAccessToken(null);
    setAuthState({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  const refreshSession = useCallback(async () => {
    try {
      const { data } = await authApi.post('/auth/refresh-token');
      applySession({ accessToken: data?.accessToken, user: data?.user });
      return data;
    } catch {
      clearSession();
      return null;
    }
  }, [applySession, clearSession]);

  const login = useCallback(
    async ({ email, password }) => {
      const { data } = await authApi.post('/auth/login', { email, password });
      applySession({ accessToken: data?.accessToken, user: data?.user });
      return data;
    },
    [applySession]
  );

  const adminLogin = useCallback(
    async ({ username, password }) => {
      const { data } = await authApi.post('/auth/login', { username, password });
      applySession({ accessToken: data?.accessToken, user: data?.user });
      return data;
    },
    [applySession]
  );

  const signup = useCallback(
    async ({ firstName, lastName, mobile, email, password }) => {
      const { data } = await authApi.post('/auth/signup', {
        firstName,
        lastName,
        mobile,
        email,
        password,
      });
      applySession({ accessToken: data?.accessToken, user: data?.user });
      return data;
    },
    [applySession]
  );

  const googleLogin = useCallback(
    async ({ credential }) => {
      const { data } = await authApi.post('/auth/google-login', { credential });
      applySession({ accessToken: data?.accessToken, user: data?.user });
      return data;
    },
    [applySession]
  );

  const logout = useCallback(async () => {
    try {
      await authApi.post('/auth/logout');
    } catch {
      // Ignore logout API failures and still clear client auth state.
    } finally {
      clearSession();
    }
  }, [clearSession]);

  useEffect(() => {
    registerAuthHandlers({
      onRefreshSuccess: ({ accessToken, user }) => {
        setAxiosAccessToken(accessToken || null);
        setAuthState((prev) => ({
          ...prev,
          user: user || prev.user,
          accessToken: accessToken || null,
          isAuthenticated: Boolean(accessToken),
          isLoading: false,
        }));
      },
      onAuthFailure: async () => {
        clearSession();
      },
    });

    refreshSession();

    return () => {
      registerAuthHandlers({ onRefreshSuccess: null, onAuthFailure: null });
    };
  }, [clearSession, refreshSession]);

  const value = useMemo(
    () => ({
      ...authState,
      login,
      adminLogin,
      signup,
      googleLogin,
      logout,
      refreshSession,
    }),
    [authState, login, adminLogin, signup, googleLogin, logout, refreshSession]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
