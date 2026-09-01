import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Check } from 'lucide-react';

const getTimeBasedTheme = () => {
  const hour = new Date().getHours();
  return hour >= 19 || hour < 7;
};

export default function App() {
  const [darkMode, setDarkMode] = useState(getTimeBasedTheme);

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
    const updateThemeFromLocalTime = () => {
      setDarkMode(getTimeBasedTheme());
    };

    updateThemeFromLocalTime();
    const themeTimer = window.setInterval(updateThemeFromLocalTime, 60 * 1000);

    return () => window.clearInterval(themeTimer);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
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
        {/* Soft studio-light haze */}
        <div className="animate-ambient-1 absolute -top-24 -left-20 w-[520px] sm:w-[760px] h-[520px] sm:h-[760px] rounded-full bg-gradient-to-br from-sky-300/45 via-blue-200/30 to-indigo-200/20 blur-[100px] sm:blur-[150px] transition-all duration-700 dark:from-sky-200/20 dark:via-blue-100/10 dark:to-indigo-100/10" />

        <div className="animate-ambient-2 absolute top-10 -right-16 w-[460px] sm:w-[680px] h-[460px] sm:h-[680px] rounded-full bg-gradient-to-bl from-violet-300/30 via-indigo-200/20 to-slate-200/10 blur-[90px] sm:blur-[140px] transition-all duration-700 dark:from-violet-200/15 dark:via-indigo-100/10 dark:to-slate-100/10" />

        <div className="animate-ambient-2 absolute top-[35%] -left-24 w-[420px] sm:w-[620px] h-[420px] sm:h-[620px] rounded-full bg-gradient-to-tr from-cyan-200/30 via-sky-200/20 to-transparent blur-[90px] sm:blur-[120px] transition-all duration-700 dark:from-cyan-100/15 dark:via-sky-100/10 dark:to-transparent" />

        <div className="animate-ambient-1 absolute -bottom-20 right-[8%] w-[500px] sm:w-[720px] h-[500px] sm:h-[720px] rounded-full bg-gradient-to-t from-blue-200/30 via-indigo-200/18 to-transparent blur-[100px] sm:blur-[150px] transition-all duration-700 dark:from-blue-100/15 dark:via-indigo-100/10 dark:to-transparent" />

        <div className="absolute inset-0 bg-[radial-gradient(rgba(148,163,184,0.12)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_42%,#000_68%,transparent_100%)]" />
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