import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

/**
 * Translations / scripts for "Daniel Aplan" across major popular languages.
 * Scale ratios ensure all scripts fit comfortably on a single line without wrapping.
 */
const NAMES = [
  { lang: 'English',  text: 'Daniel Aplan',       scale: 1 },
  { lang: 'Japanese', text: 'ダニエル・アプラン',   scale: 0.82 },
  { lang: 'Korean',   text: '다니엘 아플란',       scale: 0.90 },
  { lang: 'Chinese',  text: '丹尼尔·阿普兰',       scale: 0.88 },
  { lang: 'Russian',  text: 'Даниэль Аплан',      scale: 0.84 },
  { lang: 'Greek',    text: 'Ντάνιελ Άπλαν',      scale: 0.78 },
  { lang: 'Arabic',   text: 'دانيال أبلان',       scale: 0.90 },
  { lang: 'Hindi',    text: 'डैनियल अप्लान',       scale: 0.86 },
  { lang: 'Spanish',  text: 'Daniel Aplan',       scale: 1 },
];

const rand = (min, max) => Math.random() * (max - min) + min;

export default function MultilingualName({ className = '', style = {} }) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);
  const textTrackRef = useRef(null);
  const tlRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const timerRef = useRef(null);

  /**
   * Sequence:
   * 1. Old letters scatter & drop DOWN smoothly.
   * 2. Container font-size and width interpolate smoothly with GSAP (power2.out),
   *    causing surrounding elements (subtitles, descriptions) to glide naturally instead of snap.
   * 3. New letters drop in from ABOVE on a single strictly nowrap line.
   */
  const switchLanguage = useCallback((nextIndex) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    if (tlRef.current) tlRef.current.kill();

    const oldLetters = [
      ...(textTrackRef.current?.querySelectorAll('[data-char]') ?? []),
    ];

    const tl = gsap.timeline();
    tlRef.current = tl;

    // Phase 1: Current letters drop out downwards
    const exitMaxDelay = 0.12;
    oldLetters.forEach((el) => {
      const exitOffset = rand(80, 150);
      const delay = rand(0, exitMaxDelay);
      tl.to(
        el,
        {
          y: `${exitOffset}%`,
          opacity: 0,
          duration: rand(0.18, 0.26),
          ease: 'power2.in',
        },
        delay
      );
    });

    // Phase 2: Smooth scaling and text update
    tl.call(() => {
      setIndex(nextIndex);
      const targetScale = NAMES[nextIndex].scale;

      // Smoothly animate the font size so adjacent layout moves fluidly
      gsap.to(containerRef.current, {
        fontSize: `${targetScale}em`,
        duration: 0.45,
        ease: 'power2.out',
      });

      // Phase 3: Incoming letters drop in from above (single line nowrap)
      requestAnimationFrame(() => {
        const newLetters = [
          ...(textTrackRef.current?.querySelectorAll('[data-char]') ?? []),
        ];

        const enterTl = gsap.timeline({
          onComplete: () => {
            isAnimatingRef.current = false;
          },
        });

        const enterMaxDelay = 0.16;
        newLetters.forEach((el) => {
          const enterOffset = rand(85, 160) * -1;
          const delay = rand(0, enterMaxDelay);
          enterTl.fromTo(
            el,
            { y: `${enterOffset}%`, opacity: 0 },
            {
              y: '0%',
              opacity: 1,
              duration: rand(0.30, 0.44),
              ease: 'power3.out',
            },
            delay
          );
        });
      });
    });
  }, []);

  // Cycle every 8 seconds
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % NAMES.length;
        switchLanguage(next);
        return prev;
      });
    }, 8000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (tlRef.current) tlRef.current.kill();
    };
  }, [switchLanguage]);

  // On hover: immediately revert to English
  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setIndex((prev) => {
          const next = (prev + 1) % NAMES.length;
          switchLanguage(next);
          return prev;
        });
      }, 8000);
    }

    if (index !== 0) {
      switchLanguage(0);
    }
  };

  const item = NAMES[index];

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={`inline-flex items-center whitespace-nowrap cursor-pointer select-none overflow-visible will-change-[font-size] ${className}`}
      style={{
        ...style,
        fontSize: `${item.scale}em`,
        verticalAlign: 'baseline',
        whiteSpace: 'nowrap',
        display: 'inline-flex',
        flexWrap: 'nowrap',
      }}
      title="Hover to reset to English"
    >
      <span className="sr-only">{item.text}</span>
      <span
        ref={textTrackRef}
        aria-hidden="true"
        className="inline-flex items-center whitespace-nowrap leading-none"
        style={{ whiteSpace: 'nowrap', flexWrap: 'nowrap' }}
      >
        {item.text.split('').map((char, i) => (
          char === ' ' ? (
            <span key={i} className="inline-block w-[0.25em] whitespace-nowrap">&nbsp;</span>
          ) : (
            <span
              key={i}
              className="inline-block overflow-hidden relative whitespace-nowrap shrink-0"
              style={{ lineHeight: 'inherit' }}
            >
              <span
                data-char=""
                className="inline-block will-change-transform"
                style={{ display: 'block' }}
              >
                {char}
              </span>
            </span>
          )
        ))}
      </span>
    </span>
  );
}
