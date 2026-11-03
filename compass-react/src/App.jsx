import { useState, useCallback, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TextLoop from './components/ui/TextLoop';
import Work from './components/Work';
import Services from './components/Services';
import About from './components/About';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import ChatBot from './components/ChatBot';
import FormToast from './components/FormToast';

export default function App() {
  const [toast, setToast] = useState('');
  const clearToast = useCallback(() => setToast(''), []);

  useEffect(() => {
    const hash = window.location.hash;
    if (!['#work', '#services', '#contact'].includes(hash)) return;
    const frame = requestAnimationFrame(() => {
      if (window.location.hash !== hash) return;
      const section = document.getElementById(hash.slice(1));
      if (!section) return;
      const navBottom = document.querySelector('.primary-navbar')?.getBoundingClientRect().bottom ?? 0;
      const offset = Math.max(80, Math.ceil(navBottom) + 12);
      window.scrollTo({
        top: window.scrollY + section.getBoundingClientRect().top - offset,
        behavior: 'instant',
      });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <ThemeProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:bg-[var(--color-coral)] focus:text-white focus:px-4 focus:py-2 focus:rounded-full focus:text-sm focus:font-semibold">
        Ir al contenido principal
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Work />
        <section className="text-loop-section" aria-label="Especialidades">
          <TextLoop 
            text="DESIGN THINKING ✦ SOFTWARE ENGINEERING ✦ WEB DEVELOPMENT ✦ "
            speed={1.2}
          />
        </section>
        <Services />
        <About />
        <FAQ />
        <Contact onToast={setToast} />
      </main>
      <Footer />
      <BackToTop />
      <ChatBot />
      <FormToast message={toast} onDone={clearToast} />
    </ThemeProvider>
  );
}
