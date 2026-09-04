import React from 'react';
import { ArrowUpRight, MapPin, Code2, GraduationCap, Copy, Check } from 'lucide-react';
import Github from './icons/Github';

export default function Hero({ onCopyEmail, copiedEmail }) {
  return (
    <section id="home" className="pt-6 pb-12 sm:pt-10 sm:pb-16 md:pt-16 md:pb-24">
      <div className="w-full px-5 sm:px-8 lg:px-12">

        {/* Hero Content with Profile Picture */}
        <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 md:gap-12">

          {/* Bio & Details Column */}
          <div className="flex-1 space-y-5 sm:space-y-6">

            {/* Status / University Pill — neumorphic raised */}
            <div className="neo-raised-xs inline-flex items-center gap-2 px-3 py-1.5 text-[11px] sm:text-xs font-medium">
              <GraduationCap size={13} />
              <span>3rd-Year BSIT @ University of Caloocan City</span>
            </div>

            {/* Title */}
            <div className="space-y-1.5 sm:space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Daniel Aplan
              </h1>
              <p className="text-base sm:text-lg md:text-xl font-medium text-[color:var(--text-secondary)]">
                Aspiring Software Developer & IT Student
              </p>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm md:text-base text-[color:var(--text-secondary)] leading-relaxed max-w-xl">
              I build web apps that work on any screen — and I care just as much about what's underneath them, from the database to the API. Lately I've been focused on full-stack development with TypeScript, React, C#, and relational databases, learning by actually shipping things.
            </p>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-[color:var(--text-secondary)]">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} />
                <span>Caloocan City, Philippines</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Code2 size={14} />
                <span>Systems Design & Full-Stack</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://github.com/danielaplan"
                target="_blank"
                rel="noopener noreferrer"
                className="neo-press inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium"
              >
                <Github size={15} />
                <span>GitHub Profile</span>
                <ArrowUpRight size={13} />
              </a>

              <button
                onClick={onCopyEmail}
                className="neo-press inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium"
                title="Click to copy email address"
              >
                {copiedEmail ? (
                  <>
                    <Check size={14} className="text-accent" />
                    <span className="text-accent font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <a
                href="#projects"
                className="inline-flex items-center gap-1 px-3 py-2 text-xs sm:text-sm font-medium text-[color:var(--text-secondary)] hover:opacity-70 transition-opacity cursor-pointer"
              >
                <span>Projects</span>
                <span>&darr;</span>
              </a>
            </div>

          </div>

          {/* Profile Picture Column — neumorphic raised frame */}
          <div className="relative shrink-0 self-start md:self-auto">
            <div className="neo-raised-lg w-52 sm:w-60 md:w-64 aspect-[4/5] overflow-hidden p-1.5">
              <div className="w-full h-full overflow-hidden rounded-[calc(var(--radius-lg)-8px)]">
                <img
                  src="/profile.webp"
                  alt="Daniel Aplan"
                  width={256}
                  height={320}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Active Status Indicator Pill — floats outside the frame */}
            <div className="neo-raised-xs absolute -bottom-3 right-4 px-3 py-1.5 flex items-center gap-1.5 text-[11px] font-medium">
              <span className="h-2 w-2 rounded-full text-accent bg-current"></span>
              <span>Online</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
