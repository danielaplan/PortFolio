import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ExternalLink, Star, GitFork, Calendar, Sparkles, CheckCircle2, Globe, Clock, Code2, FileCode, Layers } from 'lucide-react';
import Github from './icons/Github';
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
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${devStatus.badgeClass}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${devStatus.dotClass}`} />
                  {devStatus.label}
                </span>

                {project.featured && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60">
                    <Sparkles size={11} /> Featured
                  </span>
                )}
                {project.category && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {project.category}
                  </span>
                )}
                {project.year && (
                  <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    <Calendar size={12} /> {project.year}
                  </span>
                )}
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight break-words">
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
              <span className="ml-1 px-1.5 py-0.5 bg-blue-500/20 text-[10px] rounded-md font-mono font-bold">IDE</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div 
          data-lenis-prevent
          className="flex-1 p-4 sm:p-6 sm:p-8 space-y-5 sm:space-y-6 overflow-y-auto overscroll-contain"
        >
          
          {activeTab === 'code' ? (
            <CodeInspector project={project} repoName={project.repoName} />
          ) : (
            <>
              {/* Detailed Overview */}
              <div className="space-y-1.5">
                <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Overview
                </h4>
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed break-words">
                  {project.longDescription || project.description}
                </p>
              </div>

              {/* Key Features / Highlights */}
              {project.keyFeatures && project.keyFeatures.length > 0 && (
                <div className="space-y-2.5 pt-1">
                  <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Key Features & Capabilities
                  </h4>
                  <ul className="grid gap-2">
                    {project.keyFeatures.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        <CheckCircle2 size={16} className="text-blue-500 dark:text-blue-400 mt-0.5 shrink-0" />
                        <span className="break-words">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack & Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="space-y-2 pt-1">
                  <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Technologies & Tools
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (onSelectTag) {
                            onSelectTag(tag);
                            onClose();
                          }
                        }}
                        className="text-xs px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 font-mono border border-slate-200/60 dark:border-slate-700/60 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
                        title={`Filter by ${tag}`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* GitHub Metadata Card if synced */}
              {gh && (
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 text-xs">
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-slate-600 dark:text-slate-300">
                    {gh.language && (
                      <span className="flex items-center gap-1.5">
                        <Code2 size={14} className="text-blue-500" />
                        <strong>{gh.language}</strong>
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star size={13} className="text-amber-500" />
                      <span>{gh.stars} stars</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={13} className="text-slate-400" />
                      <span>{gh.forks} forks</span>
                    </span>
                  </div>

                  {gh.pushedAt && (
                    <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                      <Clock size={13} />
                      <span>Pushed {formatTimeAgo(gh.pushedAt)}</span>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

        </div>

        {/* Modal Footer / CTAs */}
        <div className="shrink-0 p-4 sm:p-6 pt-3 sm:pt-4 bg-white/40 dark:bg-slate-900/50 border-t border-white/60 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 order-2 sm:order-1 flex items-center gap-2">
            <span>{isLiveRepo ? 'Live synchronized repository' : 'Curated Engineering Project'}</span>
            <span>•</span>
            <button
              onClick={() => setActiveTab(activeTab === 'overview' ? 'code' : 'overview')}
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold cursor-pointer"
            >
              {activeTab === 'overview' ? 'Inspect Code (IDE) →' : '← Back to Overview'}
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto order-1 sm:order-2">
            {liveDemoUrl && (
              <a
                href={liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm transition shadow-xs"
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
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-medium text-xs sm:text-sm transition"
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
