import React, { useState } from 'react';
import {
  Sparkles,
  Eye,
  Lock,
  Terminal,
  Activity,
  Database,
  Cpu
} from 'lucide-react';
import Github from './icons/Github';
import { getTechIcon } from './icons/TechIcons';
import { getDevStatus } from '../services/github';

// High-fidelity UI Tile Card Placeholder (Stitch Dashboard Style)
function ProjectTileCardPlaceholder({ project }) {
  const isSystems = project.category?.includes("Systems") || project.tags?.some(t => ["C#", "SQL", "Database Architecture"].includes(t));

  return (
    <div className="w-full h-full p-4 sm:p-5 flex flex-col justify-between bg-gradient-to-br from-slate-900 via-slate-950 to-[#0a0e17] text-white select-none relative overflow-hidden">
      {/* Background dot grid pattern */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #06b6d4 1px, transparent 1px)',
          backgroundSize: '16px 16px'
        }}
      />

      {/* Top Header: System Status & Pulse */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800/80 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-metric-cyan animate-pulse" />
          <span className="text-[11px] font-mono tracking-wider text-metric-cyan font-semibold uppercase">
            {isSystems ? "Enterprise Live Node" : "Interactive App Engine"}
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60">
          v2.4 • 99.9% Up
        </span>
      </div>

      {/* Middle Tile: Metrics & Architecture Flow */}
      <div className="relative z-10 grid grid-cols-3 gap-2 my-auto py-2">
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 shadow-inner">
          <span className="text-[10px] text-slate-400 font-mono block">Throughput</span>
          <span className="text-sm sm:text-base font-bold text-white font-mono flex items-center gap-1 mt-0.5">
            <Activity size={12} className="text-metric-cyan" />
            {isSystems ? "1.2k req/s" : "60 FPS"}
          </span>
          <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-metric-cyan h-full w-[82%]" />
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 shadow-inner">
          <span className="text-[10px] text-slate-400 font-mono block">Database</span>
          <span className="text-sm sm:text-base font-bold text-active-emerald font-mono flex items-center gap-1 mt-0.5">
            <Database size={12} />
            {isSystems ? "SQL Server" : "Cloud Sync"}
          </span>
          <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-active-emerald h-full w-[94%]" />
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 shadow-inner">
          <span className="text-[10px] text-slate-400 font-mono block">Security</span>
          <span className="text-sm sm:text-base font-bold text-metric-cyan font-mono flex items-center gap-1 mt-0.5">
            <Cpu size={12} />
            RBAC
          </span>
          <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-metric-cyan h-full w-[100%]" />
          </div>
        </div>
      </div>

      {/* Bottom Log / Stream Activity Bar */}
      <div className="relative z-10 p-2 rounded-lg bg-slate-950/90 border border-slate-800/80 font-mono text-[10px] text-slate-400 flex items-center justify-between">
        <span className="truncate flex items-center gap-1.5 text-metric-cyan">
          <Terminal size={11} className="text-metric-cyan shrink-0" />
          <span>telemetry.stream: &quot;{project.title}&quot; pipeline active</span>
        </span>
        <span className="text-active-emerald text-[9px] shrink-0 ml-2">● LIVE</span>
      </div>

      {/* Subtle overlay reflection */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

export default function ProjectSpotlightCard({ 
  project, 
  githubData, 
  onOpenDetails, 
  onOpenCode,
  isCenter = true
}) {
  const [imageFailed, setImageFailed] = useState(false);

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
      className={`w-full rounded-3xl p-4 sm:p-6 md:p-8 transition-all duration-300 neo-raised-lg bg-[color:var(--bg-color)] dark:bg-slate-900/95 text-slate-900 dark:text-white border border-slate-200/80 dark:border-slate-800 shadow-2xl relative overflow-hidden ${
        !isCenter ? 'pointer-events-none select-none' : ''
      }`}
    >
      {/* Subtle ambient glow */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-sblue-5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-8 items-center">
        
        {/* Left Column: Project Architecture & Specs */}
        <div className="md:col-span-7 space-y-3 sm:space-y-4 md:space-y-5 text-left">
          
          {/* Badges Bar */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg bg-sblue-15 dark:bg-sblue-20 text-signal-blue-deep dark:text-metric-cyan font-bold tracking-wider uppercase text-[10px] sm:text-[11px] border border-cyan-500/30">
              <Sparkles size={11} className="text-signal-blue dark:text-metric-cyan" />
              Featured Spotlight
            </span>
            
            {project.category && (
              <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-[10px] sm:text-[11px] border border-slate-300/80 dark:border-slate-700/60">
                {project.category}
              </span>
            )}

            {project.year && (
              <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 font-mono text-[10px] sm:text-[11px] border border-slate-300/60 dark:border-slate-700/60">
                {project.year}
              </span>
            )}

            {/* Enterprise / Dev status */}
            <span className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-active-emerald-15 text-active-emerald font-medium text-[10px] sm:text-[11px] border border-active-emerald-30">
              <span className="w-1.5 h-1.5 rounded-full bg-active-emerald animate-pulse" />
              {project.category?.includes("Systems") ? "ENTERPRISE BUILD" : devStatus.label.toUpperCase()}
            </span>
          </div>

          {/* Title & Framework Tag */}
          <div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
              <h3 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {project.title}
              </h3>
              {(project.frameworkBadge || project.tags?.[0]) && (
                <span className="px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] sm:text-xs font-mono font-medium border border-slate-300 dark:border-slate-700">
                  {project.frameworkBadge || project.tags[0]}
                </span>
              )}
            </div>
            {project.subtitle && (
              <p className="text-xs sm:text-sm font-semibold text-signal-blue dark:text-metric-cyan tracking-wide line-clamp-1">
                {project.subtitle}
              </p>
            )}
          </div>

          {/* Description (collapsed — expand in modal) */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal line-clamp-2">
            {project.longDescription || project.description}
          </p>

          {/* Action CTAs — single primary action on card, details in modal */}
          {isCenter && (
            <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-2 sm:gap-3 pointer-events-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDetails?.(project);
                }}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-signal-blue hover:bg-metric-cyan text-accent font-bold text-xs sm:text-sm transition-all duration-200 shadow-xs cursor-pointer active:scale-95 focus-visible:ring-2 focus-visible:ring-cyan-400/60"
              >
                <Eye size={14} />
                <span>View Details</span>
              </button>
            </div>
          )}

        </div>

        {/* Right Column: Browser / System Window Mockup */}
        <div className="md:col-span-5">
          <div className="rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-300/80 dark:border-slate-800 shadow-2xl overflow-hidden group">
            
            {/* Window Chrome */}
            <div className="flex items-center justify-between px-3 sm:px-3.5 py-1.5 sm:py-2 bg-slate-200/90 dark:bg-slate-900/90 border-b border-slate-300/80 dark:border-slate-800/80">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-samber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-active-emerald-80" />
              </div>
              
              <div className="flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-md bg-white/90 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-800 text-[10px] sm:text-[11px] font-mono text-slate-600 dark:text-slate-400 max-w-[160px] sm:max-w-[210px] truncate">
                <Lock size={10} className="text-slate-500 shrink-0" />
                <span className="truncate">{mockUrl}</span>
              </div>

              <div className="w-4" />
            </div>

            {/* Window Content: Project Image or Stylized Tile Card Placeholder */}
            <div className="relative aspect-[16/9] sm:aspect-[16/10] bg-slate-950 overflow-hidden flex items-center justify-center">
              {project.image && !imageFailed ? (
                <img 
                  src={project.image} 
                  alt={project.title} 
                  onError={() => setImageFailed(true)}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 select-none pointer-events-none" 
                />
              ) : (
                <ProjectTileCardPlaceholder project={project} />
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
