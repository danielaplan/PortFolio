import { useRef } from 'react';

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

    const wrappers = [
      ...(containerRef.current?.querySelectorAll('[data-char-wrap]') ?? []),
    ];

    // Shuffle indices or give each letter an independent random start delay
    const totalLetters = wrappers.length;
    const maxDelay = Math.max(0.12, (totalLetters - 1) * staggerDuration * 1.5);
    const animations = [];

    wrappers.forEach((wrapper) => {
      const entering = wrapper.querySelector('[data-hover]');
      const exiting  = wrapper.querySelector('[data-orig]');

      const enterOffset = rand(75, 170) * -1;
      const exitOffset  = rand(75, 170);
      const delay = rand(0, maxDelay) * 1000;

      animations.push(
        exiting.animate(
          [{ transform: 'translateY(0)' }, { transform: `translateY(${exitOffset}%)` }],
          { duration: rand(220, 320), delay, easing: 'cubic-bezier(0.4, 0, 1, 1)', fill: 'forwards' },
        ),
        entering.animate(
          [{ transform: `translateY(${enterOffset}%)` }, { transform: 'translateY(0)' }],
          { duration: rand(320, 460), delay, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' },
        ),
      );
    });

    Promise.allSettled(animations.map((animation) => animation.finished)).then(() => {
      wrappers.forEach((wrapper) => {
        wrapper.querySelector('[data-orig]').style.transform = 'translateY(0)';
        wrapper.querySelector('[data-hover]').style.transform = 'translateY(-120%)';
      });
      animations.forEach((animation) => animation.cancel());
      isAnimatingRef.current = false;
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
