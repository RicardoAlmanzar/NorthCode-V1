import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Returns [ref, inView] — true when the element is in the viewport.
 * Used to pause CSS animations & JS timers when off-screen (saves GPU/CPU).
 * rootMargin adds a buffer so animations resume before the section is fully visible.
 */
export function useInView(rootMargin = '200px 0px') {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);

  return [ref, inView];
}

/**
 * Reveal a single element on scroll (supports .reveal, .reveal-left, .reveal-right, .reveal-scale)
 */
export function useScrollReveal(threshold = 0.12) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return ref;
}

/**
 * Batch-reveal all matching elements in a container
 */
export function useScrollRevealAll(containerRef, selector = '.reveal,.reveal-left,.reveal-right,.reveal-scale') {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const els = container.querySelectorAll(selector);
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [containerRef, selector]);
}

/**
 * Lightweight parallax: writes transform directly for compositor-only updates.
 * speed controls the amount (0.1 = subtle, 0.4 = strong).
 * Caches element metrics on resize. Skips on mobile/touch/reduced-motion.
 */
export function useParallax(speed = 0.15) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip on reduced-motion, coarse pointer (mobile), or no hover support
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (mql.matches || isTouch) return;

    let ticking = false;
    let cachedTop = 0;
    let cachedHeight = 0;
    let viewH = window.innerHeight;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      cachedTop = rect.top + window.scrollY;
      cachedHeight = rect.height;
      viewH = window.innerHeight;
    };

    measure();

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const relTop = cachedTop - scrollY;
        const progress = 1 - (relTop + cachedHeight) / (viewH + cachedHeight);
        const offset = (progress - 0.5) * speed * cachedHeight;
        // Write transform directly — compositor-only, no style recalc cascade
        el.style.transform = `translate3d(0,${offset.toFixed(1)}px,0)`;
        ticking = false;
      });
    };

    const onResize = () => { measure(); };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [speed]);

  return ref;
}

/**
 * Smooth counter-up animation for numbers
 */
export function useCountUp(end, duration = 1800) {
  const ref = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting && !hasRun.current) {
            hasRun.current = true;
            obs.unobserve(e.target);
            const start = performance.now();
            const animate = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              // ease-out cubic
              const eased = 1 - Math.pow(1 - progress, 3);
              el.textContent = Math.round(eased * end);
              if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.5 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);

  return ref;
}
