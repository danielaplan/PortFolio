import React from 'react';
import { Mail, ArrowUpRight, MapPin, Code2, GraduationCap, Copy, Check, Sparkles } from 'lucide-react';
import Github from './icons/Github';

export default function Hero({ onCopyEmail, copiedEmail }) {
  return (
    <section id="home" className="pt-6 pb-12 sm:pt-10 sm:pb-16 md:pt-16 md:pb-24">
      <div className="max-w-4xl mx-auto px-5 sm:px-6">

        {/* Hero Content with Profile Picture */}
        <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 md:gap-12">

          {/* Bio & Details Column */}
          <div className="flex-1 space-y-5 sm:space-y-6">

            {/* Status / University Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-950/40 border border-blue-500/20 text-blue-700 dark:text-blue-300 text-[11px] sm:text-xs font-medium backdrop-blur-md shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="flex items-center gap-1.5">
                <GraduationCap size={13} /> 3rd-Year BSIT @ University of Caloocan City
              </span>
            </div>

            {/* Title */}
            <div className="space-y-1.5 sm:space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                Daniel Aplan
              </h1>
              <p className="text-base sm:text-lg md:text-xl font-medium text-slate-600 dark:text-slate-300">
                Aspiring Software Developer & IT Student
              </p>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
              I build web apps that work on any screen — and I care just as much about what's underneath them, from the database to the API. Lately I've been focused on full-stack development with TypeScript, React, C#, and relational databases, learning by actually shipping things.
            </p>

            {/* Metadata Badges */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-slate-400 dark:text-slate-500" />
                <span>Caloocan City, Philippines</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Code2 size={14} className="text-slate-400 dark:text-slate-500" />
                <span>Systems Design & Full-Stack</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
              <a
                href="https://github.com/danielaplan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium text-xs sm:text-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition shadow-xs group"
              >
                <Github size={15} />
                <span>GitHub Profile</span>
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <button
                onClick={onCopyEmail}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-white/80 dark:border-white/10 text-slate-800 dark:text-slate-200 font-medium text-xs sm:text-sm hover:bg-white dark:hover:bg-slate-800 transition cursor-pointer backdrop-blur-md shadow-2xs"
                title="Click to copy email address"
              >
                {copiedEmail ? (
                  <>
                    <Check size={14} className="text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} className="text-slate-500 dark:text-slate-400" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <a
                href="#projects"
                className="inline-flex items-center gap-1 px-3 py-2 rounded-2xl text-slate-500 dark:text-slate-400 font-medium text-xs sm:text-sm hover:text-slate-900 dark:hover:text-white transition"
              >
                <span>Projects</span>
                <span className="text-slate-400">&darr;</span>
              </a>
            </div>

          </div>

          {/* Clean Left-Aligned Profile Picture Column on Mobile */}
          <div className="relative group shrink-0 self-start md:self-auto">
            {/* Ambient Background Glow */}
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-blue-500/25 via-sky-400/20 to-indigo-500/25 rounded-3xl blur-lg opacity-70 group-hover:opacity-100 transition duration-500"></div>

            {/* Glass Image Frame */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-3xl overflow-hidden border border-white/60 dark:border-white/10 bg-white/20 dark:bg-slate-900/40 backdrop-blur-md shadow-lg group-hover:border-blue-400/40 transition duration-300">
              <img
                src="/profile.webp"
                alt="Daniel Aplan"
                width={208}
                height={208}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
              />

              {/* Inner overlay */}
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/10 rounded-3xl pointer-events-none"></div>
            </div>

            {/* Active Status Indicator Pill */}
            <div className="absolute -bottom-2 right-2 sm:-bottom-2.5 sm:right-3 px-2.5 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/80 dark:border-white/10 shadow-sm flex items-center gap-1.5 text-[11px] font-medium text-slate-700 dark:text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Online</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
