import React from 'react';
import { ArrowUp, Heart, Code2 } from 'lucide-react';

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
    <footer className="w-full border-t border-slate-300/80 dark:border-slate-800/80 pt-8 pb-12 mt-6">
      <div className="w-full px-5 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-600 dark:text-slate-400">
        
        {/* Branding & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 text-center sm:text-left">
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            &copy; {new Date().getFullYear()} Daniel Aplan.
          </span>
          <span className="hidden sm:inline text-slate-400 dark:text-slate-600">&bull;</span>
          <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            <span>Crafted with React, Tailwind & Neumorphism</span>
          </span>
        </div>

        {/* Quick Section Navigation Links */}
        <nav className="flex items-center gap-5 sm:gap-6 font-medium text-xs tracking-wide">
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            About
          </a>
          <a
            href="#projects"
            onClick={(e) => scrollToSection(e, '#projects')}
            className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            Projects
          </a>
          <a
            href="#skills"
            onClick={(e) => scrollToSection(e, '#skills')}
            className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            Skills
          </a>
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-200/90 dark:bg-slate-900/90 hover:bg-cyan-500 hover:text-slate-950 text-slate-700 dark:text-slate-300 border border-slate-300/80 dark:border-slate-800 transition-all duration-200 cursor-pointer active:scale-95 shadow-2xs font-mono font-medium"
          aria-label="Scroll back to top"
        >
          <span>Back to Top</span>
          <ArrowUp size={13} />
        </button>

      </div>
    </footer>
  );
}

