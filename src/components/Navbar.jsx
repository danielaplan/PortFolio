import React, { useEffect, useRef } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { animate, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Code, EnvelopeSimple, House, Moon, Stack, Sun } from '@phosphor-icons/react';

const SCALE = 2.25;
const DISTANCE = 110;
const NUDGE = 40;
const SPRING = { mass: 0.1, stiffness: 170, damping: 12 };
const HIGHLIGHT_SPRING = { type: 'spring', stiffness: 420, damping: 34 };

const NAV_LINKS = [
  { name: 'Home', href: '#home', id: 'home', icon: House },
  { name: 'Projects', href: '#projects', id: 'projects', icon: Code },
  { name: 'Skills', href: '#skills', id: 'skills', icon: Stack },
  { name: 'Contact', href: '#contact', id: 'contact', icon: EnvelopeSimple },
];

export default function Navbar({ theme, toggleTheme, activeSection, setActiveSection }) {
  const snapHighlight = useRef(false);
  const mouseLeft = useMotionValue(-Infinity);
  const mouseRight = useMotionValue(-Infinity);
  const leftSpring = useSpring(useTransform(mouseLeft, [0, 40], [0, -40]), SPRING);
  const rightSpring = useSpring(useTransform(mouseRight, [0, 40], [0, -40]), SPRING);

  const handleNavClick = (event, href, id) => {
    event.preventDefault();
    snapHighlight.current = true;
    setActiveSection?.(id);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    snapHighlight.current = false;
  }, [activeSection]);

  return (
    <Tooltip.Provider delayDuration={0}>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-28 backdrop-blur-md"
        style={{
          background: 'linear-gradient(to bottom, transparent, color-mix(in srgb, var(--bg-canvas) 88%, transparent) 72%, var(--bg-canvas))',
          maskImage: 'linear-gradient(to bottom, transparent, black 55%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 55%)',
        }}
      />

      <motion.nav
        aria-label="Primary navigation"
        onMouseMove={(event) => {
          const { left, right } = event.currentTarget.getBoundingClientRect();
          mouseLeft.set(event.clientX - left);
          mouseRight.set(right - event.clientX);
        }}
        onMouseLeave={() => {
          mouseLeft.set(-Infinity);
          mouseRight.set(-Infinity);
        }}
        className="fixed bottom-6 left-1/2 z-50 hidden h-16 -translate-x-1/2 items-end gap-3 px-3 pb-2.5 sm:flex"
      >
        <motion.div
          aria-hidden="true"
          className="absolute inset-y-0 -z-10 rounded-full border backdrop-blur-xl"
          style={{
            left: leftSpring,
            right: rightSpring,
            background: 'var(--dock-surface)',
            borderColor: 'color-mix(in srgb, var(--border-hover) 60%, transparent)',
            boxShadow: 'var(--dock-shadow)',
          }}
        />

        {NAV_LINKS.map((link) => (
          <DockLink
            key={link.id}
            link={link}
            mouseLeft={mouseLeft}
            isActive={activeSection === link.id}
            snapHighlight={snapHighlight.current}
            onNavigate={handleNavClick}
          />
        ))}
        <ThemeButton theme={theme} toggleTheme={toggleTheme} mouseLeft={mouseLeft} magnify />
      </motion.nav>

      <nav
        aria-label="Primary navigation"
        className="fixed bottom-4 left-1/2 z-50 grid w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 grid-cols-5 items-center gap-1.5 rounded-full border p-1.5 backdrop-blur-xl sm:hidden"
        style={{
          background: 'var(--dock-surface)',
          borderColor: 'color-mix(in srgb, var(--border-hover) 60%, transparent)',
          boxShadow: 'var(--dock-shadow)',
          paddingBottom: 'max(0.375rem, env(safe-area-inset-bottom))',
        }}
      >
        {NAV_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = activeSection === link.id;

          return (
            <a
              key={link.id}
              href={link.href}
              onClick={(event) => handleNavClick(event, link.href, link.id)}
              aria-current={isActive ? 'page' : undefined}
              className="relative flex min-h-16 flex-col items-center justify-center gap-1 rounded-[1.6rem] px-2 text-[11px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                backgroundColor: isActive ? 'transparent' : 'var(--bg-raised)',
                color: isActive ? 'var(--button-text)' : 'var(--text-secondary)',
                outlineColor: 'var(--accent)',
                boxShadow: isActive ? 'none' : 'var(--card-shadow)',
              }}
            >
              {isActive && (
                <motion.span
                  layoutId="mobile-dock-active"
                  className="absolute inset-0 rounded-[1.6rem]"
                  style={{ backgroundColor: 'var(--accent)', boxShadow: 'var(--dock-active-shadow)' }}
                  transition={snapHighlight.current ? { duration: 0 } : HIGHLIGHT_SPRING}
                />
              )}
              <Icon className="relative z-10" size={20} weight={isActive ? 'fill' : 'bold'} aria-hidden="true" />
              <span className="relative z-10">{link.name}</span>
            </a>
          );
        })}
        <ThemeButton theme={theme} toggleTheme={toggleTheme} />
      </nav>
    </Tooltip.Provider>
  );
}

