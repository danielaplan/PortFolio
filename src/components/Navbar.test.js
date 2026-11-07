import { describe, expect, it } from 'vitest';
import { getDockScale } from './Navbar';

describe('getDockScale', () => {
  it('keeps the dock spring finite before the first pointer move', () => {
    expect(getDockScale(-Infinity)).toBe(1);
    expect(getDockScale(0)).toBe(2.25);
    expect(getDockScale(110)).toBe(1);
  });
});
