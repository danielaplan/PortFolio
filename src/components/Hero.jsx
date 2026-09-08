import { useRef } from 'react';
import { GraduationCap, MapPin, ArrowDown, Copy, Check } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Github from './icons/Github';
import RandomLetterSwap from './ui/random-letter-swap';
import MultilingualName from './ui/MultilingualName';


export default function Hero({ onCopyEmail, copiedEmail, isActive = true }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useScrollReveal(sectionRef, { threshold: 0.05 });

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{ backgroundColor: 'var(--bg-canvas)' }}
      className={`min-h-[calc(100dvh-4rem)] flex items-center justify-center py-8 sm:py-12 scroll-mt-16 transition-all duration-700 ${
        isActive
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-40 translate-y-6 scale-[0.985]'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Hero Grid: Left Content (7 cols) + Right Photo Showcase (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">

          {/* Profile Picture Column */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[240px] sm:max-w-[300px] md:max-w-[360px] lg:max-w-[420px] group">
              <div
                className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl"
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
          <div ref={contentRef} className="order-2 lg:order-1 lg:col-span-7 space-y-6 sm:space-y-7">

            {/* University & Focus Pill */}

            
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg text-xs font-medium"
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
              }}
            >
              <GraduationCap size={16} weight="bold" style={{ color: 'var(--text-secondary)' }} />
              <span>BSIT @ University of Caloocan City</span>
            </div>
            

            {/* Main Headline & Titles */}
            <div className="space-y-2 sm:space-y-3">
              <h1
                className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black tracking-tight leading-[1.05] whitespace-nowrap transition-all duration-500 ease-out"
                style={{ color: 'var(--text-primary)', fontFamily: "'Instrument Serif', serif" }}
              >
                <MultilingualName />
              </h1>
                <p
                className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight"
                style={{ color: 'var(--text-secondary)' }}
              >
                Full-Stack Developer
              </p>
            </div>

            {/* Description */}
            <p
              className="text-sm sm:text-lg md:text-xl leading-relaxed font-normal max-w-2xl"
              style={{ color: '#4A4A4A' }}
            >
              I build high-performance web applications that scale across any screen. Focused on full-stack architecture with TypeScript, React, C#, and relational database design, learning by continuously engineering and shipping production builds.
            </p>


            {/* Location */}
            <div className="flex flex-wrap items-center gap-x-5 text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
              <div className="flex items-center gap-2">
                <MapPin size={16} weight="bold" style={{ color: 'var(--text-secondary)' }} />
                <span>Caloocan City, Philippines</span>
              </div>
            </div>

            {/* Quick Stat / Highlight Cards */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-1 max-w-xl">
              <div
                className="p-3 sm:p-4 rounded-xl flex flex-col justify-center"
                style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
              >
                <span className="text-base sm:text-2xl font-extrabold font-mono block" style={{ color: 'var(--text-primary)' }}>6+</span>
                <span className="text-[10px] sm:text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>Featured Builds</span>
              </div>
              <div
                className="p-3 sm:p-4 rounded-xl flex flex-col justify-center"
                style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
              >
                <span className="text-base sm:text-2xl font-extrabold font-mono block" style={{ color: 'var(--text-primary)' }}>React · Node</span>
                <span className="text-[10px] sm:text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>Core Stack</span>
              </div>
              <div
                className="p-3 sm:p-4 rounded-xl flex flex-col justify-center"
                style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
              >
                <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5">
                  <span
                    className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5"
                    style={{ color: 'var(--status-active)' }}
                  >
                    <span
                      className="animate-pulse absolute inline-flex h-full w-full rounded-full"
                      style={{ backgroundColor: 'var(--status-active)', opacity: 0.4 }}
                    />
                    <span
                      className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5"
                      style={{ backgroundColor: 'var(--status-active)' }}
                    />
                  </span>
                  <span className="text-xs sm:text-base font-bold font-mono" style={{ color: 'var(--status-active)' }}>Active</span>
                </div>
                <span className="text-[10px] sm:text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>Available For Hire</span>
              </div>
            </div>

            {/* Standardized 3-Tier Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-3.5 pt-2">

              {/* Primary CTA */}
              <a
                href="https://github.com/danielaplan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg cursor-pointer transition-all duration-200 active:scale-95"
                style={{ backgroundColor: 'var(--accent)', color: '#ffffff' }}
              >
                <Github size={16} />
                <span className="font-bold text-xs sm:text-sm">
                  <RandomLetterSwap label="GitHub Profile" />
                </span>
              </a>

              {/* Copy Email */}
              <button
                onClick={onCopyEmail}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg cursor-pointer transition-all duration-200 active:scale-95"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                }}
                title="Click to copy email address"
              >
                {copiedEmail ? (
                  <>
                    <Check size={15} weight="bold" style={{ color: 'var(--status-active)' }} />
                    <span className="font-bold text-xs sm:text-sm" style={{ color: 'var(--status-active)' }}>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={15} weight="bold" />
                    <span className="font-semibold text-xs sm:text-sm">
                      <RandomLetterSwap label="Copy Email" />
                    </span>
                  </>
                )}
              </button>

              {/* View Projects */}
              <a
                href="#projects"
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors duration-200 cursor-pointer group"
                style={{ color: 'var(--text-secondary)' }}
              >
                <RandomLetterSwap label="View Projects" />
                <ArrowDown size={14} weight="bold" className="transition-transform group-hover:translate-y-1" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
