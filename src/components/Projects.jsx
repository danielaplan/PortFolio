import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowsClockwise } from '@phosphor-icons/react';
import ProjectModal from './ProjectModal';
import BentoGrid from './BentoGrid';
import { curatedProjects } from '../data/projects';
import { fetchUserRepos } from '../services/github';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Projects({ isActive = true }) {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef, { threshold: 0.05 });

  const [githubRepos, setGithubRepos] = useState([]);
  const [githubLoading, setGithubLoading] = useState(false);
  const [githubSource, setGithubSource] = useState(null);
  const [githubError, setGithubError] = useState(null);
  const [activeModalProject, setActiveModalProject] = useState(null);

  const loadGithubRepos = async (force = false) => {
    setGithubLoading(true);
    setGithubError(null);

    try {
      const response = await fetchUserRepos('danielaplan', force);
      setGithubRepos(response.data || []);
      setGithubSource(response.source);
      if (response.error) setGithubError(response.error);
    } catch (error) {
      setGithubError(error?.message || 'Failed to load repositories.');
      console.error(error);
    } finally {
      setGithubLoading(false);
    }
  };

  useEffect(() => {
    loadGithubRepos();
  }, []);

  const githubMap = useMemo(() => (
    new Map(githubRepos.map((repo) => [repo.name.toLowerCase(), repo]))
  ), [githubRepos]);

  const githubProjects = useMemo(() => githubRepos.map((repo) => {
    const curated = curatedProjects.find(
      (project) => project.repoName?.toLowerCase() === repo.name.toLowerCase()
    );

    return {
      id: `gh-${repo.id}`,
      title: curated?.title || repo.name.replace(/[-_]/g, ' '),
      subtitle: curated?.subtitle || repo.description,
      frameworkBadge: curated?.frameworkBadge || repo.language || 'Repository',
      repoName: repo.name,
      category: curated?.category || (repo.language ? `${repo.language} Project` : 'Repository'),
      description: curated?.description || repo.description,
      longDescription: curated?.longDescription || repo.description,
      keyFeatures: curated?.keyFeatures || [],
      tags: curated?.tags || [repo.language, ...repo.topics].filter(Boolean),
      engineeredWith: curated?.engineeredWith || [repo.language, 'Git', 'Open Source'].filter(Boolean),
      link: repo.htmlUrl,
      demoUrl: curated?.demoUrl || repo.homepage || null,
      year: repo.createdAt ? new Date(repo.createdAt).getFullYear().toString() : null,
      stars: repo.stars,
      forks: repo.forks,
      pushedAt: repo.pushedAt,
      language: repo.language,
    };
  }), [githubRepos]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{ backgroundColor: 'var(--bg-surface)' }}
      className={`min-h-[100dvh] flex flex-col justify-center border-t px-5 pb-12 pt-20 transition-all duration-700 sm:px-8 sm:pb-16 sm:pt-24 lg:px-12 ${
        isActive ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-6 scale-[0.985] opacity-40'
      }`}
      data-lenis-prevent
    >
      <div className="w-full">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="mb-2 text-xs font-mono font-semibold uppercase tracking-wider"
              style={{ color: 'var(--text-secondary)' }}
            >
              GitHub projects
            </p>
            <h2
              className="text-3xl font-extrabold tracking-tight sm:text-4xl"
              style={{ color: 'var(--text-primary)' }}
            >
              Projects &amp; Engineering
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed sm:text-base" style={{ color: 'var(--text-secondary)' }}>
              Every public repository is loaded from GitHub and shown with its technical details.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
            <span>{githubProjects.length} repositories</span>
            {githubSource && <span>{githubSource}</span>}
            <button
              type="button"
              onClick={() => loadGithubRepos(true)}
              disabled={githubLoading}
              className="rounded-lg p-2 transition-opacity hover:opacity-70 disabled:opacity-50"
              style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg-canvas)' }}
              aria-label="Refresh GitHub projects"
              title="Refresh GitHub projects"
            >
              <ArrowsClockwise size={14} weight="bold" className={githubLoading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {githubLoading ? (
          <div
            className="flex min-h-40 flex-col items-center justify-center gap-3 rounded-xl border border-dashed"
            style={{ backgroundColor: 'var(--bg-canvas)', borderColor: 'var(--border-hover)' }}
          >
            <ArrowsClockwise size={22} weight="bold" className="animate-spin" style={{ color: 'var(--text-secondary)' }} />
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Loading projects from GitHub...
            </p>
          </div>
        ) : githubProjects.length > 0 ? (
          <BentoGrid
            projects={githubProjects}
            onOpenDetails={setActiveModalProject}
          />
        ) : (
          <div
            className="space-y-4 rounded-xl p-10 text-center"
            style={{ backgroundColor: 'var(--pastel-red-bg)' }}
          >
            <div>
              <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                GitHub projects could not be loaded
              </h3>
              <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                {githubError || 'No public repositories were returned.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => loadGithubRepos(true)}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold"
              style={{ backgroundColor: 'var(--accent)', color: '#ffffff' }}
            >
              <ArrowsClockwise size={14} weight="bold" />
              Try again
            </button>
          </div>
        )}
      </div>

      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          githubData={githubMap.get(activeModalProject.repoName?.toLowerCase())}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </section>
  );
}
