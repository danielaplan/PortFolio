import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { EnvelopeSimple, GithubLogo, LinkedinLogo, InstagramLogo, FacebookLogo } from '@phosphor-icons/react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import RandomLetterSwap from './ui/random-letter-swap';

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/danielaplan', Icon: GithubLogo },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/daniel-aplan-5ba561334/', Icon: LinkedinLogo },
  { label: 'Email', href: 'mailto:danielaplan.bsit2024@gmail.com', Icon: EnvelopeSimple },
  { label: 'Instagram', href: 'https://www.instagram.com/dniel_apln/', Icon: InstagramLogo },
  { label: 'Facebook', href: 'https://www.facebook.com/daniel.aplan.9/', Icon: FacebookLogo },
];

function MonochromePortrait() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <img
        src="/profile-halftone-cutout.png"
        alt="Daniel Aplan"
        width={420}
        height={525}
        loading="eager"
        decoding="async"
        className="profile-theme-image portrait-bottom-fade absolute bottom-0 left-1/2 h-full w-[138%] max-w-none -translate-x-1/2 object-contain object-bottom"
      />
    </div>
  );
}

export default function Hero({ onCopyEmail }) {
  const sectionRef = useRef(null);

  useScrollReveal(sectionRef, { threshold: 0.05 });

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{ background: 'var(--page-background)' }}
      className="relative min-h-[calc(100dvh-4rem)] overflow-hidden scroll-mt-16 md:flex md:items-center md:px-8 md:py-16 lg:px-12"
    >
      <div className="md:hidden">
        <div className="relative h-80 overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 mx-auto h-[19rem] w-[min(90vw,22rem)]">
            <MonochromePortrait />
          </div>
        </div>

        <div className="px-5 pb-10 pt-8 text-center">
          <h1 className="mx-auto max-w-full py-1 text-4xl font-normal leading-none tracking-[-0.045em]" style={{ color: 'var(--text-primary)', fontFamily: "'Courier New', Courier, monospace" }}>
            Daniel Aplan
          </h1>
          <p className="mt-3 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
            BSIT Student <span className="mx-2" style={{ color: 'var(--text-tertiary)' }}>/</span> Full-Stack Developer
          </p>
          <p className="mx-auto mt-5 max-w-sm text-sm leading-6" style={{ color: 'var(--text-secondary)' }}>
            I build simple, functional, and user-friendly web applications with clean code and thoughtful problem solving.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <a href="#projects" className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-semibold" style={{ backgroundColor: 'var(--accent)', color: 'var(--button-text)' }}>
              View Projects <ArrowRight size={14} />
            </a>
            <a href="#contact" className="inline-flex items-center justify-center rounded-md border px-4 py-3 text-sm font-semibold" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-raised)', color: 'var(--text-primary)' }}>
              Contact Me
            </a>
          </div>

          <nav className="mt-6 flex items-center justify-center gap-7 border-y py-4" style={{ borderColor: 'var(--border)' }} aria-label="Mobile social links">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a key={label} href={href} onClick={label === 'Email' ? (event) => { event.preventDefault(); onCopyEmail?.(); } : undefined} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} aria-label={label} style={{ color: 'var(--text-primary)' }}>
                <Icon size={21} weight="bold" />
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="relative z-10 mx-auto hidden w-full max-w-6xl items-center gap-10 md:grid lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-12">
        <div className="flex min-w-0 flex-col items-start lg:order-2">
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.28em]" style={{ color: 'var(--text-secondary)' }}>
            Hello, I&apos;m
          </p>
          <h1
            className="w-full py-2 text-[clamp(3.25rem,7vw,6.75rem)] font-normal leading-none tracking-[-0.055em] sm:py-3"
            style={{ color: 'var(--text-primary)', fontFamily: "'Courier New', Courier, monospace" }}
          >
            Daniel Aplan
          </h1>
          <p className="mt-5 text-sm font-medium sm:text-base" style={{ color: 'var(--text-primary)' }}>
            BSIT Student <span className="mx-3" style={{ color: 'var(--text-tertiary)' }}>/</span> Aspiring Full-Stack Developer
          </p>
          <p className="mt-8 max-w-lg text-sm leading-7 sm:text-base" style={{ color: 'var(--text-secondary)' }}>
            I build simple, functional, and user-friendly web applications with a focus on clean code, problem solving, and continuous learning.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className="group inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium transition-colors" style={{ backgroundColor: 'var(--accent)', color: 'var(--button-text)' }}>
              <RandomLetterSwap label="View Projects" />
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href="#contact" className="inline-flex items-center rounded-md border px-5 py-3 text-sm font-medium transition-colors hover:bg-[var(--bg-raised)]" style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              <RandomLetterSwap label="Contact Me" />
            </a>
          </div>
          <nav className="mt-12 flex items-center gap-4" aria-label="Social links">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a key={label} href={href} onClick={label === 'Email' ? (event) => { event.preventDefault(); onCopyEmail?.(); } : undefined} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} aria-label={label} className="p-1 transition-opacity hover:opacity-50" style={{ color: 'var(--text-primary)' }}>
                <Icon size={18} weight="bold" />
              </a>
            ))}
          </nav>
        </div>

        <div className="mx-auto h-[min(68dvh,600px)] w-full max-w-[380px] lg:order-1 lg:mx-0 lg:justify-self-start">
          <div className="relative h-full w-full">
            <MonochromePortrait />
          </div>
        </div>
      </div>
    </section>
  );
}
