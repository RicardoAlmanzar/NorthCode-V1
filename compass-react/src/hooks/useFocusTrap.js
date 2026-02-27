import { useEffect, useRef } from 'react';

export function useFocusTrap(isOpen) {
  const ref = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const el = ref.current;
    if (!el) return;

    function handleKeyDown(e) {
      if (e.key !== 'Tab') return;
      const focusable = el.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    el.addEventListener('keydown', handleKeyDown);
    return () => el.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return ref;
}
