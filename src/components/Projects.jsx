import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowsClockwise } from '@phosphor-icons/react';
import ProjectModal from './ProjectModal';
import BentoGrid from './BentoGrid';
import { curatedProjects } from '../data/projects';
import { fetchUserRepos } from '../services/github';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Projects() {
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
      image: curated?.image || null,
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
      className={`relative z-20 min-h-0 lg:min-h-[calc(100dvh-4rem)] flex flex-col justify-start border-t px-4 pb-12 pt-14 sm:px-8 sm:pb-16 sm:pt-20 lg:px-12 lg:pt-24 scroll-mt-16`}
      data-lenis-prevent
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mb-8 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              className="text-4xl font-medium tracking-[-0.05em] sm:text-6xl"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
            >
              Practical systems, built to work.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 sm:text-base sm:leading-7" style={{ color: 'var(--text-secondary)' }}>
              A collection of projects I&apos;ve built to practice, learn, and solve real problems.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
            <a
              href="https://github.com/danielaplan?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-opacity hover:opacity-60"
            >
              View all projects <span aria-hidden="true">→</span>
            </a>
            <button
              type="button"
              onClick={() => loadGithubRepos(true)}
              disabled={githubLoading}
              className="hidden rounded-lg p-2 transition-opacity hover:opacity-70 disabled:opacity-50"
              aria-label="Refresh GitHub projects"
              title="Refresh GitHub projects"
              style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg-canvas)' }}
            >
              <ArrowsClockwise size={14} weight="bold" className={githubLoading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {githubLoading ? (
          <div className="flex min-h-40 items-center justify-center py-6">
            <ArrowsClockwise size={18} weight="bold" className="animate-spin" style={{ color: 'var(--text-secondary)' }} />
            <p className="ml-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
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
            className="space-y-3 rounded-xl border p-10 text-center"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}
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
              style={{ backgroundColor: 'var(--accent)', color: 'var(--button-text)' }}
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
