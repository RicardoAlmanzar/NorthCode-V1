import { useEffect, useRef, useState } from 'react';
import { SERVICES } from '../data/content';
import { useScrollRevealAll } from '../hooks/useScrollReveal';
import { BrowserDots, BrowserUrlBar, SectionEyebrow } from './ui/Icons';
import {
  LandingPageIcon,
  CorporateIcon,
  EcommerceIcon,
  WebAppsIcon,
  LogoIcon,
  VisualIdentityIcon,
  UIUXIcon,
  BrandGuideIcon,
  NativeAppsIcon,
  DashboardIcon,
  SaaSIcon,
  SystemsIcon,
} from './ui/IncludeIcons';

const INCLUDE_ICONS = {
  web: [
    { label: 'Landing pages', Component: LandingPageIcon },
    { label: 'Sitios corporativos', Component: CorporateIcon },
    { label: 'E-commerce', Component: EcommerceIcon },
    { label: 'Web apps', Component: WebAppsIcon },
  ],
  branding: [
    { label: 'Logo', Component: LogoIcon },
    { label: 'Identidad visual', Component: VisualIdentityIcon },
    { label: 'UI/UX', Component: UIUXIcon },
    { label: 'Guía de marca', Component: BrandGuideIcon },
  ],
  desktop: [
    { label: 'Apps nativas', Component: NativeAppsIcon },
    { label: 'Dashboards', Component: DashboardIcon },
    { label: 'SaaS', Component: SaaSIcon },
    { label: 'Sistemas', Component: SystemsIcon },
  ],
};

function ServiceVisual({ type, color }) {
  return (
    <div className={`service-visual service-visual--${type}`} style={{ '--visual-color': color }} aria-hidden="true">
      <div className="service-visual-bg" />

      {type === 'web' && (
        <div className="service-web-visual">
          <div className="service-web-window service-web-window--back" />
          <div className="service-web-window service-web-window--front">
            <div className="service-web-bar">
              <span />
              <span />
              <span />
            </div>
            <div className="service-web-body">
              <span className="service-web-line service-web-line--wide" />
              <span className="service-web-line" />
              <span className="service-web-line service-web-line--short" />
              <span className="service-web-chip" />
            </div>
          </div>
          <div className="service-web-cursor" />
        </div>
      )}

      {type === 'branding' && (
        <div className="service-brand-visual">
          <div className="service-brand-mark">
            <span className="service-brand-star" />
          </div>
          <span className="service-brand-swatch service-brand-swatch--one" />
          <span className="service-brand-swatch service-brand-swatch--two" />
          <span className="service-brand-type">Aa</span>
        </div>
      )}

      {type === 'desktop' && (
        <div className="service-desktop-visual">
          <div className="service-desktop-screen">
            <div className="service-desktop-sidebar" />
            <div className="service-desktop-panel service-desktop-panel--main" />
            <div className="service-desktop-panel service-desktop-panel--small" />
            <div className="service-desktop-chart">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="service-desktop-stand" />
        </div>
      )}
    </div>
  );
}

