import React from 'react';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX } from 'react-icons/fi';

const ALERT_META = {
  success: {
    icon: FiCheckCircle,
    className: 'uphar-alert-success',
  },
  error: {
    icon: FiAlertCircle,
    className: 'uphar-alert-error',
  },
  info: {
    icon: FiInfo,
    className: 'uphar-alert-info',
  },
  warning: {
    icon: FiAlertCircle,
    className: 'uphar-alert-warning',
  },
};

const AlertContainer = ({ alerts, onDismiss }) => {
  return (
    <div className="uphar-alert-wrapper" aria-live="polite" aria-atomic="true">
      {alerts.map((alert) => {
        const meta = ALERT_META[alert.type] || ALERT_META.info;
        const Icon = meta.icon;

        return (
          <div key={alert.id} className={`uphar-alert-item ${meta.className}`}>
            <div className="uphar-alert-icon">
              <Icon />
            </div>
            <div className="uphar-alert-content">
              {alert.title ? <p className="uphar-alert-title">{alert.title}</p> : null}
              {alert.message ? <p className="uphar-alert-message">{alert.message}</p> : null}
            </div>
            <button
              type="button"
              onClick={() => onDismiss(alert.id)}
              className="uphar-alert-close"
              aria-label="Dismiss alert"
            >
              <FiX />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default AlertContainer;
