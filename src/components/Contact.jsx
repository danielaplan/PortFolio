import React, { useRef } from 'react';
import { Envelope, MapPin, Globe, ArrowUpRight, PaperPlaneTilt, Copy, Check, Clock } from '@phosphor-icons/react';
import Github from './icons/Github';
import Instagram from './icons/Instagram';
import Facebook from './icons/Facebook';
import Linkedin from './icons/Linkedin';
import RandomLetterSwap from './ui/random-letter-swap';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Contact({ onCopyEmail, copiedEmail, isActive = true }) {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef, { threshold: 0.05 });

  const email = "danielaplan.bsit2024@gmail.com";
  const github = "https://github.com/danielaplan";
  const linkedin = "https://www.linkedin.com/in/daniel-aplan-5ba561334/";
  const instagram = "https://www.instagram.com/dniel_apln/";
  const facebook = "https://www.facebook.com/daniel.aplan.9/";

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ backgroundColor: 'var(--bg-surface)' }}
      className={`min-h-[100dvh] lg:min-h-screen flex flex-col justify-center pt-20 pb-10 sm:pt-24 sm:pb-12 border-t scroll-mt-0 transition-all duration-700 ${
        isActive
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-40 translate-y-6 scale-[0.985]'
      }`}
      data-lenis-prevent
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-8 sm:space-y-10" style={{ borderColor: 'var(--border)' }}>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p
              className="text-xs font-mono font-semibold uppercase tracking-wider mb-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              Get In Touch
            </p>
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              Let's Connect
            </h2>
            <p
              className="text-sm sm:text-base mt-2 max-w-2xl font-normal leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Open for full-stack software development opportunities, engineering roles, and direct inquiries.
            </p>
          </div>

          <div
            className="px-3.5 py-2 rounded-xl text-xs font-mono flex items-center gap-2"
            style={{
              backgroundColor: 'var(--bg-canvas)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
            }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--status-active)' }} />
            <span>Direct Inquiries Open</span>
          </div>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* Primary Email Card (Left - 7 cols) */}
          <div
            className="lg:col-span-7 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6"
            style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
          >
            <div className="space-y-5">

              {/* Live Status Badge */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className="relative flex h-2.5 w-2.5"
                    style={{ color: 'var(--status-active)' }}
                  >
                    <span
                      className="animate-pulse absolute inline-flex h-full w-full rounded-full"
                      style={{ backgroundColor: 'var(--status-active)', opacity: 0.4 }}
                    />
                    <span
                      className="relative inline-flex rounded-full h-2.5 w-2.5"
                      style={{ backgroundColor: 'var(--status-active)' }}
                    />
                  </span>
                  <span
                    className="text-xs sm:text-sm font-semibold font-mono"
                    style={{ color: 'var(--status-active)' }}
                  >
                    Available for New Roles &amp; Software Builds
                  </span>
                </div>
                <span
                  className="text-[11px] font-mono px-2.5 py-0.5 rounded-full"
                  style={{ backgroundColor: 'var(--bg-canvas)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                >
                  Full-Time / Freelance
                </span>
              </div>

              {/* Direct Email Display */}
              <div
                className="rounded-xl p-5 sm:p-7"
                style={{ backgroundColor: 'var(--bg-canvas)', border: '1px solid var(--border)' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                    <Envelope size={15} weight="bold" style={{ color: 'var(--text-secondary)' }} />
                    <span>Direct Contact Channel</span>
                  </div>
                  <span className="text-[11px] font-mono" style={{ color: 'var(--text-secondary)' }}>Preferred</span>
                </div>

                <p
                  className="text-lg sm:text-2xl md:text-3xl font-extrabold font-mono tracking-tight break-all select-all"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {email}
                </p>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-4">

                  <button
                    onClick={onCopyEmail}
                    className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded cursor-pointer transition-all duration-200 active:scale-95"
                    style={{ backgroundColor: 'var(--accent)', color: '#ffffff', borderRadius: '4px' }}
                  >
                    {copiedEmail ? (
                      <>
                        <Check size={16} weight="bold" style={{ color: 'var(--status-active)' }} />
                        <span className="font-bold text-xs sm:text-sm" style={{ color: 'var(--status-active)' }}>Email Address Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} weight="bold" />
                        <span className="font-bold text-xs sm:text-sm">
                          <RandomLetterSwap label="Copy Email Address" />
                        </span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${email}?subject=Portfolio%20Inquiry%20-%20Daniel%20Aplan`}
                    className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded cursor-pointer transition-all duration-200 active:scale-95"
                    style={{
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-primary)',
                      borderRadius: '4px',
                    }}
                  >
                    <PaperPlaneTilt size={14} weight="bold" />
                    <span className="font-semibold text-xs sm:text-sm">
                      <RandomLetterSwap label="Open Mail App" />
                    </span>
                  </a>
                </div>
              </div>

            </div>

            {/* Location & Response Metadata Footer */}
            <div
              className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs font-mono"
              style={{ borderTop: '1px solid var(--border)', color: 'var(--text-secondary)' }}
            >
              <div className="flex items-center gap-1.5">
                <MapPin size={14} weight="bold" style={{ color: 'var(--text-secondary)' }} />
                <span>Caloocan City, Metro Manila</span>
              </div>
              <span>&bull;</span>
              <div className="flex items-center gap-1.5">
                <Globe size={14} weight="bold" style={{ color: 'var(--text-secondary)' }} />
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
              className="group rounded-2xl p-5 flex items-center justify-between border card-hover cursor-pointer"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: 'var(--pastel-blue-bg)',
                    color: 'var(--pastel-blue-text)',
                  }}
                >
                  <Linkedin size={22} weight="fill" />
                </div>
                <div>
                  <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                    LinkedIn Profile
                  </h3>
                  <p className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
                    in/daniel-aplan
                  </p>
                </div>
              </div>
              <div
                className="p-2.5 rounded-lg border card-hover"
                style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
              >
                <ArrowUpRight size={16} weight="bold" />
              </div>
            </a>

            {/* GitHub Card */}
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl p-5 flex items-center justify-between border card-hover cursor-pointer"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'var(--bg-canvas)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                >
                  <Github size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                    GitHub Repositories
                  </h3>
                  <p className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
                    github.com/danielaplan
                  </p>
                </div>
              </div>
              <div
                className="p-2.5 rounded-lg border card-hover"
                style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
              >
                <ArrowUpRight size={16} weight="bold" />
              </div>
            </a>

            {/* Social Grid: Instagram & Facebook */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { href: instagram, label: 'Instagram', handle: '@dniel_apln', Icon: Instagram },
                { href: facebook, label: 'Facebook', handle: 'daniel.aplan', Icon: Facebook },
              ].map(({ href, label, handle, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl p-4 sm:p-5 flex items-center justify-between border card-hover cursor-pointer"
                  style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: 'var(--bg-canvas)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{label}</h4>
                      <p className="text-[10px] font-mono" style={{ color: 'var(--text-secondary)' }}>{handle}</p>
                    </div>
                  </div>
                  <ArrowUpRight size={14} weight="bold" style={{ color: 'var(--text-secondary)' }} />
                </a>
              ))}
            </div>

            {/* Turnaround Time Footer Pill */}
            <div
              className="rounded-xl px-5 py-3 flex items-center justify-between text-xs font-mono border"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
            >
              <div className="flex items-center gap-2">
                <Clock size={15} weight="bold" style={{ color: 'var(--text-secondary)' }} />
                <span>Turnaround Time</span>
              </div>
              <span className="font-semibold flex items-center gap-1.5" style={{ color: 'var(--status-active)' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--status-active)' }} />
                Replies within 24h
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
