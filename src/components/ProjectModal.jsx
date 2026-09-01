import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ExternalLink, Star, GitFork, Calendar, Sparkles, CheckCircle2, Globe, Clock, Code2, FileCode, Layers } from 'lucide-react';
import Github from './icons/Github';
import { getTechIcon } from './icons/TechIcons';
import CodeInspector from './CodeInspector';
import { formatTimeAgo, getDevStatus } from '../services/github';

export default function ProjectModal({ project, githubData, onClose, onSelectTag, initialTab = 'overview' }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  const isLiveRepo = project.isLiveRepo;
  const gh = githubData || null;
  const liveDemoUrl = project.demoUrl || (gh && gh.homepage) || null;
  const repoUrl = project.link || (gh && gh.htmlUrl) || `https://github.com/danielaplan/${project.repoName || project.title}`;
  const devStatus = getDevStatus(gh?.pushedAt || project.pushedAt, gh?.archived || project.archived, project.tags || gh?.topics);

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto overscroll-contain">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div 
        data-lenis-prevent
        className="relative w-full max-w-3xl my-auto glass-panel rounded-3xl shadow-2xl border border-white/80 dark:border-white/10 z-10 max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-3rem)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
      >
        
        {/* Modal Header */}
        <div className="shrink-0 p-4 sm:p-6 pb-3 sm:pb-4 border-b border-white/60 dark:border-white/10">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1.5 min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {/* Dev Status Badge */}
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border shadow-sm ${devStatus.badgeClass}`}>
                  <span className={`w-1.75 h-1.75 rounded-full ${devStatus.dotClass}`} />
                  {devStatus.label}
                </span>

                {project.featured && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-300/80 dark:border-blue-800/80 shadow-sm">
                    <Sparkles size={11} /> Featured
                  </span>
                )}
                {project.category && (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700/80 shadow-sm">
                    {project.category}
                  </span>
                )}
                {project.year && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-200 text-slate-700 dark:bg-slate-700/80 dark:text-slate-100 border border-slate-300 dark:border-slate-600/80 shadow-sm">
                    <Calendar size={12} /> {project.year}
                  </span>
                )}
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight break-words [text-shadow:0_1px_0_rgba(255,255,255,0.2)]">
                {project.title || project.name}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 -mr-1 -mt-1 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer shrink-0"
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Tabs (Overview vs Code Inspector) */}
          <div className="flex items-center gap-2 mt-4 pt-2 border-t border-slate-100 dark:border-slate-800/60">
            <button
              onClick={() => setActiveTab('overview')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Layers size={13} />
              <span>Project Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeTab === 'code'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <FileCode size={13} />
              <span>Code Inspector</span>
              <span className="ml-1 px-1.5 py-0.5 bg-blue-500/20 text-[11px] rounded-md font-mono font-bold">IDE</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div 
          data-lenis-prevent
          className="flex-1 p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5 overflow-y-auto overscroll-contain"
        >
          
          {activeTab === 'code' ? (
            <CodeInspector project={project} repoName={project.repoName} />
          ) : (
            <div className="space-y-3">
              {/* Detailed Overview */}
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-700/70 bg-slate-50/80 dark:bg-slate-800/40 p-3.5 sm:p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
                <div className="space-y-1.5">
                  <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-slate-600 dark:text-slate-400">
                    Overview
                  </h4>
                  <p className="text-sm sm:text-[15px] text-slate-800 dark:text-slate-300 leading-relaxed break-words">
                    {project.longDescription || project.description}
                  </p>
                </div>
              </div>

              {/* Key Features / Highlights */}
              {project.keyFeatures && project.keyFeatures.length > 0 && (
                <div className="rounded-2xl border border-slate-200/80 dark:border-slate-700/70 bg-white/40 dark:bg-slate-800/30 p-3.5 sm:p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.36)]">
                  <div className="space-y-2 pt-0.5">
                    <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-slate-600 dark:text-slate-400">
                      Key Features & Capabilities
                    </h4>
                    <ul className="grid gap-1.5 sm:gap-2">
                      {project.keyFeatures.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                          <CheckCircle2 size={15} className="text-sky-600 dark:text-sky-400 mt-0.5 shrink-0" />
                          <span className="break-words leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Tech Stack & Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="rounded-2xl border border-slate-200/80 dark:border-slate-700/70 bg-slate-50/75 dark:bg-slate-800/40 p-3.5 sm:p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
                  <div className="space-y-2 pt-0.5">
                    <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-slate-600 dark:text-slate-400">
                      Technologies & Tools
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag, idx) => {
                        const TechIcon = getTechIcon(tag);
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              if (onSelectTag) {
                                onSelectTag(tag);
                                onClose();
                              }
                            }}
                            className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 font-mono border border-slate-200/60 dark:border-slate-700/60 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
                            title={`Filter by ${tag}`}
                          >
                            {TechIcon && <TechIcon className="w-3 h-3 shrink-0" />}
                            #{tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* GitHub Metadata Card if synced */}
              {gh && (
                <div className="rounded-2xl border border-slate-200/80 dark:border-slate-700/70 bg-gradient-to-r from-slate-50 to-white/80 dark:from-slate-800/50 dark:to-slate-900/50 p-3 sm:p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-[11px] sm:text-xs">
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-slate-700 dark:text-slate-200">
                    {gh.language && (
                      <span className="flex items-center gap-1.5 rounded-full bg-sky-100/80 px-2 py-1 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300">
                        <Code2 size={14} className="text-sky-600 dark:text-sky-300" />
                        <strong>{gh.language}</strong>
                      </span>
                    )}
                    <span className="flex items-center gap-1 rounded-full bg-amber-100/80 px-2 py-1 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                      <Star size={13} className="text-amber-500 dark:text-amber-300" />
                      <span>{gh.stars} stars</span>
                    </span>
                    <span className="flex items-center gap-1 rounded-full bg-slate-200/80 px-2 py-1 text-slate-700 dark:bg-slate-700/80 dark:text-slate-200">
                      <GitFork size={13} className="text-slate-600 dark:text-slate-300" />
                      <span>{gh.forks} forks</span>
                    </span>
                  </div>

                  {gh.pushedAt && (
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50/90 px-2.5 py-1 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                      <Clock size={13} />
                      <span>Pushed {formatTimeAgo(gh.pushedAt)}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer / CTAs */}
        <div className="shrink-0 p-3.5 sm:p-4 bg-white/40 dark:bg-slate-900/50 border-t border-white/60 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 order-2 sm:order-1 flex items-center gap-2">
            <span>{isLiveRepo ? 'Live synchronized repository' : 'Curated Engineering Project'}</span>
            <span>•</span>
            <button
              onClick={() => setActiveTab(activeTab === 'overview' ? 'code' : 'overview')}
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold cursor-pointer"
            >
              {activeTab === 'overview' ? 'Inspect Code →' : '← Overview'}
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto order-1 sm:order-2">
            {liveDemoUrl && (
              <a
                href={liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition shadow-xs"
              >
                <Globe size={14} />
                <span>Live Demo</span>
                <ExternalLink size={12} />
              </a>
            )}

            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-medium text-xs transition"
              >
                <Github size={15} />
                <span>View GitHub</span>
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );

  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return modalContent;
}
