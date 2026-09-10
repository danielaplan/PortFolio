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
  const [copiedToast, setCopiedToast] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState(() => {
    // Auto-detect theme based on time: dark from 6 PM to 6 AM
    const hour = new Date().getHours();
    const isNightTime = hour >= 18 || hour < 6;
    return localStorage.getItem('theme') || (isNightTime ? 'dark' : 'light');
  });

  // Default to dark mode on first visit (override any time-based detection)
  useEffect(() => {
    if (!localStorage.getItem('theme')) {
      setTheme('dark');
    }
  }, []);

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

  // Section Observer for Fluid Stage Activation & Tab Synchronization (RAF Throttled)
  useEffect(() => {
    const sections = ['home', 'projects', 'skills', 'contact'];
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          const isAtBottom = windowHeight + Math.round(scrollY) >= document.documentElement.scrollHeight - 90;

          if (isAtBottom) {
            setActiveSection('contact');
            ticking = false;
            return;
          }

          let current = 'home';
          for (const id of sections) {
            const el = document.getElementById(id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= windowHeight * 0.45 && rect.bottom >= windowHeight * 0.15) {
                current = id;
              }
            }
          }
          setActiveSection(current);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      document.execCommand("copy");
      textArea.remove();
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
  };

  // Apply theme to document and persist
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="relative min-h-screen w-full max-w-full flex flex-col font-sans overflow-x-clip">

      {/* Navigation */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content: Fluid Scroll Stages with In-View Focus */}
      <main className="relative z-10 flex-grow">

        {/* Stage 1: About / Hero */}
        <Hero
          onCopyEmail={handleCopyEmail}
          copiedEmail={copiedToast}
        />

        {/* Stage 2: Projects & Engineering */}
        <Projects />

        {/* Stage 3: Skills & Technologies */}
        <Skills />

        {/* Stage 4: Let's Connect */}
        <Contact
          onCopyEmail={handleCopyEmail}
          copiedEmail={copiedToast}
        />

      </main>

      {/* Footer */}
      <Footer />

      {/* Toast Notification */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${
          copiedToast
            ? 'translate-y-0 opacity-100 scale-100'
            : 'translate-y-4 opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div
          className="flex items-center gap-2.5 px-4 py-3 text-xs font-medium rounded-lg border"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border)',
            color: 'var(--text-primary)',
          }}
        >
          <div
            className="p-1 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--accent)', color: 'var(--button-text)' }}
          >
            <Check size={12} strokeWidth={3} />
          </div>
          <span>
            Email copied: <strong>danielaplan.bsit2024@gmail.com</strong>
          </span>
        </div>
      </div>

    </div>
  );
}
