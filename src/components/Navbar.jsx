import React, { useState } from 'react';
import { List, X, Sun, Moon } from '@phosphor-icons/react';
import RandomLetterSwap from './ui/random-letter-swap';

export default function Navbar({ theme, toggleTheme, activeSection, setActiveSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#home', id: 'home' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e, href, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveSection?.(id);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const ThemeToggle = ({ className = '' }) => (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={`p-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[var(--bg-raised)] ${className}`}
      style={{
        color: 'var(--text-secondary)',
        border: '1px solid var(--border)',
      }}
    >
      {theme === 'dark' ? (
        <Sun size={16} weight="bold" style={{ color: 'var(--accent)' }} />
      ) : (
        <Moon size={16} weight="bold" />
      )}
    </button>
  );

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--bg-surface) 80%, transparent)',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div
        className="h-16 mx-0 px-4 sm:px-6 lg:px-12 flex justify-between items-center"
        style={{ maxWidth: '100%' }}
      >
        {/* Brand */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home', 'home')}
          className="flex items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity duration-200"
          style={{ color: 'var(--text-primary)' }}
        >
          <span className="text-base sm:text-lg font-bold tracking-tight">daniel</span>
          <span className="font-bold" style={{ color: 'var(--accent)' }}>.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 ml-auto">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.id)}
                aria-current={isActive ? 'page' : undefined}
                className="px-4 py-2 text-xs font-medium cursor-pointer transition-colors duration-200"
                style={{
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                <RandomLetterSwap
                  label={link.name}
                  staggerDuration={0.025}
                  transition={{ duration: 0.6, type: 'spring' }}
                  className="transition-colors duration-200"
                />
              </a>
            );
          })}

          {/* Theme Toggle */}
          <div className="ml-3">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2 ml-auto">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg cursor-pointer transition-all duration-200"
            style={{
              color: 'var(--text-secondary)',
              border: '1px solid var(--border)',
            }}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={16} weight="bold" /> : <List size={16} weight="bold" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-t"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-surface)' }}
        >
          <nav className="grid grid-cols-2 gap-1 p-4" style={{ gap: '0.5rem' }}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.id)}
                  className="px-4 py-3 text-xs font-medium text-center cursor-pointer transition-colors duration-200"
                  style={{
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}