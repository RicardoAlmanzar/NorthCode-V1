import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { SERVICES, SVC_DETAIL } from '../data/content';
import { useScrollRevealAll } from '../hooks/useScrollReveal';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { ServiceIcon, BrowserDots, BrowserUrlBar, SectionEyebrow, CodeIcon, BrushIcon, DatabaseIcon, GearIcon } from './ui/Icons';

/* ─── Decorative background SVGs per service card ─── */
const SERVICE_DECOR = {
  web: [
    <svg key="w1" className="svc-decor svc-decor--1" width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <path d="M45 30L15 60l30 30M75 30l30 30-30 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M65 25L55 95" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>,
    <svg key="w2" className="svc-decor svc-decor--2" width="90" height="90" viewBox="0 0 90 90" fill="none" aria-hidden="true">
      <circle cx="45" cy="45" r="35" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="45" cy="45" rx="18" ry="35" stroke="currentColor" strokeWidth="2" />
      <path d="M10 45h70M14 28h62M14 62h62" stroke="currentColor" strokeWidth="1.5" />
    </svg>,
  ],
  branding: [
    <svg key="b1" className="svc-decor svc-decor--1" width="100" height="100" viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <path d="M70 10L20 60l-5 30 30-5L95 35 70 10z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M60 20l20 20M15 55l30-30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>,
    <svg key="b2" className="svc-decor svc-decor--2" width="100" height="100" viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <path d="M50 10C28 10 10 28 10 50s18 40 40 40c5 0 8-3 8-6.5 0-1.5-.5-3-1.5-4.5-1-1-1.5-2.5-1.5-4 0-3.5 3-6.5 6.5-6.5H70c16.5 0 20-10 20-20C90 28 72 10 50 10z" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="30" cy="40" r="5" fill="currentColor" opacity=".3" />
      <circle cx="58" cy="28" r="5" fill="currentColor" opacity=".3" />
    </svg>,
  ],
  desktop: [
    <svg key="d1" className="svc-decor svc-decor--1" width="110" height="100" viewBox="0 0 110 100" fill="none" aria-hidden="true">
      <rect x="5" y="5" width="100" height="65" rx="6" stroke="currentColor" strokeWidth="2.5" />
      <path d="M40 70v15M70 70v15M30 85h50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="20" y="20" width="30" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" opacity=".5" />
    </svg>,
    <svg key="d2" className="svc-decor svc-decor--2" width="100" height="80" viewBox="0 0 100 80" fill="none" aria-hidden="true">
      <rect x="5" y="5" width="90" height="70" rx="6" stroke="currentColor" strokeWidth="2" />
      <path d="M5 20h90" stroke="currentColor" strokeWidth="2" />
      <path d="M20 35l15 12-15 12M42 59h25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
  ],
};

/* Scope icons & colors for the service cards */
const SCOPE_ICON_POOL = [
  <CodeIcon key="c" size={18} />,
  <BrushIcon key="b" size={18} />,
  <DatabaseIcon key="d" size={18} />,
  <GearIcon key="g" size={18} />,
];
const SCOPE_COLOR_POOL = ['#e8614a', '#7c3aed', '#06b6d4', '#60a5fa'];

