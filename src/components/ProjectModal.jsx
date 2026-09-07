import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle, SquaresFour, FileCode, Calendar } from '@phosphor-icons/react';
import { getTechIcon } from './icons/TechIcons';
import CodeInspector from './CodeInspector';
import { formatTimeAgo, getDevStatus } from '../services/github';

export default function ProjectModal({ project, githubData, onClose, onSelectTag, initialTab = 'overview' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    const modal = modalRef.current;
    if (modal) {
      const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable.length > 0) focusable[0].focus();
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  const gh = githubData || null;
  const liveDemoUrl = project.demoUrl || (gh?.homepage) || null;
  const repoUrl = project.link || (gh?.htmlUrl) || `https://github.com/danielaplan/${project.repoName || project.title}`;
  const devStatus = getDevStatus(gh?.pushedAt || project.pushedAt, gh?.archived || project.archived, project.tags || gh?.topics);

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto overscroll-contain">
      <div
        className="fixed inset-0 transition-opacity duration-200"
        style={{ backgroundColor: 'rgba(247, 246, 243, 0.8)' }}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative w-full max-w-5xl my-auto rounded-xl max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-3rem)] flex flex-col overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border)',
        }}
      >
        {/* Modal Header */}
        <div
          className="shrink-0 px-5 py-4 sm:px-6 sm:py-5"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1.5 min-w-0 flex-1">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold"
                  style={devStatus.badgeClass.includes('emerald')
                    ? { backgroundColor: 'var(--pastel-green-bg)', color: 'var(--pastel-green-text)' }
                    : { backgroundColor: 'var(--pastel-blue-bg)', color: 'var(--pastel-blue-text)' }
                  }
                >
                  {devStatus.label}
                </span>
                {project.featured && (
                  <span
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold"
                    style={{ backgroundColor: 'var(--pastel-blue-bg)', color: 'var(--pastel-blue-text)' }}
                  >
                    Featured
                  </span>
                )}
                {project.category && (
                  <span
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold"
                    style={{ backgroundColor: 'var(--bg-canvas)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                  >
                    {project.category}
                  </span>
                )}
                {project.year && (
                  <span
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold"
                    style={{ backgroundColor: 'var(--bg-canvas)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                  >
                    <Calendar size={12} weight="bold" />
                    {project.year}
                  </span>
                )}
              </div>
              <h3
                id="modal-title"
                className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight break-words"
                style={{ color: 'var(--text-primary)' }}
              >
                {project.title || project.name}
              </h3>
            </div>

            {/* Navigation Tabs */}
            <div
              className="hidden sm:flex items-center gap-1 p-1 shrink-0"
              style={{ backgroundColor: 'var(--bg-canvas)', border: '1px solid var(--border)' }}
            >
              {[
                { key: 'overview', label: 'Project Overview', Icon: SquaresFour },
                { key: 'code', label: 'Code Inspector', Icon: FileCode },
              ].map(({ key, label, Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200 cursor-pointer"
                  style={
                    activeTab === key
                      ? { backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)', boxShadow: 'var(--card-shadow)' }
                      : { color: 'var(--text-secondary)' }
                  }
                >
                  <Icon size={12} weight="bold" />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-lg cursor-pointer transition-all duration-200 -mr-1 -mt-1 shrink-0"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="Close dialog"
            >
              <X size={20} weight="bold" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div
          data-lenis-prevent
          className="flex-1 p-4 sm:p-6 overflow-y-auto"
        >
          {activeTab === 'code' ? (
            <CodeInspector project={project} repoName={project.repoName} />
          ) : (
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.9fr)]">
              <div className="space-y-4">
                <div
                  className="rounded-lg p-4"
                  style={{ border: '1px solid var(--border)' }}
                >
                  <div className="space-y-1.5">
                    <h4
                      className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em]"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      Overview
                    </h4>
                    <p
                      className="text-sm leading-relaxed break-words"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {project.longDescription || project.description}
                    </p>
                  </div>
                </div>

                {project.keyFeatures && project.keyFeatures.length > 0 && (
                  <div
                    className="rounded-lg p-4"
                    style={{ border: '1px solid var(--border)' }}
                  >
                    <div className="space-y-2 pt-0.5">
                      <h4
                        className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em]"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        Key Features &amp; Capabilities
                      </h4>
                      <ul className="grid gap-1.5 sm:gap-2">
                        {project.keyFeatures.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            <CheckCircle
                              size={15}
                              weight="bold"
                              className="shrink-0 mt-0.5"
                              style={{ color: 'var(--text-secondary)' }}
                            />
                            <span className="break-words leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {project.tags && project.tags.length > 0 && (
                  <div
                    className="rounded-lg p-4"
                    style={{ border: '1px solid var(--border)' }}
                  >
                    <div className="space-y-2 pt-0.5">
                      <h4
                        className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em]"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        Technologies &amp; Tools
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag, idx) => {
                          const TechIcon = getTechIcon(tag);
                          return (
                            <button
                              key={idx}
                              onClick={() => { if (onSelectTag) { onSelectTag(tag); onClose(); } }}
                              className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 font-medium rounded-md cursor-pointer transition-all duration-200"
                              style={{
                                backgroundColor: 'var(--bg-canvas)',
                                border: '1px solid var(--border)',
                                color: 'var(--text-secondary)',
                              }}
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
                <div
                  className="rounded-xl p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                  style={{ border: '1px solid var(--border)' }}
                >
                  <div
                    className="flex items-center justify-between px-2 py-2 text-[9px] font-mono"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: 'var(--border-hover)' }} />
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: 'var(--border-hover)' }} />
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: 'var(--border-hover)' }} />
                    </span>
                    <span>Live Preview</span>
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
