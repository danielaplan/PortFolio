import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 py-10 bg-slate-50/50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5 text-center sm:text-left">
          <span>&copy; {new Date().getFullYear()} Daniel Aplan. Crafted with React & Tailwind CSS.</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/danielaplan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 dark:hover:text-white transition"
          >
            GitHub
          </a>
          <a
            href="mailto:danielaplan.bsit2024@gmail.com"
            className="hover:text-slate-900 dark:hover:text-white transition"
          >
            Email
          </a>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
            aria-label="Scroll back to top"
          >
            <span>Top</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}
