import React, { useState } from 'react';
import { Mail, MapPin, Send, Copy, Check, MessageSquare, ExternalLink } from 'lucide-react';
import Github from './icons/Github';
import Instagram from './icons/Instagram';
import Facebook from './icons/Facebook';
import Linkedin from './icons/Linkedin';

export default function Contact({ onCopyEmail, copiedEmail }) {
  const email = "danielaplan.bsit2024@gmail.com";
  const github = "https://github.com/danielaplan";
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-12 sm:py-20">
      <div className="w-full px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-1.5">
            <MessageSquare size={15} />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Let's Connect
          </h2>
          <p className="text-[color:var(--text-secondary)] text-xs sm:text-sm mt-1 max-w-xl">
            I'm always open to discussing new software development opportunities, academic collaborations, or project ideas.
          </p>
        </div>

        {/* Contact Container */}
        <div className="neo-raised-lg p-8 space-y-8">

          {/* Form */}
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-xs font-semibold text-[color:var(--text-secondary)]">
              <span>Name</span>
              <input
                required
                type="text"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                placeholder="Your name"
                className="w-full px-4 py-3 text-sm placeholder:text-[color:var(--text-tertiary)]"
              />
            </label>
            <label className="space-y-2 text-xs font-semibold text-[color:var(--text-secondary)]">
              <span>Email</span>
              <input
                required
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                placeholder="you@example.com"
                className="w-full px-4 py-3 text-sm placeholder:text-[color:var(--text-tertiary)]"
              />
            </label>
            <label className="space-y-2 text-xs font-semibold text-[color:var(--text-secondary)] md:col-span-2">
              <span>Message</span>
              <textarea
                required
                rows="5"
                value={form.message}
                onChange={(event) => setForm({ ...form, message: event.target.value })}
                placeholder="Tell me about your project or idea"
                className="w-full resize-y px-4 py-3 text-sm placeholder:text-[color:var(--text-tertiary)]"
              />
            </label>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="neo-accent-solid inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold"
              >
                <Send size={14} />
                <span>Send Message</span>
              </button>
            </div>
          </form>

          {/* Info Grid */}
          <div className="grid gap-6 md:grid-cols-2">

            {/* Email Card */}
            <div className="neo-raised p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--text-secondary)]">
                  <Mail size={15} />
                  <span>Email Address</span>
                </div>
                <p className="text-base font-medium break-all">
                  {email}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={`mailto:${email}`}
                  className="neo-accent-solid inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold"
                >
                  <Send size={13} />
                  <span>Send</span>
                </a>
                <button
                  onClick={onCopyEmail}
                  className="neo-press inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={13} className="text-accent" />
                      <span className="text-accent">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* GitHub Card */}
            <div className="neo-raised p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--text-secondary)]">
                  <Github size={15} />
                  <span>GitHub</span>
                </div>
                <p className="text-sm text-[color:var(--text-secondary)]">
                  Explore open source repositories, student coursework, and ongoing builds.
                </p>
              </div>
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-press inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold"
              >
                <Github size={14} />
                <span>github.com/danielaplan</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Social Links — Greyscale icon buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--text-secondary)] mr-1">Find me on</span>

            <a
              href="https://www.instagram.com/dniel_apln/"
              target="_blank"
              rel="noopener noreferrer"
              className="neo-press w-10 h-10 flex items-center justify-center"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://www.facebook.com/daniel.aplan.9/"
              target="_blank"
              rel="noopener noreferrer"
              className="neo-press w-10 h-10 flex items-center justify-center"
              aria-label="Facebook"
            >
              <Facebook size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/daniel-aplan-5ba561334/"
              target="_blank"
              rel="noopener noreferrer"
              className="neo-press w-10 h-10 flex items-center justify-center"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-press w-10 h-10 flex items-center justify-center"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-xs text-[color:var(--text-secondary)] pt-4">
            <MapPin size={13} />
            <span>Based in Caloocan City, Metro Manila, Philippines</span>
            <span>&bull;</span>
            <span>Response time: typically within 24 hours</span>
          </div>
        </div>
      </div>
    </section>
  );
}
