import { useState, useRef, useCallback, useEffect } from 'react';
import { PROJECTS } from '../data/content';
import { useScrollRevealAll, useInView } from '../hooks/useScrollReveal';
import { SectionEyebrow } from './ui/Icons';

/* â”€â”€â”€ Image Slider â”€â”€â”€ */
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
        className="relative w-full h-[320px]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onKeyDown={onKey}
        tabIndex={0}
      >
        <div className="phone-frame w-full h-full">
          <div className="phone-notch" />
          <div className="phone-screen">
            <div className="slider-track" style={{ transform: `translateX(-${current * 100}%)` }}>
              {slides.map((slide, i) => (
                <div key={i} className="slider-slide">
                  <img src={slide.src} alt={slide.alt} loading={i === 0 ? 'eager' : 'lazy'} draggable={false} />
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
      className="relative w-full h-[440px]"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={onKey}
      tabIndex={0}
    >
      <div className="laptop-frame w-full h-full">
        <div className="laptop-camera" />
        <div className="laptop-screen">
          <div className="slider-track" style={{ transform: `translateX(-${current * 100}%)` }}>
            {slides.map((slide, i) => (
              <div key={i} className="slider-slide">
                <img src={slide.src} alt={slide.alt} loading={i === 0 ? 'eager' : 'lazy'} draggable={false} />
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
      <div className={`flex flex-col ${isEven ? 'max-lg:flex-col' : 'max-lg:flex-col lg:flex-row-reverse'} gap-8 max-lg:gap-6 items-stretch`}>
        {/* Left: Images/Slider */}
        <div className="flex-1 min-h-[440px] max-lg:min-h-[280px]">
          {project.slides && project.slides.length > 0 ? (
            <ProjectSlider slides={project.slides} mobile={project.slidesMobile} />
          ) : (
            <div className="w-full h-full rounded-lg bg-cover bg-center" style={{ background: project.gradientDark }} />
          )}
        </div>

        {/* Right: Content */}
        <div className="flex-1 flex flex-col justify-center gap-5 max-lg:gap-4">
          {/* Tag */}
          <p className="text-xs uppercase tracking-[.15em] font-semibold text-[var(--color-coral)]">{project.tag}</p>

          {/* Title */}
          <h3 className="font-heading font-black text-[clamp(1.5rem,2.5vw,2.2rem)] leading-[1.2] text-white">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm leading-relaxed text-white/75">
            {project.desc}
          </p>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border border-white/20 bg-white/5 text-white/80 transition-all duration-300 hover:bg-white/10 hover:border-white/30"
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
      className="work-section px-16 max-md:px-5 py-20"
    >
      <div className="mb-16">
        <SectionEyebrow className="reveal text-[var(--color-coral-lt)] before:bg-[var(--color-coral-lt)]">
          Trabajos recientes
        </SectionEyebrow>
        <h2
          id="work-heading"
          className="font-heading font-black leading-[1.15] text-[clamp(1.8rem,3vw,2.8rem)] text-white"
        >
          Nuestros <em className="italic text-[var(--color-coral)]">trabajos</em>
        </h2>
      </div>

      <div className="space-y-24 max-lg:space-y-16 max-w-[1300px] mx-auto">
        {PROJECTS.map((proj, idx) => (
          <ProjectCard key={idx} project={proj} index={idx} />
        ))}
      </div>
    </section>
  );
}
