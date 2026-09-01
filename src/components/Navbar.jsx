import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Menu, X, Mail } from 'lucide-react';
import Github from './icons/Github';

export default function Navbar({ darkMode, setDarkMode, onCopyEmail }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const tabsRef = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Check if user has scrolled to the bottom of the page
      const isAtBottom = window.innerHeight + Math.round(window.scrollY) >= document.documentElement.scrollHeight - 80;
      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      const sections = ['home', 'projects', 'skills', 'contact'];
      let currentSection = 'home';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 160) {
            currentSection = section;
          }
        }
      }

      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update sliding indicator position
  useEffect(() => {
    const updateIndicator = () => {
      const currentTab = tabsRef.current[activeSection];
      if (currentTab) {
        setIndicatorStyle({
          left: currentTab.offsetLeft,
          width: currentTab.clientWidth,
          opacity: 1
        });
      }
    };

    updateIndicator();
    const timeout = setTimeout(updateIndicator, 50);
    window.addEventListener('resize', updateIndicator);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [activeSection]);

  const navLinks = [
    { name: 'About', href: '#home', id: 'home' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  // 100% Reliable Smooth Scroll Handler with Lenis / Window fallback
  const handleNavClick = (e, href, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (id) {
      setActiveSection(id);
    }
    const target = document.querySelector(href);
    if (target) {
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { offset: -60, duration: 1.2 });
      } else {
        const top = target.getBoundingClientRect().top + window.pageYOffset - 60;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
        ? 'md:pt-2 pt-0'
        : 'pt-0'
      }`}>
      <div className={`relative mx-auto w-full max-w-4xl px-3 sm:px-6 h-14 sm:h-16 flex justify-between items-center transition-all duration-300 ${scrolled ? 'md:rounded-full md:mt-3 glass-morphism rounded-none mt-0 bg-white/35 dark:bg-slate-950/35 backdrop-blur-xl border border-white/60 dark:border-slate-700/60 shadow-[0_15px_35px_-25px_rgba(15,23,42,0.5)]' : 'rounded-none border-b border-transparent'}`}>
        {scrolled && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[-28px] h-8 w-[calc(100%-16px)] rounded-b-[28px] bg-white/20 dark:bg-slate-950/20 backdrop-blur-xl supports-[backdrop-filter]:bg-white/10 supports-[backdrop-filter]:dark:bg-slate-950/10 blur-md pointer-events-none" />
        )}
        
        {/* Brand & Live Status */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home', 'home')}
            className="text-base sm:text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100 hover:opacity-80 transition group flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>daniel</span>
            <span className="text-blue-500 font-bold group-hover:translate-x-0.5 transition-transform">.</span>
          </a>

          {/* Live Status Pill */}
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] sm:text-[11px] font-medium bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 shadow-xs shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="hidden sm:inline">Available for hire</span>
            <span className="sm:hidden">Open</span>
          </div>
        </div>

        {/* Desktop Navigation with Sliding Pill */}
        <nav className="hidden md:flex items-center gap-4" aria-label="Main Navigation">
          <div className="relative flex items-center gap-1 glass-morphism p-1 rounded-full text-xs font-medium shadow-[0_22px_40px_-28px_rgba(15,23,42,0.5)]">
            
            {/* Smooth Floating Pill Indicator */}
            <span
              className="absolute top-1 bottom-1 rounded-full bg-slate-900/95 text-white dark:bg-white/95 dark:text-slate-950 border border-white/10 dark:border-slate-200/20 shadow-[0_10px_22px_-10px_rgba(15,23,42,0.7)] dark:shadow-[0_10px_22px_-10px_rgba(255,255,255,0.18)] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none before:absolute before:inset-[1px] before:rounded-full before:bg-gradient-to-br before:from-white/18 before:via-white/6 before:to-transparent before:content-[''] dark:before:from-white/14 dark:before:via-white/4 dark:before:to-transparent"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity
              }}
            />

            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  ref={(el) => { tabsRef.current[link.id] = el; }}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.id)}
                  className={`relative z-10 px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${isActive
                      ? 'text-white dark:text-slate-950 font-semibold drop-shadow-[0_1px_0_rgba(255,255,255,0.15)]'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/35 dark:hover:bg-slate-900/40'
                    }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          <div className="h-4 w-px bg-slate-200/80 dark:bg-slate-800" />

          {/* Theme Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white glass-morphism transition-all cursor-pointer shadow-[0_18px_32px_-26px_rgba(15,23,42,0.45)]"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            title="Theme follows your local time automatically"
          >
            {darkMode ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} />}
          </button>
        </nav>

        {/* Mobile Action & Menu Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-9 h-9 rounded-xl text-slate-700 dark:text-slate-200 glass-morphism transition-colors cursor-pointer flex items-center justify-center shadow-[0_18px_32px_-26px_rgba(15,23,42,0.45)]"
            aria-label="Toggle theme; automatic local-time theme is enabled"
            title="Theme follows your local time automatically"
          >
            {darkMode ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 rounded-xl text-slate-700 dark:text-slate-200 glass-morphism transition-colors cursor-pointer flex items-center justify-center shadow-[0_18px_32px_-26px_rgba(15,23,42,0.45)]"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mx-3 mb-2 rounded-2xl glass-morphism px-3 py-3 transition-all shadow-[0_18px_32px_-24px_rgba(15,23,42,0.5)]">
          <nav className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.id)}
                className={`py-2.5 px-3 rounded-xl text-xs font-medium text-center transition-all duration-200 cursor-pointer ${activeSection === link.id
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-semibold shadow-xs'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-800/60 hover:backdrop-blur-sm'
                  }`}
              >
                {link.name}
              </a>
            ))}
            <div className="col-span-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex gap-2">
              <a
                href="https://github.com/danielaplan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 text-[11px] font-medium rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 transition shadow-2xs"
              >
                <Github size={13} /> GitHub
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onCopyEmail();
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 text-[11px] font-medium rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer shadow-xs"
              >
                <Mail size={13} /> Copy Email
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
