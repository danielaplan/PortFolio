import { useRef } from 'react';
import gsap from 'gsap';

/**
 * Vertical letter-roll with per-letter randomized offsets.
 *
 * On hover  → original letters exit DOWN by a random distance each,
 *             clone letters drop IN from a random height above each.
 * On leave  → reverses with fresh random offsets.
 *
 * The non-uniform offsets make the animation feel organic and alive
 * instead of a mechanical uniform curtain.
 */

// Random float in [min, max]
const rand = (min, max) => Math.random() * (max - min) + min;

export function RandomLetterSwap({
  label = '',
  className = '',
  staggerDuration = 0.04,
  // eslint-disable-next-line no-unused-vars
  transition,
  ...props
}) {
  const containerRef = useRef(null);
  const tlRef        = useRef(null);

  /**
   * @param {string} enterSel  - CSS selector for letters coming in
   * @param {string} exitSel   - CSS selector for letters going out
   * @param {number} enterDir  - -1 = enter from above, +1 = enter from below
   */
  const isAnimatingRef = useRef(false);

  const handleEnter = () => {
    // If an animation is already actively playing, let it finish so it won't stutter
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    if (tlRef.current) tlRef.current.kill();

    const wrappers = [
      ...(containerRef.current?.querySelectorAll('[data-char-wrap]') ?? []),
    ];

    const tl = gsap.timeline({
      onComplete: () => {
        // Once the entire forward roll animation completes, seamlessly reset positions
        // so it's instantly ready for the next hover without any visual jump
        wrappers.forEach((wrapper) => {
          gsap.set(wrapper.querySelector('[data-orig]'),  { y: '0%' });
          gsap.set(wrapper.querySelector('[data-hover]'), { y: '-120%' });
        });
        isAnimatingRef.current = false;
      }
    });
    tlRef.current = tl;

    // Shuffle indices or give each letter an independent random start delay
    const totalLetters = wrappers.length;
    const maxDelay = Math.max(0.12, (totalLetters - 1) * staggerDuration * 1.5);

    wrappers.forEach((wrapper, i) => {
      const entering = wrapper.querySelector('[data-hover]');
      const exiting  = wrapper.querySelector('[data-orig]');

      const enterOffset = rand(75, 170) * -1;
      const exitOffset  = rand(75, 170);

      // Independent random delay per letter so they don't fall at the same time or strictly in order
      const randomDelay = rand(0, maxDelay);

      tl.to(
        exiting,
        {
          y: `${exitOffset}%`,
          duration: rand(0.22, 0.32),
          ease: 'power2.in',
        },
        randomDelay
      );

      tl.fromTo(
        entering,
        { y: `${enterOffset}%` },
        {
          y: '0%',
          duration: rand(0.32, 0.46),
          ease: 'power3.out',
        },
        randomDelay
      );
    });
  };

  return (
    <span
      ref={containerRef}
      className={`inline-flex items-center ${className}`}
      onMouseEnter={handleEnter}
      {...props}
    >
      {/* Screen-reader text */}
      <span className="sr-only">{label}</span>

      {/* Visual layers */}
      <span aria-hidden="true" className="inline-flex">
        {label.split('').map((char, i) =>
          char === ' ' ? (
            <span key={i}>&nbsp;</span>
          ) : (
            <span
              key={i}
              data-char-wrap=""
              style={{
                position: 'relative',
                display: 'inline-block',
                overflow: 'hidden',
                lineHeight: 'inherit',
              }}
            >
              {/* Original — in flow, defines wrapper height */}
              <span data-orig="" style={{ display: 'block' }}>
                {char}
              </span>

              {/* Clone — parked above the clip boundary */}
              <span
                data-hover=""
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: 'translateY(-120%)',
                }}
              >
                {char}
              </span>
            </span>
          )
        )}
      </span>
    </span>
  );
}

export default RandomLetterSwap;
