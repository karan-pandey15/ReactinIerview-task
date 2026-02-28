import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 2000,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {toasts.map((toast) => (
          <ToastItem 
            key={toast.id} 
            toast={toast} 
            onClose={() => removeToast(toast.id)} 
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColors = {
    success: '#28a745',
    error: '#dc3545',
    info: '#17a2b8',
    warning: '#ffc107'
  };

  return (
    <div style={{
      padding: '12px 20px',
      backgroundColor: bgColors[toast.type] || bgColors.success,
      color: '#fff',
      borderRadius: '4px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      minWidth: '200px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      animation: 'slideIn 0.3s ease-out'
    }}>
      <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{toast.message}</span>
      <button 
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          fontSize: '1.2rem',
          marginLeft: '10px',
          padding: 0,
          lineHeight: 1
        }}
      >&times;</button>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
