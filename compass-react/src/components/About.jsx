import { useScrollReveal, useInView } from '../hooks/useScrollReveal';
import { SectionEyebrow } from './ui/Icons';
import Button from './ui/Button';
import { Terminal } from './ui/terminal';


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
        <div ref={termRef} className="reveal-left">
          <Terminal
            title="northcode — about.sh"
            commands={[
              './who-we-are.sh',
              './filosofia.sh',
            ]}
            outputs={{
              0: [
                '# Cargando equipo...',
                '\u2713 Equipo cargado',
                'Ricardo Alm\u00e1nzar  \u2192  CEO',
                'Sergio Ceballos   \u2192  CFO',
                'Adan Le\u00f3n         \u2192  CTO',
              ],
              1: [
                '"Todo proyecto comienza con **claridad**.',
                ' Antes de **ejecutar**, alineamos objetivos',
                ' para construir una soluci\u00f3n que',
                ' realmente funcione."',
              ],
            }}
            typingSpeed={45}
            delayBetweenCommands={1000}
          />
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
