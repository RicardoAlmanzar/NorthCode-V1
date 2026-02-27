import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let last = window.scrollY > 600;
    setVisible(last);
    const onScroll = () => {
      const next = window.scrollY > 600;
      if (next !== last) { last = next; setVisible(next); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-8 right-8 md:bottom-8 md:right-8 max-md:bottom-20 max-md:right-4 z-[90] w-12 h-12 rounded-full border-none bg-[var(--color-coral)] text-white text-xl cursor-pointer flex items-center justify-center shadow-[0_4px_16px_rgba(232,97,74,.30)] transition-[transform,opacity,visibility,box-shadow,background-color] duration-400 ease-[cubic-bezier(.2,.8,.2,1)] hover:bg-[#d1533f] hover:-translate-y-1.5 hover:shadow-[0_8px_24px_rgba(232,97,74,.45)] active:scale-[.92] ${
        visible ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'
      }`}
      aria-label="Volver arriba"
      type="button"
    >
      ↑
    </button>
  );
}
