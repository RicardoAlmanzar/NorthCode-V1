import React, { useRef, useState, useEffect } from "react";

export function GlowingEffect({
  spread = 40,
  glow = true,
  disabled = false,
  className = "",
  glowColor = "rgba(222, 108, 58, 0.15)",
  borderColor = "rgba(222, 108, 58, 1)"
}) {
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (!containerRef.current || disabled || !glow) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate distance to center or edges to decide if we should glow
      const isInside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      const isNear = x >= -50 && y >= -50 && x <= rect.width + 50 && y <= rect.height + 50;

      if (isNear) {
        setIsHovered(true);
        setPosition({ x, y });
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, [disabled, glow]);

  if (disabled || !glow) return null;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden ${className}`}
      style={{ zIndex: 0 }}
    >
      {/* Background soft glow */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-300 rounded-[inherit]"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${spread * 3}px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 40%)`,
        }}
      />
      {/* Border glow */}
      <div
        className="absolute inset-0 rounded-[inherit] z-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${spread * 2}px circle at ${position.x}px ${position.y}px, ${borderColor}, transparent 40%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          padding: "1.5px", // border thickness
        }}
      />
    </div>
  );
}