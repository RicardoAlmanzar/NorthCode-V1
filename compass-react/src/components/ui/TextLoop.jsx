import React, { useRef, useEffect } from 'react';

export default function TextLoop({
  text = "DESIGN THINKING ★ SOFTWARE ENGINEERING ★ WEB DEVELOPMENT ★ ",
  speed = 1,
  className = "",
  style = {}
}) {
  const pathRef = useRef(null);
  const textPathRef = useRef(null);
  const containerRef = useRef(null);

  // Single unit text block
  const unitText = text.trim() + " ✦ ";
  // Repeat enough times to fill screen and maintain seamless flow
  const repeatedText = unitText.repeat(12);

  useEffect(() => {
    let animationFrameId = 0;
    let offset = 0;
    let isVisible = false;
    // Approximating exact character length of single unit text loop in SVG coordinates
    const singleUnitLength = unitText.length * 16.5;

    const animate = () => {
      if (!isVisible) return;
      offset -= speed;
      // Seamless wrap-around modulo
      if (Math.abs(offset) >= singleUnitLength) {
        offset += singleUnitLength;
      }
      if (textPathRef.current) {
        textPathRef.current.setAttribute('startOffset', `${offset}px`);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(([entry]) => {
      const wasVisible = isVisible;
      isVisible = entry.isIntersecting;
      if (isVisible && !wasVisible) {
        animationFrameId = requestAnimationFrame(animate);
      } else if (!isVisible && animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
    }, { rootMargin: '120px 0px' });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [speed, unitText]);

  return (
    <div ref={containerRef} className={`curved-loop-container ${className}`} style={style}>
      <svg
        viewBox="0 0 1440 140"
        preserveAspectRatio="none"
        className="curved-loop-svg"
      >
        <defs>
          <path
            id="wavePath"
            d="M -1000,70 Q -640,25 -280,70 T 440,70 T 1160,70 T 1880,70 T 2600,70 T 3320,70"
            fill="none"
          />
        </defs>

        {/* Fill below wavy ribbon connecting seamlessly to Services section */}
        <path
          d="M -1000,70 Q -640,25 -280,70 T 440,70 T 1160,70 T 1880,70 T 2600,70 T 3320,70 L 3320,200 L -1000,200 Z"
          fill="#121e30"
        />

        {/* Thick Wavy Ribbon Path (Coral Color) */}
        <path
          d="M -1000,70 Q -640,25 -280,70 T 440,70 T 1160,70 T 1880,70 T 2600,70 T 3320,70"
          fill="none"
          stroke="#de6c3a"
          strokeWidth="48"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Text running along the wavy ribbon */}
        <text className="curved-loop-text">
          <textPath
            ref={textPathRef}
            href="#wavePath"
            startOffset="0px"
          >
            {repeatedText}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
