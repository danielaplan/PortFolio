import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { EnvelopeSimple, GithubLogo, LinkedinLogo, InstagramLogo, FacebookLogo } from '@phosphor-icons/react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import RandomLetterSwap from './ui/random-letter-swap';
import MultilingualName from './ui/MultilingualName';


export default function Hero({ onCopyEmail, isActive = true }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useScrollReveal(sectionRef, { threshold: 0.05 });

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{ backgroundColor: 'var(--bg-canvas)' }}
      className={`min-h-0 xl:min-h-[calc(100dvh-4rem)] flex items-center justify-center py-6 md:py-10 lg:py-14 xl:py-16 scroll-mt-16 transition-all duration-700 ${
        isActive
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-40 translate-y-6 scale-[0.985]'
      }`}
    >
      <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-10 lg:px-16">

        {/* Hero Grid: Left Content (7 cols) + Right Photo Showcase (5 cols) */}
        <div className="grid grid-cols-1 items-center gap-6 md:gap-12 xl:grid-cols-12 xl:gap-24">

          {/* Profile Picture Column */}
          <div className="order-2 xl:order-2 xl:col-span-5 flex justify-center xl:justify-end">
            <div className="relative w-full max-w-[min(72vw,260px)] md:max-w-[440px] xl:max-w-[500px] group">
              <div
                className="relative w-full aspect-[4/5] overflow-hidden rounded-xl"
                style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg-surface)' }}
              >
                <img
                  src="/profile.jpg"
                  alt="Daniel Aplan"
                  width={420}
                  height={525}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          {/* Bio & Details Column */}
          <div ref={contentRef} className="order-1 min-w-0 xl:order-1 xl:col-span-7 space-y-4 md:space-y-8">

            {/* Main Headline & Titles */}
            <div className="space-y-2 md:space-y-4">
              <p
                className="text-[11px] md:text-sm font-medium uppercase tracking-[0.24em]"
                style={{ color: 'var(--text-secondary)' }}
              >
                Hello, I'm
              </p>
              <h1
                className="min-w-0 max-w-full text-[clamp(2.25rem,8vw,4.5rem)] xl:text-[7.5rem] font-medium tracking-[-0.04em] leading-[1.12] whitespace-nowrap overflow-visible py-[0.08em] transition-all duration-500 ease-out"
                style={{ color: 'var(--text-primary)', fontFamily: "'Uni Sans', 'Inter', system-ui, sans-serif" }}
              >
                <MultilingualName />
              </h1>
                <p
                className="text-[clamp(0.9375rem,3.5vw,2rem)] xl:text-4xl font-semibold tracking-tight"
                style={{ color: 'var(--text-secondary)' }}
              >
                BSIT Student <span className="mx-2" style={{ color: 'var(--text-tertiary)' }}>/</span> Aspiring Full-Stack Developer
              </p>
            </div>

            {/* Description */}
            <p
              className="max-w-2xl text-[clamp(0.875rem,1.8vw,1.125rem)] leading-[1.45] xl:leading-9"
              style={{ color: 'var(--text-secondary)' }}
            >
              I build simple, functional, and user-friendly web applications with a focus on clean code, problem solving, and continuous learning.
            </p>


            {/* Standardized 3-Tier Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 md:gap-5 pt-0.5 md:pt-3">

              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-[14px] font-medium cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:scale-95 md:gap-2.5 md:px-7 md:py-3.5 md:text-base"
                style={{ backgroundColor: 'var(--accent)', color: '#ffffff' }}
              >
                <RandomLetterSwap label="View Projects" />
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5 md:h-[17px] md:w-[17px]" />
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-[14px] font-medium cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--bg-surface)] active:scale-95 md:gap-2.5 md:px-7 md:py-3.5 md:text-base"
                style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              >
                <RandomLetterSwap label="Contact Me" />
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5 md:h-[17px] md:w-[17px]" />
              </a>
            </div>

            <nav className="flex items-center gap-5 pt-1 md:pt-3" aria-label="Social links">
              {[
                { label: 'GitHub', href: 'https://github.com/danielaplan', Icon: GithubLogo },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/daniel-aplan-5ba561334/', Icon: LinkedinLogo },
                { label: 'Email', href: 'mailto:danielaplan.bsit2024@gmail.com', Icon: EnvelopeSimple },
                { label: 'Instagram', href: 'https://www.instagram.com/dniel_apln/', Icon: InstagramLogo },
                { label: 'Facebook', href: 'https://www.facebook.com/daniel.aplan.9/', Icon: FacebookLogo },
              ].map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  onClick={label === 'Email' ? (event) => {
                    event.preventDefault();
                    onCopyEmail?.();
                  } : undefined}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="inline-flex items-center justify-center rounded-sm p-1.5 transition-all duration-200 hover:-translate-y-0.5 hover:scale-110 hover:text-[var(--text-primary)] active:scale-95"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <Icon size={21} weight="bold" />
                </a>
              ))}
            </nav>

          </div>

        </div>
      </div>
    </section>
  );
}
