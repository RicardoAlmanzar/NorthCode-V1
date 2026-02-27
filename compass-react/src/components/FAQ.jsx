import { useState } from 'react';
import { FAQS } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SectionEyebrow } from './ui/Icons';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(-1);
  const leftRef = useScrollReveal();
  const rightRef = useScrollReveal();

  const toggle = idx => setOpenIdx(prev => (prev === idx ? -1 : idx));

  return (
    <section id="faq" aria-labelledby="faq-heading" className="px-16 max-md:px-5 py-20 min-h-[100dvh] flex items-center">
      <div className="grid grid-cols-[1fr_1.1fr] max-md:grid-cols-1 gap-20 max-md:gap-12 items-start w-full max-w-[1100px] mx-auto">
        <div ref={leftRef} className="reveal-left">
          <SectionEyebrow>Preguntas frecuentes</SectionEyebrow>
          <h2 id="faq-heading" className="font-heading font-black leading-[1.15] text-[clamp(1.8rem,3vw,2.8rem)] mb-4">
            Preguntas <em className="italic text-[var(--color-coral)]">comunes</em>
          </h2>
          <p className="text-[var(--color-muted)] max-w-[56ch] leading-[1.75] mb-12 text-base">
            Lo que más nos preguntan antes de empezar.
          </p>
        </div>

        <div ref={rightRef} className="reveal-right max-w-full" role="region" aria-label="Preguntas frecuentes">
          {FAQS.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} className="border-b border-[var(--color-border)]">
                <button
                  className="w-full text-left py-5 text-[.92rem] font-medium cursor-pointer bg-none border-none text-[var(--color-ink)] font-sans flex justify-between items-center gap-4 min-h-[44px] transition-colors duration-300 hover:text-[var(--color-coral)]"
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                  id={`faq-q-${i}`}
                  onClick={() => toggle(i)}
                >
                  {faq.q}
                  <span
                    className={`w-6 h-6 rounded-full border-[1.5px] border-[var(--color-coral)] text-[var(--color-coral)] flex items-center justify-center text-[.9rem] shrink-0 transition-[transform,background-color,color] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] ${isOpen ? 'bg-[var(--color-coral)] text-white rotate-45 scale-110' : ''}`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  aria-hidden={!isOpen}
                  className="faq-body"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden text-[.88rem] text-[var(--color-muted)] leading-[1.75]">
                    <p className="pb-4">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
