import { useScrollReveal, useInView } from '../hooks/useScrollReveal';
import { SectionEyebrow } from './ui/Icons';
import Button from './ui/Button';

/* ─── Bold inline keyword highlight ─── */
function Kw({ children }) {
  return <strong className="text-white/90 font-bold">{children}</strong>;
}

export default function About() {
  const termRef = useScrollReveal();
  const rightRef = useScrollReveal();
  const [sectionRef, aboutInView] = useInView();

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="about-heading"
      className="section-about bg-[#0d1b2a] text-white transition-colors duration-300"
    >
      <div
        className={`grid grid-cols-[1fr_1.1fr] max-md:grid-cols-1 gap-12 items-center px-16 max-md:px-5 py-20 max-w-[1100px] mx-auto${aboutInView ? '' : ' anim-paused'}`}
      >
        {/* ── Terminal window ── */}
        <div
          ref={termRef}
          className="reveal-left rounded-xl overflow-hidden border border-[var(--color-border)] dark:border-white/[.07] shadow-[0_24px_64px_rgba(0,0,0,.15)] dark:shadow-[0_24px_64px_rgba(0,0,0,.4)]"
          style={{ background: '#0b1622' }}
        >
          {/* Title bar */}
          <div className="flex items-center gap-3 px-5 py-3 border-b border-white/[.05]" style={{ background: 'rgba(255,255,255,.025)' }}>
            <div className="flex gap-[6px]">
              <span className="w-[13px] h-[13px] rounded-full bg-[#ff5f57]" />
              <span className="w-[13px] h-[13px] rounded-full bg-[#febc2e]" />
              <span className="w-[13px] h-[13px] rounded-full bg-[#28c840]" />
            </div>
            <span className="flex-1 text-center text-[.72rem] text-white/30 font-mono tracking-wide">
              northcode — about.sh
            </span>
          </div>

          {/* Body */}
          <div className="p-7 max-md:p-5 font-mono text-[.84rem] max-md:text-[.78rem] leading-[1.85] space-y-7">

            {/* who-we-are block */}
            <div>
              <p>
                <span className="text-[var(--color-coral)]">→</span>{' '}
                <span className="text-[#28c840] font-bold">./who-we-are.sh</span>
              </p>
              <p className="text-white/30 ml-5 mt-0.5"># Cargando equipo...</p>
              <p className="text-[#28c840] ml-5">✓ Equipo cargado</p>

              <div className="mt-2.5 ml-5 space-y-1.5">
                <p>
                  <span className="text-white font-bold">Ricardo Almánzar</span>
                  <span className="text-white/25 mx-2">→</span>
                  <span className="text-white/65 font-bold">CEO</span>
                </p>
                <p>
                  <span className="text-white font-bold">Sergio Ceballos</span>
                  <span className="text-white/25 mx-2">→</span>
                  <span className="text-white/65 font-bold">CFO</span>
                </p>
                <p>
                  <span className="text-white font-bold">Adan León</span>
                  <span className="text-white/25 mx-2">→</span>
                  <span className="text-white/65 font-bold">CTO</span>
                </p>
              </div>
            </div>

            {/* filosofia block */}
            <div>
              <p>
                <span className="text-[var(--color-coral)]">→</span>{' '}
                <span className="text-[#28c840] font-bold">./filosofia.sh</span>
              </p>
              <div className="ml-5 mt-1.5 text-white/50 leading-[1.75]">
                <p>
                  "Todo proyecto comienza con{' '}
                  <Kw>claridad</Kw>.
                </p>
                <p className="ml-1">
                  Antes de <Kw>ejecutar</Kw>, alineamos objetivos
                </p>
                <p className="ml-1">para construir una solución que</p>
                <p className="ml-1">realmente funcione."</p>
              </div>
            </div>

            {/* Blinking cursor */}
            <p>
              <span className="text-[var(--color-coral)]">→</span>{' '}
              <span
                className="inline-block w-[9px] h-[17px] align-middle animate-pulse"
                style={{ background: 'var(--color-coral)', borderRadius: '1px' }}
              />
            </p>
          </div>
        </div>

        {/* ── Text column ── */}
        <div ref={rightRef} className="reveal-right">
          <SectionEyebrow className="text-[var(--color-coral)] dark:text-[var(--color-coral-lt)] dark:before:bg-[var(--color-coral-lt)] before:bg-[var(--color-coral)]">
            El Equipo
          </SectionEyebrow>

          <h2
            id="about-heading"
            className="font-heading font-black leading-[1.12] text-[clamp(1.9rem,3.2vw,3rem)] mb-5 text-white"
          >
            Sobre{' '}
            <em className="italic text-[var(--color-coral)]">nosotros</em>
          </h2>

          <p className="text-white/55 max-w-[52ch] leading-[1.8] mb-4 text-[.95rem]">
            Somos un equipo enfocado en diseño y desarrollo digital. Ayudamos a
            marcas y negocios a transformar ideas en soluciones funcionales,
            visualmente sólidas y orientadas a resultados.
          </p>

          <p className="text-white/55 max-w-[52ch] leading-[1.8] mb-10 text-[.95rem]">
            En North Code, cada decisión de diseño y cada línea de código tiene
            un propósito.
          </p>

          <Button href="#contact" aria-label="Solicitar cotización de proyecto">
            Cotizar proyecto
          </Button>
        </div>
      </div>
    </section>
  );
}
