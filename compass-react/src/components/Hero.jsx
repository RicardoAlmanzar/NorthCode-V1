import Button from './ui/Button';
import HeroCore3D from './HeroCore3D';

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="hero-new relative overflow-hidden"
    >
      <div className="hero-new-bg" aria-hidden="true" />
      <div className="hero-new-glow" aria-hidden="true" />

      {/* ── GIANT TITLE LAYER ── */}
      <div
        className="hero-new-title-wrap animate-[heroTitleReveal_.9s_cubic-bezier(.2,.8,.2,1)_.2s_both]"
        aria-hidden="true"
      >
        <span className="hero-new-word hero-new-word--digital">DIGITAL</span>
        <span className="hero-new-word hero-new-word--solutions">SOLUTIONS</span>
      </div>

      <HeroCore3D />

      {/* ── BOTTOM CONTENT ── */}
      <div className="hero-new-bottom animate-[fadeUp_.7s_cubic-bezier(.2,.8,.2,1)_1.4s_both]">
        <p id="hero-heading" className="hero-subtitle hero-new-desc">
          Creamos marcas y soluciones digitales de alto impacto. Desde identidades visuales hasta sistemas complejos que impulsan tu negocio.
        </p>
        <div className="hero-new-cta">
          <Button href="#contact" aria-label="Solicitar cotización de proyecto">
            Cotizar proyecto
          </Button>
          <Button variant="secondary" href="#work" aria-label="Ver nuestro portafolio">
            Ver portafolio
          </Button>
        </div>
      </div>
    </section>
  );
}
