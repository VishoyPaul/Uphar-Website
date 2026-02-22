import React, { useCallback, useMemo, useState } from 'react';
import AlertContainer from '../components/alerts/AlertContainer';
import AlertContext from './alertContextValue';

const DEFAULT_DURATION = 3200;

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const dismissAlert = useCallback((id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  const showAlert = useCallback(
    ({ type = 'info', title = '', message = '', duration = DEFAULT_DURATION }) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      const alertItem = { id, type, title, message };

      setAlerts((prev) => [...prev, alertItem]);

      window.setTimeout(() => {
        dismissAlert(id);
      }, Math.max(1200, Number(duration) || DEFAULT_DURATION));
    },
    [dismissAlert]
  );

  const value = useMemo(
    () => ({
      showAlert,
      dismissAlert,
    }),
    [showAlert, dismissAlert]
  );

  return (
    <AlertContext.Provider value={value}>
      {children}
      <AlertContainer alerts={alerts} onDismiss={dismissAlert} />
    </AlertContext.Provider>
  );
};
