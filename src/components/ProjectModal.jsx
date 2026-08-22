import React, { useEffect } from 'react';
import { X, ExternalLink, Star, GitFork, Calendar, Layers, Sparkles, CheckCircle2, Globe, Clock, Code2 } from 'lucide-react';
import Github from './icons/Github';
import { formatTimeAgo, getDevStatus } from '../services/github';

export default function ProjectModal({ project, githubData, onClose, onSelectTag }) {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl my-8 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 z-10 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-6 sm:p-8 pb-4 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
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
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                {project.title || project.name}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer shrink-0"
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Detailed Overview */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Overview
            </h4>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Key Features / Highlights */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Key Features & Capabilities
              </h4>
              <ul className="grid gap-2 sm:grid-cols-1">
                {project.keyFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    <CheckCircle2 size={16} className="text-blue-500 dark:text-blue-400 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack & Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="space-y-2.5 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
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
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 font-mono border border-slate-200/60 dark:border-slate-700/60 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
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
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
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

        </div>

        {/* Modal Footer / CTAs */}
        <div className="p-6 sm:p-8 pt-4 bg-slate-50/70 dark:bg-slate-900/90 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {isLiveRepo ? 'Live synchronized repository from GitHub' : 'Curated Engineering Project'}
          </div>

          <div className="flex items-center gap-2.5">
            {liveDemoUrl && (
              <a
                href={liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm transition shadow-xs"
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
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-medium text-xs sm:text-sm transition"
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
}
