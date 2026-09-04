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
  const [darkMode, setDarkMode] = useState(true);
  const [copiedToast, setCopiedToast] = useState(false);

  // Initialize Lenis Fluid Smooth Inertia Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
  }, [darkMode]);

  const handleCopyEmail = () => {
    const email = "danielaplan.bsit2024@gmail.com";

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).catch(() => copyFallback(email));
    } else {
      copyFallback(email);
    }

    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 3000);
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
    <div className="relative min-h-screen w-full max-w-full flex flex-col font-sans overflow-x-clip">

      {/* Toast Notification — neumorphic raised */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${copiedToast
            ? 'translate-y-0 opacity-100 scale-100'
            : 'translate-y-4 opacity-0 scale-95 pointer-events-none'
          }`}
      >
        <div className="neo-raised-md flex items-center gap-2.5 px-4 py-3 text-xs font-medium">
          <div className="p-1 rounded-full text-accent flex items-center justify-center">
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
      <main className="relative z-10 flex-grow pt-24">
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