/* ─── Service Card ─── */
function ServiceCard({ service, onOpenDetail, stagger }) {
  return (
    <div
      className={`reveal stagger-${stagger} border border-white/[.08] bg-white/[.04] rounded-lg overflow-hidden relative cursor-pointer transition-[transform,border-color,background-color,box-shadow,opacity] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] hover:shadow-[0_10px_28px_rgba(0,0,0,.22)] group`}
      style={{ borderBottom: `2px solid ${service.key === 'web' ? 'var(--color-coral)' : service.key === 'branding' ? '#7c3aed' : '#60a5fa'}` }}
      tabIndex={0}
      role="button"
      aria-label={`${service.name} — Ver detalles`}
      data-service={service.key}
      onClick={() => onOpenDetail(service.key)}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpenDetail(service.key); } }}
    >
      {/* Hover overlay */}
      <div className="absolute inset-0 z-[2] flex items-end justify-center pb-6 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-350 pointer-events-none rounded-[inherit]" aria-hidden="true">
        <span className="inline-flex items-center gap-2 bg-[var(--color-coral)] text-white text-[.78rem] font-semibold tracking-[.04em] px-5 py-2 rounded-full shadow-[0_4px_16px_rgba(232,97,74,.35)] translate-y-2 group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(.2,.8,.2,1)]">
          Ver más →
        </span>
      </div>
      {/* Browser bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white/[.04] border-b border-white/[.06]">
        <BrowserDots />
        <BrowserUrlBar url={service.url} isDark={true} />
      </div>
      {/* Body */}
      <div className="p-5 pb-6">
        <div className="text-[1.3rem] mb-4" aria-hidden="true">
          {(() => {
            const svcColor = service.key === 'web' ? 'var(--color-coral)' : service.key === 'branding' ? '#7c3aed' : '#60a5fa';
            return (
              <div style={{ color: svcColor }}>
                <ServiceIcon type={service.icon} />
              </div>
            );
          })()}
        </div>
        <h3 className="font-heading text-[1.15rem] mb-3 text-white">{service.name}</h3>
        <ul className="list-none">
          {service.items.map((item, j) => (
            <li key={j} className="text-[.82rem] text-white/55 py-2 border-b border-white/[.05] last:border-b-0 flex justify-between items-center">
              {item.label}
              <span className="text-[.75rem] text-[var(--color-coral)] font-medium">{item.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MINI-PAGE PRIMITIVES (shared across 3 layouts)
═══════════════════════════════════════════ */

function PriceBadge({ label, color }) {
  return (
    <span className="svc-page-badge" style={{ borderColor: `${color}50`, color }}>
      <span className="svc-page-badge-dot" style={{ background: color }} />
      {label}
    </span>
  );
}

function InfoCard({ children, className = '', style }) {
  return (
    <div className={`svc-info-card ${className}`} style={style}>
      {children}
    </div>
  );
}

function CardHeading({ children }) {
  return (
    <h3 className="text-[.6rem] font-semibold tracking-[.16em] uppercase text-white/30 mb-4 pb-3 border-b border-white/[.06]">
      {children}
    </h3>
  );
}

/* ═══════════════════════════════════════════
   WEB SERVICE PAGE
═══════════════════════════════════════════ */
const WEB_ICONS = [
  <svg key="a" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
  <svg key="b" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>,
  <svg key="c" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>,
  <svg key="d" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>,
  <svg key="e" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" /></svg>,
];
const WEB_COLORS = ['#e8614a', '#06b6d4', '#10b981', '#f59e0b', '#8b5cf6'];

function WebServicePage({ data, svc, onClose }) {
  const COLOR = '#e8614a';
  const scope = data.sections[0]?.items ?? [];
  const times = data.sections[1]?.items ?? [];
  const flow = data.sections[2]?.items ?? [];
  const deliver = data.sections[3]?.items ?? [];

  return (
    <div className="svc-page-root">
      <header className="svc-page-header">
        <div className="svc-page-header-left">
          <div className="svc-page-icon-pill" style={{ background: `${COLOR}18`, color: COLOR }}>
            <ServiceIcon type={svc.icon} size={22} />
          </div>
          <h1 className="svc-page-title font-heading text-white">
            {data.title} <em style={{ color: COLOR, fontStyle: 'italic' }}>Services</em>
          </h1>
          <p className="svc-page-desc text-white/50">{data.shortDesc}</p>
          <PriceBadge label={data.priceLabel} color={COLOR} />
        </div>
        <div className="svc-page-decor" aria-hidden="true" style={{ borderColor: `${COLOR}28`, background: `${COLOR}08` }}>
          <svg width="52" height="52" viewBox="0 0 60 60" fill="none" stroke={COLOR} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 14L8 30l14 16M38 14l14 16-14 16" /><path d="M33 10L27 50" />
          </svg>
        </div>
      </header>

      <div className="svc-page-grid">
        {/* Scope */}
        <InfoCard className="svc-page-card--scope">
          <CardHeading>Development Scope</CardHeading>
          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-2.5">
            {scope.map((it, i) => (
              <div key={i} className="svc-scope-item">
                <span className="svc-scope-icon" style={{ background: `${WEB_COLORS[i % WEB_COLORS.length]}1a`, color: WEB_COLORS[i % WEB_COLORS.length] }}>
                  {WEB_ICONS[i % WEB_ICONS.length]}
                </span>
                <div>
                  <p className="text-[.8rem] font-semibold text-white/88 leading-tight">{it.name}</p>
                  <p className="text-[.7rem] text-white/38 mt-0.5">{it.tag}</p>
                </div>
              </div>
            ))}
          </div>
        </InfoCard>

        {/* Delivery Time */}
        <InfoCard className="svc-page-card--time">
          <CardHeading>Delivery Time</CardHeading>
          <ul className="space-y-3.5">
            {times.map((it, i) => (
              <li key={i} className="flex items-center justify-between gap-3 group">
                <span className="text-[.82rem] font-medium text-white/75 group-hover:text-white transition-colors duration-150">{it.name}</span>
                <span className="svc-time-pill" style={{ borderColor: `${COLOR}35`, color: COLOR }}>{it.duration ?? it.tag}</span>
              </li>
            ))}
          </ul>
        </InfoCard>

        {/* Workflow */}
        <InfoCard className="svc-page-card--flow">
          <CardHeading>Workflow</CardHeading>
          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-2.5">
            {flow.slice(0, 4).map((step, i) => {
              const active = i === 0;
              return (
                <div key={i} className="svc-flow-step">
                  <div className="svc-flow-num font-mono" style={active ? { background: COLOR, boxShadow: `0 0 0 3px ${COLOR}38`, color: '#fff' } : { background: 'rgba(255,255,255,.06)', color: 'rgba(255,255,255,.35)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="svc-flow-body" style={active ? { borderColor: `${COLOR}45`, background: `${COLOR}08` } : {}}>
                    <p className="text-[.78rem] font-bold leading-tight mb-1" style={{ color: active ? COLOR : 'white', opacity: active ? 1 : 0.82 }}>{step.title}</p>
                    <p className="text-[.7rem] text-white/40 leading-snug">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </InfoCard>

        {/* CTA */}
        <InfoCard className="svc-page-card--cta" style={{ background: `linear-gradient(135deg, ${COLOR} 0%, #c14836 100%)` }}>
          <div className="svc-cta-glow" />
          <div className="relative z-10 h-full flex flex-col">
            <span className="text-white/65 text-[.7rem] italic font-serif mb-1 block">— Entregables</span>
            <h3 className="text-[1rem] font-bold text-white mb-4 font-heading">Ready to launch?</h3>
            <ul className="space-y-2 mb-5 flex-1">
              {deliver.slice(0, 4).map((it, k) => (
                <li key={k} className="flex items-center gap-2">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.88)" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                  <span className="text-[.76rem] text-white/88">{it.name}</span>
                </li>
              ))}
            </ul>
            <button onClick={onClose} className="svc-cta-btn">
              Cotizar proyecto
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </div>
        </InfoCard>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   BRANDING SERVICE PAGE
═══════════════════════════════════════════ */
const BRAND_ICONS = [
  <svg key="a" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" /></svg>,
  <svg key="b" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  <svg key="c" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2z" /><path d="M7 7h.01" /></svg>,
  <svg key="d" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
  <svg key="e" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
];
const BRAND_COLORS = ['#a855f7', '#ec4899', '#7c3aed', '#8b5cf6', '#d946ef'];

function BrandingServicePage({ data, svc, onClose }) {
  const COLOR = '#7c3aed';
  const scope = data.sections[0]?.items ?? [];
  const times = data.sections[1]?.items ?? [];
  const flow = data.sections[2]?.items ?? [];
  const deliver = data.sections[3]?.items ?? [];

  return (
    <div className="svc-page-root">
      <header className="svc-page-header">
        <div className="svc-page-header-left">
          <div className="svc-page-icon-pill" style={{ background: `${COLOR}18`, color: COLOR }}>
            <ServiceIcon type={svc.icon} size={22} />
          </div>
          <h1 className="svc-page-title font-heading text-white">
            {data.title} <em style={{ color: COLOR, fontStyle: 'italic' }}>Studio</em>
          </h1>
          <p className="svc-page-desc text-white/50">{data.shortDesc}</p>
          <PriceBadge label={data.priceLabel} color={COLOR} />
        </div>
        <div className="svc-page-decor" aria-hidden="true" style={{ borderColor: `${COLOR}28`, background: `${COLOR}08` }}>
          <svg width="52" height="52" viewBox="0 0 60 60" fill="none" stroke={COLOR} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M42 5L15 32l-4 18 18-4L56 19 42 5z" />
            <path d="M36 11l14 14M9 31l20-20" />
            <circle cx="11" cy="49" r="3" fill={COLOR} opacity=".45" />
          </svg>
        </div>
      </header>

      <div className="svc-page-grid">
        {/* Brand Kit */}
        <InfoCard className="svc-page-card--scope">
          <CardHeading>Brand Kit</CardHeading>
          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-2.5">
            {scope.map((it, i) => (
              <div key={i} className="svc-scope-item">
                <span className="svc-scope-icon" style={{ background: `${BRAND_COLORS[i % BRAND_COLORS.length]}1a`, color: BRAND_COLORS[i % BRAND_COLORS.length] }}>
                  {BRAND_ICONS[i % BRAND_ICONS.length]}
                </span>
                <div>
                  <p className="text-[.8rem] font-semibold text-white/88 leading-tight">{it.name}</p>
                  <p className="text-[.7rem] text-white/38 mt-0.5">{it.tag}</p>
                </div>
              </div>
            ))}
          </div>
        </InfoCard>

        {/* Plazos */}
        <InfoCard className="svc-page-card--time">
          <CardHeading>Plazos estimados</CardHeading>
          <ul className="space-y-3.5">
            {times.map((it, i) => (
              <li key={i} className="flex items-center justify-between gap-3 group">
                <span className="text-[.82rem] font-medium text-white/75 group-hover:text-white transition-colors duration-150">{it.name}</span>
                <span className="svc-time-pill" style={{ borderColor: `${COLOR}35`, color: COLOR }}>{it.duration ?? it.tag}</span>
              </li>
            ))}
          </ul>
        </InfoCard>

        {/* Proceso creativo — vertical numbered list */}
        <InfoCard className="svc-page-card--flow">
          <CardHeading>Proceso creativo</CardHeading>
          <ol className="flex flex-col gap-3">
            {flow.slice(0, 5).map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[.62rem] font-bold mt-0.5"
                  style={{ background: i === 0 ? COLOR : `${COLOR}1e`, color: i === 0 ? '#fff' : `${COLOR}cc` }}>
                  {i + 1}
                </span>
                <div>
                  <p className="text-[.8rem] font-semibold text-white/85">{step.title}</p>
                  <p className="text-[.7rem] text-white/40 leading-snug mt-0.5">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </InfoCard>

        {/* CTA purple */}
        <InfoCard className="svc-page-card--cta" style={{ background: `linear-gradient(135deg, ${COLOR} 0%, #4c1d95 100%)` }}>
          <div className="svc-cta-glow" />
          <div className="relative z-10 h-full flex flex-col">
            <span className="text-white/65 text-[.7rem] italic font-serif mb-1 block">— Entregables</span>
            <h3 className="text-[1rem] font-bold text-white mb-4 font-heading">Todo listo para usar</h3>
            <ul className="space-y-2 mb-5 flex-1">
              {deliver.slice(0, 4).map((it, k) => (
                <li key={k} className="flex items-center gap-2">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.88)" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                  <span className="text-[.76rem] text-white/88">{it.name}</span>
                </li>
              ))}
            </ul>
            <button onClick={onClose} className="svc-cta-btn">
              Iniciar proyecto
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </div>
        </InfoCard>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   DESKTOP SERVICE PAGE
═══════════════════════════════════════════ */
const DESK_ICONS = [
  <svg key="a" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>,
  <svg key="b" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" /><path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" opacity=".9" /></svg>,
  <svg key="c" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>,
  <svg key="d" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  <svg key="e" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
];
const DESK_COLORS = ['#60a5fa', '#34d399', '#a78bfa', '#fb923c', '#22d3ee'];

function DesktopServicePage({ data, svc, onClose }) {
  const COLOR = '#60a5fa';
  const scope = data.sections[0]?.items ?? [];
  const times = data.sections[1]?.items ?? [];
  const flow = data.sections[2]?.items ?? [];
  const deliver = data.sections[3]?.items ?? [];

  return (
    <div className="svc-page-root">
      <header className="svc-page-header">
        <div className="svc-page-header-left">
          <div className="svc-page-icon-pill" style={{ background: `${COLOR}18`, color: COLOR }}>
            <ServiceIcon type={svc.icon} size={22} />
          </div>
          <h1 className="svc-page-title font-heading text-white">
            {data.title} <em style={{ color: COLOR, fontStyle: 'italic' }}>Platform</em>
          </h1>
          <p className="svc-page-desc text-white/50">{data.shortDesc}</p>
          <PriceBadge label={data.priceLabel} color={COLOR} />
        </div>
        <div className="svc-page-decor" aria-hidden="true" style={{ borderColor: `${COLOR}28`, background: `${COLOR}08` }}>
          <svg width="52" height="52" viewBox="0 0 60 60" fill="none" stroke={COLOR} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="4" width="52" height="36" rx="4" />
            <path d="M20 40v10M40 40v10M14 50h32" />
            <path d="M12 20l8 6-8 6M28 26h14" />
          </svg>
        </div>
      </header>

      <div className="svc-page-grid">
        {/* Módulos */}
        <InfoCard className="svc-page-card--scope">
          <CardHeading>Módulos del sistema</CardHeading>
          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-2.5">
            {scope.map((it, i) => (
              <div key={i} className="svc-scope-item">
                <span className="svc-scope-icon" style={{ background: `${DESK_COLORS[i % DESK_COLORS.length]}1a`, color: DESK_COLORS[i % DESK_COLORS.length] }}>
                  {DESK_ICONS[i % DESK_ICONS.length]}
                </span>
                <div>
                  <p className="text-[.8rem] font-semibold text-white/88 leading-tight">{it.name}</p>
                  <p className="text-[.7rem] text-white/38 mt-0.5">{it.tag}</p>
                </div>
              </div>
            ))}
          </div>
        </InfoCard>

        {/* Tiempo */}
        <InfoCard className="svc-page-card--time">
          <CardHeading>Tiempo de entrega</CardHeading>
          <ul className="space-y-3.5">
            {times.map((it, i) => (
              <li key={i} className="flex items-center justify-between gap-3 group">
                <span className="text-[.82rem] font-medium text-white/75 group-hover:text-white transition-colors duration-150">{it.name}</span>
                <span className="svc-time-pill" style={{ borderColor: `${COLOR}35`, color: COLOR }}>{it.duration ?? it.tag}</span>
              </li>
            ))}
          </ul>
        </InfoCard>

        {/* Pipeline */}
        <InfoCard className="svc-page-card--flow">
          <CardHeading>Pipeline de desarrollo</CardHeading>
          <ol className="flex flex-col gap-3">
            {flow.slice(0, 5).map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[.62rem] font-bold font-mono mt-0.5"
                  style={{ background: i === 0 ? COLOR : `${COLOR}1e`, color: i === 0 ? 'var(--color-ink)' : `${COLOR}cc` }}>
                  {i + 1}
                </span>
                <div>
                  <p className="text-[.8rem] font-semibold text-white/85">{step.title}</p>
                  <p className="text-[.7rem] text-white/40 leading-snug mt-0.5">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </InfoCard>

        {/* CTA navy/blue */}
        <InfoCard className="svc-page-card--cta" style={{ background: `linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)` }}>
          <div className="svc-cta-glow" style={{ background: `radial-gradient(circle at 80% 20%, ${COLOR}25, transparent 65%)` }} />
          <div className="relative z-10 h-full flex flex-col">
            <span className="text-white/65 text-[.7rem] italic font-serif mb-1 block">— Entregables</span>
            <h3 className="text-[1rem] font-bold text-white mb-4 font-heading">Listo para producción</h3>
            <ul className="space-y-2 mb-5 flex-1">
              {deliver.slice(0, 4).map((it, k) => (
                <li key={k} className="flex items-center gap-2">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.88)" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                  <span className="text-[.76rem] text-white/88">{it.name}</span>
                </li>
              ))}
            </ul>
            <button onClick={onClose} className="svc-cta-btn" style={{ color: '#1e3a8a' }}>
              Iniciar proyecto
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </div>
        </InfoCard>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SERVICE MODAL SHELL
═══════════════════════════════════════════ */
function ServiceModal({ serviceKey, isOpen, onClose }) {
  const data = serviceKey ? SVC_DETAIL[serviceKey] : null;
  const svc = serviceKey ? SERVICES.find(s => s.key === serviceKey) : null;
  const trapRef = useFocusTrap(isOpen);
  const closeBtnRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (panelRef.current) panelRef.current.scrollTop = 0;
      requestAnimationFrame(() => closeBtnRef.current?.focus());
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape' && isOpen) onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!data || !svc) return null;

  return (
    <div
      className={`fixed inset-0 z-[210] flex items-end justify-center sm:items-center transition-[opacity,visibility] duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-[rgba(5,11,20,.82)] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={el => { trapRef.current = el; panelRef.current = el; }}
        role="dialog"
        aria-modal="true"
        aria-label={`Detalle ${data.title}`}
        className={`relative w-[min(880px,96vw)] max-sm:w-full max-h-[90vh] max-sm:max-h-[93dvh] overflow-y-auto overscroll-contain rounded-2xl max-sm:rounded-b-none border border-white/[.07] shadow-[0_40px_100px_rgba(0,0,0,.6)] transition-[transform,opacity] duration-400 ease-[cubic-bezier(.2,.8,.2,1)] will-change-transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        style={{ background: '#111a27', WebkitOverflowScrolling: 'touch' }}
      >
        {/* Top bar */}
        <div className="sticky top-0 z-[3] flex items-center gap-3 px-4 py-2.5 bg-[#111a27]/95 backdrop-blur-md border-b border-white/[.06]">
          <BrowserDots />
          <BrowserUrlBar url={data.url} size="lg" isDark={true} />
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="ml-auto w-7 h-7 border-none rounded-full bg-white/[.07] text-white/45 text-sm leading-none cursor-pointer flex items-center justify-center shrink-0 transition-[background,color,transform] duration-200 hover:bg-white/[.13] hover:text-white hover:scale-110 active:scale-95"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* Per-service page */}
        {svc.key === 'web' && <WebServicePage data={data} svc={svc} onClose={onClose} />}
        {svc.key === 'branding' && <BrandingServicePage data={data} svc={svc} onClose={onClose} />}
        {svc.key === 'desktop' && <DesktopServicePage data={data} svc={svc} onClose={onClose} />}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SERVICES SECTION
═══════════════════════════════════════════ */
export default function Services() {
  const [modalKey, setModalKey] = useState(null);
  const containerRef = useRef(null);
  useScrollRevealAll(containerRef, '.reveal');

  const openDetail = useCallback(key => {
    const show = () => setModalKey(key);
    if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.startViewTransition(show);
    } else {
      show();
    }
  }, []);

  const closeDetail = useCallback(() => {
    const hide = () => setModalKey(null);
    if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.startViewTransition(hide);
    } else {
      hide();
    }
  }, []);

  return (
    <>
      <section
        id="services"
        ref={containerRef}
        aria-labelledby="services-heading"
        className="px-16 max-md:px-5 py-20 bg-[#111a27] text-white section-services border-t border-white/[.05]"
      >
        <SectionEyebrow className="reveal text-[var(--color-coral-lt)] before:bg-[var(--color-coral-lt)]">Servicios</SectionEyebrow>
        <h2 id="services-heading" className="reveal font-heading font-black leading-[1.15] text-[clamp(1.8rem,3vw,2.8rem)] mb-4 text-white">
          Lo que <em className="italic text-[var(--color-coral)]">hacemos</em>
        </h2>
        <p className="reveal text-white/55 max-w-[56ch] leading-[1.75] mb-12 text-base">
          Nos enfocamos en tres cosas y las hacemos bien.
        </p>

        <div className="grid grid-cols-3 max-md:grid-cols-1 gap-6">
          {SERVICES.map((svc, i) => (
            <ServiceCard key={svc.key} service={svc} stagger={i + 1} onOpenDetail={openDetail} />
          ))}
        </div>
      </section>

      <ServiceModal serviceKey={modalKey} isOpen={!!modalKey} onClose={closeDetail} />
    </>
  );
}
