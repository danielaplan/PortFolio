import { ArrowSquareOut, GithubLogo, Info, Check } from '@phosphor-icons/react';
import { getTechIcon } from './icons/TechIcons';

function TechStack({ tags = [] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const Icon = getTechIcon(tag);

        return (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-mono"
            style={{
              backgroundColor: 'var(--bg-canvas)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
            }}
          >
            {Icon ? <Icon className="h-3 w-3" /> : null}
            {tag}
          </span>
        );
      })}
    </div>
  );
}

function ProjectCard({ project, onOpenDetails }) {
  const features = project.keyFeatures || [];

  return (
    <article
      className="card-hover flex h-full flex-col rounded-2xl border p-5 sm:p-6"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] font-mono">
            {project.category && (
              <span
                className="rounded-md px-2 py-1"
                style={{
                  backgroundColor: 'var(--pastel-blue-bg)',
                  color: 'var(--pastel-blue-text)',
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
            className="text-xl font-bold tracking-tight sm:text-2xl"
            style={{ color: 'var(--text-primary)' }}
          >
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="mt-1 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              {project.subtitle}
            </p>
          )}
        </div>

        {project.frameworkBadge && (
          <span
            className="shrink-0 rounded-md px-2 py-1 text-[10px] font-mono"
            style={{
              backgroundColor: 'var(--bg-canvas)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
            }}
          >
            {project.frameworkBadge}
          </span>
        )}
      </div>

      <div className="mt-5 space-y-4">
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {project.longDescription || project.description}
        </p>

        {features.length > 0 && (
          <div>
            <h4
              className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: 'var(--text-primary)' }}
            >
              What I built
            </h4>
            <ul className="space-y-2">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <Check
                    size={14}
                    weight="bold"
                    className="mt-0.5 shrink-0"
                    style={{ color: 'var(--status-active)' }}
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-auto pt-5">
        <TechStack tags={project.engineeredWith || project.tags} />

        <div
          className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-4 text-xs font-medium"
          style={{ borderColor: 'var(--border)' }}
        >
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-70"
              style={{ color: 'var(--text-primary)' }}
            >
              <GithubLogo size={15} weight="fill" />
              Source code
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-70"
              style={{ color: 'var(--text-primary)' }}
            >
              <ArrowSquareOut size={15} weight="bold" />
              Live demo
            </a>
          )}
          <button
            type="button"
            onClick={() => onOpenDetails?.(project)}
            className="ml-auto inline-flex items-center gap-1.5 transition-opacity hover:opacity-70"
            style={{ color: 'var(--text-secondary)' }}
          >
            <Info size={15} weight="bold" />
            More details
          </button>
        </div>
      </div>
    </article>
  );
}

export default function BentoGrid({ projects = [], onOpenDetails }) {
  if (!projects.length) return null;

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onOpenDetails={onOpenDetails}
        />
      ))}
    </div>
  );
}
