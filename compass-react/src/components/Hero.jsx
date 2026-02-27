import { useState, useRef, useCallback } from 'react';
import { useParallax, useInView } from '../hooks/useScrollReveal';
import Button from './ui/Button';

/* ─── Falling binary columns (matrix-rain style) ─── */
const BINARY_COLUMNS = [
  { digits: '1001101001', x: 52, delay: 0, speed: 18 },
  { digits: '0110010110', x: 58, delay: 3, speed: 22 },
  { digits: '10110100', x: 64, delay: 7, speed: 20 },
  { digits: '011001', x: 70, delay: 1, speed: 16 },
  { digits: '1010011101', x: 76, delay: 5, speed: 24 },
  { digits: '01101010', x: 82, delay: 2, speed: 19 },
  { digits: '110010', x: 88, delay: 6, speed: 21 },
  { digits: '10101100', x: 94, delay: 4, speed: 17 },
  { digits: '0100110101', x: 55, delay: 8, speed: 23 },
  { digits: '1101001', x: 67, delay: 1, speed: 20 },
  { digits: '01010', x: 73, delay: 5, speed: 15 },
  { digits: '10011010', x: 61, delay: 3, speed: 22 },
];

/* ─── Compass Rose SVG (reusable for main + ghost) ─── */
function CompassRose({ id = '', className = '', ...props }) {
  const pre = id ? `${id}-` : '';
  return (
    <svg
      className={`hero-compass-rose ${className}`}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id={`${pre}needle-n`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8614a" />
          <stop offset="100%" stopColor="#c44a36" />
        </linearGradient>
        <linearGradient id={`${pre}needle-n2`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d45540" />
          <stop offset="100%" stopColor="#b33e2c" />
        </linearGradient>
        <linearGradient id={`${pre}needle-s`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--hc-needle-s1)" />
          <stop offset="100%" stopColor="var(--hc-needle-s2)" />
        </linearGradient>
        <linearGradient id={`${pre}needle-s2`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--hc-needle-s2)" />
          <stop offset="100%" stopColor="var(--hc-needle-s1)" />
        </linearGradient>
        <radialGradient id={`${pre}disc-bg`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--hc-bg-inner)" />
          <stop offset="100%" stopColor="var(--hc-bg-outer)" />
        </radialGradient>
        <filter id={`${pre}disc-shadow`}>
          <feDropShadow dx="0" dy="6" stdDeviation="18" floodColor="#000" floodOpacity=".25" />
        </filter>
      </defs>

      {/* Background disc */}
      <circle cx="200" cy="200" r="175" fill={`url(#${pre}disc-bg)`} filter={`url(#${pre}disc-shadow)`} />

      {/* Outer rings */}
      <circle cx="200" cy="200" r="172" stroke="currentColor" strokeWidth="2" opacity=".12" fill="none" />
      <circle cx="200" cy="200" r="164" stroke="currentColor" strokeWidth=".8" opacity=".08" fill="none" />

      {/* Tick marks — 72 small ticks */}
      {Array.from({ length: 72 }, (_, i) => {
        const a = i * 5;
        const isMajor = a % 90 === 0;
        const isMid = a % 45 === 0;
        return (
          <line
            key={i}
            x1="200" y1={isMajor ? 32 : isMid ? 36 : 40}
            x2="200" y2={isMajor ? 50 : isMid ? 48 : 46}
            stroke="currentColor"
            strokeWidth={isMajor ? 2 : isMid ? 1.2 : 0.6}
            opacity={isMajor ? 0.5 : isMid ? 0.3 : 0.15}
            transform={`rotate(${a} 200 200)`}
          />
        );
      })}

      {/* Inner decorative circle */}
      <circle cx="200" cy="200" r="55" stroke="currentColor" strokeWidth=".5" opacity=".06" fill="none" />

      {/* ─── Compass Rose — 8-point star ─── */}
      {/* Intercardinal points (NE, SE, SW, NW) — smaller, behind */}
      <g opacity=".55">
        {/* NE */}
        <polygon points="200,130 225,195 200,200" fill={`url(#${pre}needle-n2)`} transform="rotate(45 200 200)" />
        <polygon points="200,270 225,205 200,200" fill={`url(#${pre}needle-s2)`} transform="rotate(45 200 200)" />
        <polygon points="200,130 175,195 200,200" fill={`url(#${pre}needle-n)`} transform="rotate(45 200 200)" />
        <polygon points="200,270 175,205 200,200" fill={`url(#${pre}needle-s)`} transform="rotate(45 200 200)" />
        {/* NW */}
        <polygon points="200,130 225,195 200,200" fill={`url(#${pre}needle-n2)`} transform="rotate(-45 200 200)" />
        <polygon points="200,270 225,205 200,200" fill={`url(#${pre}needle-s2)`} transform="rotate(-45 200 200)" />
        <polygon points="200,130 175,195 200,200" fill={`url(#${pre}needle-n)`} transform="rotate(-45 200 200)" />
        <polygon points="200,270 175,205 200,200" fill={`url(#${pre}needle-s)`} transform="rotate(-45 200 200)" />
      </g>

      {/* Cardinal points (N, E, S, W) — main, larger */}
      {/* North — coral */}
      <polygon points="200,50 214,192 200,200" fill={`url(#${pre}needle-n2)`} />
      <polygon points="200,50 186,192 200,200" fill={`url(#${pre}needle-n)`} />
      {/* South — navy */}
      <polygon points="200,350 214,208 200,200" fill={`url(#${pre}needle-s2)`} />
      <polygon points="200,350 186,208 200,200" fill={`url(#${pre}needle-s)`} />
      {/* East — half coral / half navy */}
      <polygon points="350,200 208,186 200,200" fill={`url(#${pre}needle-s2)`} />
      <polygon points="350,200 208,214 200,200" fill={`url(#${pre}needle-s)`} />
      {/* West — half coral / half navy */}
      <polygon points="50,200 192,186 200,200" fill={`url(#${pre}needle-s)`} />
      <polygon points="50,200 192,214 200,200" fill={`url(#${pre}needle-s2)`} />

      {/* Centre pin */}
      <circle cx="200" cy="200" r="10" fill="var(--color-coral)" />
      <circle cx="200" cy="200" r="5" fill="var(--hc-center-dot)" />

      {/* Cardinal letters — outside the disc */}
      <text x="200" y="22" textAnchor="middle" className="hero-compass-letter hero-compass-letter-n" fontSize="20" fontWeight="700" fontStyle="italic" letterSpacing=".04em">N</text>
      <text x="200" y="392" textAnchor="middle" className="hero-compass-letter hero-compass-letter-s" fontSize="20" fontWeight="700" fontStyle="italic" letterSpacing=".04em">S</text>
      <text x="390" y="207" textAnchor="middle" className="hero-compass-letter" fontSize="20" fontWeight="700" fontStyle="italic" letterSpacing=".04em">E</text>
      <text x="12" y="207" textAnchor="middle" className="hero-compass-letter" fontSize="20" fontWeight="700" fontStyle="italic" letterSpacing=".04em">W</text>
    </svg>
  );
}

export default function Hero() {
  const meshRef = useParallax(0.12);
  const [heroRef, heroInView] = useInView();
  const [spinning, setSpinning] = useState(false);
  const compassRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleCompassClick = useCallback(() => {
    if (spinning) return;
    const el = compassRef.current;
    if (!el) return;

    // Random landing angle (not north — avoid 0±30°)
    const offset = 60 + Math.random() * 240; // 60°–300°
    const totalSpin = 720 + offset; // 2 full spins + random offset

    // Phase 1: spin fast to random position
    el.style.transition = 'transform 1.2s cubic-bezier(.2,.8,.2,1)';
    el.style.transform = `rotate(${totalSpin}deg)`;
    setSpinning(true);

    // Phase 2: after landing, slowly correct back to north (0°)
    timeoutRef.current = setTimeout(() => {
      el.style.transition = 'transform 1.8s cubic-bezier(.4,0,.2,1)';
      el.style.transform = 'rotate(0deg)';

      // Done — ready for next click
      timeoutRef.current = setTimeout(() => {
        el.style.transition = '';
        setSpinning(false);
      }, 1900);
    }, 1400);
  }, [spinning]);

  return (
    <section
      id="hero"
      ref={heroRef}
      aria-labelledby="hero-heading"
      className={`h-screen h-dvh grid grid-cols-2 max-md:grid-cols-1 items-center px-16 max-md:px-5 pt-0 max-md:pt-0 pb-0 gap-16 relative overflow-hidden${heroInView ? '' : ' anim-paused'}`}
    >
      {/* Parallax mesh background */}
      <div
        ref={meshRef}
        className="absolute inset-0 z-0 pointer-events-none parallax-layer"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 55% 60% at 78% 38%, rgba(232,97,74,.10) 0%, transparent 65%),
            radial-gradient(ellipse 40% 50% at 20% 78%, rgba(26,58,92,.07) 0%, transparent 60%),
            radial-gradient(circle at 60% 20%, rgba(232,97,74,.04) 0%, transparent 40%)`,
        }}
      />

      {/* Binary rain — full hero background */}
      <div className="absolute inset-0 z-0 pointer-events-none hero-binary-layer" aria-hidden="true">
        {BINARY_COLUMNS.map((col, i) => (
          <span
            key={i}
            className="hero-binary-col"
            style={{
              left: `${col.x}%`,
              animationDuration: `${col.speed}s`,
              animationDelay: `${col.delay}s`,
            }}
          >
            {col.digits.split('').map((d, j) => (
              <span key={j} className="hero-binary-digit">{d}</span>
            ))}
          </span>
        ))}
      </div>

      {/* Text */}
      <div className="relative z-[1] max-md:text-center max-md:pt-12">
        <p className="hero-eyebrow inline-flex items-center gap-3 text-[.78rem] tracking-[.12em] uppercase mb-6 animate-[fadeIn_.6s_ease_.3s_both] max-md:justify-center">
          <span className="block w-6 h-px bg-[var(--color-coral)]" />
          Diseño &amp; Desarrollo Web
        </p>
        <h1 id="hero-heading" className="hero-title font-heading font-black leading-[1.12] text-[clamp(2.2rem,5vw,4.2rem)] mb-6">
          <span className="block overflow-hidden"><span className="block animate-[lineReveal_.7s_cubic-bezier(.2,.8,.2,1)_.5s_both]">Hacemos que</span></span>
          <span className="block overflow-hidden"><span className="block animate-[lineReveal_.7s_cubic-bezier(.2,.8,.2,1)_.65s_both]">tu marca <em className="hero-title-em">se vea</em></span></span>
          <span className="block overflow-hidden"><span className="block animate-[lineReveal_.7s_cubic-bezier(.2,.8,.2,1)_.8s_both]">como merece.</span></span>
        </h1>
        <p className="hero-subtitle text-[1rem] leading-[1.65] max-w-[44ch] mb-10 mx-auto animate-[fadeUp_.6s_cubic-bezier(.2,.8,.2,1)_1.1s_both]">
          Somos una agencia pequeña de Santo Domingo. Diseñamos sitios web, creamos identidades de marca y producimos contenido visual. Sin rodeos.
        </p>
        <div className="flex gap-4 items-center flex-wrap animate-[fadeUp_.6s_cubic-bezier(.2,.8,.2,1)_1.25s_both]">
          <Button href="#contact" aria-label="Solicitar cotización de proyecto">
            Cotizar proyecto
          </Button>
          <Button variant="secondary" href="#work" aria-label="Ver nuestro portafolio">
            Ver portafolio
          </Button>
        </div>
      </div>

      {/* Hero Visual — Compass area */}
      <div className="relative z-[1] flex flex-col items-center justify-center animate-[scaleIn_.8s_cubic-bezier(.2,.8,.2,1)_.7s_both] max-md:hidden" aria-hidden="true">
        {/* Compass container */}
        <div className="relative w-[clamp(300px,28vw,440px)] aspect-square">

          {/* Ghost compass — larger, behind, slowly rotating */}
          <div className="absolute inset-[-35%] hero-compass-ghost">
            <CompassRose id="ghost" />
          </div>

          {/* Main compass — float wrapper + spin on click */}
          <div className="relative hero-compass-float">
            <div
              ref={compassRef}
              className="hero-compass-main"
              onClick={handleCompassClick}
              role="button"
              tabIndex={0}
              aria-label="Girar brújula"
              onKeyDown={e => e.key === 'Enter' && handleCompassClick()}
              style={{ cursor: 'pointer' }}
            >
              <CompassRose id="main" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
