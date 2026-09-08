// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';
import gsap from 'gsap';
import RandomLetterSwap from './random-letter-swap';

afterEach(() => {
  cleanup();
  gsap.globalTimeline.clear();
});

function getLetters(container) {
  return Array.from(container.querySelectorAll('span[data-letter]'));
}

function hoverRoot(container) {
  fireEvent.mouseEnter(container.firstChild);
}

function finishAnimations() {
  gsap.globalTimeline.progress(1);
}

describe('RandomLetterSwap', () => {
  it('renders one span per letter and skips spaces', () => {
    const { container } = render(<RandomLetterSwap label="About Us" />);
    const letters = getLetters(container);
    expect(letters).toHaveLength(8); // A,b,o,u,t,U,s — space excluded
    expect(letters.map((s) => s.textContent).join('')).toBe('AboutUs');
  });

  it('exposes the real label to screen readers and hides the scrambling letters', () => {
    const { container } = render(<RandomLetterSwap label="Projects" />);
    // Accessible copy of the label (not aria-hidden)
    const srText = container.querySelector('.sr-only');
    expect(srText).toBeTruthy();
    expect(srText.textContent).toBe('Projects');
    // Visual letters are hidden from assistive tech
    const visualWrapper = container.querySelector('[aria-hidden="true"]');
    expect(visualWrapper).toBeTruthy();
    expect(getLetters(visualWrapper).length).toBe(8);
  });

  it('resolves back to the original label after the hover scramble completes', async () => {
    const { container } = render(<RandomLetterSwap label="Skills" />);
    hoverRoot(container);
    finishAnimations();
    await waitFor(() => {
      expect(getLetters(container).map((s) => s.textContent).join('')).toBe('Skills');
    });
  });

  it('recovers cleanly when hovered again mid-scramble', async () => {
    const { container } = render(<RandomLetterSwap label="Contact" />);
    hoverRoot(container);
    gsap.globalTimeline.progress(0.5); // interrupt partway
    hoverRoot(container);              // re-hover while scrambling
    finishAnimations();
    await waitFor(() => {
      expect(getLetters(container).map((s) => s.textContent).join('')).toBe('Contact');
    });
  });

  it('is safe to unmount mid-scramble and render a fresh instance', () => {
    const first = render(<RandomLetterSwap label="About" />);
    hoverRoot(first.container);
    gsap.globalTimeline.progress(0.5);
    first.unmount();
    expect(() => render(<RandomLetterSwap label="About" />)).not.toThrow();
  });
});
