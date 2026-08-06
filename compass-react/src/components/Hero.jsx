import Button from './ui/Button';

/* ─── 3D Laptop SVG with dashboard UI ─── */
function Laptop3D() {
  return (
    <svg
      className="hero-laptop-svg"
      viewBox="0 0 900 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="lp-screen-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0f1a" />
          <stop offset="100%" stopColor="#0d1520" />
        </linearGradient>
        <linearGradient id="lp-lid-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a3f4a" />
          <stop offset="60%" stopColor="#1c2030" />
          <stop offset="100%" stopColor="#141824" />
        </linearGradient>
        <linearGradient id="lp-base-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#272c38" />
          <stop offset="100%" stopColor="#1a1e28" />
        </linearGradient>
        <linearGradient id="lp-base-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e2330" />
          <stop offset="100%" stopColor="#12151e" />
        </linearGradient>
        <linearGradient id="lp-hinge-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0d1118" />
          <stop offset="40%" stopColor="#2a2f3d" />
          <stop offset="100%" stopColor="#0d1118" />
        </linearGradient>
        <radialGradient id="lp-kbd-ambient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#de6c3a" stopOpacity="0.06" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="lp-bottom-glow" cx="50%" cy="0%" r="60%">
          <stop offset="0%" stopColor="#de6c3a" stopOpacity="0.18" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="lp-coral-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="lp-screen-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="lp-screen-clip">
          <path d="M158 64 L450 62 L742 64 L742 328 L158 328 Z" />
        </clipPath>
      </defs>

      {/* ── LID ── */}
      <path d="M108 340 L450 18 L792 340 Z" fill="url(#lp-lid-shine)" opacity="0.95" />
      <path d="M128 335 L450 36 L772 335 Z" fill="#161b26" />
      {/* Screen */}
      <path d="M158 64 L450 62 L742 64 L742 328 L158 328 Z" fill="url(#lp-screen-bg)" />

      {/* ── SCREEN CONTENT ── */}
      <g clipPath="url(#lp-screen-clip)">
        {/* Top bar */}
        <rect x="158" y="62" width="584" height="32" fill="#0f1825" opacity="0.95" />
        {/* Traffic lights */}
        <circle cx="178" cy="78" r="5" fill="#ff5f57" />
        <circle cx="194" cy="78" r="5" fill="#febc2e" />
        <circle cx="210" cy="78" r="5" fill="#28c840" />
        {/* Tab pill */}
        <rect x="235" y="69" width="120" height="18" rx="9" fill="#1a2235" />
        <text x="295" y="82" textAnchor="middle" fill="#4a5d6f" fontSize="8" fontFamily="monospace">northcode.app</text>
        {/* Icons */}
        <rect x="684" y="70" width="16" height="16" rx="4" fill="#1a2235" />
        <rect x="706" y="70" width="16" height="16" rx="4" fill="#1a2235" />
        <rect x="728" y="70" width="14" height="16" rx="4" fill="#de6c3a" opacity="0.7" />

        {/* Sidebar */}
        <rect x="158" y="94" width="88" height="234" fill="#0c1220" />
        <rect x="170" y="100" width="64" height="20" rx="6" fill="#131c2e" />
        <text x="202" y="114" textAnchor="middle" fill="#de6c3a" fontSize="9" fontWeight="bold" fontFamily="sans-serif">NC</text>
        {['Dashboard', 'Projects', 'Analytics', 'Deploy', 'Settings'].map((label, i) => (
          <g key={i}>
            <rect x="166" y={128 + i * 32} width="72" height="24" rx="6"
              fill={i === 0 ? 'rgba(222,108,58,0.16)' : 'transparent'} />
            <rect x="172" y={136 + i * 32} width="10" height="8" rx="2"
              fill={i === 0 ? '#de6c3a' : '#2a3548'} />
            <rect x="188" y={138 + i * 32} width={label.length * 4} height="4" rx="2"
              fill={i === 0 ? '#de6c3a' : '#2a3548'} opacity={i === 0 ? 0.9 : 0.45} />
          </g>
        ))}

        {/* Main area */}
        <rect x="246" y="94" width="496" height="234" fill="#0e1625" />

        {/* Stat cards */}
        {[
          { value: '98%', color: '#de6c3a' },
          { value: '24k', color: '#60a5fa' },
          { value: '+18%', color: '#34d399' },
        ].map(({ value, color }, i) => (
          <g key={i}>
            <rect x={256 + i * 158} y="102" width="146" height="58" rx="8" fill="#131c2e" />
            <rect x={264 + i * 158} y="110" width="60" height="5" rx="2" fill="#2a3548" />
            <text x={264 + i * 158} y="144" fill={color} fontSize="20" fontWeight="bold" fontFamily="monospace">{value}</text>
            <rect x={264 + i * 158} y="150" width="40" height="3" rx="1" fill={color} opacity="0.35" />
          </g>
        ))}

        {/* Chart panel */}
        <rect x="256" y="168" width="298" height="148" rx="8" fill="#131c2e" />
        <rect x="266" y="178" width="80" height="5" rx="2" fill="#2a3548" />
        {[0, 1, 2, 3].map(i => (
          <line key={i} x1="266" y1={196 + i * 28} x2="544" y2={196 + i * 28} stroke="#1e2a40" strokeWidth="1" />
        ))}
        <path d="M266,290 L296,260 L330,272 L366,238 L402,252 L438,218 L474,232 L510,202 L544,212 L544,290 Z" fill="rgba(222,108,58,0.08)" />
        <polyline points="266,290 296,260 330,272 366,238 402,252 438,218 474,232 510,202 544,212" stroke="#de6c3a" strokeWidth="2.5" fill="none" filter="url(#lp-screen-glow)" />
        <polyline points="266,298 296,280 330,286 366,265 402,272 438,252 474,260 510,244 544,248" stroke="#60a5fa" strokeWidth="1.5" fill="none" opacity="0.45" />
        {[[266, 290], [296, 260], [330, 272], [366, 238], [402, 252], [438, 218], [474, 232], [510, 202], [544, 212]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3.5" fill="#de6c3a" filter="url(#lp-coral-glow)" />
        ))}

        {/* Right metrics panel */}
        <rect x="562" y="168" width="174" height="148" rx="8" fill="#131c2e" />
        <rect x="572" y="178" width="70" height="5" rx="2" fill="#2a3548" />
        {[
          { pct: 82, color: '#de6c3a', label: 'Performance' },
          { pct: 95, color: '#34d399', label: 'SEO Score' },
          { pct: 74, color: '#60a5fa', label: 'Security' },
          { pct: 99, color: '#a78bfa', label: 'Uptime' },
        ].map(({ pct, color, label }, i) => (
          <g key={i}>
            <text x="572" y={196 + i * 30} fill="#4a5d6f" fontSize="7.5" fontFamily="sans-serif">{label} — {pct}%</text>
            <rect x="572" y={200 + i * 30} width="150" height="10" rx="5" fill="#1a2438" />
            <rect x="572" y={200 + i * 30} width={150 * pct / 100} height="10" rx="5" fill={color} opacity="0.75" />
          </g>
        ))}

        {/* Status bar */}
        <rect x="246" y="316" width="496" height="12" fill="#0c1220" />
        <circle cx="620" cy="322" r="3" fill="#34d399" />
        <rect x="630" y="319" width="50" height="5" rx="2" fill="#1e2a40" />
      </g>

      {/* Screen glint */}
      <path d="M158 64 L450 62 L742 64" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      {/* Camera */}
      <circle cx="450" cy="46" r="3.5" fill="#1e2535" />
      <circle cx="450" cy="46" r="1.5" fill="#0d1118" />

      {/* ── HINGE ── */}
      <rect x="108" y="337" width="684" height="10" rx="3" fill="url(#lp-hinge-grad)" />

      {/* ── BASE ── */}
      <path d="M52 348 L848 348 L802 432 L98 432 Z" fill="url(#lp-base-top)" />
      <path d="M52 348 L848 348 L802 432 L98 432 Z" fill="url(#lp-kbd-ambient)" />
      <path d="M98 432 L802 432 L792 447 L108 447 Z" fill="url(#lp-base-front)" />

      {/* ── KEYBOARD ── */}
      {Array.from({ length: 13 }, (_, col) =>
        [0, 1, 2, 3].map((row) => {
          const baseX = 130 + col * 48;
          const baseY = 358 + row * 16;
          const isSpace = row === 3 && col === 6;
          const w = isSpace ? 120 : 38;
          const xOff = isSpace ? -36 : 0;
          const perspX = (baseX - 450) * 0.035 * (baseY - 348) / 84;
          return (
            <rect
              key={`${col}-${row}`}
              x={baseX + xOff + perspX - w / 2 + 5}
              y={baseY}
              width={w - 3}
              height={10}
              rx="2"
              fill={isSpace ? '#232a3a' : '#1e2535'}
              opacity={isSpace ? 0.9 : 0.65}
            />
          );
        })
      )}

      {/* Touchpad */}
      <rect x="352" y="402" width="196" height="22" rx="5" fill="#1a2030" opacity="0.8" />
      <rect x="352" y="402" width="196" height="22" rx="5" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />

      {/* Ambient shadow */}
      <ellipse cx="450" cy="447" rx="390" ry="12" fill="url(#lp-bottom-glow)" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="hero-new relative overflow-hidden"
    >
      {/* Pure black background */}
      <div className="hero-new-bg" aria-hidden="true" />

      {/* Radial glow behind laptop */}
      <div className="hero-new-glow" aria-hidden="true" />

      {/* ── GIANT TITLE LAYER ── */}
      <div className="hero-new-title-wrap animate-[heroTitleReveal_.9s_cubic-bezier(.2,.8,.2,1)_.2s_both]" aria-hidden="true">
        <span className="hero-new-word hero-new-word--digital">DIGITAL</span>
        <span className="hero-new-word hero-new-word--solutions">SOLUTIONS</span>
      </div>

      {/* ── LAPTOP (floats over title) ── */}
      <div className="hero-new-laptop-wrap animate-[fadeIn_.8s_ease_.6s_both]">
        <div className="hero-new-laptop-float">
          <Laptop3D />
        </div>
      </div>

      {/* ── BOTTOM CONTENT ── */}
      <div className="hero-new-bottom animate-[fadeUp_.7s_cubic-bezier(.2,.8,.2,1)_1.4s_both]">
        <p
          id="hero-heading"
          className="hero-subtitle hero-new-desc"
        >
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
