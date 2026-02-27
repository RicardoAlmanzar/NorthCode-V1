import { useEffect, useState } from 'react';

export default function FormToast({ message, onDone }) {
  const [show, setShow] = useState(false);

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
      className={`fixed bottom-12 left-1/2 -translate-x-1/2 z-[300] bg-[var(--color-success)] text-white px-6 py-3.5 rounded-2xl text-[.9rem] font-semibold shadow-[0_20px_50px_rgba(16,185,129,.3)] border border-white/20 flex items-center gap-3 pointer-events-none transition-[opacity,visibility,transform] duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${show ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-8'
        }`}
    >
      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <span>{message}</span>
    </div>
  );
}
