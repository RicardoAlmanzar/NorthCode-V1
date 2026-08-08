import React, { useState, useEffect, useRef } from 'react';

export default function DepthText({
  text,
  depth = 14,
  color = '#ffffff',
  depthColor = 'rgba(180, 60, 20, 0.95)',
  shadowColor = 'rgba(0, 0, 0, 0.85)',
  glowColor = 'rgba(222, 108, 58, 0.65)',
  glowRadius = 25,
  className = '',
  style = {},
  enableMouse = true,
  maxRotateX = 12,
  maxRotateY = 16,
  ...props
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const textRef = useRef(null);

  useEffect(() => {
    if (!enableMouse) return;

    const handleMouseMove = (e) => {
      const normX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const normY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setMousePos({ x: normX, y: normY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enableMouse]);

  // 3D Tilt calculation
  const rotateX = -mousePos.y * maxRotateX;
  const rotateY = mousePos.x * maxRotateY;

  // Solid multi-layered 3D block extrusion (matching React Bits 3D Depth)
  const depthShadows = Array.from({ length: depth }, (_, i) => {
    const step = i + 1;
    const shadowX = (step * (0.9 - mousePos.x * 0.5)).toFixed(1);
    const shadowY = (step * (1.1 - mousePos.y * 0.5)).toFixed(1);
    return `${shadowX}px ${shadowY}px 0px ${depthColor}`;
  }).join(', ');

  const fullShadow = `${depthShadows}, 0 ${depth * 1.2}px ${depth * 2.5}px ${shadowColor}`;

  // Neon aura glow filter
  const filterStyle = glowColor ? `drop-shadow(0 0 ${glowRadius}px ${glowColor}) drop-shadow(0 8px 30px ${glowColor})` : 'none';

  return (
    <span
      ref={textRef}
      className={`depth-text-node ${className}`}
      style={{
        color: color,
        textShadow: fullShadow,
        filter: filterStyle,
        display: 'inline-block',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
        willChange: 'transform, text-shadow, filter',
        transition: 'transform 0.1s cubic-bezier(0.1, 0.4, 0.2, 1), text-shadow 0.1s cubic-bezier(0.1, 0.4, 0.2, 1)',
        ...style,
      }}
      {...props}
    >
      {text}
    </span>
  );
}



