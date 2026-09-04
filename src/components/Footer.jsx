import React from 'react';
import { ArrowUp } from 'lucide-react';
import Instagram from './icons/Instagram';
import Facebook from './icons/Facebook';
import Linkedin from './icons/Linkedin';
import Github from './icons/Github';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-8">
      <div className="w-full px-6 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[color:var(--text-secondary)]">

        <div className="flex items-center gap-1.5 text-center sm:text-left">
          <span>&copy; {new Date().getFullYear()} Daniel Aplan.</span>
          <span>Crafted with React & Tailwind CSS.</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/danielaplan"
            target="_blank"
            rel="noopener noreferrer"
            className="neo-press w-9 h-9 flex items-center justify-center hover:opacity-80"
            aria-label="GitHub"
          >
            <Github size={15} />
          </a>
          <a
            href="https://www.instagram.com/dniel_apln/"
            target="_blank"
            rel="noopener noreferrer"
            className="neo-press w-9 h-9 flex items-center justify-center hover:opacity-80"
            aria-label="Instagram"
          >
            <Instagram size={15} />
          </a>
          <a
            href="https://www.facebook.com/daniel.aplan.9/"
            target="_blank"
            rel="noopener noreferrer"
            className="neo-press w-9 h-9 flex items-center justify-center hover:opacity-80"
            aria-label="Facebook"
          >
            <Facebook size={15} />
          </a>
          <a
            href="https://www.linkedin.com/in/daniel-aplan-5ba561334/"
            target="_blank"
            rel="noopener noreferrer"
            className="neo-press w-9 h-9 flex items-center justify-center hover:opacity-80"
            aria-label="LinkedIn"
          >
            <Linkedin size={15} />
          </a>
          <a
            href="mailto:danielaplan.bsit2024@gmail.com"
            className="neo-press w-9 h-9 flex items-center justify-center hover:opacity-80"
            aria-label="Email"
          >
            <span className="text-xs font-medium">@</span>
          </a>

          <button
            onClick={scrollToTop}
            className="neo-press inline-flex items-center gap-1 px-3 py-2 hover:opacity-80 cursor-pointer"
            aria-label="Scroll back to top"
          >
            <span className="text-xs font-medium">Top</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}
