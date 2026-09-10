import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowSquareOut,
  Check,
  GithubLogo,
  ImageSquare,
} from '@phosphor-icons/react';
import { getTechIcon } from './icons/TechIcons';

const cardSpring = {
  type: 'spring',
  stiffness: 320,
  damping: 30,
  mass: 0.8,
};

const detailVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.24,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.05,
    },
  },
  exit: { opacity: 0, y: 8, transition: { duration: 0.16 } },
};

const detailItemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

function TechStack({ tags = [] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.slice(0, 5).map((tag) => {
        const Icon = getTechIcon(tag);

        return (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-mono"
            style={{
              backgroundColor: 'var(--bg-canvas)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
            }}
          >
            {Icon ? <Icon className="h-2.5 w-2.5" /> : null}
            {tag}
          </span>
        );
      })}
    </div>
  );
}

function ProjectCard({ project, pinnedId, setPinnedId, onOpenDetails, featured = false }) {
  const cardRef = useRef(null);
  const cellRef = useRef(null);
  const imageOverlayRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(project.image || '');
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [imagePointer, setImagePointer] = useState({ x: 0, y: 0 });
  const [imageOverlayPosition, setImageOverlayPosition] = useState({ left: 16, top: 16 });
  const [expandedPosition, setExpandedPosition] = useState(null);
  const reduceMotion = useReducedMotion();
  const features = project.keyFeatures || [];
  const isPinned = pinnedId === project.id;
  const isExpanded = isPinned;
  const isCollapsing = !isExpanded && expandedPosition !== null;
  const showExpandedDetails = isExpanded || isCollapsing;

  useLayoutEffect(() => {
    if (!isImageHovered || !imageOverlayRef.current) return;

    const overlay = imageOverlayRef.current.getBoundingClientRect();
    const edgePadding = 16;
    const gap = 18;
    const maxLeft = Math.max(edgePadding, window.innerWidth - overlay.width - edgePadding);
    const maxTop = Math.max(edgePadding, window.innerHeight - overlay.height - edgePadding);
    const preferredLeft = imagePointer.x + gap;
    const left = preferredLeft + overlay.width <= window.innerWidth - edgePadding
      ? preferredLeft
      : imagePointer.x - overlay.width - gap;
    const preferredTop = imagePointer.y - overlay.height - gap;
    const top = preferredTop >= edgePadding
      ? preferredTop
      : imagePointer.y + gap;

    setImageOverlayPosition({
      left: Math.min(Math.max(edgePadding, left), maxLeft),
      top: Math.min(Math.max(edgePadding, top), maxTop),
    });
  }, [imagePointer, isImageHovered]);

  useEffect(() => {
    return () => {
      if (imagePreview.startsWith('blob:')) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  useEffect(() => {
    if (!isPinned) return undefined;

    const handleOutsideClick = (event) => {
      if (!cardRef.current?.contains(event.target)) {
        setPinnedId(null);
      }
    };

    document.addEventListener('pointerdown', handleOutsideClick);
    return () => document.removeEventListener('pointerdown', handleOutsideClick);
  }, [isPinned, setPinnedId]);

  useLayoutEffect(() => {
    if (!isPinned) {
      return undefined;
    }

    if (!cardRef.current || !cellRef.current) {
      return undefined;
    }

    const positionOverlay = () => {
      const card = cardRef.current;
      const cell = cellRef.current;
      if (!card || !cell) return;

      const cellRect = cell.getBoundingClientRect();
      const cardWidth = card.offsetWidth * 1.05;
      const cardHeight = card.offsetHeight * 1.05;
      const edgePadding = 16;
      const desiredLeft = cellRect.left - 4;
      const desiredTop = cellRect.top - 6;
      const left = Math.min(
        Math.max(edgePadding, desiredLeft),
        Math.max(edgePadding, window.innerWidth - cardWidth - edgePadding)
      );
      const top = Math.min(
        Math.max(edgePadding, desiredTop),
        Math.max(edgePadding, window.innerHeight - cardHeight - edgePadding)
      );

      setExpandedPosition({
        left: left - cellRect.left,
        top: top - cellRect.top,
      });
    };

    positionOverlay();
    const frame = requestAnimationFrame(positionOverlay);
    window.addEventListener('resize', positionOverlay);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', positionOverlay);
    };
  }, [isPinned]);

  const handleCardClick = (event) => {
    if (event.target.closest('a, button, label, input')) return;
    if (isPinned) {
      setPinnedId(null);
      return;
    }
    setPinnedId(project.id);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImagePreview((currentPreview) => {
      if (currentPreview.startsWith('blob:')) URL.revokeObjectURL(currentPreview);
      return URL.createObjectURL(file);
    });
  };

  return (
    <div ref={cellRef} className={`project-card-cell relative min-h-[280px] ${featured ? 'lg:col-span-2' : 'lg:col-span-1'}`}>
      <motion.article
        ref={cardRef}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleCardClick(event);
          }
        }}
        onClick={handleCardClick}
        onAnimationComplete={() => {
          if (!isExpanded) setExpandedPosition(null);
        }}
        // Removed hover lift/scale for minimalistic design
        animate={{
          scale: isExpanded ? 1.05 : 1,
          x: isExpanded ? -4 : 0,
          y: isExpanded ? -6 : 0,
          left: expandedPosition ? expandedPosition.left : 0,
          top: expandedPosition ? expandedPosition.top : 0,
        }}
        transition={reduceMotion
          ? { duration: 0 }
          : cardSpring}
        className={`project-card transform-gpu rounded-xl border ${
          isExpanded || isCollapsing ? 'project-card-active project-card-collapsing absolute z-50' : ''
        }`}
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border)',
        }}
        aria-label={`${project.title} project card`}
      >
      <motion.div
        className={`project-card-preview group relative ${featured ? 'aspect-[16/10]' : 'aspect-[16/9]'} overflow-hidden ${
          imagePreview ? 'cursor-zoom-in' : ''
        }`}
        onPointerEnter={(event) => {
          if (!imagePreview) return;
          setIsImageHovered(true);
          setImagePointer({
            x: event.clientX,
            y: event.clientY,
          });
        }}
        onPointerLeave={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsImageHovered(false);
          }
        }}
        onPointerMove={(event) => {
          setImagePointer({
            x: event.clientX,
            y: event.clientY,
          });
        }}
      >
        {imagePreview ? (
          <motion.img
            src={imagePreview}
            alt={`${project.title} system preview`}
            onPointerEnter={(event) => {
              if (!imagePreview) return;
              setIsImageHovered(true);
              setImagePointer({
                x: event.clientX,
                y: event.clientY,
              });
            }}
            onPointerMove={(event) => {
              setImagePointer({
                x: event.clientX,
                y: event.clientY,
              });
            }}
            whileHover={!isExpanded && !isCollapsing && !reduceMotion ? { scale: 1.05 } : undefined}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="project-card-thumbnail h-full w-full object-cover object-top"
          />
        ) : (
          <div
            className="flex h-full flex-col items-center justify-center gap-2"
            style={{
              backgroundColor: 'var(--bg-canvas)',
              color: 'var(--text-tertiary)',
            }}
          >
            <ImageSquare size={28} weight="light" />
            <span className="max-w-[14rem] px-4 text-center text-sm font-medium">{project.title}</span>
          </div>
        )}

        <label
          onClick={(event) => event.stopPropagation()}
          className="absolute bottom-3 right-3 cursor-pointer rounded-lg px-2.5 py-1.5 text-[10px] font-semibold opacity-0 shadow-sm transition-opacity group-hover:opacity-100 focus-within:opacity-100"
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
          }}
        >
          {imagePreview ? 'Change image' : 'Upload image'}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="sr-only"
          />
        </label>

      </motion.div>

      <AnimatePresence>
        {isImageHovered && imagePreview && typeof document !== 'undefined' && createPortal(
          <motion.div
            ref={imageOverlayRef}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 8 }}
            animate={reduceMotion
              ? { opacity: 1 }
              : {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  left: imageOverlayPosition.left,
                  top: imageOverlayPosition.top,
                }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96, y: 8 }}
            transition={reduceMotion
              ? { duration: 0 }
              : { type: 'spring', stiffness: 280, damping: 28, mass: 0.7 }}
            className="pointer-events-none fixed z-[70] h-[240px] w-[420px] overflow-hidden rounded-2xl border shadow-2xl"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'color-mix(in srgb, var(--border-hover) 55%, transparent)',
              left: imageOverlayPosition.left,
              top: imageOverlayPosition.top,
            }}
            aria-label={`Expanded preview of ${project.title}`}
          >
            <img
              src={imagePreview}
              alt={`${project.title} enlarged preview`}
              onLoad={() => setImagePointer((current) => ({ ...current }))}
              className="h-full w-full object-cover"
            />
          </motion.div>,
          document.body
        )}
      </AnimatePresence>

      <div className="project-card-summary p-4 sm:p-5">
        <div className="mb-3 flex items-center gap-2 text-[10px] font-mono">
          {project.category && (
            <span
              className="rounded-full px-2.5 py-1"
              style={{
                backgroundColor: 'var(--bg-canvas)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
              }}
            >
              {project.category}
            </span>
          )}
          {project.year && (
            <span style={{ color: 'var(--text-secondary)' }}>{project.year}</span>
          )}
        </div>

        <h3
          className="text-lg font-semibold tracking-tight sm:text-xl"
          style={{ color: 'var(--text-primary)' }}
        >
          {project.title}
        </h3>
        <motion.p
          key={isExpanded ? 'expanded-summary-description' : 'collapsed-summary-description'}
          initial={isExpanded ? { opacity: 0, y: 10 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion
            ? { duration: 0 }
            : { duration: 0.32, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-2 line-clamp-3 text-sm leading-6"
          style={{ color: 'var(--text-secondary)' }}
        >
          {project.description || project.subtitle}
        </motion.p>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handleCardClick(event);
          }}
          className="mt-4 text-xs font-semibold"
          style={{ color: 'var(--text-primary)' }}
        >
          {isPinned ? 'Click to collapse ->' : 'Click to expand ->'}
        </button>
      </div>

      <AnimatePresence initial={false}>
      {showExpandedDetails && (
        <motion.div
          key="expanded-details"
          variants={detailVariants}
          initial="hidden"
          animate={isExpanded ? 'visible' : 'exit'}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
          className="project-card-expanded-details border-t p-4"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-hover)',
          }}
        >
          <motion.p variants={detailItemVariants} className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {project.longDescription || project.description}
          </motion.p>

          {features.length > 0 && (
            <motion.ul variants={detailItemVariants} className="mt-3 space-y-1.5">
              {features.slice(0, 3).map((feature) => (
                <motion.li key={feature} variants={detailItemVariants} className="flex items-start gap-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                  <Check size={13} weight="bold" className="mt-0.5 shrink-0" style={{ color: 'var(--status-active)' }} />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </motion.ul>
          )}

          <motion.div variants={detailItemVariants} className="mt-3">
            <TechStack tags={project.engineeredWith || project.tags} />
          </motion.div>

          <motion.div variants={detailItemVariants} className="mt-4 flex flex-wrap items-center gap-3 border-t pt-3 text-xs font-medium" style={{ borderColor: 'var(--border)' }}>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
                <GithubLogo size={14} weight="fill" />
                Source code
              </a>
            )}
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
                <ArrowSquareOut size={14} weight="bold" />
                Live demo
              </a>
            )}
            <button type="button" onClick={() => onOpenDetails?.(project)} className="ml-auto" style={{ color: 'var(--text-secondary)' }}>
              Full details
            </button>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
      </motion.article>
    </div>
  );
}

export default function BentoGrid({ projects = [], onOpenDetails }) {
  const [pinnedId, setPinnedId] = useState(null);

  if (!projects.length) return null;

  return (
    <div className="project-card-grid relative grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      <AnimatePresence>
      {pinnedId && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          type="button"
          className="fixed inset-0 z-40 cursor-default bg-black/20 backdrop-blur-sm"
          onClick={() => setPinnedId(null)}
          aria-label="Close expanded project"
        />
      )}
      </AnimatePresence>
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          featured={index < 3}
          pinnedId={pinnedId}
          setPinnedId={setPinnedId}
          onOpenDetails={onOpenDetails}
        />
      ))}
    </div>
  );
}