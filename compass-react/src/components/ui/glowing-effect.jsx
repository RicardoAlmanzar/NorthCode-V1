import React, { useRef, useEffect } from "react";

export function GlowingEffect({
  spread = 40,
  glow = true,
  disabled = false,
  className = "",
  glowColor = "rgba(222, 108, 58, 0.15)",
  borderColor = "rgba(222, 108, 58, 1)"
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (disabled || !glow) return undefined;
    const container = containerRef.current;
    if (!container) return undefined;
    const parent = container.parentElement;
    if (!parent) return undefined;

    let inView = false;
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    }, { rootMargin: '100px 0px' });
    observer.observe(parent);

    const onPointerMove = (e) => {
      if (!inView) return;
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      container.style.setProperty('--glow-x', `${x}px`);
      container.style.setProperty('--glow-y', `${y}px`);
      container.style.setProperty('--glow-opacity', '1');
    };

    const onPointerLeave = () => {
      container.style.setProperty('--glow-opacity', '0');
    };

    parent.addEventListener('pointermove', onPointerMove, { passive: true });
    parent.addEventListener('pointerleave', onPointerLeave, { passive: true });

    return () => {
      observer.disconnect();
      parent.removeEventListener('pointermove', onPointerMove);
      parent.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [disabled, glow]);

  if (disabled || !glow) return null;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden ${className}`}
      style={{
        zIndex: 0,
        '--glow-x': '-1000px',
        '--glow-y': '-1000px',
        '--glow-opacity': '0',
      }}
    >
      {/* Background soft glow */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-300 rounded-[inherit]"
        style={{
          opacity: 'var(--glow-opacity, 0)',
          background: `radial-gradient(${spread * 3}px circle at var(--glow-x, -1000px) var(--glow-y, -1000px), ${glowColor}, transparent 40%)`,
        }}
      />
      {/* Border glow */}
      <div
        className="absolute inset-0 rounded-[inherit] z-0 transition-opacity duration-300"
        style={{
          opacity: 'var(--glow-opacity, 0)',
          background: `radial-gradient(${spread * 2}px circle at var(--glow-x, -1000px) var(--glow-y, -1000px), ${borderColor}, transparent 40%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          padding: "1.5px", // border thickness
        }}
      />
    </div>
  );
}