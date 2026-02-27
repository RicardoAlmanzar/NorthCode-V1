/* ─── NorthCode Logo & Icons ─── */
export function NorthCodeIcon({ size = 32, className = '', color = 'currentColor', accent = '#e8614a' }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: size, height: size }}
      aria-label="NorthCode"
      role="img"
    >
      <g transform="translate(2,2)">
        <path d="M8.2,38 A30,30 0 0,1 38,8.2" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M38,69.8 A30,30 0 0,1 8.2,38" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M69.8,38 A30,30 0 0,1 38,69.8" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M38,8.2 A30,30 0 0,1 69.8,38" stroke={accent} strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M13,52 A26,26 0 0,1 11,44" stroke={accent} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity=".8" />
        <circle cx="38" cy="8" r="3.2" fill={color} />
        <circle cx="69.8" cy="38" r="3.2" fill={accent} />
        <circle cx="8" cy="38" r="3.2" fill={color} />
        <circle cx="38" cy="70" r="3.2" fill={color} />
        <polygon points="38,9 49,43 38,37 27,43" fill="url(#nci-grad)" />
        <polygon points="38,9 39,40 38,37 37,40" fill="#c44a36" opacity=".5" />
        <g transform="translate(38,56)" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <polyline points="-8,-5 -13,0 -8,5" />
          <polyline points="8,-5 13,0 8,5" />
          <line x1="3" y1="-6" x2="-3" y2="6" />
        </g>
        <defs>
          <linearGradient id="nci-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} />
            <stop offset="100%" stopColor="#d4553f" />
          </linearGradient>
        </defs>
      </g>
    </svg>
  );
}

export function NorthCodeLogo({ size = 36, className = '', color = 'currentColor', accent = '#e8614a' }) {
  return (
    <svg
      viewBox="0 0 310 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ height: size, width: 'auto' }}
      aria-label="NorthCode"
      role="img"
    >
      <g transform="translate(2,2)">
        <path d="M8.2,38 A30,30 0 0,1 38,8.2" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M38,69.8 A30,30 0 0,1 8.2,38" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M69.8,38 A30,30 0 0,1 38,69.8" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M38,8.2 A30,30 0 0,1 69.8,38" stroke={accent} strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M13,52 A26,26 0 0,1 11,44" stroke={accent} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity=".8" />
        <circle cx="38" cy="8" r="3.2" fill={color} />
        <circle cx="69.8" cy="38" r="3.2" fill={accent} />
        <circle cx="8" cy="38" r="3.2" fill={color} />
        <circle cx="38" cy="70" r="3.2" fill={color} />
        <polygon points="38,9 49,43 38,37 27,43" fill="url(#nc-needle-grad-logo)" />
        <polygon points="38,9 39,40 38,37 37,40" fill="#c44a36" opacity=".5" />
        <g transform="translate(38,56)" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <polyline points="-8,-5 -13,0 -8,5" />
          <polyline points="8,-5 13,0 8,5" />
          <line x1="3" y1="-6" x2="-3" y2="6" />
        </g>
        <defs>
          <linearGradient id="nc-needle-grad-logo" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} />
            <stop offset="100%" stopColor="#d4553f" />
          </linearGradient>
        </defs>
      </g>
      <text x="92" y="34" fontFamily="var(--font-logo)" fontSize="27" fontWeight="700" letterSpacing="1.2" fill={color}>NORTH</text>
      <text x="92" y="66" fontFamily="var(--font-logo)" fontSize="27" fontWeight="800" letterSpacing="1.2" fill={accent}>CODE</text>
    </svg>
  );
}

export function GlobeIcon({ size = 28, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
    </svg>
  );
}

export function StarIcon({ size = 28, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
    </svg>
  );
}

export function DesktopAppIcon({ size = 28, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

export function CodeIcon({ size = 20, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export function BrushIcon({ size = 20, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 22s4-1 6-3 4-4 5-5 3-2 4-3 2-1 3-1" />
      <path d="M14 6c0 1.5-1 3-2.5 3S9 7.5 9 6s1-3 2.5-3S14 4.5 14 6z" />
    </svg>
  );
}

export function DatabaseIcon({ size = 20, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
      <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" opacity=".9" />
    </svg>
  );
}

export function GearIcon({ size = 20, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06A2 2 0 1 1 2.3 18.89l.06-.06A1.65 1.65 0 0 0 2.69 16.99 1.65 1.65 0 0 0 2 15v-.09a2 2 0 1 1 0-4V10.9a1.65 1.65 0 0 0 .69-1.9 1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 1 1 5.42 2.3l.06.06A1.65 1.65 0 0 0 7.3 2.69 1.65 1.65 0 0 0 9 2h.09a2 2 0 1 1 4 0H13a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06A2 2 0 1 1 21.7 5.11l-.06.06A1.65 1.65 0 0 0 21.31 7.01 1.65 1.65 0 0 0 22 9v.09a2 2 0 1 1 0 4V14.1a1.65 1.65 0 0 0-.69 1.9z" />
    </svg>
  );
}

export function ServiceIcon({ type, size = 28, className = '' }) {
  switch (type) {
    case 'globe': return <GlobeIcon size={size} className={className} />;
    case 'web': return <GlobeIcon size={size} className={className} />;
    case 'star': return <StarIcon size={size} className={className} />;
    case 'branding': return <StarIcon size={size} className={className} />;
    case 'desktop': return <DesktopAppIcon size={size} className={className} />;
    default: return null;
  }
}

export function BrowserDots() {
  return (
    <div className="flex gap-[5px] shrink-0">
      <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
      <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
      <span className="w-2 h-2 rounded-full bg-[#28c840]" />
    </div>
  );
}

export function BrowserUrlBar({ url, size = 'sm' }) {
  const iconSizePx = size === 'lg' ? 14 : 12;
  const textSize = size === 'lg' ? 'text-[.72rem]' : 'text-[.65rem]';
  const padding = size === 'lg' ? 'py-1.5 px-4' : 'py-1 px-3';
  return (
    <div className={`flex-1 flex items-center gap-2 bg-white/[.06] rounded-lg ${padding} ${textSize} text-white/50 tracking-wide whitespace-nowrap overflow-hidden text-ellipsis`}>
      <NorthCodeIcon size={iconSizePx} className="shrink-0 opacity-80" color="currentColor" />
      <span>{url}</span>
    </div>
  );
}

export function CompassSvg() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 overflow-visible theme-toggle-svg">
      <circle className="compass-ring" cx="12" cy="12" r="10.5" />
      <rect className="compass-tick" x="11.5" y="1" width="1" height="2.2" rx=".5" />
      <rect className="compass-tick" x="11.5" y="20.8" width="1" height="2.2" rx=".5" />
      <rect className="compass-tick" x="1" y="11.5" width="2.2" height="1" rx=".5" />
      <rect className="compass-tick" x="20.8" y="11.5" width="2.2" height="1" rx=".5" />
      <g className="compass-needle">
        <polygon className="compass-n" points="12,3.5 13.6,11.4 12,10.4 10.4,11.4" />
        <polygon className="compass-s" points="12,20.5 13.6,12.6 12,13.6 10.4,12.6" />
      </g>
      <circle className="compass-center" cx="12" cy="12" r="1.6" />
    </svg>
  );
}


export function SectionEyebrow({ children, className = '' }) {
  return (
    <p className={`flex items-center gap-3 text-xs tracking-[.14em] uppercase text-[var(--color-muted)] mb-4 ${className}`}>
      <span className="block w-6 h-px bg-[var(--color-coral)]" />
      {children}
    </p>
  );
}
