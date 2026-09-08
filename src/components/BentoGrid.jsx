import { ArrowRight } from 'lucide-react';
import { getTechIcon } from './icons/TechIcons';
import RandomLetterSwap from './ui/random-letter-swap';

/**
 * TechStackPills — renders a row of icon-bearing tech tag pills.
 */
function TechStackPills({ tags, className = "" }) {
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {tags.map((tag, i) => {
        const Icon = getTechIcon(tag);
        return (
          <span
            key={i}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono font-medium"
            style={{ backgroundColor: 'var(--bg-canvas)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
          >
            {Icon ? <Icon className="w-2.5 h-2.5" /> : null}
            {tag}
          </span>
        );
      })}
    </div>
  );
}

/**
 * FlatDashboardPreview — clean flat UI dashboard frame for the featured
 * spotlight card's right column. Crisp 1px borders, no 3D tilts or perspective.
 */
function FlatDashboardPreview({ project }) {
  const mockUrl = project.mockUrl || `portal.${project.id}.internal`;

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg-canvas)' }}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-3 py-1.5"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--border-hover)' }} />
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--border-hover)' }} />
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--border-hover)' }} />
        </div>
        <span className="text-[10px] font-mono" style={{ color: 'var(--text-secondary)' }}>{mockUrl}</span>
      </div>
      {/* Content area */}
      <div className="relative aspect-[16/10] flex items-center justify-center overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            opacity: 0.6,
          }}
        />
        {/* Center metric mockup */}
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
          >
            <span className="font-mono text-sm font-bold" style={{ color: 'var(--text-secondary)' }}>DS</span>
          </div>
          <div className="text-center space-y-1">
            <div className="w-20 h-1.5 rounded mx-auto" style={{ backgroundColor: 'var(--border)' }} />
            <div className="w-16 h-1 rounded mx-auto" style={{ backgroundColor: 'var(--border)' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * FeaturedSpotlightCard — Card 1 (full width): dual-column layout with
 * status badges, project metadata, description, tech pills on the left,
 * and a flat dashboard preview on the right.
 */
function FeaturedSpotlightCard({ project, onOpenDetails }) {
  return (
    <div
      className="group md:col-span-2 flex flex-col lg:flex-row gap-4 p-5 rounded-2xl border card-hover cursor-pointer"
      style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}
      onClick={() => onOpenDetails?.(project)}
      role="article"
      aria-label={`Featured project: ${project.title}`}
    >
      {/* Left Column: Status, Title, Description, Tech */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        {/* Badges Bar */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold uppercase tracking-wider"
            style={{ backgroundColor: 'var(--pastel-blue-bg)', color: 'var(--pastel-blue-text)' }}
          >
            Featured Spotlight
          </span>
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold"
            style={{ backgroundColor: 'var(--pastel-green-bg)', color: 'var(--pastel-green-text)' }}
          >
            Active Dev
          </span>
          {project.year && (
            <span
              className="px-2 py-1 rounded-lg text-[11px] font-mono"
              style={{ backgroundColor: 'var(--bg-canvas)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
            >
              {project.year}
            </span>
          )}
        </div>

        {/* Title & Subtitle */}
        <div className="mb-3">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3
              className="text-xl sm:text-2xl font-extrabold tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              {project.title}
            </h3>
            {project.frameworkBadge && (
              <span
                className="px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-mono font-medium"
                style={{ backgroundColor: 'var(--bg-canvas)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
              >
                {project.frameworkBadge}
              </span>
            )}
          </div>
          {project.subtitle && (
            <p className="text-sm font-semibold tracking-wide" style={{ color: 'var(--text-secondary)' }}>
              {project.subtitle}
            </p>
          )}
        </div>

        {/* Description */}
        <p
          className="text-sm leading-relaxed font-normal mb-4"
          style={{ color: 'var(--text-secondary)' }}
        >
          {project.longDescription || project.description}
        </p>

        {/* Tech Stack Pills */}
        <TechStackPills tags={project.tags || []} />
      </div>

      {/* Right Column: Flat Dashboard Preview */}
      <div className="lg:w-[45%] shrink-0">
        <FlatDashboardPreview project={project} />
      </div>
    </div>
  );
}

/**
 * StandardProjectCard — Cards 2–5: year/category header, title,
 * full description always visible, bottom-aligned tech stack badges.
 * Details are displayed automatically; no click needed to view.
 * Modal opens on click for code inspector (secondary action).
 */
function StandardProjectCard({ project, onOpenDetails }) {
  return (
    <div
      className="group md:col-span-1 flex flex-col p-5 rounded-2xl border card-hover cursor-pointer"
      style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}
      onClick={() => onOpenDetails?.(project)}
      role="article"
      aria-label={`Project: ${project.title}`}
    >
      {/* Year / Category Header */}
      <div className="flex items-center justify-between mb-2">
        {project.year && (
          <span className="text-[11px] font-mono" style={{ color: 'var(--text-secondary)' }}>{project.year}</span>
        )}
        <span
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono"
          style={{ backgroundColor: 'var(--bg-canvas)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
        >
          {project.category}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-base sm:text-lg font-bold tracking-tight mb-2"
        style={{ color: 'var(--text-primary)' }}
      >
        {project.title}
      </h3>

      {/* Description — always visible, no line-clamp truncation */}
      <p
        className="text-sm leading-relaxed font-normal mb-4"
        style={{ color: 'var(--text-secondary)' }}
      >
        {project.longDescription || project.description}
      </p>

      {/* Bottom-Aligned Tech Stack Badges */}
      <div className="pt-3" style={{ borderTop: '1px solid var(--border)' }}>
        <TechStackPills tags={project.tags || []} />
      </div>
    </div>
  );
}

/**
 * ArchitectureCard — Card 6 (full width): horizontal bar format with
 * title, description, and an action button.
 */
function ArchitectureCard({ project, onOpenDetails }) {
  return (
    <div
      className="group md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border card-hover cursor-pointer"
      style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}
      onClick={() => onOpenDetails?.(project)}
      role="article"
      aria-label={`Architecture project: ${project.title}`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold uppercase tracking-wider"
            style={{ backgroundColor: 'var(--pastel-blue-bg)', color: 'var(--pastel-blue-text)' }}
          >
            Architecture &amp; Systems
          </span>
          {project.year && (
            <span
              className="px-2 py-1 rounded-lg text-[11px] font-mono"
              style={{ backgroundColor: 'var(--bg-canvas)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
            >
              {project.year}
            </span>
          )}
        </div>
        <h3
          className="text-lg sm:text-xl font-extrabold tracking-tight mb-1"
          style={{ color: 'var(--text-primary)' }}
        >
          {project.title}
        </h3>
        <p
          className="text-sm leading-relaxed font-normal"
          style={{ color: 'var(--text-secondary)' }}
        >
          {project.description}
        </p>
      </div>
      <div className="shrink-0">
        <button
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition"
          style={{ backgroundColor: 'var(--accent)', color: '#ffffff' }}
        >
          <RandomLetterSwap label="View Repositories" />
          <ArrowRight size={14} weight="bold" />
        </button>
      </div>
    </div>
  );
}

/**
 * BentoGrid — Main component
 * Renders a 6-project bento grid layout with deliberate visual weight distribution.
 */
export default function BentoGrid({ projects = [], githubMap = new Map(), onOpenDetails }) {
  if (!projects.length) return null;

  const featuredProject = projects[0];
  const standardProjects = projects.slice(1, 5);
  const architectureProject = projects[5];

  return (
    <div className="w-full space-y-4">
      {/* Card 1: Featured Spotlight (Full Width) */}
      {featuredProject && (
        <FeaturedSpotlightCard
          project={featuredProject}
          githubMap={githubMap}
          onOpenDetails={onOpenDetails}
        />
      )}

      {/* Cards 2–5: Standard Projects (2×2 grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {standardProjects.map((project) => (
          <StandardProjectCard
            key={project.id}
            project={project}
            githubMap={githubMap}
            onOpenDetails={onOpenDetails}
          />
        ))}
      </div>

      {/* Card 6: Architecture / Systems (Full Width) */}
      {architectureProject && (
        <ArchitectureCard
          project={architectureProject}
          onOpenDetails={onOpenDetails}
        />
      )}
    </div>
  );
}
