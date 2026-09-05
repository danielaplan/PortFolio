import React from 'react';
import { Mail, MapPin, Send, Copy, Check, Clock, Globe, ArrowUpRight, MessageSquare, Briefcase, Sparkles, CheckCircle2 } from 'lucide-react';
import Github from './icons/Github';
import Instagram from './icons/Instagram';
import Facebook from './icons/Facebook';
import Linkedin from './icons/Linkedin';

export default function Contact({ onCopyEmail, copiedEmail, isActive = true }) {
  const email = "danielaplan.bsit2024@gmail.com";
  const github = "https://github.com/danielaplan";
  const linkedin = "https://www.linkedin.com/in/daniel-aplan-5ba561334/";
  const instagram = "https://www.instagram.com/dniel_apln/";
  const facebook = "https://www.facebook.com/daniel.aplan.9/";

  return (
    <section 
      id="contact" 
      className={`min-h-[calc(100vh-4rem)] lg:min-h-screen flex flex-col justify-center pt-20 pb-10 sm:pt-24 sm:pb-12 scroll-mt-0 transition-all duration-700 ease-out ${
        isActive 
          ? 'opacity-100 translate-y-0 scale-100 blur-none' 
          : 'opacity-40 translate-y-6 scale-[0.985] blur-[0.3px]'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-8 sm:space-y-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-2">
              <MessageSquare size={14} />
              <span>Get In Touch</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Let's Connect
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-normal leading-relaxed">
              Open for full-stack software development opportunities, engineering roles, academic collaborations, or direct inquiries.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-3.5 py-2 rounded-2xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-300/80 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center gap-2 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Direct Inquiries Open</span>
            </div>
          </div>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* Primary Email Card (Left - 7 cols) */}
          <div className="lg:col-span-7 rounded-3xl p-6 sm:p-8 neo-raised-lg bg-[color:var(--bg-color)] dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between shadow-xl space-y-6">
            <div className="space-y-5">
              
              {/* Live Status Badge */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide font-mono">
                    Available for New Roles & Software Builds
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-200/80 dark:bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-300 dark:border-slate-700">
                  Full-Time / Freelance
                </span>
              </div>

              {/* Direct Email Display */}
              <div className="rounded-2xl p-5 sm:p-7 bg-slate-100/90 dark:bg-slate-950/80 border border-slate-300/80 dark:border-slate-800/80 space-y-4 shadow-inner">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                    <Mail size={15} className="text-cyan-600 dark:text-cyan-400" />
                    <span>Direct Contact Channel</span>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400">Preferred</span>
                </div>

                <p className="text-lg sm:text-2xl md:text-3xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-white break-all select-all">
                  {email}
                </p>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    onClick={onCopyEmail}
                    className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-cyan-500/25 transition-all duration-200 cursor-pointer active:scale-95 focus-visible:ring-2 focus-visible:ring-cyan-400/60"
                  >
                    {copiedEmail ? (
                      <>
                        <Check size={16} strokeWidth={2.5} />
                        <span>Email Address Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        <span>Copy Email Address</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${email}?subject=Portfolio%20Inquiry%20-%20Daniel%20Aplan`}
                    className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-slate-200/90 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm border border-slate-300 dark:border-slate-700 transition-all duration-200 cursor-pointer active:scale-95"
                  >
                    <Send size={14} />
                    <span>Open Mail App</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Location & Response Metadata Footer */}
            <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-600 dark:text-slate-400 font-mono">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-cyan-600 dark:text-cyan-400" />
                <span>Caloocan City, Metro Manila</span>
              </div>
              <span>&bull;</span>
              <div className="flex items-center gap-1.5">
                <Globe size={14} className="text-cyan-600 dark:text-cyan-400" />
                <span>UTC+8 (PHT)</span>
              </div>
            </div>
          </div>

          {/* Channels & Social Links (Right - 5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* LinkedIn Card */}
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-3xl p-5 neo-raised-lg bg-[color:var(--bg-color)] dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800 hover:border-cyan-500/50 transition-all duration-300 flex items-center justify-between shadow-lg cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-500/20 group-hover:scale-105 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300 shrink-0">
                  <Linkedin size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    LinkedIn Profile
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                    in/daniel-aplan
                  </p>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-200/70 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                <ArrowUpRight size={16} />
              </div>
            </a>

            {/* GitHub Card */}
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-3xl p-5 neo-raised-lg bg-[color:var(--bg-color)] dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800 hover:border-cyan-500/50 transition-all duration-300 flex items-center justify-between shadow-lg cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-white flex items-center justify-center border border-slate-300 dark:border-slate-700 group-hover:scale-105 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300 shrink-0">
                  <Github size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    GitHub Repositories
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                    github.com/danielaplan
                  </p>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-200/70 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                <ArrowUpRight size={16} />
              </div>
            </a>

            {/* Social Grid: Instagram & Facebook */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-3xl p-4 sm:p-5 neo-raised-md bg-[color:var(--bg-color)] dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 hover:border-cyan-500/50 transition-all duration-300 flex items-center justify-between shadow-md cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-white flex items-center justify-center border border-slate-300 dark:border-slate-700 group-hover:scale-105 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300 shrink-0">
                    <Instagram size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      Instagram
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                      @dniel_apln
                    </p>
                  </div>
                </div>
                <ArrowUpRight size={14} className="text-slate-400 group-hover:text-cyan-500" />
              </a>

              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-3xl p-4 sm:p-5 neo-raised-md bg-[color:var(--bg-color)] dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 hover:border-cyan-500/50 transition-all duration-300 flex items-center justify-between shadow-md cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-white flex items-center justify-center border border-slate-300 dark:border-slate-700 group-hover:scale-105 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300 shrink-0">
                    <Facebook size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      Facebook
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                      daniel.aplan
                    </p>
                  </div>
                </div>
                <ArrowUpRight size={14} className="text-slate-400 group-hover:text-cyan-500" />
              </a>
            </div>

            {/* Turnaround Time / Replies within 24h Footer Pill */}
            <div className="rounded-2xl px-5 py-3 neo-raised-xs bg-[color:var(--bg-color)] dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Clock size={15} className="text-cyan-600 dark:text-cyan-400" />
                <span>Turnaround Time</span>
              </div>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Replies within 24h
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}


