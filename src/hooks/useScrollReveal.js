import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — fires a one-shot IntersectionObserver fade-up
 * when `ref`'s element enters the viewport.
 *
 * @param {Object} options
 * @param {number}   options.threshold  - intersection threshold (0–1), default 0.1
 * @param {number}   options.delay      - animation delay in ms, default 0
 * @param {boolean}  options.once        - disconnect after first reveal, default true
 */
export function useScrollReveal(
  ref,
  { threshold = 0.1, delay = 0, once = true } = {}
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    el.style.transition = `opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          if (once) observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, delay, once]);
}
