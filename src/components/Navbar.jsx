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
          if (rect.top <= 140) {
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

  const handleNavClick = (e, href, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (id) {
      setActiveSection(id);
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/90 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs'
        : 'bg-transparent border-b border-transparent'
      }`}>
      <div className="max-w-4xl mx-auto px-6 h-16 flex justify-between items-center">
        {/* Brand & Live Status */}
        <div className="flex items-center gap-3">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home', 'home')}
            className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100 hover:opacity-80 transition group flex items-center gap-1.5"
          >
            <span>daniel</span>
            <span className="text-blue-500 font-bold group-hover:translate-x-0.5 transition-transform">.</span>
          </a>

          {/* Live Status Pill */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="hidden sm:inline">Available for hire</span>
            <span className="sm:hidden">Available</span>
          </div>
        </div>

        {/* Desktop Navigation with Glass Sliding Pill */}
        <nav className="hidden md:flex items-center gap-5" aria-label="Main Navigation">
          <div className="relative flex items-center gap-1 bg-white/40 dark:bg-slate-900/50 p-1 rounded-full border border-white/60 dark:border-white/10 text-xs font-medium backdrop-blur-md shadow-2xs">
            
            {/* Smooth Floating Pill Indicator */}
            <span
              className="absolute top-1 bottom-1 rounded-full bg-slate-900 dark:bg-white shadow-sm transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none"
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
                  className={`relative z-10 px-3.5 py-1.5 rounded-full transition-colors duration-200 ${isActive
                      ? 'text-white dark:text-slate-950 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                    }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          <div className="h-4 w-px bg-slate-200/80 dark:bg-slate-800" />

          {/* Theme Toggle Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-white/40 dark:bg-slate-800/40 border border-white/50 dark:border-white/5 hover:bg-white/80 dark:hover:bg-slate-800 transition-all cursor-pointer shadow-2xs"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} />}
            </button>
          </div>
        </nav>

        {/* Mobile Action & Menu Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-400 bg-white/50 dark:bg-slate-800/50 border border-white/60 dark:border-white/10 transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-800/50 border border-white/60 dark:border-white/10 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-white/60 dark:border-white/10 px-6 py-4 transition-all">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.id)}
                className={`py-2 px-3 rounded-xl text-sm transition-colors ${activeSection === link.id
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-semibold shadow-xs'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60'
                  }`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex gap-2">
              <a
                href="https://github.com/danielaplan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium rounded-xl bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/5 text-slate-800 dark:text-slate-200 transition"
              >
                <Github size={14} /> GitHub
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onCopyEmail();
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer shadow-xs"
              >
                <Mail size={14} /> Copy Email
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
