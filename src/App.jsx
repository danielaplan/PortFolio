import React, { useState, useEffect } from 'react';
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
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* Toast Notification */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${copiedToast
            ? 'translate-y-0 opacity-100 scale-100'
            : 'translate-y-4 opacity-0 scale-95 pointer-events-none'
          }`}
      >
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-2xl border border-slate-800 dark:border-slate-200 text-xs font-medium">
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
      <main className="flex-grow">
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