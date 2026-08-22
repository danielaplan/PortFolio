import React from 'react';
import { Mail, ArrowUpRight, MapPin, Code2, GraduationCap, Copy, Check, Sparkles } from 'lucide-react';
import Github from './icons/Github';

export default function Hero({ onCopyEmail, copiedEmail }) {
  return (
    <section id="home" className="pt-10 pb-16 md:pt-16 md:pb-24">
      <div className="max-w-4xl mx-auto px-6">

        {/* Hero Content with Profile Picture */}
        <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-8 md:gap-12">

          {/* Bio & Details Column */}
          <div className="flex-1 space-y-6">

            {/* Status / University Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200/80 dark:border-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="flex items-center gap-1.5">
                <GraduationCap size={14} /> 3rd-Year BSIT @ University of Caloocan City
              </span>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                Daniel Aplan
              </h1>
              <p className="text-lg sm:text-xl font-medium text-slate-600 dark:text-slate-300">
                Aspiring Software Engineer & IT Student
              </p>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
              Passionate about building responsive web applications, robust database architectures, and intuitive systems. Currently focused on modern full-stack development with TypeScript, React, C#, and relational databases.
            </p>

            {/* Metadata Badges */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <MapPin size={15} className="text-slate-400 dark:text-slate-500" />
                <span>Caloocan City, Philippines</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Code2 size={15} className="text-slate-400 dark:text-slate-500" />
                <span>Systems Design & Full-Stack</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://github.com/danielaplan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium text-xs sm:text-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition shadow-xs group"
              >
                <Github size={16} />
                <span>GitHub Profile</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <button
                onClick={onCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-medium text-xs sm:text-sm hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
                title="Click to copy email address"
              >
                {copiedEmail ? (
                  <>
                    <Check size={15} className="text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={15} className="text-slate-500 dark:text-slate-400" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <a
                href="#projects"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 font-medium text-xs sm:text-sm hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition"
              >
                <span>Projects</span>
                <span className="text-slate-400">&darr;</span>
              </a>
            </div>

          </div>

          {/* Minimalist Profile Picture Column */}
          <div className="relative group shrink-0 self-center md:self-auto">
            {/* Ambient Background Glow */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600/20 via-sky-500/10 to-indigo-500/20 rounded-3xl blur-lg opacity-70 group-hover:opacity-100 transition duration-500"></div>

            {/* Image Frame */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-3xl overflow-hidden border-2 border-slate-200/80 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 shadow-md group-hover:border-blue-500/40 transition duration-300">
              <img
                src="/profile.jpg"
                alt="Daniel Aplan"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
              />

              {/* Subtle inner shadow overlay */}
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/10 rounded-3xl pointer-events-none"></div>
            </div>

            {/* Active Status Indicator Pill */}
            <div className="absolute -bottom-2 right-2 sm:-bottom-2.5 sm:right-3 px-2.5 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-1.5 text-[11px] font-medium text-slate-700 dark:text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Online</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
