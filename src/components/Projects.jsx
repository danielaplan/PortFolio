import { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search, X, Star,
  Globe, Clock, FileCode, Info
} from 'lucide-react';
import { ArrowsClockwise } from '@phosphor-icons/react';
import Github from './icons/Github';
import ProjectModal from './ProjectModal';
import BentoGrid from './BentoGrid';
import ImageFanCarousel from './ui/ImageFanCarousel';
import { bentoProjects } from '../data/bentoProjects';
import { curatedProjects } from '../data/projects';
import { fetchUserRepos, formatTimeAgo, getDevStatus } from '../services/github';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Projects({ isActive = true }) {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef, { threshold: 0.05 });

  const [viewMode, setViewMode] = useState('curated');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [githubRepos, setGithubRepos] = useState([]);
  const [githubLoading, setGithubLoading] = useState(false);
  const [githubSource, setGithubSource] = useState(null);
  const [githubError, setGithubError] = useState(null);
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [modalInitialTab, setModalInitialTab] = useState('overview');

  const loadGithubRepos = async (force = false) => {
    setGithubLoading(true);
    setGithubError(null);
    try {
      const res = await fetchUserRepos('danielaplan', force);
      setGithubRepos(res.data || []);
      setGithubSource(res.source);
      if (res.error) setGithubError(res.error);
    } catch (e) {
      setGithubError(e?.message || 'Failed to load repositories.');
      console.error(e);
    } finally {
      setGithubLoading(false);
    }
  };

  useEffect(() => {
    loadGithubRepos(false);
  }, []);

  const githubMap = useMemo(() => {
    const map = new Map();
    githubRepos.forEach(repo => map.set(repo.name.toLowerCase(), repo));
    return map;
  }, [githubRepos]);

  const formattedGithubProjects = useMemo(() => {
    return githubRepos.map(repo => {
      const matchedCurated = curatedProjects.find(
        cp => cp.repoName?.toLowerCase() === repo.name.toLowerCase()
      );
      return {
        id: `gh-${repo.id}`,
        title: matchedCurated?.title || repo.name.replace(/[-_]/g, ' '),
        subtitle: matchedCurated?.subtitle || (repo.description ? repo.description.slice(0, 60) : 'Public GitHub Repository'),
        frameworkBadge: matchedCurated?.frameworkBadge || repo.language || 'Repository',
        mockUrl: matchedCurated?.mockUrl || `github.com/danielaplan/${repo.name}`,
        repoName: repo.name,
        category: matchedCurated?.category || (repo.language ? `${repo.language} Project` : 'Repository'),
        description: matchedCurated?.description || repo.description || 'Public GitHub repository.',
        longDescription: matchedCurated?.longDescription || repo.description,
        keyFeatures: matchedCurated?.keyFeatures || [],
        tags: matchedCurated?.tags || [repo.language, ...repo.topics].filter(Boolean),
        engineeredWith: matchedCurated?.engineeredWith || [repo.language, 'Git', 'Open Source'].filter(Boolean),
        link: repo.htmlUrl,
        demoUrl: matchedCurated?.demoUrl || repo.homepage || null,
        image: matchedCurated?.image || null,
        featured: Boolean(matchedCurated?.featured),
        year: repo.createdAt ? new Date(repo.createdAt).getFullYear().toString() : '2024',
        isLiveRepo: true,
        stars: repo.stars,
        forks: repo.forks,
        pushedAt: repo.pushedAt,
        language: repo.language
      };
    });
  }, [githubRepos]);

  const filteredGithubProjects = useMemo(() => {
    return formattedGithubProjects.filter(project => {
      if (selectedTag && !project.tags?.includes(selectedTag)) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inTitle = project.title.toLowerCase().includes(query);
        const inDesc = project.description?.toLowerCase().includes(query);
        const inTags = project.tags?.some(t => t?.toLowerCase().includes(query));
        return inTitle || inDesc || inTags;
      }
      return true;
    });
  }, [formattedGithubProjects, selectedTag, searchQuery]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{ backgroundColor: 'var(--bg-surface)' }}
      className={`min-h-[100dvh] lg:min-h-screen flex flex-col justify-center pt-20 pb-10 sm:pt-24 sm:pb-12 border-t scroll-mt-0 transition-all duration-700 ${
        isActive
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-40 translate-y-6 scale-[0.985]'
      }`}
      data-lenis-prevent
    >
      <div
        className="w-full px-5 sm:px-8 lg:px-12"
        style={{ borderColor: 'var(--border)' }}
      >

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <p
              className="text-xs font-mono font-semibold uppercase tracking-wider mb-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              Interactive Spotlight
            </p>
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              Projects &amp; Engineering
            </h2>
            <p
              className="text-sm sm:text-base mt-2 max-w-2xl font-normal leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Featured applications, enterprise systems, and architecture builds presented with full technical breakdowns.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <div
              className="inline-flex p-1 rounded-xl text-xs font-medium"
              style={{ backgroundColor: 'var(--bg-canvas)', border: '1px solid var(--border)' }}
            >
              <button
                onClick={() => { setViewMode('curated'); setSearchQuery(''); setSelectedTag(null); }}
                className="px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                style={{
                  backgroundColor: viewMode === 'curated' ? 'var(--bg-surface)' : 'transparent',
                  color: viewMode === 'curated' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontWeight: viewMode === 'curated' ? 700 : 400,
                  border: '1px solid transparent',
                  boxShadow: viewMode === 'curated' ? 'var(--card-shadow)' : 'none',
                }}
              >
                Projects ({String(bentoProjects.length).padStart(2, '0')})
              </button>
              <button
                onClick={() => { setViewMode('gallery'); setSearchQuery(''); setSelectedTag(null); }}
                className="px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                style={{
                  backgroundColor: viewMode === 'gallery' ? 'var(--bg-surface)' : 'transparent',
                  color: viewMode === 'gallery' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontWeight: viewMode === 'gallery' ? 700 : 400,
                  border: '1px solid transparent',
                  boxShadow: viewMode === 'gallery' ? 'var(--card-shadow)' : 'none',
                }}
              >
                Gallery (07)
              </button>
              <button
                onClick={() => setViewMode('github')}
                className="px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
                style={{
                  backgroundColor: viewMode === 'github' ? 'var(--bg-surface)' : 'transparent',
                  color: viewMode === 'github' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontWeight: viewMode === 'github' ? 700 : 400,
                  border: '1px solid transparent',
                  boxShadow: viewMode === 'github' ? 'var(--card-shadow)' : 'none',
                }}
              >
                <span>Live Repos</span>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--status-active)' }} />
              </button>
            </div>

            <button
              onClick={() => loadGithubRepos(true)}
              disabled={githubLoading}
              title="Refresh live GitHub data"
              className="p-2 rounded-lg cursor-pointer transition"
              style={{
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--bg-canvas)',
                border: '1px solid var(--border)',
              }}
              aria-label="Refresh GitHub Repos"
            >
              <ArrowsClockwise
                size={14}
                weight="bold"
                className={githubLoading ? 'animate-spin' : ''}
              />
            </button>
          </div>
        </div>

        {/* ==================== CURATED BENTO GRID ==================== */}
        {viewMode === 'curated' && (
          <BentoGrid
            projects={bentoProjects}
            githubMap={githubMap}
            onOpenDetails={(p) => { setModalInitialTab('overview'); setActiveModalProject(p); }}
          />
        )}

        {/* ==================== 3D IMAGE FAN CAROUSEL ==================== */}
        {viewMode === 'gallery' && (
          <div className="w-full">
            <ImageFanCarousel />
          </div>
        )}

        {/* ==================== LIVE GITHUB REPOS ==================== */}
        {viewMode === 'github' && (
          <div className="space-y-6">

            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              <div className="relative flex-1">
                <Search
                  size={15}
                  weight="bold"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--text-secondary)' }}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search repositories by name, language, or topic…"
                  className="w-full pl-9 pr-9 py-2.5 rounded-xl text-xs sm:text-sm placeholder:text-sm"
                  style={{
                    backgroundColor: 'var(--bg-canvas)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 cursor-pointer"
                    style={{ color: 'var(--text-secondary)' }}
                    aria-label="Clear search"
                  >
                    <X size={14} weight="bold" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
                <span>{filteredGithubProjects.length} repositories synced</span>
                {githubSource && (
                  <span
                    className="text-xs px-2 py-0.5 rounded-md font-mono"
                    style={{ backgroundColor: 'var(--bg-canvas)', border: '1px solid var(--border)' }}
                  >
                    {githubSource}
                  </span>
                )}
              </div>
            </div>

            {/* Active Tag Filter */}
            {selectedTag && (
              <div className="flex items-center gap-2 pt-1 text-xs">
                <span style={{ color: 'var(--text-secondary)' }}>Filtered by tag:</span>
                <span
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-mono font-medium text-xs"
                  style={{ backgroundColor: 'var(--pastel-blue-bg)', color: 'var(--pastel-blue-text)' }}
                >
                  #{selectedTag}
                  <button onClick={() => setSelectedTag(null)} className="cursor-pointer" style={{ color: 'var(--pastel-blue-text)' }}>
                    <X size={12} weight="bold" />
                  </button>
                </span>
                <button
                  onClick={() => { setSelectedTag(null); setSearchQuery(''); }}
                  className="underline cursor-pointer"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Loading State */}
            {githubLoading ? (
              <div
                className="p-12 flex flex-col items-center justify-center gap-3 rounded-xl"
                style={{ backgroundColor: 'var(--bg-canvas)', border: '1px dashed var(--border-hover)' }}
              >
                <ArrowsClockwise size={22} weight="bold" className="animate-spin" style={{ color: 'var(--text-secondary)' }} />
                <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                  Syncing live repositories from GitHub API&hellip;
                </p>
              </div>
            ) : githubError && filteredGithubProjects.length === 0 ? (
              <div
                className="p-12 text-center rounded-xl space-y-4"
                style={{ backgroundColor: 'var(--pastel-red-bg)', border: '1px solid rgba(0,0,0,0.06)' }}
              >
                <div className="space-y-1">
                  <h4 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                    Couldn't load live GitHub data
                  </h4>
                  <p className="text-xs sm:text-sm max-w-sm mx-auto" style={{ color: 'var(--text-secondary)' }}>
                    {githubError}
                  </p>
                </div>
                <button
                  onClick={() => loadGithubRepos(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded text-xs font-bold cursor-pointer transition-all"
                  style={{ backgroundColor: 'var(--accent)', color: '#ffffff', borderRadius: 'rounded-lg' }}
                >
                  <ArrowsClockwise size={13} weight="bold" /> Try again
                </button>
              </div>
            ) : filteredGithubProjects.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2">
                {filteredGithubProjects.map((project) => {
                  const devStatus = getDevStatus(project.pushedAt, project.archived, project.tags);
                  const liveDemo = project.demoUrl;

                  return (
                    <article
                      key={project.id}
                      className="group relative flex flex-col justify-between p-6 rounded-2xl border card-hover cursor-pointer"
                      style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}
                      >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                              <span
                                className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium"
                                style={{ backgroundColor: devStatus.badgeClass.includes('emerald') ? 'var(--pastel-green-bg)' : 'var(--pastel-blue-bg)', color: devStatus.badgeClass.includes('emerald') ? 'var(--pastel-green-text)' : 'var(--pastel-blue-text)' }}
                              >
                                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: devStatus.dotClass }} />
                                {devStatus.label}
                              </span>
                              {project.language && (
                                <span
                                  className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                                  style={{ backgroundColor: 'var(--bg-canvas)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                                >
                                  {project.language}
                                </span>
                              )}
                              {project.year && (
                                <span className="text-[11px] font-mono" style={{ color: 'var(--text-secondary)' }}>
                                  {project.year}
                                </span>
                              )}
                            </div>
                            <h3
                              className="text-lg font-bold group-hover:opacity-80 transition-colors"
                              style={{ color: 'var(--text-primary)' }}
                            >
                              {project.title}
                            </h3>
                          </div>

                          <button
                            onClick={(e) => { e.stopPropagation(); setActiveModalProject(project); }}
                            className="p-2 rounded-lg cursor-pointer transition shrink-0"
                            style={{ backgroundColor: 'var(--bg-canvas)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                            title="View Full Details"
                            aria-label="View Project Details"
                          >
                            <Info size={15} weight="bold" />
                          </button>
                        </div>

                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                          {project.longDescription || project.description}
                        </p>
                      </div>

                      <div className="pt-4 space-y-3">
                        {/* Tags */}
                        {project.tags && project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {project.tags.slice(0, 5).map((tag, j) => {
                              const isTagActive = selectedTag?.toLowerCase() === tag.toLowerCase();
                              return (
                                <button
                                  key={j}
                                  onClick={(e) => { e.stopPropagation(); setSelectedTag(isTagActive ? null : tag); }}
                                  className="text-[11px] px-2 py-0.5 rounded-md font-mono transition cursor-pointer"
                                  style={isTagActive
                                    ? { backgroundColor: 'var(--pastel-blue-bg)', color: 'var(--pastel-blue-text)', border: '1px solid var(--pastel-blue-text)' }
                                    : { backgroundColor: 'var(--bg-canvas)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }
                                  }
                                >
                                  #{tag}
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* Stats & Actions */}
                        <div
                          className="pt-3 flex items-center justify-between text-xs"
                          style={{ borderTop: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                        >
                          <div className="flex items-center gap-3">
                            {project.pushedAt && (
                              <span className="flex items-center gap-1 text-[11px] font-mono">
                                <Clock size={11} weight="bold" /> {formatTimeAgo(project.pushedAt)}
                              </span>
                            )}
                            {project.stars > 0 && (
                              <span className="flex items-center gap-0.5 text-[11px] font-medium">
                                <Star size={11} weight="fill" style={{ color: 'var(--pastel-yellow-text)' }} /> {project.stars}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-3">
                            <button
                              onClick={(e) => { e.stopPropagation(); setModalInitialTab('code'); setActiveModalProject(project); }}
                              className="inline-flex items-center gap-1 font-medium cursor-pointer transition"
                              style={{ color: 'var(--text-secondary)' }}
                            >
                              <FileCode size={13} weight="bold" />
                              <span>Code</span>
                            </button>

                            {liveDemo && (
                              <a
                                href={liveDemo}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 font-medium"
                                style={{ color: 'var(--text-secondary)' }}
                              >
                                <Globe size={13} weight="bold" />
                                <span>Demo</span>
                              </a>
                            )}

                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 font-medium"
                              style={{ color: 'var(--text-secondary)' }}
                            >
                              <Github size={13} />
                              <span>Repo</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div
                className="p-12 text-center rounded-xl space-y-3"
                style={{ backgroundColor: 'var(--bg-canvas)', border: '1px dashed var(--border-hover)' }}
              >
                <p className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  No repositories matched your search
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedTag(null); }}
                  className="px-4 py-2 rounded text-xs font-bold cursor-pointer transition"
                  style={{ backgroundColor: 'var(--accent)', color: '#ffffff', borderRadius: 'rounded-lg' }}
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Project Details Modal */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          initialTab={modalInitialTab}
          githubData={githubMap.get((activeModalProject.repoName || activeModalProject.title).toLowerCase())}
          onClose={() => { setActiveModalProject(null); setModalInitialTab('overview'); }}
          onSelectTag={(tag) => setSelectedTag(tag)}
        />
      )}
    </section>
  );
}
