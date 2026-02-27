import { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import { CompassSvg, NorthCodeLogo } from './ui/Icons';
import Button from './ui/Button';

const NAV_LINKS = [
  { href: '#work', label: 'Portafolio' },
  { href: '#services', label: 'Servicios' },
  { href: '#about', label: 'Nosotros' },
  { href: '#contact', label: 'Contacto' },
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
      <div className="h-[72px] max-md:h-[60px]" aria-hidden="true" />
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-16 py-4 max-md:px-6 max-md:flex-wrap border-b border-transparent transition-[background-color,border-color,box-shadow,color] duration-350 ease-[cubic-bezier(.2,.8,.2,1)] ${scrolled || mobileOpen ? 'nav-scrolled border-[var(--color-border)] text-[var(--color-ink)]' : 'bg-transparent'
          }`}
        aria-label="Navegación principal"
      >
        <a href="#hero" className="no-underline transition-opacity duration-300 hover:opacity-80" aria-label="NorthCode — Inicio">
          <NorthCodeLogo size={34} color={scrolled || mobileOpen ? "var(--color-ink)" : (dark ? "#e8ecf0" : "#0d1b2a")} />
        </a>

        {/* Hamburger */}
        <button
          className="hidden max-md:flex w-11 h-11 border-none bg-none cursor-pointer p-0 flex-col items-center justify-center gap-[5px] order-3"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={mobileOpen}
        >
          <span className={`block w-[22px] h-[2px] bg-[var(--color-ink)] rounded-sm transition-[transform,opacity] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] ${mobileOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block w-[22px] h-[2px] bg-[var(--color-ink)] rounded-sm transition-[opacity,transform] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-[22px] h-[2px] bg-[var(--color-ink)] rounded-sm transition-[transform,opacity] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] ${mobileOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>

        {/* Links */}
        <ul
          className={`list-none flex gap-8 max-md:flex-col max-md:w-full max-md:order-5 max-md:gap-0 max-md:overflow-hidden max-md:transition-[max-height,padding,opacity] max-md:duration-400 max-md:ease-[cubic-bezier(.2,.8,.2,1)] ${mobileOpen ? 'max-md:max-h-[500px] max-md:py-8 max-md:opacity-100' : 'max-md:max-h-0 max-md:py-0 max-md:opacity-0'}`}
        >
          {/* Mobile-only header inside menu for context */}
          <li className="hidden max-md:block mb-6">
            <p className="text-[.7rem] tracking-[.15em] uppercase text-[var(--color-coral)] font-bold opacity-70">
              Diseño & Desarrollo Web
            </p>
          </li>

          {NAV_LINKS.map(l => (
            <li key={l.href} className="max-md:w-full">
              <a
                href={l.href}
                onClick={closeMobile}
                aria-current={activeSection === l.href.slice(1) ? 'true' : undefined}
                className={`link-slide relative no-underline text-[.82rem] font-medium tracking-[.06em] uppercase py-2 min-h-[44px] inline-flex items-center transition-colors duration-300 max-md:w-full max-md:py-3 max-md:text-[.9rem] max-md:border-b max-md:border-[var(--color-border)] ${activeSection === l.href.slice(1) ? 'text-[var(--color-coral)]' : 'text-[var(--color-ink)] hover:text-[var(--color-coral)]'
                  }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="relative w-11 h-11 border-none bg-none cursor-pointer flex items-center justify-center rounded-full transition-shadow duration-300 hover:shadow-[0_0_12px_rgba(26,58,92,.25)] active:scale-[.93]"
          aria-label={dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          aria-pressed={dark}
        >
          <CompassSvg />
        </button>

        <Button
          href="#contact"
          onClick={closeMobile}
          className="text-[.82rem] font-semibold tracking-[.04em] uppercase max-md:order-4 max-md:w-full max-md:mt-4 max-md:hidden"
          aria-label="Solicitar cotización de proyecto"
        >
          Cotizar proyecto
        </Button>
        {/* Mobile-only button at bottom of list */}
        <div className={`hidden max-md:block w-full order-6 transition-all duration-400 delay-100 ${mobileOpen ? 'opacity-100 translate-y-0 mt-8' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          <Button href="#contact" onClick={closeMobile} className="w-full" aria-label="Solicitar cotización de proyecto">
            Cotizar proyecto
          </Button>
        </div>
      </nav>
    </>
  );
}
