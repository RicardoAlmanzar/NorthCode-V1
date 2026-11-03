import { useState, useRef, useCallback, useEffect } from 'react';
import { PROJECTS } from '../data/content';
import { useScrollRevealAll, useInView } from '../hooks/useScrollReveal';
import { SectionEyebrow } from './ui/Icons';

/* â”€â”€â”€ Image Slider â”€â”€â”€ */
function ProjectSlider({ slides, mobile, title, priority = false }) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [playing, setPlaying] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [hovered, setHovered] = useState(false);
  const touchStart = useRef(null);
  const total = slides.length;

  const goTo = useCallback((idx) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((idx + total) % total);
  }, [total, isTransitioning]);

  useEffect(() => {
    if (!isTransitioning) return;
    const timer = setTimeout(() => setIsTransitioning(false), 420);
    return () => clearTimeout(timer);
  }, [isTransitioning]);

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  const [sliderRef, sliderInView] = useInView();
  const rotating = playing && !hovered && sliderInView && total > 1;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event) => { if (event.matches) setPlaying(false); };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!rotating) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, rotating]);

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
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    setPlaying(false);
    if (e.key === 'ArrowLeft') prev();
    else next();
  };

  const sliderAccessibility = {
    role: 'group',
    'aria-roledescription': 'carrusel',
    'aria-label': `Capturas de ${title}`,
    tabIndex: 0,
    onPointerEnter: (event) => { if (event.pointerType === 'mouse') setHovered(true); },
    onPointerLeave: () => setHovered(false),
    onFocus: (event) => {
      if (event.target.matches(':focus-visible') && !event.currentTarget.contains(event.relatedTarget)) {
        setPlaying(false);
      }
    },
  };

  const counter = (
    <div className="slider-meta">
      {total > 1 && (
        <button
          type="button"
          className="slider-autoplay"
          aria-label={playing ? 'Pausar avance automático' : 'Reproducir avance automático'}
          onClick={() => setPlaying(value => !value)}
        >
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            {playing ? <path d="M4 3h3v10H4zm5 0h3v10H9z" /> : <path d="m5 3 8 5-8 5z" />}
          </svg>
        </button>
      )}
      <span className="slider-counter" aria-live={rotating ? 'off' : 'polite'} aria-atomic="true">
        {current + 1} / {total}
      </span>
    </div>
  );

  if (mobile) {
    return (
      <div
        ref={sliderRef}
        className="slider slider--mobile relative w-full"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onKeyDown={onKey}
        {...sliderAccessibility}
      >
        <div className="phone-frame shadow-lg">
          <div className="phone-notch" />
          <div className="phone-screen">
            <div className="slider-track" style={{ transform: `translateX(-${current * 100}%)` }}>
              {slides.map((slide, i) => (
                <div key={i} className="slider-slide" aria-hidden={i !== current}>
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    loading={priority && i === 0 ? 'eager' : 'lazy'}
                    fetchPriority={priority && i === 0 ? 'high' : 'low'}
                    decoding="async"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Arrows */}
        <button className="slider-arrow slider-arrow--prev" onClick={prev} aria-label="Anterior">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button className="slider-arrow slider-arrow--next" onClick={next} aria-label="Siguiente">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>

        {/* Dots */}
        <div className="slider-dots">
          {slides.map((_, i) => (
            <button key={i} className={`slider-dot ${i === current ? 'slider-dot--active' : ''}`} onClick={() => goTo(i)} aria-label={`Imagen ${i + 1}`} aria-current={i === current ? 'true' : undefined} />
          ))}
        </div>

        {counter}
      </div>
    );
  }

  return (
    <div
      ref={sliderRef}
      className="slider slider--desktop relative w-full"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={onKey}
      {...sliderAccessibility}
    >
      <div className="laptop-frame shadow-2xl">
        <div className="laptop-camera" />
        <div className="laptop-screen">
          <div className="slider-track" style={{ transform: `translateX(-${current * 100}%)` }}>
            {slides.map((slide, i) => (
              <div key={i} className="slider-slide" aria-hidden={i !== current}>
                <img
                  src={slide.src}
                  alt={slide.alt}
                  loading={priority && i === 0 ? 'eager' : 'lazy'}
                  fetchPriority={priority && i === 0 ? 'high' : 'low'}
                  decoding="async"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="laptop-base" />
      </div>

      {/* Arrows */}
      <button className="slider-arrow slider-arrow--prev" onClick={prev} aria-label="Anterior">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <button className="slider-arrow slider-arrow--next" onClick={next} aria-label="Siguiente">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>

      {/* Dots */}
      <div className="slider-dots">
        {slides.map((_, i) => (
          <button key={i} className={`slider-dot ${i === current ? 'slider-dot--active' : ''}`} onClick={() => goTo(i)} aria-label={`Imagen ${i + 1}`} aria-current={i === current ? 'true' : undefined} />
        ))}
      </div>

      {counter}
    </div>
  );
}

/* â”€â”€â”€ Project Card â”€â”€â”€ */
function ProjectCard({ project, index }) {
  const isEven = index % 2 === 0;

  return (
    <div className="reveal w-full">
      <div className={`flex flex-col lg:flex-row ${isEven ? '' : 'lg:flex-row-reverse'} gap-12 max-lg:gap-8 items-center lg:items-stretch`}>
        {/* Media: Images/Slider */}
        <div className="w-full lg:flex-1 flex items-center justify-center">
          {project.slides && project.slides.length > 0 ? (
            <div className="w-full max-w-[620px]">
              <ProjectSlider title={project.title} slides={project.slides} mobile={project.slidesMobile} priority={index === 0} />
            </div>
          ) : (
            <div className="w-full aspect-video max-w-[500px] rounded-xl overflow-hidden" style={{ background: project.gradientDark }} />
          )}
        </div>

        {/* Content: Right Side */}
        <div className="w-full lg:flex-1 flex flex-col justify-center gap-6 max-lg:gap-5 text-center lg:text-left">
          {/* Tag */}
          <div>
            <p className="text-xs uppercase tracking-[.2em] font-bold text-[var(--color-coral)] mb-3">
              {project.tag}
            </p>
            
            {/* Title */}
            <h3 className="font-heading font-black text-[clamp(1.8rem,3.5vw,2.4rem)] leading-[1.15] text-white mb-4">
              {project.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-white/70 max-w-[550px] mx-auto lg:mx-0">
            {project.desc}
          </p>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold border border-white/15 bg-white/5 text-white/70 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/25 hover:text-white/90"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* â”€â”€â”€ Work Section â”€â”€â”€ */
const PROJECTS_PER_PAGE = 4;
const PAGE_COUNT = Math.ceil(PROJECTS.length / PROJECTS_PER_PAGE);

function ProjectPage({ page }) {
  const listRef = useRef(null);
  useScrollRevealAll(listRef, '.reveal');
  const start = page * PROJECTS_PER_PAGE;
  const projects = PROJECTS.slice(start, start + PROJECTS_PER_PAGE);

  return (
    <div ref={listRef} className="space-y-32 max-lg:space-y-20 max-w-[1400px] mx-auto">
      {projects.map((project, index) => (
        <ProjectCard key={project.title} project={project} index={index} />
      ))}
    </div>
  );
}

const pageArrowClass = 'inline-flex size-12 items-center justify-center rounded-full bg-[var(--color-coral)] text-white shadow-[0_4px_16px_rgba(222,108,58,.30)] transition-colors hover:bg-[#d1533f]';

export default function Work() {
  const [page, setPage] = useState(0);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const headingRef = useRef(null);
  useScrollRevealAll(headerRef, '.reveal');

  function goToPage(nextPage) {
    setPage(nextPage);
    headingRef.current?.focus({ preventScroll: true });
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    sectionRef.current?.scrollIntoView({ block: 'start', behavior: reduceMotion ? 'instant' : 'smooth' });
  }

  return (
    <section
      id="work"
      ref={sectionRef}
      aria-labelledby="work-heading"
      className="work-section px-16 max-lg:px-8 max-md:px-5 py-24 max-lg:py-20"
    >
      <div ref={headerRef} className="mb-20 max-lg:mb-16 text-center lg:text-left">
        <SectionEyebrow className="reveal text-[var(--color-coral-lt)] before:bg-[var(--color-coral-lt)]">
          Trabajos recientes
        </SectionEyebrow>
        <h2
          id="work-heading"
          ref={headingRef}
          tabIndex={-1}
          className="font-heading font-black leading-[1.15] text-[clamp(2rem,4vw,3.2rem)] text-white mt-4"
        >
          Nuestros <em className="italic text-[var(--color-coral)]">trabajos</em>
        </h2>
      </div>

      <ProjectPage key={page} page={page} />

      {PAGE_COUNT > 1 && (
        <nav aria-label="Páginas del portafolio" className="mt-16 flex items-center justify-center gap-5 max-lg:mt-12">
          {page > 0 && (
            <button type="button" className={pageArrowClass} onClick={() => goToPage(page - 1)} aria-label="Página anterior">
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
          <span role="status" className="text-sm font-semibold text-white/70">
            Página {page + 1} de {PAGE_COUNT}
          </span>
          {page < PAGE_COUNT - 1 && (
            <button type="button" className={pageArrowClass} onClick={() => goToPage(page + 1)} aria-label="Página siguiente">
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </nav>
      )}
    </section>
  );
}
