import { useCallback, useMemo, useState } from "react";
import { NotificationContext } from "./notificationStore";

let notificationId = 0;

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const removeNotification = useCallback((id) => {
    setNotifications((current) =>
      current.filter((notification) => notification.id !== id)
    );
  }, []);

  const notify = useCallback(
    ({ type = "success", title, message }) => {
      const id = notificationId + 1;
      notificationId = id;

      setNotifications((current) => [
        ...current.slice(-2),
        {
          id,
          type,
          title,
          message,
        },
      ]);

      window.setTimeout(() => {
        removeNotification(id);
      }, 4200);
    },
    [removeNotification]
  );

  const value = useMemo(
    () => ({
      notify,
      removeNotification,
    }),
    [notify, removeNotification]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}

      <div className="notification-stack" aria-live="polite" aria-atomic="true">
        {notifications.map((notification) => (
          <div
            className={`notification-toast notification-toast--${notification.type}`}
            key={notification.id}
            role="status"
          >
            <span className="notification-toast__icon" aria-hidden="true">
              {notification.type === "error" ? "!" : "v"}
            </span>

            <div className="notification-toast__content">
              {notification.title && (
                <strong className="notification-toast__title">
                  {notification.title}
                </strong>
              )}
              {notification.message && (
                <span className="notification-toast__message">
                  {notification.message}
                </span>
              )}
            </div>

            <button
              className="notification-toast__close"
              type="button"
              aria-label="Close notification"
              onClick={() => removeNotification(notification.id)}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
