"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
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

const DEBOUNCE_MS = 250;
const SWIPE_THRESHOLD = 38;

export default function ProjectSpotlightCarousel({
  projects,
  githubMap = new Map(),
  onOpenDetails,
  onOpenCode,
}: ProjectSpotlightCarouselProps) {
  const total = projects.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stageHeight, setStageHeight] = useState<number>(0);
  const cardElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const lastNavTime = useRef(0);

  // Measure active card height dynamically to prevent vertical clipping on any screen size
  useEffect(() => {
    const updateHeight = () => {
      const activeEl = cardElementsRef.current[currentIndex];
      if (activeEl) {
        setStageHeight(activeEl.offsetHeight);
      }
    };

    updateHeight();
    const t = setTimeout(updateHeight, 80);

    window.addEventListener("resize", updateHeight);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", updateHeight);
    };
  }, [currentIndex, projects]);

  // Debounced navigation to prevent state queueing during rapid clicks / key presses
  const goTo = useCallback((index: number) => {
    if (!total) return;
    const now = Date.now();
    if (now - lastNavTime.current < DEBOUNCE_MS) return;
    lastNavTime.current = now;
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

  // Touch Swipe with onTouchMove for responsive mobile flick navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX.current;

    if (Math.abs(diff) >= SWIPE_THRESHOLD) {
      if (diff > 0) {
        prev();
      } else {
        next();
      }
      isDragging.current = false;
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  // GSAP 3D Arc Transform Animation (parabolic curved arc with fanning rotation)
  useEffect(() => {
    if (!total) return;

    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    // Arc parameters tuned for natural card fanning
    const xStepPercent = isMobile ? 46 : isTablet ? 40 : 36;
    const yStepFactor = isMobile ? 3.2 : 3.8; // creates curved parabolic dip: y = factor * diff^2
    const rotateZStep = isMobile ? 4.5 : 5.5; // fanning angle in degrees
    const rotateYStep = isMobile ? 9 : 12; // 3D perspective facing angle
    const scaleFactor = isMobile ? 0.12 : 0.09;
    const zStep = isMobile ? 65 : 85;

    cardElementsRef.current.forEach((el, idx) => {
      if (!el) return;

      let diff = idx - currentIndex;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;

      const absDiff = Math.abs(diff);

      if (absDiff === 0) {
        // Active Center Card (100% Solid Foreground)
        gsap.to(el, {
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          z: 0,
          rotateZ: 0,
          rotateY: 0,
          opacity: 1,
          filter: "none",
          duration: 0.55,
          ease: "power2.out",
          overwrite: "auto",
        });
        el.style.zIndex = "30";
        el.style.pointerEvents = "auto";
        el.style.cursor = "default";
      } else if (absDiff === 1) {
        // Immediate Left / Right Flanking Cards (100% Solid & Opaque along the Arc)
        const dir = Math.sign(diff);
        gsap.to(el, {
          scale: 1 - scaleFactor,
          xPercent: dir * xStepPercent,
          yPercent: yStepFactor * (absDiff * absDiff), // parabolic vertical arc dip
          z: -zStep,
          rotateZ: dir * rotateZStep, // fan rotation along the arc
          rotateY: -dir * rotateYStep, // 3D face inward toward center
          opacity: 1, // 100% solid opaque - zero transparency
          filter: "none",
          duration: 0.55,
          ease: "power2.out",
          overwrite: "auto",
        });
        el.style.zIndex = "20";
        el.style.pointerEvents = "auto";
        el.style.cursor = "pointer";
      } else {
        // All other secondary/outer cards are completely hidden
        gsap.to(el, {
          scale: 0.65,
          xPercent: 0,
          yPercent: 20,
          z: -180,
          rotateZ: 0,
          rotateY: 0,
          opacity: 0, // completely invisible
          filter: "none",
          duration: 0.35,
          ease: "power2.in",
          overwrite: "auto",
        });
        el.style.zIndex = "0";
        el.style.pointerEvents = "none";
        el.style.cursor = "default";
      }
    });
  }, [currentIndex, total]);

  if (!total) return null;

  const formattedCounter = `${String(currentIndex + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

  return (
    <div 
      className="w-full flex flex-col items-center select-none" 
      role="region"
      aria-roledescription="carousel"
      aria-label="Project carousel"
    >
      
      {/* Top Stage Bar: Contextual Category Chip & Counter / Steppers */}
      <div className="max-w-5xl w-full mx-auto flex items-center justify-between gap-3 mb-3 sm:mb-5 px-2 sm:px-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-200/90 dark:bg-slate-900/90 border border-slate-300/80 dark:border-slate-800 text-[11px] font-mono font-semibold text-cyan-700 dark:text-cyan-400 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 dark:bg-cyan-400 animate-pulse" />
            <span>SPOTLIGHT 3D</span>
          </span>
          {projects[currentIndex]?.category && (
            <span className="hidden sm:inline-flex items-center text-xs font-mono text-slate-600 dark:text-slate-400">
              / {projects[currentIndex].category}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-200/90 dark:bg-slate-900/90 border border-slate-300/80 dark:border-slate-800 shadow-sm">
          <span 
            className="px-2.5 py-0.5 text-xs font-mono font-bold text-cyan-800 dark:text-cyan-400 select-none"
            aria-live="polite"
            aria-atomic="true"
          >
            {formattedCounter}
          </span>
          <button
            onClick={prev}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300/80 dark:hover:bg-slate-800 transition cursor-pointer active:scale-95 focus-visible:ring-2 focus-visible:ring-cyan-400/60"
            aria-label="Previous project"
            title="Previous project (Arrow Left)"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300/80 dark:hover:bg-slate-800 transition cursor-pointer active:scale-95 focus-visible:ring-2 focus-visible:ring-cyan-400/60"
            aria-label="Next project"
            title="Next project (Arrow Right)"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* 3D Stage Viewport */}
      <div 
        className="w-full relative overflow-hidden py-5 sm:py-7 md:py-8"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ perspective: "1500px" }}
      >
        <div 
          className="relative w-full min-h-[580px] sm:min-h-[520px] md:min-h-[440px] flex items-center justify-center transition-[min-height] duration-300"
          style={{ minHeight: stageHeight > 0 ? `${stageHeight + 36}px` : undefined }}
        >
          {projects.map((project, idx) => {
            const isCenter = idx === currentIndex;
            const ghData = githubMap.get((project.repoName || project.title).toLowerCase());

            return (
              <div
                key={project.id || idx}
                ref={(node) => {
                  cardElementsRef.current[idx] = node;
                }}
                onClick={() => {
                  if (!isCenter) {
                    goTo(idx);
                  }
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${idx + 1} of ${total}: ${project.title}`}
                aria-hidden={!isCenter}
                className="absolute inset-x-0 mx-auto w-[84%] sm:w-[88%] md:w-full max-w-5xl"
                style={{
                  transformStyle: "preserve-3d",
                  willChange: "transform, opacity, filter",
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
      <div className="max-w-5xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-2 sm:px-4">
        
        {/* Project Jump Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 w-full sm:w-auto max-w-full justify-start [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {projects.map((proj, i) => {
            const isActive = i === currentIndex;
            return (
              <button
                key={proj.id || i}
                onClick={() => goTo(i)}
                aria-pressed={isActive}
                aria-label={`Go to ${proj.title}`}
                className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400/60 ${
                  isActive
                    ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20 scale-105"
                    : "bg-slate-200/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300 dark:hover:bg-slate-800 border border-slate-300/80 dark:border-slate-800"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-slate-950" : "bg-slate-400 dark:bg-slate-500"}`} />
                <span>{proj.title?.split(' ')[0] || `Project ${i + 1}`}</span>
              </button>
            );
          })}
        </div>

        {/* Keyboard / Navigation Hint */}
        <div className="hidden sm:flex text-[11px] font-mono text-slate-600 dark:text-slate-400 tracking-wider items-center gap-1.5 shrink-0">
          <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 text-[10px]">
            ← / →
          </span>
          <span>Keys or side click to cycle</span>
        </div>

      </div>

    </div>
  );
}