function ThemeButton({ theme, toggleTheme, mouseLeft, magnify = false }) {
  const ref = useRef(null);
  const y = useMotionValue(0);
  const distance = useTransform(() => {
    if (!mouseLeft || !ref.current) return -Infinity;
    return mouseLeft.get() - ref.current.offsetLeft - ref.current.offsetWidth / 2;
  });
  const scale = useSpring(
    useTransform(distance, [-DISTANCE, 0, DISTANCE], [1, SCALE, 1]),
    SPRING,
  );
  const x = useSpring(
    useTransform(() => {
      const value = distance.get();
      if (!Number.isFinite(value)) return 0;
      if (value < -DISTANCE || value > DISTANCE) return Math.sign(value) * -NUDGE;
      return (-value / DISTANCE) * NUDGE * scale.get();
    }),
    SPRING,
  );

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <motion.button
          ref={ref}
          type="button"
          onClick={(event) => {
            if (magnify) animate(y, [0, -28, 0], { repeat: 1, duration: 0.55 });
            toggleTheme({ x: event.clientX, y: event.clientY });
          }}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className={magnify
            ? 'flex aspect-square w-10 origin-bottom items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4'
            : 'flex min-h-16 w-full flex-col items-center justify-center gap-1 rounded-[1.6rem] px-2 text-[11px] font-semibold focus-visible:outline-2 focus-visible:outline-offset-2'}
          style={{
            x: magnify ? x : 0,
            y: magnify ? y : 0,
            scale: magnify ? scale : 1,
            backgroundColor: 'var(--bg-raised)',
            color: 'var(--text-primary)',
            boxShadow: 'var(--card-shadow)',
            outlineColor: 'var(--accent)',
          }}
        >
          {theme === 'dark'
            ? <Sun size={20} weight="bold" aria-hidden="true" />
            : <Moon size={20} weight="bold" aria-hidden="true" />}
          {!magnify && <span>Theme</span>}
        </motion.button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="top"
          sideOffset={magnify ? 30 : 12}
          className="z-[60] rounded-md border px-2.5 py-1.5 text-xs font-semibold shadow-lg"
          style={{
            backgroundColor: 'var(--bg-raised)',
            borderColor: 'var(--border)',
            color: 'var(--text-primary)',
          }}
        >
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          <Tooltip.Arrow style={{ fill: 'var(--bg-raised)' }} />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

function DockLink({ link, mouseLeft, isActive, snapHighlight, onNavigate }) {
  const ref = useRef(null);
  const y = useMotionValue(0);
  const distance = useTransform(() => {
    const bounds = ref.current
      ? { x: ref.current.offsetLeft, width: ref.current.offsetWidth }
      : { x: 0, width: 0 };
    return mouseLeft.get() - bounds.x - bounds.width / 2;
  });
  const scale = useTransform(distance, [-DISTANCE, 0, DISTANCE], [1, SCALE, 1]);
  const x = useTransform(() => {
    const value = distance.get();
    if (value === -Infinity) return 0;
    if (value < -DISTANCE || value > DISTANCE) return Math.sign(value) * -NUDGE;
    return (-value / DISTANCE) * NUDGE * scale.get();
  });
  const scaleSpring = useSpring(scale, SPRING);
  const xSpring = useSpring(x, SPRING);
  const Icon = link.icon;

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <motion.a
          ref={ref}
          href={link.href}
          aria-current={isActive ? 'page' : undefined}
          aria-label={link.name}
          onClick={(event) => {
            animate(y, [0, -28, 0], { repeat: 1, duration: 0.55 });
            onNavigate(event, link.href, link.id);
          }}
          className="relative flex aspect-square w-10 origin-bottom items-center justify-center rounded-full shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4"
          style={{
            x: xSpring,
            y,
            scale: scaleSpring,
            backgroundColor: isActive ? 'transparent' : 'var(--bg-raised)',
            color: isActive ? 'var(--button-text)' : 'var(--text-primary)',
            outlineColor: 'var(--accent)',
            boxShadow: isActive ? 'none' : 'var(--card-shadow)',
          }}
        >
          {isActive && (
            <motion.span
              layoutId="desktop-dock-active"
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: 'var(--accent)', boxShadow: 'var(--dock-active-shadow)' }}
              transition={snapHighlight ? { duration: 0 } : HIGHLIGHT_SPRING}
            />
          )}
          <Icon className="relative z-10" size={19} weight={isActive ? 'fill' : 'bold'} aria-hidden="true" />
        </motion.a>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="top"
          sideOffset={30}
          className="z-[60] rounded-md border px-2.5 py-1.5 text-xs font-semibold shadow-lg"
          style={{
            backgroundColor: 'var(--bg-raised)',
            borderColor: 'var(--border)',
            color: 'var(--text-primary)',
          }}
        >
          {link.name}
          <Tooltip.Arrow style={{ fill: 'var(--bg-raised)' }} />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
