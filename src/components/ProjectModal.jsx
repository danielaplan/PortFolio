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
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        data-lenis-prevent
        className="relative w-full max-w-5xl my-auto neo-raised-lg text-[color:var(--text-primary)] rounded-[1.15rem] shadow-[0_0_0_1px_rgba(0,0,0,0.05)] max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-3rem)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="shrink-0 px-5 py-4 sm:px-6 sm:py-5 border-b border-[color:var(--shadow-dark)]">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1.5 min-w-0 flex-1">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border shadow-sm ${devStatus.badgeClass}`}>
                    <span className={`inline-flex h-1.75 h-1.75 rounded-full ${devStatus.dotClass}`} />
                    {devStatus.label}
                  </span>
                </div>
                {project.featured && (
                  <span className="neo-raised-xs inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold text-accent">
                    <Sparkles size={11} /> Featured
                  </span>
                )}
                {project.category && (
                  <span className="neo-raised-xs inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold text-[color:var(--text-secondary)]">
                    {project.category}
                  </span>
                )}
                {project.year && (
                  <span className="neo-raised-xs inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold text-[color:var(--text-tertiary)]">
                    <Calendar size={12} /> {project.year}
                  </span>
                )}
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[color:var(--text-primary)] tracking-tight break-words">
                {project.title || project.name}
              </h3>
            </div>

            {/* Navigation Tabs — neumorphic segmented control */}
            <div className="hidden sm:flex items-center gap-1 neo-inset p-1 shrink-0">
              <button
                onClick={() => setActiveTab('overview')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-shadow duration-200 cursor-pointer ${
                  activeTab === 'overview' ? 'neo-raised-xs text-accent' : 'hover:opacity-70'
                }`}
              >
                <Layers size={12} />
                <span>Project Overview</span>
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-shadow duration-200 cursor-pointer ${
                  activeTab === 'code' ? 'neo-raised-xs text-accent' : 'hover:opacity-70'
                }`}
              >
                <FileCode size={12} />
                <span>Code Inspector</span>
                <span className="neo-raised-xs px-1.5 py-0.5 text-[9px] font-mono">IDE</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="neo-press p-1.5 sm:p-2 -mr-1 -mt-1 shrink-0 cursor-pointer"
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>
          </div>

        </div>

          {/* Modal Body */}
          <div
            data-lenis-prevent
            className="flex-1 p-4 sm:p-6 overflow-y-auto overscroll-contain"
          >
            {activeTab === 'code' ? (
              <CodeInspector project={project} repoName={project.repoName} />
            ) : (
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.9fr)]">
                <div className="space-y-4">
                  <div className="rounded-lg border border-slate-700/70 neo-raised p-4">
                    <div className="space-y-1.5">
                      <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
                        Overview
                      </h4>
                      <p className="text-sm text-[color:var(--text-tertiary)] leading-relaxed break-words">
                        {project.longDescription || project.description}
                      </p>
                    </div>
                  </div>

                  {project.keyFeatures && project.keyFeatures.length > 0 && (
                    <div className="rounded-lg border border-slate-700/70 neo-raised p-4">
                      <div className="space-y-2 pt-0.5">
                        <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
                          Key Features & Capabilities
                        </h4>
                        <ul className="grid gap-1.5 sm:gap-2">
                          {project.keyFeatures.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[color:var(--text-secondary)]">
                              <CheckCircle2 size={15} className="text-accent mt-0.5 shrink-0" />
                              <span className="break-words leading-relaxed">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {project.tags && project.tags.length > 0 && (
                    <div className="rounded-lg border border-slate-700/70 neo-raised p-4">
                      <div className="space-y-2 pt-0.5">
                        <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
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
                                className="neo-raised-xs inline-flex items-center gap-1 text-[11px] px-2.5 py-1 font-medium cursor-pointer transition-shadow duration-200"
                                title={`Filter by ${tag}`}
                              >
                                {TechIcon && <TechIcon className="w-3 h-3 shrink-0" />}
                                <span>#{tag}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Live Preview Strip */}
                  <div className="rounded-2xl neo-raised p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-[11px] sm:text-xs text-[color:var(--text-secondary)]">
                    <div className="flex items-center justify-between px-2 py-2 text-[9px] font-mono text-[color:var(--text-tertiary)]">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[color:var(--text-tertiary)]" />
                        <span className="h-2 w-2 rounded-full bg-[color:var(--text-tertiary)]" />
                        <span className="h-2 w-2 rounded-full bg-[color:var(--text-tertiary)]" />
                      </span>
                      <span className="text-accent">LIVE</span>
                      <span>Project preview</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );

  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return modalContent;
}