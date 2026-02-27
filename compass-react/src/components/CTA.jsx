import { useState, useRef } from 'react';
import { useScrollRevealAll } from '../hooks/useScrollReveal';
import { SectionEyebrow } from './ui/Icons';

export default function CTA({ onToast }) {
  const [sending, setSending] = useState(false);
  const containerRef = useRef(null);
  useScrollRevealAll(containerRef, '.reveal');

  const handleSubmit = e => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      onToast?.('✓ ¡Recibido! Te contactamos pronto.');
      e.target.reset();
      setSending(false);
    }, 800);
  };

  return (
    <section
      id="cta"
      ref={containerRef}
      aria-labelledby="cta-heading"
      className="bg-[var(--color-cream)] dark:bg-[#0d1b2a] text-[var(--color-ink)] dark:text-white overflow-hidden section-cta border-t border-[var(--color-border)]"
    >
      <div className="text-center py-20 px-16 max-md:px-5">
        <SectionEyebrow className="reveal justify-center text-[var(--color-coral)] dark:text-[var(--color-coral-lt)]">¿Hablamos?</SectionEyebrow>
        <h2 id="cta-heading" className="reveal font-heading font-black leading-[1.15] text-[clamp(1.8rem,3vw,2.8rem)] mb-4 text-[var(--color-ink)] dark:text-white max-w-[18ch] mx-auto">
          ¿Tienes algo en mente?
        </h2>
        <p className="reveal text-[var(--color-muted)] dark:text-white/50 max-w-[56ch] mx-auto leading-[1.75] mb-12 text-base text-center">
          Cuéntanos tu idea. La primera conversación es gratis y sin compromiso.
        </p>
        <form className="reveal flex max-sm:flex-col gap-3 justify-center max-w-[440px] mx-auto" aria-label="Suscripción rápida" onSubmit={handleSubmit}>
          <label htmlFor="cta-email" className="sr-only">Tu email</label>
          <input
            type="email"
            id="cta-email"
            placeholder="tu@email.com"
            autoComplete="email"
            required
            className="flex-1 px-5 py-3 rounded-full border border-[var(--color-border)] dark:border-white/[.18] bg-[var(--color-card-bg)] dark:bg-white/[.06] text-[var(--color-ink)] dark:text-white font-sans text-[.9rem] min-h-[44px] transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)] focus:border-[var(--color-coral)] focus:shadow-[0_0_0_3px_rgba(232,97,74,.15)] focus:outline-none placeholder:text-[var(--color-muted)] dark:placeholder:text-white/50"
          />
          <button
            type="submit"
            disabled={sending}
            className="btn-magnetic px-5 py-3 bg-[var(--color-coral)] border-none rounded-full text-white font-sans font-semibold text-[.88rem] cursor-pointer whitespace-nowrap min-h-[44px] shadow-[0_4px_16px_rgba(232,97,74,.3)] transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(232,97,74,.45)] active:translate-y-0 active:scale-[.97] disabled:opacity-60"
          >
            {sending ? 'Enviando...' : 'Enviar →'}
          </button>
        </form>
      </div>
    </section>
  );
}
