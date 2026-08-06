import { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import { CompassSvg, NorthCodeLogo } from './ui/Icons';
import Button from './ui/Button';

const NAV_LINKS = [
  { href: '#work', label: 'Portafolio' },
  { href: '#services', label: 'Servicios' },
  { href: '#about', label: 'Nosotros' },
];

export default function Navbar() {
  const { dark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navRef = useRef(null);

  // Scroll state — only update when boolean actually changes
  useEffect(() => {
    let last = window.scrollY > 40;
    setScrolled(last);
    const onScroll = () => {
      const next = window.scrollY > 40;
      if (next !== last) { last = next; setScrolled(next); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll spy
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-4 left-1/2 z-[100] -translate-x-1/2 w-[min(56vw,620px)] max-w-[620px] px-3 py-2 md:px-4 md:py-3 border border-white/10 rounded-full bg-slate-950/45 shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl transition duration-300 ${scrolled ? 'bg-slate-950/65 shadow-[0_18px_70px_rgba(0,0,0,0.24)] border-white/15' : 'bg-slate-950/45'}`}
        aria-label="Navegación principal"
      >
        <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-4">
          <div className="flex items-center gap-2.5">
            <a href="#hero" className="no-underline transition-opacity duration-300 hover:opacity-80 flex items-center gap-2.5" aria-label="NorthCode — Inicio">
              <img src="/favicon.png" alt="NorthCode Logo" width={48} height={48} className="h-11 w-11 object-contain" />
              <span className="text-[0.88rem] font-semibold text-white">NorthCode</span>
            </a>
          </div>

          <div className="hidden md:flex justify-center">
            <ul className="list-none flex items-center gap-6">
              {NAV_LINKS.map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={closeMobile}
                    aria-current={activeSection === l.href.slice(1) ? 'true' : undefined}
                    className={`link-slide relative no-underline text-[0.78rem] font-medium tracking-[.08em] text-white/80 transition-colors duration-300 ${activeSection === l.href.slice(1) ? 'text-white' : 'hover:text-[var(--color-coral)]'}`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-end gap-2.5">
            <div className="hidden md:block">
              <Button
                href="#contact"
                onClick={closeMobile}
                className="whitespace-nowrap !text-[0.72rem] !px-4 !py-2.5 font-semibold tracking-[.04em] capitalize bg-[var(--color-coral)] text-white shadow-[0_10px_30px_rgba(222,108,58,0.18)] backdrop-blur-sm border border-[rgba(222,108,58,0.2)] hover:bg-[#f0753d]"
                aria-label="Contacto"
              >
                Contacto
              </Button>
            </div>

            <button
              className="md:hidden flex w-9 h-9 border-none bg-white/10 text-white rounded-full cursor-pointer p-0 flex-col items-center justify-center gap-[3px] transition hover:bg-white/15"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileOpen}
            >
              <span className={`block w-[18px] h-[2px] bg-white rounded-sm transition-transform duration-300 ${mobileOpen ? 'translate-y-[6px] rotate-45' : ''}`} />
              <span className={`block w-[18px] h-[2px] bg-white rounded-sm transition-opacity duration-300 ${mobileOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}`} />
              <span className={`block w-[18px] h-[2px] bg-white rounded-sm transition-transform duration-300 ${mobileOpen ? '-translate-y-[6px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>

        <div className={`md:hidden absolute left-1/2 top-full z-[50] mt-2 w-[min(84vw,300px)] -translate-x-1/2 rounded-[28px] border border-white/20 bg-white/10 backdrop-blur-xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition duration-300 ${mobileOpen ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'}`}>
          <ul className="list-none flex flex-col gap-3">
            {NAV_LINKS.map(l => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={closeMobile}
                  aria-current={activeSection === l.href.slice(1) ? 'true' : undefined}
                  className={`block no-underline text-[0.88rem] font-semibold tracking-[.06em] text-white/85 transition-colors duration-300 ${activeSection === l.href.slice(1) ? 'text-white' : 'hover:text-[var(--color-coral)]'}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <Button href="#contact" onClick={closeMobile} className="mt-3 w-full justify-center whitespace-nowrap !text-[0.78rem] !py-2.5" aria-label="Solicitar cotización de proyecto">
            Solicitar cotización
          </Button>
        </div>
      </nav>
    </>
  );
}
