import React from 'react';
import { ArrowUpRight, MapPin, Code2, GraduationCap, Copy, Check, Sparkles, Terminal, Layers, ArrowDown } from 'lucide-react';
import Github from './icons/Github';

export default function Hero({ onCopyEmail, copiedEmail, isActive = true }) {
  return (
    <section
      id="home"
      className={`min-h-[calc(100vh-4rem)] lg:min-h-screen flex items-center justify-center pt-20 pb-10 sm:pt-24 sm:pb-12 scroll-mt-0 transition-all duration-700 ease-out ${
        isActive
          ? 'opacity-100 translate-y-0 scale-100 blur-none'
          : 'opacity-40 translate-y-6 scale-[0.985] blur-[0.3px]'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Hero Grid: Left Content (7 cols) + Right Photo Showcase (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">

          {/* Profile Picture Column (Top on mobile, Right on desktop) */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[240px] sm:max-w-[300px] md:max-w-[360px] lg:max-w-[420px] group">
              
              {/* Subtle ambient glow behind photo */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-cyan-500/15 via-transparent to-blue-500/15 rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />

              {/* Clean Frameless Photo Container with Sleek Subtle Border */}
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-3xl border border-slate-300/80 dark:border-slate-700/60 bg-slate-900 shadow-xl dark:shadow-2xl">
                <img
                  src="/profile.webp"
                  alt="Daniel Aplan"
                  width={420}
                  height={525}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 pointer-events-none rounded-3xl" />
              </div>

            </div>
          </div>

          {/* Bio & Details Column (Bottom on mobile, Left on desktop) */}
          <div className="order-2 lg:order-1 lg:col-span-7 space-y-6 sm:space-y-7">

            {/* University & Focus Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-100/90 dark:bg-slate-900/90 border border-slate-300/80 dark:border-slate-800 text-xs sm:text-sm font-mono font-semibold text-slate-700 dark:text-slate-300 shadow-xs">
              <GraduationCap size={16} className="text-cyan-600 dark:text-cyan-400" />
              <span>3rd-Year BSIT @ University of Caloocan City</span>
            </div>

            {/* Main Headline & Titles */}
            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                Daniel Aplan
              </h1>
              <p className="text-lg sm:text-2xl md:text-3xl font-bold text-cyan-600 dark:text-cyan-400 tracking-tight">
                Full-Stack Developer
              </p>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl">
              I build high-performance web applications that scale across any screen. Focused on full-stack architecture with TypeScript, React, C#, and relational database design, learning by continuously engineering and shipping production builds.
            </p>

            {/* Location & Specialization Tags */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-cyan-600 dark:text-cyan-400" />
                <span>Caloocan City, Philippines</span>
              </div>
              <span>&bull;</span>
              <div className="flex items-center gap-2">
                <Code2 size={16} className="text-cyan-600 dark:text-cyan-400" />
                <span>Full-Stack Developer</span>
              </div>
            </div>

            {/* Quick Stat / Highlight Cards */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-1 max-w-xl">
              <div className="p-3 sm:p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-300/80 dark:border-slate-800 shadow-xs flex flex-col justify-center">
                <span className="text-base sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono block">6+</span>
                <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-mono">Featured Builds</span>
              </div>
              <div className="p-3 sm:p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-300/80 dark:border-slate-800 shadow-xs flex flex-col justify-center">
                <span className="text-base sm:text-2xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono block">React · Node</span>
                <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-mono">Core Stack</span>
              </div>
              <div className="p-3 sm:p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-300/80 dark:border-slate-800 shadow-xs flex flex-col justify-center">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5">
                  <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs sm:text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono">Active</span>
                </div>
                <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-mono">Available For Hire</span>
              </div>
            </div>

            {/* Standardized 3-Tier Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-3.5 pt-2">
              <a
                href="https://github.com/danielaplan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 transition-all duration-200 cursor-pointer active:scale-95 focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:outline-none"
              >
                <Github size={16} />
                <span>GitHub Profile</span>
                <ArrowUpRight size={14} />
              </a>

              <button
                onClick={onCopyEmail}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm border border-slate-300/80 dark:border-slate-800 hover:border-cyan-500/40 transition-all duration-200 cursor-pointer active:scale-95 focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:outline-none shadow-xs"
                title="Click to copy email address"
              >
                {copiedEmail ? (
                  <>
                    <Check size={15} className="text-cyan-600 dark:text-cyan-400" />
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={15} />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <a
                href="#projects"
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer group"
              >
                <span>View Projects</span>
                <ArrowDown size={14} className="transition-transform group-hover:translate-y-1" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

