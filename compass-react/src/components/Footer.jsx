import { useTheme } from '../context/ThemeContext';
import { NorthCodeLogo } from './ui/Icons';

export default function Footer() {
  const { dark } = useTheme();

  return (
    <footer className="bg-[var(--color-cream)] dark:bg-[#0d1b2a] text-[var(--color-muted)] dark:text-white/55 px-16 max-md:px-5 py-12 flex max-md:flex-col justify-between items-center text-[.8rem] max-md:gap-4 max-md:text-center section-footer border-t border-[var(--color-border)]">
      <div>
        <NorthCodeLogo size={28} color={dark ? '#e8ecf0' : '#0d1b2a'} />
      </div>
      <ul className="list-none flex gap-6 flex-wrap max-md:justify-center">
        {[
          { href: '#work', label: 'Portafolio' },
          { href: '#services', label: 'Servicios' },
          { href: '#about', label: 'Nosotros' },
          { href: '#contact', label: 'Contacto' },
        ].map(l => (
          <li key={l.href}>
            <a href={l.href} className="link-slide text-[var(--color-muted)] dark:text-white/55 no-underline min-h-[44px] inline-flex items-center transition-colors duration-300 hover:text-[var(--color-coral)]">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <span className="opacity-40">© 2026 NorthCode</span>
    </footer>
  );
}
