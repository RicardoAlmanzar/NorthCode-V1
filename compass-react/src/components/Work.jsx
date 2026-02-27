import { useState, useRef, useCallback, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { PROJECTS } from '../data/content';
import { useScrollRevealAll, useInView } from '../hooks/useScrollReveal';
import { useFocusTrap } from '../hooks/useFocusTrap';
import Button from './ui/Button';
import { SectionEyebrow } from './ui/Icons';

/* ─── Image Slider ─── */
function ProjectSlider({ slides, mobile }) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStart = useRef(null);
  const total = slides.length;

  const goTo = useCallback((idx) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((idx + total) % total);
    setTimeout(() => setIsTransitioning(false), 420);
  }, [total, isTransitioning]);

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  /* Auto-advance — pause when off-screen or modal is open */
  const [sliderRef, sliderInView] = useInView();
  useEffect(() => {
    if (!sliderInView) return;          // off-screen → no timer
    const timer = setInterval(() => goTo(current + 1), 5000);
    return () => clearInterval(timer);
  }, [current, goTo, sliderInView]);

  /* Swipe support */
  const onTouchStart = e => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = e => {
    if (touchStart.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(delta) > 50) delta > 0 ? prev() : next();
    touchStart.current = null;
  };

  /* Keyboard */
  const onKey = e => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  };

  if (mobile) {
    return (
      <div
        ref={sliderRef}
        className="slider slider--mobile"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onKeyDown={onKey}
        tabIndex={0}
        role="region"
        aria-label="Galería de imágenes del proyecto"
        aria-roledescription="carousel"
      >
        {/* Static phone frame with sliding images inside */}
        <div className="phone-frame">
          <div className="phone-notch" />
          <div className="phone-screen">
            <div className="slider-track" style={{ transform: `translateX(-${current * 100}%)` }}>
              {slides.map((slide, i) => (
                <div key={i} className="slider-slide" aria-hidden={i !== current}>
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Arrows */}
        <button className="slider-arrow slider-arrow--prev" onClick={prev} aria-label="Imagen anterior">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button className="slider-arrow slider-arrow--next" onClick={next} aria-label="Imagen siguiente">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>

        {/* Dots */}
        <div className="slider-dots" role="tablist" aria-label="Navegar imágenes">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`slider-dot ${i === current ? 'slider-dot--active' : ''}`}
              onClick={() => goTo(i)}
              role="tab"
              aria-selected={i === current}
              aria-label={`Imagen ${i + 1} de ${total}`}
            />
          ))}
        </div>

        {/* Counter */}
        <span className="slider-counter">{current + 1} / {total}</span>
      </div>
    );
  }

  return (
    <div
      ref={sliderRef}
      className="slider slider--desktop"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={onKey}
      tabIndex={0}
      role="region"
      aria-label="Galería de imágenes del proyecto"
      aria-roledescription="carousel"
    >
      {/* Laptop frame */}
      <div className="laptop-frame">
        <div className="laptop-camera" />
        <div className="laptop-screen">
          <div className="slider-track" style={{ transform: `translateX(-${current * 100}%)` }}>
            {slides.map((slide, i) => (
              <div key={i} className="slider-slide" aria-hidden={i !== current}>
                <img
                  src={slide.src}
                  alt={slide.alt}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="laptop-base" />
      </div>

      {/* Arrows */}
      <button className="slider-arrow slider-arrow--prev" onClick={prev} aria-label="Imagen anterior">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <button className="slider-arrow slider-arrow--next" onClick={next} aria-label="Imagen siguiente">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>

      {/* Dots */}
      <div className="slider-dots" role="tablist" aria-label="Navegar imágenes">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`slider-dot ${i === current ? 'slider-dot--active' : ''}`}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`Imagen ${i + 1} de ${total}`}
          />
        ))}
      </div>

      {/* Counter */}
      <span className="slider-counter">{current + 1} / {total}</span>
    </div>
  );
}

