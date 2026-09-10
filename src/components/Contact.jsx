import React, { useRef } from 'react';
import {
  Check,
  Copy,
  EnvelopeSimple,
  FacebookLogo,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  PaperPlaneTilt,
} from '@phosphor-icons/react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Contact({ onCopyEmail, copiedEmail }) {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef, { threshold: 0.05 });

  const email = 'danielaplan.bsit2024@gmail.com';
  const github = 'https://github.com/danielaplan';
  const linkedin = 'https://www.linkedin.com/in/daniel-aplan-5ba561334/';
  const instagram = 'https://www.instagram.com/dniel_apln/';
  const facebook = 'https://www.facebook.com/daniel.aplan.9/';

  const socialLinks = [
    { label: 'GitHub', href: github, Icon: GithubLogo },
    { label: 'LinkedIn', href: linkedin, Icon: LinkedinLogo },
    { label: 'Instagram', href: instagram, Icon: InstagramLogo },
    { label: 'Facebook', href: facebook, Icon: FacebookLogo },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ backgroundColor: 'var(--bg-surface)' }}
      className={`min-h-0 border-t scroll-mt-16 px-4 pb-12 pt-14 sm:px-8 sm:pb-16 sm:pt-20 lg:min-h-[calc(100dvh-4rem)] lg:px-12 lg:pt-24 flex flex-col justify-center`}
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">
          <div>
            <h2 className="text-4xl font-semibold tracking-[-0.05em] sm:text-6xl" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
              Let&apos;s Connect
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 sm:text-base" style={{ color: 'var(--text-secondary)' }}>
              Have a project in mind, a question, or just want to say hello? I&apos;d love to hear from you.
            </p>

            <div className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              <a href={`mailto:${email}`} className="group flex items-start gap-4 sm:col-span-2" style={{ color: 'var(--text-primary)' }}>
                <EnvelopeSimple size={22} weight="regular" className="mt-0.5 shrink-0" />
                <span>
                  <span className="block text-sm font-medium">{email}</span>
                  <span className="mt-1 block text-xs" style={{ color: 'var(--text-secondary)' }}>Send me an email</span>
                </span>
              </a>
              <a href={github} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4" style={{ color: 'var(--text-primary)' }}>
                <GithubLogo size={22} weight="regular" className="mt-0.5 shrink-0" />
                <span>
                  <span className="block text-sm font-medium">github.com/danielaplan</span>
                  <span className="mt-1 block text-xs" style={{ color: 'var(--text-secondary)' }}>Check out my work</span>
                </span>
              </a>
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4" style={{ color: 'var(--text-primary)' }}>
                <LinkedinLogo size={22} weight="regular" className="mt-0.5 shrink-0" />
                <span>
                  <span className="block text-sm font-medium">linkedin.com/in/danielaplan</span>
                  <span className="mt-1 block text-xs" style={{ color: 'var(--text-secondary)' }}>Let&apos;s connect</span>
                </span>
              </a>
              {socialLinks.slice(2).map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <Icon size={22} weight="regular" className="mt-0.5 shrink-0" />
                  <span>
                    <span className="block text-sm font-medium">{label}</span>
                    <span className="mt-1 block text-xs" style={{ color: 'var(--text-secondary)' }}>
                      Visit my {label} profile
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="flex border p-6 sm:p-8 lg:mt-10 lg:min-h-[336px] lg:flex-col lg:justify-center" style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Email me directly</span>
              <EnvelopeSimple size={20} weight="bold" style={{ color: 'var(--text-secondary)' }} />
            </div>
            <p className="mt-7 break-all text-xl font-semibold tracking-tight sm:text-3xl" style={{ color: 'var(--text-primary)' }}>
              {email}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onCopyEmail}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold transition-transform active:scale-95"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--button-text)' }}
              >
                {copiedEmail ? <Check size={17} weight="bold" /> : <Copy size={17} weight="bold" />}
                {copiedEmail ? 'Email Copied' : 'Copy Email'}
              </button>
              <a
                href={`mailto:${email}?subject=Portfolio%20Inquiry%20-%20Daniel%20Aplan`}
                className="inline-flex items-center gap-2 border px-6 py-3.5 text-sm font-semibold transition-opacity hover:opacity-60"
                style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              >
                <PaperPlaneTilt size={17} weight="bold" />
                Open Mail App
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
