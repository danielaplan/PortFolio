import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Check } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [copiedToast, setCopiedToast] = useState(false);

  // Initialize Lenis Fluid Smooth Inertia Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential fluid ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      infinite: false,
    });

    window.__lenis = lenis;

    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.__lenis = null;
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleCopyEmail = () => {
    const email = "danielaplan.bsit2024@gmail.com";

    // Copy with clipboard API or fallback
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).catch(() => {
        // Fallback
        copyFallback(email);
      });
    } else {
      copyFallback(email);
    }

    setCopiedToast(true);
    setTimeout(() => {
      setCopiedToast(false);
    }, 3000);
  };

  const copyFallback = (text) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
  };

  return (
    <div className="relative min-h-screen w-full max-w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col font-sans selection:bg-blue-500 selection:text-white overflow-x-clip">
      
      {/* Ambient Gradient Blur Background Orbs */}
      <div className="fixed inset-0 w-full max-w-full pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {/* Top-Left Sky/Indigo Cosmic Glow */}
        <div className="animate-ambient-1 absolute -top-28 -left-28 w-[480px] sm:w-[700px] h-[480px] sm:h-[700px] rounded-full bg-gradient-to-br from-blue-400/35 via-sky-300/30 to-indigo-300/25 dark:from-blue-600/25 dark:via-indigo-600/20 dark:to-cyan-500/10 blur-[90px] sm:blur-[130px] transition-all duration-700" />

        {/* Top-Right Violet/Purple Glow */}
        <div className="animate-ambient-2 absolute top-12 -right-28 w-[420px] sm:w-[650px] h-[420px] sm:h-[650px] rounded-full bg-gradient-to-bl from-purple-400/35 via-violet-300/30 to-pink-300/25 dark:from-purple-600/25 dark:via-fuchsia-700/15 dark:to-indigo-900/15 blur-[90px] sm:blur-[130px] transition-all duration-700" />

        {/* Mid-Left Cyan/Emerald Accent Glow */}
        <div className="animate-ambient-2 absolute top-[38%] -left-28 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-gradient-to-tr from-cyan-400/30 via-teal-300/25 to-sky-200/20 dark:from-cyan-500/15 dark:via-blue-600/15 dark:to-transparent blur-[90px] sm:blur-[120px] transition-all duration-700" />

        {/* Bottom-Right Deep Blue Nebula Glow */}
        <div className="animate-ambient-1 absolute -bottom-28 right-[5%] w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full bg-gradient-to-t from-blue-400/35 via-indigo-300/30 to-purple-300/20 dark:from-indigo-600/25 dark:via-blue-800/20 dark:to-transparent blur-[100px] sm:blur-[140px] transition-all duration-700" />

        {/* Faint Subtle Background Grid for Depth */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(100,116,139,0.1)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      {/* Toast Notification */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${copiedToast
            ? 'translate-y-0 opacity-100 scale-100'
            : 'translate-y-4 opacity-0 scale-95 pointer-events-none'
          }`}
      >
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900/95 dark:bg-white/95 text-white dark:text-slate-900 shadow-2xl backdrop-blur-md border border-slate-800 dark:border-slate-200 text-xs font-medium">
          <div className="p-1 rounded-full bg-emerald-500 text-white flex items-center justify-center">
            <Check size={12} strokeWidth={3} />
          </div>
          <span>Email copied: <strong>danielaplan.bsit2024@gmail.com</strong></span>
        </div>
      </div>

      {/* Navigation */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onCopyEmail={handleCopyEmail}
      />

      {/* Main Content */}
      <main className="relative z-10 flex-grow">
        <Hero
          onCopyEmail={handleCopyEmail}
          copiedEmail={copiedToast}
        />
        <Projects />
        <Skills />
        <Contact
          onCopyEmail={handleCopyEmail}
          copiedEmail={copiedToast}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}