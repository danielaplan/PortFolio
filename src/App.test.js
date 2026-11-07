import { describe, expect, it } from 'vitest';
import { hasReachedSection } from './App';

describe('hasReachedSection', () => {
  it('keeps navigation locked while smooth scrolling through intermediate sections', () => {
    const target = { getBoundingClientRect: () => ({ top: 240 }) };

    expect(hasReachedSection('projects', target, false)).toBe(false);
    expect(hasReachedSection('projects', { getBoundingClientRect: () => ({ top: 1 }) }, false)).toBe(true);
    expect(hasReachedSection('contact', target, true)).toBe(true);
  });
});