function ServiceCard({ service, stagger }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const media = window.matchMedia('(hover: none) and (pointer: coarse)');
    const update = () => setIsTouchDevice(media.matches);

    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);

  const svcColor = service.key === 'web' ? 'var(--color-coral)' : service.key === 'branding' ? '#7c3aed' : '#60a5fa';
  const includes = INCLUDE_ICONS[service.key] || [];

  const toggleCard = () => {
    if (isTouchDevice) {
      setIsFlipped(prev => !prev);
    }
  };

  const handleCotizarClick = (e) => {
    e.stopPropagation();
    // WhatsApp: (809) 841-0101
    window.open('https://wa.me/18098410101', '_blank');
  };

  const handleButtonMouseEnter = (e) => {
    e.stopPropagation();
  };

  const handleButtonMouseLeave = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={`reveal stagger-${stagger} w-full`}>
      <div
        className="relative w-full cursor-pointer select-none"
        onMouseEnter={(e) => {
          // No flip si el mouse está sobre el botón
          if (e.target.closest('button')) return;
          if (!isTouchDevice) setIsFlipped(true);
        }}
        onMouseLeave={(e) => {
          if (!isTouchDevice) setIsFlipped(false);
        }}
        onClick={toggleCard}
        onKeyDown={(event) => {
          if ((event.key === 'Enter' || event.key === ' ') && isTouchDevice) {
            event.preventDefault();
            toggleCard();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`${service.name} — ver más`}
      >
        <div
          className="relative w-full transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)]"
          style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          {/* Front */}
          <div style={{ backfaceVisibility: 'hidden' }} className="overflow-hidden rounded-2xl border border-white/[.08] bg-gradient-to-br from-white/[.08] to-white/[.02] backdrop-blur-sm shadow-[0_12px_35px_rgba(0,0,0,.25)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,.4)]">
            {/* Header Section with Browser Bar */}
            <div className="flex items-center gap-3 border-b border-white/[.06] bg-white/[.04] px-4 py-3">
              <BrowserDots />
              <BrowserUrlBar url={service.url} isDark={true} />
            </div>

            {/* Main Content */}
            <div className="flex flex-col gap-5 p-5">
              {/* Top Section: Title + Description + Visual Area */}
              <div className="flex gap-5">
                {/* Left: Title and Description */}
                <div className="flex-1 space-y-2.5">
                  <h3 className="font-heading text-xl font-bold text-white">{service.name}</h3>
                  <p className="text-xs leading-5 text-white/70">{service.description}</p>
                </div>

                {/* Right: Visual Area */}
                <div className="service-visual-shell">
                  <ServiceVisual type={service.key} color={svcColor} />
                </div>
              </div>

              {/* Incluye Section */}
              <div className="space-y-2.5 border-t border-white/[.06] pt-5">
                <p className="text-xs font-semibold uppercase tracking-[.2em] text-white/35">Incluye</p>
                <div className="grid grid-cols-2 gap-2">
                  {includes.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 rounded-lg border border-white/[.08] bg-white/[.03] px-2.5 py-2 transition-all duration-300 hover:bg-white/[.06] hover:border-white/[.12]">
                      <item.Component size={16} color={svcColor} />
                      <span className="text-xs font-medium text-white/75">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Footer */}
              <div className="flex items-center justify-between border-t border-white/[.06] pt-5">
                <div className="flex items-center gap-1.5 text-xs uppercase tracking-[.2em] text-white/35">
                  <span className="h-1 w-1 rounded-full" style={{ background: svcColor }} />
                  {service.key === 'web' ? 'Diseño y desarrollo' : service.key === 'branding' ? 'Identidad y experiencia' : 'Software a medida'}
                </div>
              </div>
            </div>
          </div>

          {/* Back */}
          <div style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} className="absolute inset-0 overflow-hidden rounded-2xl border border-white/[.08] bg-gradient-to-br from-white/[.08] to-white/[.02] backdrop-blur-sm shadow-[0_12px_35px_rgba(0,0,0,.25)]">
            {/* Header Section with Browser Bar */}
            <div className="flex items-center gap-3 border-b border-white/[.06] bg-white/[.04] px-4 py-3">
              <BrowserDots />
              <BrowserUrlBar url={service.url} isDark={true} />
            </div>

            {/* Main Content */}
            <div className="flex flex-col justify-between gap-5 p-5">
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white">{service.backSide.title}</h4>
                <p className="text-xs leading-relaxed text-white/70">{service.backSide.description}</p>
                
                <div className="space-y-2 pt-2">
                  <p className="text-xs font-semibold uppercase tracking-[.2em] text-white/35">Beneficios</p>
                  <ul className="space-y-1.5">
                    {service.backSide.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-white/70">
                        <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ background: svcColor }} />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-white/[.06] pt-4">
                <button
                  className="w-full rounded-lg px-4 py-2.5 text-xs font-medium transition-all duration-300"
                  style={{
                    color: 'white',
                    background: svcColor,
                    opacity: 0.9,
                  }}
                  onClick={handleCotizarClick}
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                    e.currentTarget.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.stopPropagation();
                    e.currentTarget.style.opacity = '0.9';
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    e.currentTarget.style.transform = 'scale(0.95)';
                    e.currentTarget.style.opacity = '0.8';
                  }}
                  onMouseUp={(e) => {
                    e.stopPropagation();
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  Cotizar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const containerRef = useRef(null);
  useScrollRevealAll(containerRef, '.reveal');

  return (
    <section
      id="services"
      ref={containerRef}
      aria-labelledby="services-heading"
      className="px-16 max-md:px-5 py-20 text-white section-services"
    >
      <SectionEyebrow className="reveal text-[var(--color-coral-lt)] before:bg-[var(--color-coral-lt)]">Servicios</SectionEyebrow>
      <h2 id="services-heading" className="reveal font-heading font-black leading-[1.15] text-[clamp(1.8rem,3vw,2.8rem)] mb-4 text-white">
        Lo que <em className="italic text-[var(--color-coral)]">hacemos</em>
      </h2>
      <p className="reveal text-white/55 max-w-[56ch] leading-[1.75] mb-12 text-base">
        Nos enfocamos en tres cosas y las hacemos bien.
      </p>

      <div className="grid grid-cols-3 max-md:grid-cols-1 gap-6">
        {SERVICES.map((service, index) => (
          <ServiceCard key={service.key} service={service} stagger={index + 1} />
        ))}
      </div>
    </section>
  );
}
