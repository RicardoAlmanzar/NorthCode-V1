import { useEffect, useState } from 'react';

/**
 * RotatingText – simple word rotator.
 * Props:
 *  - words: array of strings to rotate
 *  - interval?: number in ms (default 2000)
 *  - className?: string – additional Tailwind classes for the displayed word
 */
export default function RotatingText({ words = [], interval = 2000, className = '' }) {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!words.length || !visible) return undefined;
    const timer = setTimeout(() => setVisible(false), interval);
    return () => clearTimeout(timer);
  }, [words, interval, visible]);

  useEffect(() => {
    if (visible) return undefined;
    const fadeTimer = setTimeout(() => {
      setIdx(i => (i + 1) % words.length);
      setVisible(true);
    }, 400);
    return () => clearTimeout(fadeTimer);
  }, [visible, words.length]);

  const word = words[idx] || '';
  return (
    <span className={`${className} rotating-text ${visible ? 'rotating-text-visible' : 'rotating-text-hidden'}`}>
      {word}
    </span>
  );
}
