import { useEffect, useState } from 'react';

export default function FormToast({ message, onDone }) {
  const [show, setShow] = useState(false);
  const isError = message?.toLowerCase().includes('error');

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(() => onDone?.(), 300);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [message, onDone]);

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`form-toast ${show ? 'is-visible' : ''} ${isError ? 'is-error' : 'is-success'}`}
    >
      <div className="form-toast-icon" aria-hidden="true">
        {isError ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v6" />
            <path d="M12 17h.01" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        )}
      </div>
      <span className="form-toast-message">{message}</span>
      <span className="form-toast-progress" aria-hidden="true" />
    </div>
  );
}
