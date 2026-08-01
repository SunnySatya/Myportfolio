/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, useCallback } from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";
import "./Toast.css";

let toastIdCounter = 0;
let addToastFn = null;

export const showToast = (message, type = "info", duration = 4000) => {
  if (addToastFn) {
    addToastFn({ id: ++toastIdCounter, message, type, duration });
  }
};

const Toast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    setToasts((prev) => [...prev, toast]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    addToastFn = addToast;
    return () => {
      addToastFn = null;
    };
  }, [addToast]);

  useEffect(() => {
    if (toasts.length === 0) return;
    const timers = toasts.map((toast) =>
      setTimeout(() => removeToast(toast.id), toast.duration),
    );
    return () => timers.forEach(clearTimeout);
  }, [toasts, removeToast]);

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <FaCheckCircle />;
      case "error":
        return <FaExclamationCircle />;
      case "info":
      default:
        return <FaInfoCircle />;
    }
  };

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <span className="toast-icon">{getIcon(toast.type)}</span>
          <p className="toast-message">{toast.message}</p>
          <button
            className="toast-close"
            onClick={() => removeToast(toast.id)}
            aria-label="Close notification"
          >
            <FaTimes />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
