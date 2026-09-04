import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Mail } from 'lucide-react';
import Github from './icons/Github';

export default function Navbar({ darkMode, setDarkMode, onCopyEmail }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
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

  const navLinks = [
    { name: 'About', href: '#home', id: 'home' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e, href, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveSection(id);
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
    <header className="fixed top-4 inset-x-0 z-50 h-16">
      <div className="relative h-16 mx-2 sm:mx-4 lg:mx-8 px-3 sm:px-6 lg:px-10 flex justify-between items-center neo-raised-md">
        {/* Brand */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home', 'home')}
          className="flex items-center gap-1.5 cursor-pointer shrink-0 hover:opacity-70 transition-opacity"
        >
          <span className="text-base sm:text-lg font-semibold tracking-tight">daniel</span>
          <span className="text-accent font-bold">.</span>
        </a>

        {/* Live Status Pill — separate from brand, but visually grouped */}
        <div className="hidden lg:flex neo-raised-xs items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium ml-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full text-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-current text-accent"></span>
          </span>
          <span>Available for hire</span>
        </div>

        {/* Desktop Nav — right cluster */}
        <div className="hidden md:flex items-center gap-2 ml-auto">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.id)}
                aria-current={isActive ? 'page' : undefined}
                data-active={isActive}
                className={`px-4 py-2 text-xs font-medium cursor-pointer transition-all duration-200 ${
                  isActive
                    ? 'neo-raised-xs font-semibold text-accent'
                    : 'hover:opacity-70'
                }`}
              >
                {link.name}
              </a>
            );
          })}

          {/* Divider */}
          <div className="w-px h-5 bg-current opacity-20 mx-1" />

          {/* Theme Toggle — inset housing with raised knob */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="neo-inset w-10 h-10 flex items-center justify-center cursor-pointer transition-shadow duration-200"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span className="neo-raised-xs w-7 h-7 flex items-center justify-center">
              {darkMode ? <Sun size={15} className="text-accent" /> : <Moon size={15} />}
            </span>
          </button>
        </div>

        {/* Mobile — theme toggle + menu trigger */}
        <div className="flex md:hidden items-center gap-2 ml-auto">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="neo-inset w-10 h-10 flex items-center justify-center cursor-pointer transition-shadow duration-200"
            aria-label="Toggle theme"
          >
            <span className="neo-raised-xs w-7 h-7 flex items-center justify-center">
              {darkMode ? <Sun size={14} className="text-accent" /> : <Moon size={14} />}
            </span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="neo-inset w-10 h-10 flex items-center justify-center cursor-pointer transition-shadow duration-200"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="neo-raised-xs w-7 h-7 flex items-center justify-center">
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mx-3 mb-3 neo-raised-md p-3 transition-all">
          {/* Live status — shown inside mobile menu since the header doesn't have room */}
          <div className="lg:hidden neo-raised-xs flex items-center justify-center gap-1.5 px-3 py-2 text-[11px] font-medium mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full text-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-current text-accent"></span>
            </span>
            <span>Available for hire</span>
          </div>

          <nav className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.id)}
                  aria-current={isActive ? 'page' : undefined}
                  data-active={isActive}
                  className={`neo-press py-3 px-3 text-xs font-medium text-center cursor-pointer transition-all duration-200 ${
                    isActive ? 'font-semibold text-accent' : ''
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
            <div className="col-span-2 grid grid-cols-2 gap-2 pt-1">
              <a
                href="https://github.com/danielaplan"
                target="_blank"
                rel="noopener noreferrer"
                className="neo-press flex items-center justify-center gap-2 py-3 px-3 text-[11px] font-medium"
              >
                <Github size={13} /> GitHub
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onCopyEmail();
                }}
                className="neo-accent-solid flex items-center justify-center gap-2 py-3 px-3 text-[11px] font-medium"
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
