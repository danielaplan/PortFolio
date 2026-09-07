import React from 'react';
import { ChevronUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
      className="w-full pt-8 pb-12 mt-6"
      style={{ backgroundColor: 'var(--bg-canvas)', borderTop: '1px solid var(--border)' }}
    >
      <div className="w-full px-5 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-xs">

        {/* Branding & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2">
          <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>
            &copy; {new Date().getFullYear()} Daniel Aplan.
          </span>
          <span className="hidden sm:inline" style={{ color: 'var(--text-tertiary)' }}>&bull;</span>
          <span className="flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
            <span>Crafted with React &amp; Tailwind</span>
          </span>
        </div>

        {/* Quick Section Navigation Links */}
        <nav className="flex items-center gap-5 sm:gap-6 font-medium text-xs tracking-wide">
          {[
            { label: 'About', href: '#home', id: 'home' },
            { label: 'Projects', href: '#projects', id: 'projects' },
            { label: 'Skills', href: '#skills', id: 'skills' },
            { label: 'Contact', href: '#contact', id: 'contact' },
          ].map(({ label, href, id }) => (
            <a
              key={id}
              href={href}
              onClick={(e) => scrollToSection(e, href)}
              className="transition-colors duration-200"
              style={{ color: 'var(--text-secondary)' }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded cursor-pointer transition-all duration-200 font-mono font-medium"
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            color: 'var(--text-secondary)',
          }}
          aria-label="Scroll back to top"
        >
          <span>Back to Top</span>
          <ChevronUp size={14} />
        </button>

      </div>
    </footer>
  );
}