/* ─── Project Modal ─── */
function ProjectModal({ project, isOpen, onClose }) {
  const { dark } = useTheme();
  const trapRef = useFocusTrap(isOpen);
  const closeBtnRef = useRef(null);
  const [localProject, setLocalProject] = useState(project);

  useEffect(() => {
    if (project) setLocalProject(project);
  }, [project]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      const timer = setTimeout(() => closeBtnRef.current?.focus(), 150);
      return () => {
        document.body.classList.remove('modal-open');
        clearTimeout(timer);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape' && isOpen) onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!localProject && !isOpen) return null;
  const displayProject = project || localProject;
  if (!displayProject) return null;

  const gradient = dark ? displayProject.gradientDark : displayProject.gradient;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center transition-[opacity,visibility] duration-350 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
      role="dialog"
      aria-modal="true"
      aria-label="Detalle del proyecto"
      aria-hidden={!isOpen}
    >
      <div className="absolute inset-0 bg-[rgba(13,27,42,.82)] dark:bg-[rgba(8,14,21,.88)]" onClick={onClose} aria-hidden="true" />
      <div
        ref={trapRef}
        className={`relative w-[min(1100px,94vw)] max-md:w-[96vw] max-h-[92vh] max-md:max-h-[94vh] bg-[var(--color-card-bg)] dark:bg-[#0f1923] rounded-xl shadow-[0_24px_64px_rgba(0,0,0,.25)] overflow-hidden flex flex-col transition-all duration-300 ${isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-[.98]'}`}
      >
        <button
          ref={closeBtnRef}
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 border-none rounded-full bg-[rgba(13,27,42,.08)] dark:bg-[rgba(240,244,248,.1)] text-[var(--color-ink)] text-2xl leading-none cursor-pointer flex items-center justify-center transition-[background-color,transform] duration-200 hover:bg-[rgba(232,97,74,.15)] hover:scale-110"
          aria-label="Cerrar detalle"
        >
          &times;
        </button>
        <div
          className="flex max-md:flex-col items-stretch w-full flex-1 max-md:overflow-y-auto max-md:overscroll-contain max-md:touch-pan-y"
          style={{ WebkitOverflowScrolling: 'touch', willChange: 'scroll-position' }}
        >
          {displayProject.slides && displayProject.slides.length > 0 ? (
            <div className={`${displayProject.slidesMobile ? 'flex-[0_0_40%]' : 'flex-[0_0_55%]'} max-md:flex-none max-md:w-full min-h-[440px] max-md:min-h-[200px] max-md:max-h-[35vh] overflow-hidden`}>
              <ProjectSlider key={displayProject.title} slides={displayProject.slides} mobile={displayProject.slidesMobile} />
            </div>
          ) : (
            <div
              className="flex-[0_0_45%] max-md:flex-none max-md:w-full min-h-[360px] max-md:min-h-[220px] bg-cover bg-center"
              style={{ background: gradient }}
            />
          )}
          <div className="flex-1 px-12 py-16 max-md:px-5 max-md:py-10 flex flex-col justify-center gap-4 bg-[var(--color-card-bg)] dark:bg-[#0f1923]">
            <p className="text-[.75rem] uppercase tracking-[.1em] text-[#e8614a] font-bold">{displayProject.tag}</p>
            <h3 className="font-heading text-[clamp(1.5rem,2.5vw,2rem)] font-black leading-[1.2] text-[#0d1b2a] dark:text-[#e8ecf0]">{displayProject.title}</h3>
            <p className="text-[1rem] leading-[1.6] text-[#4a5d6f] dark:text-[#a3b8c9]">{displayProject.desc}</p>
            <div className="mt-6">
              <Button href="#contact" onClick={onClose} className="self-start" aria-label="Solicitar cotización de proyecto">
                Cotizar proyecto →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Work Section ─── */
export default function Work() {
  const [modalData, setModalData] = useState(null);
  const containerRef = useRef(null);

  // Debug visibility
  useEffect(() => {
    console.info('[Work] Projects count:', PROJECTS?.length);
  }, []);

  useScrollRevealAll(containerRef, '.reveal');

  const open = useCallback((proj, idx) => setModalData({ project: proj, index: idx }), []);
  const close = useCallback(() => setModalData(null), []);

  return (
    <>
      <section
        id="work"
        ref={containerRef}
        aria-labelledby="work-heading"
        className="px-16 max-md:px-5 py-20 bg-[var(--color-cream)] dark:bg-transparent"
      >
        <div className="mb-12">
          <SectionEyebrow>Trabajos recientes</SectionEyebrow>
          <h2 id="work-heading" className="font-heading font-black leading-[1.15] text-[clamp(1.8rem,3vw,2.8rem)] mb-4">
            Nuestros <em className="italic text-[var(--color-coral)]">trabajos</em>
          </h2>
        </div>

        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-5 max-w-[1100px] mx-auto">
          {PROJECTS.map((proj, i) => (
            <article
              key={i}
              className="rounded-lg overflow-hidden relative cursor-pointer shadow-sm border border-transparent transition-all duration-300 hover:shadow-[var(--shadow-hover)] hover:border-[rgba(232,97,74,.15)] hover:-translate-y-1.5 group"
              tabIndex={0}
              role="button"
              aria-label={`Ver detalle: ${proj.title}`}
              onClick={() => open(proj, i)}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(proj, i); } }}
            >
              <div
                className="w-full aspect-video will-change-transform backface-hidden transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.04] overflow-hidden"
                style={{ background: proj.gradient }}
              >
                {proj.thumb && (
                  <img
                    src={proj.thumb}
                    alt={proj.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                )}
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,27,42,.85)] via-[rgba(13,27,42,.25)] to-transparent flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-350 text-white">
                <p className="font-heading text-[1.05rem] font-bold translate-y-3 group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(.2,.8,.2,1)]">{proj.title}</p>
                <p className="text-[.75rem] text-[var(--color-coral-lt)] mt-1 uppercase tracking-[.08em] translate-y-3 group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(.2,.8,.2,1)] delay-75">{proj.tag}</p>
                {proj.summary && (
                  <p className="text-[.78rem] text-white/70 mt-2 leading-snug line-clamp-2 translate-y-3 group-hover:translate-y-0 transition-[transform,opacity] duration-400 ease-[cubic-bezier(.2,.8,.2,1)] delay-100">{proj.summary}</p>
                )}
              </div>
              {/* Meta information always visible */}
              <div className="px-4 py-4 bg-[var(--color-card-bg)] dark:bg-[var(--color-cream)]/5 border-t border-[var(--color-border)]">
                <p className="text-[.85rem] font-bold text-[var(--color-ink)] dark:text-white">{proj.meta.title}</p>
                <p className="text-[.75rem] text-[var(--color-coral)] font-medium mt-0.5">{proj.meta.sub}</p>
                {proj.summary && (
                  <p className="text-[.75rem] text-[var(--color-ink)]/75 dark:text-white/55 mt-2 leading-snug line-clamp-2">{proj.summary}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <ProjectModal
        project={modalData?.project}
        index={modalData?.index}
        isOpen={!!modalData}
        onClose={close}
      />
    </>
  );
}
