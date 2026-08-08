import { useTheme } from '../context/ThemeContext';
import { NorthCodeIcon } from './ui/Icons';

function SocialIcon({ type }) {
  const icons = {
    instagram: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
    tiktok: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 3v6.5a3.5 3.5 0 1 1-3.5-3.5" />
        <path d="M8 13.5A4.5 4.5 0 1 0 12.5 9" />
      </svg>
    ),
    github: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2c-2.2 0-4 1-5.2 2.6-1.1 1.9-.8 4.3-.2 6.1.6 1.9 2.1 3.3 3.9 4.1.2.1.3.3.2.5-.2.9-.6 2.7-.7 3.9 0 .2.2.3.4.2 1.2-.4 3.3-1.4 4.8-3 .1-.1.3 0 .3.1.6 1.6 1.8 2.9 3.7 3.6.1.1.3 0 .3-.1.1-1 .4-2.9.2-3.9 0-.2.1-.4.3-.5 1.8-.8 3.3-2.2 3.9-4.1.6-1.8.9-4.2-.2-6.1C16 3 14 2 12 2z" />
      </svg>
    ),
  };

  const srcMap = {
    instagram: '/img/icons/instagram.svg',
    tiktok: '/img/icons/tiktok.svg',
    github: '/img/icons/github.svg',
  };

  const src = srcMap[type];
  if (!src) return null;

  return (
    <img
      src={src}
      alt={type}
      className="footer-social-icon"
    />
  );
}

export default function Footer() {
  const { dark } = useTheme();

  return (
    <footer className="bg-[var(--color-cream)] dark:bg-[#0d1b2a] text-[var(--color-muted)] dark:text-white/70 px-8 md:px-16 py-12 section-footer border-t border-[var(--color-border)]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 text-center md:flex-row md:items-start md:justify-between md:text-left">
        <a href="#hero" className="flex items-center justify-center gap-3 no-underline transition-opacity duration-300 hover:opacity-80 md:justify-start" aria-label="Volver al inicio">
          <img src="/favicon.png" alt="NorthCode favicon" width="56" height="56" className="h-14 w-14 rounded-md object-contain" />
          <span className="text-sm font-semibold text-[var(--color-foreground)] dark:text-white">NorthCode</span>
        </a>

        <div className="grid w-full max-w-md justify-items-center gap-8 md:w-[40%] md:max-w-none md:grid-cols-2 md:justify-items-start">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-sm font-semibold text-[var(--color-foreground)] dark:text-white mb-4">Navegación</p>
            <ul className="m-0 flex list-none flex-col gap-4 p-0 text-sm text-[var(--color-muted)] dark:text-white/70">
              {[
                { href: '#work', label: 'Portafolio' },
                { href: '#services', label: 'Servicios' },
                { href: '#about', label: 'Nosotros' },
              ].map((item, index) => (
                <li key={item.href} className={index === 0 ? 'mt-4' : ''}>
                  <a href={item.href} className="inline-block transition-colors duration-300 hover:text-[var(--color-coral)]">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <p className="text-sm font-semibold text-[var(--color-foreground)] dark:text-white mb-4">Contactanos</p>
            <div className="flex w-full flex-col items-center gap-2 text-[.88rem] text-white/60 md:items-start">
              <div className="flex min-h-[44px] items-center justify-center gap-3 text-[.88rem] text-white/60 md:justify-start">
                <div className="w-[2.2rem] h-[2.2rem] flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m2 7 10 7 10-7" />
                  </svg>
                </div>
                <a href="mailto:contact@northcoderd.com" className="transition-colors duration-300 hover:text-[var(--color-coral)]">contact@northcoderd.com</a>
              </div>
              <div className="flex min-h-[44px] items-center justify-center gap-3 text-[.88rem] text-white/60 md:justify-start">
                <div className="w-[2.2rem] h-[2.2rem] flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72 12.34 12.34 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.34 12.34 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <a href="tel:+18098410101" className="transition-colors duration-300 hover:text-[var(--color-coral)]">+1 (809) 841-0101</a>
              </div>
              <div className="flex min-h-[44px] items-center justify-center gap-3 text-[.88rem] text-white/60 md:justify-start">
                <div className="w-[2.2rem] h-[2.2rem] flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Santo%20Domingo%2C%20Rep%C3%BAblica%20Dominicana"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors duration-300 hover:text-[var(--color-coral)]"
                >
                  Santo Domingo, República Dominicana
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 md:items-start">
          <div>
            <p className="text-sm font-semibold text-[var(--color-foreground)] dark:text-white mb-4">Síguenos</p>
            <ul className="footer-social-list">
              {[
                { href: 'https://www.instagram.com/northcode.rd?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', type: 'instagram', label: 'Instagram' },
                { href: 'https://www.tiktok.com/@northcoderd', type: 'tiktok', label: 'TikTok' },
                { href: 'https://github.com/', type: 'github', label: 'GitHub' },
              ].map(item => (
                <li key={item.type} className="footer-social-item">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    data-social={item.type}
                    className="footer-social-link"
                  >
                    <span className="footer-social-fill" />
                    <SocialIcon type={item.type} />
                  </a>
                  <span className="footer-social-tooltip">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-xs opacity-50">© 2026 NorthCode</div>
    </footer>
  );
}
