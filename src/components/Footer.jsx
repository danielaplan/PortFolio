import React from 'react';
import { EnvelopeSimple, FacebookLogo, GithubLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react';
import RandomLetterSwap from './ui/random-letter-swap';

export default function Footer() {
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (!target) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(target, { offset: 0, duration: 1.2 });
    } else {
      const top = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer
      className="mt-6 w-full border-t px-4 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-12 lg:px-12"
      style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border)' }}
    >
      <div className="mx-0 flex w-full flex-col gap-10 px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <a
              href="#home"
              onClick={(event) => scrollToSection(event, '#home')}
              className="text-xl font-bold tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              daniel<span style={{ color: 'var(--accent)' }}>.</span>
            </a>
            <p className="mt-3 max-w-[18rem] text-xs leading-5" style={{ color: 'var(--text-secondary)' }}>
              Built with React, Vite &amp; Tailwind CSS.<br />Enhanced with GSAP, Framer Motion, Lenis &amp; Phosphor Icons.
            </p>
            <nav className="mt-4 flex items-center gap-4" aria-label="Footer social links">
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
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="transition-opacity hover:opacity-60"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <Icon size={15} weight="bold" />
                </a>
              ))}
            </nav>
          </div>

          <nav className="flex flex-wrap items-center gap-5 text-xs font-medium md:pt-2" aria-label="Footer navigation">
            {[
              { label: 'Home', href: '#home', id: 'home' },
              { label: 'About', href: '#home', id: 'about' },
              { label: 'Projects', href: '#projects', id: 'projects' },
              { label: 'Skills', href: '#skills', id: 'skills' },
              { label: 'Contact', href: '#contact', id: 'contact' },
            ].map(({ label, href, id }) => (
              <a
                key={id}
                href={href}
                onClick={(e) => scrollToSection(e, href)}
                className="transition-opacity duration-200 hover:opacity-60"
                style={{ color: 'var(--text-secondary)' }}
              >
                <RandomLetterSwap label={label} />
              </a>
            ))}
          </nav>
        </div>

        <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
          &copy; {new Date().getFullYear()} Daniel Aplan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
