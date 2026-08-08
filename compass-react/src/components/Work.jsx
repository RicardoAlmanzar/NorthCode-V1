import { useState, useRef, useCallback, useEffect } from 'react';
import { PROJECTS } from '../data/content';
import { useScrollRevealAll, useInView } from '../hooks/useScrollReveal';
import { SectionEyebrow } from './ui/Icons';

/* â”€â”€â”€ Image Slider â”€â”€â”€ */
function ProjectSlider({ slides, mobile, priority = false }) {
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

  /* Auto-advance */
  const [sliderRef, sliderInView] = useInView();
  useEffect(() => {
    if (!sliderInView) return;
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
        className="slider slider--mobile relative w-full"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onKeyDown={onKey}
        tabIndex={0}
      >
        <div className="phone-frame shadow-lg">
          <div className="phone-notch" />
          <div className="phone-screen">
            <div className="slider-track" style={{ transform: `translateX(-${current * 100}%)` }}>
              {slides.map((slide, i) => (
                <div key={i} className="slider-slide">
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
            <button key={i} className={`slider-dot ${i === current ? 'slider-dot--active' : ''}`} onClick={() => goTo(i)} aria-label={`Imagen ${i + 1}`} />
          ))}
        </div>

        <span className="slider-counter">{current + 1} / {total}</span>
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
      tabIndex={0}
    >
      <div className="laptop-frame shadow-2xl">
        <div className="laptop-camera" />
        <div className="laptop-screen">
          <div className="slider-track" style={{ transform: `translateX(-${current * 100}%)` }}>
            {slides.map((slide, i) => (
              <div key={i} className="slider-slide">
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
          <button key={i} className={`slider-dot ${i === current ? 'slider-dot--active' : ''}`} onClick={() => goTo(i)} aria-label={`Imagen ${i + 1}`} />
        ))}
      </div>

      <span className="slider-counter">{current + 1} / {total}</span>
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
              <ProjectSlider slides={project.slides} mobile={project.slidesMobile} priority={index === 0} />
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
export default function Work() {
  const containerRef = useRef(null);
  useScrollRevealAll(containerRef, '.reveal');

  return (
    <section
      id="work"
      ref={containerRef}
      aria-labelledby="work-heading"
      className="work-section px-16 max-lg:px-8 max-md:px-5 py-24 max-lg:py-20"
    >
      <div className="mb-20 max-lg:mb-16 text-center lg:text-left">
        <SectionEyebrow className="reveal text-[var(--color-coral-lt)] before:bg-[var(--color-coral-lt)]">
          Trabajos recientes
        </SectionEyebrow>
        <h2
          id="work-heading"
          className="font-heading font-black leading-[1.15] text-[clamp(2rem,4vw,3.2rem)] text-white mt-4"
        >
          Nuestros <em className="italic text-[var(--color-coral)]">trabajos</em>
        </h2>
      </div>

      <div className="space-y-32 max-lg:space-y-20 max-w-[1400px] mx-auto">
        {PROJECTS.map((proj, idx) => (
          <ProjectCard key={idx} project={proj} index={idx} />
        ))}
      </div>
    </section>
  );
}
