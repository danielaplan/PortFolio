import React from 'react';
import { 
  Sparkles, 
  ExternalLink, 
  Eye, 
  FileCode, 
  Globe, 
  Lock,
  Terminal
} from 'lucide-react';
import Github from './icons/Github';
import { getTechIcon } from './icons/TechIcons';
import { getDevStatus } from '../services/github';

export default function ProjectSpotlightCard({ 
  project, 
  githubData, 
  onOpenDetails, 
  onOpenCode,
  isCenter = true
}) {
  if (!project) return null;

  const liveDemo = project.demoUrl || githubData?.homepage;
  const devStatus = getDevStatus(githubData?.pushedAt || project.pushedAt, githubData?.archived || project.archived, project.tags);

  const mockUrl = project.mockUrl || (
    project.demoUrl 
      ? project.demoUrl.replace(/^https?:\/\//, '')
      : `portal.${project.id || 'system'}.internal/preview`
  );

  const engineeredList = project.engineeredWith || project.tags || [];

  return (
    <div 
      className={`w-full rounded-3xl p-5 sm:p-7 md:p-8 transition-all duration-300 bg-slate-900/95 text-white border border-slate-800 shadow-2xl relative overflow-hidden ${
        !isCenter ? 'pointer-events-none select-none' : ''
      }`}
    >
      {/* Background ambient gradient glow */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left Column: Project Architecture & Specs */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
          
          {/* Badges Bar */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold tracking-wider uppercase text-[10px] sm:text-[11px] border border-cyan-500/30">
              <Sparkles size={12} className="text-cyan-400" />
              Featured Spotlight
            </span>
            
            {project.category && (
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-medium text-[10px] sm:text-[11px] border border-slate-700/60">
                {project.category}
              </span>
            )}

            {project.year && (
              <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-400 font-mono text-[10px] sm:text-[11px]">
                {project.year}
              </span>
            )}

            {/* Enterprise / Dev status */}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/60 text-emerald-400 font-medium text-[10px] sm:text-[11px] border border-emerald-800/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {project.category?.includes("Systems") ? "ENTERPRISE BUILD" : devStatus.label.toUpperCase()}
            </span>
          </div>

          {/* Title & Framework Tag */}
          <div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1.5">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                {project.title}
              </h3>
              {(project.frameworkBadge || project.tags?.[0]) && (
                <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] sm:text-xs font-mono font-medium border border-slate-700">
                  {project.frameworkBadge || project.tags[0]}
                </span>
              )}
            </div>
            {project.subtitle && (
              <p className="text-xs sm:text-sm font-medium text-cyan-400/90 tracking-wide line-clamp-1">
                {project.subtitle}
              </p>
            )}
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal line-clamp-3 sm:line-clamp-4">
            {project.longDescription || project.description}
          </p>

          {/* Engineered With Tech Badges */}
          <div className="space-y-2">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Engineered With
            </span>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {engineeredList.map((tag, idx) => {
                const TechIcon = getTechIcon(tag);
                return (
                  <span 
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-800/90 text-slate-200 text-[11px] sm:text-xs font-mono font-medium border border-slate-700/80 hover:border-cyan-500/50 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {TechIcon && <TechIcon className="w-3.5 h-3.5 opacity-80" />}
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Action CTAs */}
          {isCenter && (
            <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3 pointer-events-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDetails?.(project);
                }}
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition-all duration-200 shadow-md shadow-cyan-500/20 cursor-pointer active:scale-95"
              >
                <Eye size={15} />
                <span>Detail View</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenCode?.(project);
                }}
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm border border-slate-700 transition-all duration-200 cursor-pointer active:scale-95"
              >
                <FileCode size={15} className="text-cyan-400" />
                <span>Code Repository</span>
                <ExternalLink size={12} className="text-slate-400" />
              </button>

              {liveDemo && (
                <a
                  href={liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-emerald-400 font-semibold text-xs sm:text-sm border border-emerald-900/60 hover:border-emerald-700 transition-all duration-200"
                >
                  <Globe size={14} />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          )}

        </div>

        {/* Right Column: Browser / System Window Mockup */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden group">
            
            {/* Window Chrome */}
            <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900/90 border-b border-slate-800/80">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-950/80 border border-slate-800 text-[10px] sm:text-[11px] font-mono text-slate-400 max-w-[180px] sm:max-w-[210px] truncate">
                <Lock size={10} className="text-slate-500 shrink-0" />
                <span className="truncate">{mockUrl}</span>
              </div>

              <div className="w-4" />
            </div>

            {/* Window Content / Mockup Image */}
            <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden flex items-center justify-center">
              {project.image ? (
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 select-none pointer-events-none" 
                />
              ) : (
                <div className="p-6 text-center space-y-2">
                  <Terminal size={28} className="mx-auto text-cyan-400 opacity-60" />
                  <p className="text-xs font-mono text-slate-400">{project.title}</p>
                </div>
              )}
              
              {/* Subtle glass reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
