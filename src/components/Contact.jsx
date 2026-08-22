import React from 'react';
import { Mail, MapPin, Send, Copy, Check, MessageSquare, ExternalLink } from 'lucide-react';
import Github from './icons/Github';
import Instagram from './icons/Instagram';
import Facebook from './icons/Facebook';
import Linkedin from './icons/Linkedin';

export default function Contact({ onCopyEmail, copiedEmail }) {
  const email = "danielaplan.bsit2024@gmail.com";
  const github = "https://github.com/danielaplan";

  return (
    <section id="contact" className="py-20 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-4xl mx-auto px-6">

        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <MessageSquare size={16} />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Let's Connect
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 max-w-xl">
            I'm always open to discussing new software development opportunities, academic collaborations, or project ideas.
          </p>
        </div>

        {/* Contact Container */}
        <div className="p-8 rounded-3xl bg-white/75 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/80 dark:border-slate-800/80 space-y-8">
          <div className="grid gap-6 md:grid-cols-2">

            {/* Direct Email Card */}
            <div className="p-6 rounded-2xl bg-slate-50/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <Mail size={15} className="text-blue-500" />
                  <span>Email Address</span>
                </div>
                <p className="text-base font-medium text-slate-900 dark:text-white break-all">
                  {email}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition shadow-xs"
                >
                  <Send size={13} />
                  <span>Send Message</span>
                </a>

                <button
                  onClick={onCopyEmail}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-semibold transition cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={13} className="text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
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

            {/* GitHub & Location Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <Github size={15} className="text-blue-500" />
                  <span>GitHub Repository Profile</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Explore open source repositories, student coursework, and ongoing builds.
                </p>
              </div>

              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white text-xs font-semibold transition"
              >
                <span className="flex items-center gap-1.5">
                  <Github size={14} /> github.com/danielaplan
                </span>
                <ExternalLink size={13} className="text-slate-400" />
              </a>
            </div>

          </div>

          {/* Social Media Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1">Find me on</span>
            <a
              href="https://www.instagram.com/dniel_apln/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xs font-semibold transition shadow-xs"
            >
              <Instagram size={14} />
              <span>Instagram</span>
            </a>
            <a
              href="https://www.facebook.com/daniel.aplan.9/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition shadow-xs"
            >
              <Facebook size={14} />
              <span>Facebook</span>
            </a>
            <a
              href="https://www.linkedin.com/in/daniel-aplan-5ba561334/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold transition shadow-xs"
            >
              <Linkedin size={14} />
              <span>LinkedIn</span>
            </a>
          </div>

          {/* Quick Notice */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-slate-400" />
              <span>Based in Caloocan City, Metro Manila, Philippines</span>
            </span>
            <span className="hidden sm:inline text-emerald-600 dark:text-emerald-400 font-medium">
              &bull; Response time: typically within 24 hours
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
