import React, { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CarouselImageItem {
  id: string | number;
  title?: string;
  subtitle?: string;
  src: string;
  alt?: string;
}

interface ImageFanCarouselProps {
  images?: CarouselImageItem[];
  className?: string;
}

// Curated high-res aesthetic placeholder images matching the reference mood
const DEFAULT_PLACEHOLDERS: CarouselImageItem[] = [
  {
    id: 1,
    title: "Mountain Highway",
    subtitle: "Yosemite Ridge",
    src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=800&q=80",
    alt: "Mountain Highway placeholder",
  },
  {
    id: 2,
    title: "Misty Cliffs",
    subtitle: "Highland Overlook",
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    alt: "Misty Cliffs placeholder",
  },
  {
    id: 3,
    title: "Alpine Forest",
    subtitle: "Sunlit Pines",
    src: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    alt: "Alpine Forest placeholder",
  },
  {
    id: 4,
    title: "Golden Shoreline",
    subtitle: "Pacific Horizon",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    alt: "Golden Shoreline placeholder",
  },
  {
    id: 5,
    title: "Cosmic Summit",
    subtitle: "Milky Way Galaxy",
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
    alt: "Cosmic Summit placeholder",
  },
  {
    id: 6,
    title: "Autumn Valley",
    subtitle: "Maple Canopy Drive",
    src: "https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=800&q=80",
    alt: "Autumn Valley placeholder",
  },
  {
    id: 7,
    title: "Misty Horizon",
    subtitle: "Dawn Over Blue Ridge",
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    alt: "Misty Horizon placeholder",
  },
];

const SWIPE_THRESHOLD = 40;

export default function ImageFanCarousel({
  images = DEFAULT_PLACEHOLDERS,
  className = "",
}: ImageFanCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(3); // Start centered (index 3)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const startX = useRef(0);
  const isDragging = useRef(false);
  const total = images.length;

  const goTo = useCallback((idx: number) => {
    setCurrentIndex((idx % total + total) % total);
  }, [total]);

  const prev = useCallback(() => goTo(currentIndex - 1), [goTo, currentIndex]);
  const next = useCallback(() => goTo(currentIndex + 1), [goTo, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    startX.current = touch.clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const touch = e.touches[0];
    if (!touch) return;
    const diff = touch.clientX - startX.current;
    if (Math.abs(diff) >= SWIPE_THRESHOLD) {
      if (diff > 0) prev();
      else next();
      isDragging.current = false;
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  // GSAP 3D Arch / Fan Effect matching the exact screenshot geometry
  useEffect(() => {
    if (!total) return;

    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;

    // Arc geometry calculations
    // Each step away from center fans horizontally, rotates outward, and dips vertically
    const xStep = isMobile ? 55 : isTablet ? 75 : 95; // px horizontal shift per diff step
    const rotStep = isMobile ? 8.5 : 9.5; // degrees tilt per step
    const yDropFactor = isMobile ? 5.5 : 6.8; // creates the curved arch top (y = factor * diff^2)
    const scaleDrop = isMobile ? 0.08 : 0.06;

    cardRefs.current.forEach((el, idx) => {
      if (!el) return;

      // Wrap circular difference so cards flow naturally
      let diff = idx - currentIndex;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;

      const absDiff = Math.abs(diff);
      const sign = Math.sign(diff);

      // Only show up to 3 cards on each side (7 total in fan)
      if (absDiff <= 3) {
        const xPos = diff * xStep;
        const yPos = Math.pow(absDiff, 1.85) * yDropFactor;
        const rotation = diff * rotStep;
        const scale = Math.max(0.72, 1 - absDiff * scaleDrop);
        const zIndex = 50 - absDiff * 10;
        const opacity = absDiff === 3 ? (isMobile ? 0 : 0.65) : 1;
        // Blur increases with distance — center = 0px, edges = up to 6px
        const blurPx = absDiff * 2.5;

        gsap.to(el, {
          x: xPos,
          y: yPos,
          rotateZ: rotation,
          scale: scale,
          opacity: opacity,
          filter: `blur(${blurPx}px)`,
          duration: 0.55,
          ease: "power2.out",
          overwrite: "auto",
        });

        el.style.zIndex = `${zIndex}`;
        el.style.pointerEvents = absDiff === 0 ? "auto" : "none";
      } else {
        // Outside visible range
        gsap.to(el, {
          x: sign * 350,
          y: 80,
          scale: 0.5,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.35,
          ease: "power2.in",
          overwrite: "auto",
        });
        el.style.zIndex = "0";
        el.style.pointerEvents = "none";
      }
    });
  }, [currentIndex, total]);

  return (
    <div
      className={`w-full flex flex-col items-center select-none py-6 overflow-hidden ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 3D Arc Stage */}
      <div className="relative w-full flex-1 min-h-[280px] sm:min-h-[340px] md:min-h-[400px] flex items-center justify-center">
        {images.map((item, idx) => {
          const isCenter = idx === currentIndex;
          return (
            <div
              key={item.id}
              ref={(el) => { cardRefs.current[idx] = el; }}
              onClick={() => goTo(idx)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[190px] sm:w-[240px] md:w-[280px] aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer shadow-2xl will-change-transform group"
              style={{
                boxShadow: isCenter
                  ? "0 25px 60px -12px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.15)"
                  : "0 15px 35px -8px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.08)",
                backgroundColor: "var(--bg-raised)",
              }}
              title={item.title || `Slide ${idx + 1}`}
            >
              {/* Image with smooth hover subtle zoom */}
              <img
                src={item.src}
                alt={item.alt || item.title || `Carousel item ${idx + 1}`}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                draggable={false}
              />

              {/* Gradient Vignette Overlay for Depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-70 group-hover:opacity-90 transition-opacity" />

              {/* Card Label / Meta Pill (Shows on active center card or hover) */}
              {(item.title || item.subtitle) && (
                <div
                  className={`absolute bottom-4 left-4 right-4 p-3 rounded-2xl backdrop-blur-md transition-all duration-300 ${
                    isCenter
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                  }`}
                  style={{
                    backgroundColor: "rgba(0,0,0,0.45)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  {item.title && (
                    <p className="text-white text-xs sm:text-sm font-bold tracking-tight truncate">
                      {item.title}
                    </p>
                  )}
                  {item.subtitle && (
                    <p className="text-white/70 text-[10px] sm:text-xs font-mono truncate">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modern Pill Stepper & Navigation Controls (Matches Screenshot) */}
      <div className="flex items-center gap-4 mt-6 z-20">
        {/* Previous Button */}
        <button
          onClick={prev}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
          style={{
            backgroundColor: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "var(--text-primary)",
          }}
          aria-label="Previous slide"
          title="Previous slide"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Bullet Indicator Dots */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-md"
          style={{
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {images.map((_, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? "w-2.5 h-2.5 bg-white scale-110 shadow-sm"
                    : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                title={`Slide ${idx + 1}`}
              />
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={next}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
          style={{
            backgroundColor: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "var(--text-primary)",
          }}
          aria-label="Next slide"
          title="Next slide"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
