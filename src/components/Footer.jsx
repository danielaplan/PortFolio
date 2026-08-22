import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import Instagram from './icons/Instagram';
import Facebook from './icons/Facebook';
import Linkedin from './icons/Linkedin';

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

        <div className="flex items-center gap-5">
          <a
            href="https://github.com/danielaplan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 dark:hover:text-white transition"
            aria-label="GitHub"
          >
            GitHub
          </a>
          <a
            href="https://www.instagram.com/dniel_apln/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition"
            aria-label="Instagram"
          >
            <Instagram size={15} />
          </a>
          <a
            href="https://www.facebook.com/daniel.aplan.9/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
            aria-label="Facebook"
          >
            <Facebook size={15} />
          </a>
          <a
            href="https://www.linkedin.com/in/daniel-aplan-5ba561334/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-600 transition"
            aria-label="LinkedIn"
          >
            <Linkedin size={15} />
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
