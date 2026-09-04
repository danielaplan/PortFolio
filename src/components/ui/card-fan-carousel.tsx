"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectSpotlightCard from "../ProjectSpotlightCard";

export interface ProjectCardItem {
  id: string;
  title: string;
  subtitle?: string;
  frameworkBadge?: string;
  mockUrl?: string;
  category?: string;
  year?: string;
  description?: string;
  longDescription?: string;
  tags?: string[];
  engineeredWith?: string[];
  image?: string;
  link?: string;
  demoUrl?: string | null;
  keyFeatures?: string[];
  featured?: boolean;
  repoName?: string;
  pushedAt?: string;
  archived?: boolean;
}

interface ProjectSpotlightCarouselProps {
  projects: ProjectCardItem[];
  githubMap?: Map<string, any>;
  onOpenDetails?: (project: ProjectCardItem) => void;
  onOpenCode?: (project: ProjectCardItem) => void;
}

export default function ProjectSpotlightCarousel({
  projects,
  githubMap = new Map(),
  onOpenDetails,
  onOpenCode,
}: ProjectSpotlightCarouselProps) {
  const total = projects.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);

  // Safe navigation
  const goTo = useCallback((index: number) => {
    if (!total) return;
    setCurrentIndex((index % total + total) % total);
  }, [total]);

  const prev = useCallback(() => goTo(currentIndex - 1), [goTo, currentIndex]);
  const next = useCallback(() => goTo(currentIndex + 1), [goTo, currentIndex]);

  // Keyboard navigation (Left / Right keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") {
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prev, next]);

  // Touch / Swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = e.changedTouches[0].clientX - startX.current;
    if (diff > 50) prev();
    else if (diff < -50) next();
  };

  if (!total) return null;

  // Format index string "02 / 04"
  const formattedCounter = `${String(currentIndex + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

  return (
    <div className="w-full flex flex-col items-center select-none" ref={containerRef}>
      
      {/* Top Controls Row: Counter & Navigation Buttons */}
      <div className="w-full flex items-center justify-end gap-3 mb-4 px-2 sm:px-4">
        <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900/90 border border-slate-800 shadow-md">
          <span className="px-2.5 py-1 text-xs font-mono font-bold text-cyan-400">
            {formattedCounter}
          </span>
          <button
            onClick={prev}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer active:scale-95"
            aria-label="Previous project"
            title="Previous project (Arrow Left)"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer active:scale-95"
            aria-label="Next project"
            title="Next project (Arrow Right)"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* 3D Stage Viewport */}
      <div 
        className="w-full relative overflow-hidden py-4 sm:py-6"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ perspective: "1500px" }}
      >
        <div className="relative w-full min-h-[500px] sm:min-h-[460px] flex items-center justify-center">
          {projects.map((project, idx) => {
            // Compute relative circular distance
            let diff = idx - currentIndex;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const isCenter = diff === 0;
            const isLeft = diff === -1 || (currentIndex === 0 && idx === total - 1);
            const isRight = diff === 1 || (currentIndex === total - 1 && idx === 0);
            const isVisible = isCenter || isLeft || isRight;

            // Compute 3D transformation values
            let transform = "scale(0.7) translateX(0%) rotateY(0deg)";
            let opacity = 0;
            let zIndex = 0;
            let pointerEvents: "auto" | "none" = "none";
            let cursor = "default";
            let filter = "none";

            if (isCenter) {
              transform = "scale(1) translateX(0%) translateZ(0px) rotateY(0deg)";
              opacity = 1;
              zIndex = 20;
              pointerEvents = "auto";
            } else if (diff === -1 || (diff < 0 && isLeft)) {
              transform = "scale(0.88) translateX(-42%) translateZ(-90px) rotateY(14deg)";
              opacity = 0.28;
              zIndex = 10;
              pointerEvents = "auto";
              cursor = "pointer";
              filter = "blur(0.5px)";
            } else if (diff === 1 || (diff > 0 && isRight)) {
              transform = "scale(0.88) translateX(42%) translateZ(-90px) rotateY(-14deg)";
              opacity = 0.28;
              zIndex = 10;
              pointerEvents = "auto";
              cursor = "pointer";
              filter = "blur(0.5px)";
            }

            if (!isVisible) {
              return null;
            }

            const ghData = githubMap.get((project.repoName || project.title).toLowerCase());

            return (
              <div
                key={project.id || idx}
                onClick={() => {
                  if (!isCenter) {
                    goTo(idx);
                  }
                }}
                className="absolute inset-x-0 mx-auto w-full max-w-5xl transition-all duration-500 ease-out"
                style={{
                  transform,
                  opacity,
                  zIndex,
                  pointerEvents,
                  cursor,
                  filter,
                  transformStyle: "preserve-3d",
                  willChange: "transform, opacity",
                }}
              >
                <ProjectSpotlightCard
                  project={project}
                  githubData={ghData}
                  isCenter={isCenter}
                  onOpenDetails={onOpenDetails}
                  onOpenCode={onOpenCode}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation: Quick Project Pills & Keyboard Hint */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-2 sm:px-4">
        
        {/* Project Jump Pills */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
          {projects.map((proj, i) => {
            const isActive = i === currentIndex;
            return (
              <button
                key={proj.id || i}
                onClick={() => goTo(i)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20 scale-105"
                    : "bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-slate-950" : "bg-slate-500"}`} />
                <span>{proj.title?.split(' ')[0] || `Project ${i + 1}`}</span>
              </button>
            );
          })}
        </div>

        {/* Keyboard / Navigation Hint */}
        <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 tracking-wider flex items-center gap-1.5">
          <span className="px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700 text-[10px]">
            ← / →
          </span>
          <span>Keys or side click to cycle</span>
        </div>

      </div>

    </div>
  );
}
