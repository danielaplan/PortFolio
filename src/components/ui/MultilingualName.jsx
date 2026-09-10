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
  { lang: 'Hebrew',   text: 'דניאל אפלן',          scale: 0.82 },
];

// English "Daniel Aplan" rendered in ten distinct design families before
// yielding to each translated language. kind:'english' frames are static.
const ENGLISH_FONTS = [
  { kind: 'english', lang: 'English', text: 'Daniel Aplan', scale: 1, fontFamily: '"Playfair Display", Georgia, serif' },
  { kind: 'english', lang: 'English', text: 'Daniel Aplan', scale: 1, fontFamily: '"Space Grotesk", system-ui, sans-serif' },
  { kind: 'english', lang: 'English', text: 'Daniel Aplan', scale: 1, fontFamily: '"JetBrains Mono", monospace' },
  { kind: 'english', lang: 'English', text: 'Daniel Aplan', scale: 1, fontFamily: '"Anton", sans-serif' },
  { kind: 'english', lang: 'English', text: 'Daniel Aplan', scale: 1, fontFamily: '"Abril Fatface", Georgia, serif' },
  { kind: 'english', lang: 'English', text: 'Daniel Aplan', scale: 1, fontFamily: '"Fredoka One", sans-serif' },
  { kind: 'english', lang: 'English', text: 'Daniel Aplan', scale: 1, fontFamily: '"Lobster", cursive' },
  { kind: 'english', lang: 'English', text: 'Daniel Aplan', scale: 1, fontFamily: '"Orbitron", sans-serif' },
  { kind: 'english', lang: 'English', text: 'Daniel Aplan', scale: 1, fontFamily: '"Press Start 2P", monospace' },
  { kind: 'english', lang: 'English', text: 'Daniel Aplan', scale: 1, fontFamily: '"Raleway", sans-serif' },
];

// Full cycle: run of 10 English font variants, then one translated language.
const CYCLE = NAMES.slice(1).flatMap((lang) => [...ENGLISH_FONTS, { ...lang, kind: 'language' }]);

const rand = (min, max) => Math.random() * (max - min) + min;

export default function MultilingualName({ className = '', style = {}, onLanguageChange }) {
  const [index, setIndex] = useState(0);
  const [fitScale, setFitScale] = useState(1);
  const containerRef = useRef(null);
  const textTrackRef = useRef(null);
  const tlRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const timerRef = useRef(null);

  const fitNameToColumn = useCallback(() => {
    const container = containerRef.current;
    const track = textTrackRef.current;
    const heading = container?.parentElement;

    if (!container || !track || !heading) return;

    const availableWidth = heading.getBoundingClientRect().width;
    const renderedWidth = track.getBoundingClientRect().width;
    const nextScale = renderedWidth > availableWidth
      ? Math.min(1, availableWidth / renderedWidth) * 0.96
      : 1;

    setFitScale(nextScale);
    return nextScale;
  }, []);

  /**
   * Sequence:
   * - English font variants: static swap. No letter drop-in/out — just a clean
   *   font change with a fluid size tween so surrounding layout glides.
   * - Translated languages: old letters scatter & drop DOWN smoothly, then
   *   new letters drop in from ABOVE on a single strictly nowrap line.
   */
  const switchLanguage = useCallback((nextIndex) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    if (tlRef.current) tlRef.current.kill();
    gsap.killTweensOf(containerRef.current);

    const entry = CYCLE[nextIndex];

    // English font variant: static, no letter animation.
    if (entry.kind === 'english') {
      requestAnimationFrame(() => {
        setIndex(nextIndex);
        const safeScale = fitNameToColumn() ?? 1;
        gsap.to(containerRef.current, {
          fontSize: `${entry.scale * safeScale}em`,
          duration: 0.4,
          ease: 'power2.out',
          onComplete: () => {
            isAnimatingRef.current = false;
          },
        });
      });
      return;
    }

    // Translated language: drop-out / drop-in sequence.
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
      const targetScale = entry.scale;

      // Smoothly animate the font size so adjacent layout moves fluidly
      // Phase 3: Incoming letters drop in from above (single line nowrap)
      requestAnimationFrame(() => {
        const safeScale = fitNameToColumn() ?? 1;
        gsap.to(containerRef.current, {
          fontSize: `${targetScale * safeScale}em`,
          duration: 0.45,
          ease: 'power2.out',
        });
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
  }, [fitNameToColumn]);

  useEffect(() => {
    const entry = CYCLE[index];
    onLanguageChange?.({ lang: entry.lang, kind: entry.kind });
  }, [index, onLanguageChange]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(fitNameToColumn);
    if (containerRef.current?.parentElement) {
      resizeObserver.observe(containerRef.current.parentElement);
    }
    fitNameToColumn();

    return () => resizeObserver.disconnect();
  }, [fitNameToColumn, index]);

  // English font variants cycle quickly (~1.5s); translated languages hold
// longer (~5s) so each script gets a moment to read.
  const delayFor = (i) => (CYCLE[i].kind === 'english' ? 1500 : 5000);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % CYCLE.length;
        switchLanguage(next);
        return prev;
      });
    }, delayFor(index));

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (tlRef.current) tlRef.current.kill();
    };
  }, [switchLanguage, index]);

  // On hover: immediately revert to the first English font variant
  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setIndex((prev) => {
          const next = (prev + 1) % CYCLE.length;
          switchLanguage(next);
          return prev;
        });
      }, delayFor(index));
    }

    if (index !== 0) {
      switchLanguage(0);
    }
  };

  const item = CYCLE[index];

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={`inline-flex items-center whitespace-nowrap cursor-pointer select-none overflow-visible will-change-[font-size] ${className}`}
      style={{
        ...style,
        fontFamily: item.fontFamily,
        fontSize: `${item.scale * fitScale}em`,
        verticalAlign: 'baseline',
        whiteSpace: 'nowrap',
        display: 'inline-flex',
        flexWrap: 'nowrap',
        letterSpacing: '0.01em',
      }}
      title="Hover to reset to English"
    >
      <span className="sr-only">{item.text}</span>
      <span
        ref={textTrackRef}
        aria-hidden="true"
        className="inline-flex items-center whitespace-nowrap"
        style={{ whiteSpace: 'nowrap', flexWrap: 'nowrap', lineHeight: 1.12 }}
      >
        {Array.from(item.text).map((char, i) => (
          char === ' ' ? (
            <span key={i} className="inline-block w-[0.25em] whitespace-nowrap">&nbsp;</span>
          ) : (
            <span
              key={i}
              className="inline-block overflow-visible relative whitespace-nowrap shrink-0"
              style={{ lineHeight: 1.12 }}
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
