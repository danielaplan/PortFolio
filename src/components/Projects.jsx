import React, { useState, useEffect, useMemo } from 'react';
import { 
  ExternalLink, 
  Sparkles, 
  Search, 
  X, 
  RefreshCw, 
  Star, 
  GitFork, 
  Globe, 
  Layers, 
  Info, 
  Clock, 
  FileCode,
  FolderGit2
} from 'lucide-react';
import Github from './icons/Github';
import { getTechIcon } from './icons/TechIcons';
import ProjectModal from './ProjectModal';
import ProjectSpotlightCarousel from '@/components/ui/card-fan-carousel.tsx';
import { curatedProjects } from '../data/projects';
import { fetchUserRepos, formatTimeAgo, getDevStatus } from '../services/github';

export default function Projects({ isActive = true }) {
  const [viewMode, setViewMode] = useState('curated'); // 'curated' | 'github'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [githubRepos, setGithubRepos] = useState([]);
  const [githubLoading, setGithubLoading] = useState(false);
  const [githubSource, setGithubSource] = useState(null);
  const [githubError, setGithubError] = useState(null);
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [modalInitialTab, setModalInitialTab] = useState('overview');

  // Load GitHub Repositories with caching
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

  // Map GitHub repos by name for quick metric lookup in curated items
  const githubMap = useMemo(() => {
    const map = new Map();
    githubRepos.forEach(repo => {
      map.set(repo.name.toLowerCase(), repo);
    });
    return map;
  }, [githubRepos]);

  // Convert raw GitHub repos into project items for the "All GitHub Repos" view
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

  // Filtered repos for GitHub view
  const filteredGithubProjects = useMemo(() => {
    return formattedGithubProjects.filter(project => {
      if (selectedTag && !project.tags?.includes(selectedTag)) {
        return false;
      }
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
      className={`min-h-[calc(100vh-4rem)] lg:min-h-screen flex flex-col justify-center pt-20 pb-10 sm:pt-24 sm:pb-12 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-0 transition-all duration-700 ease-out ${
        isActive 
          ? 'opacity-100 translate-y-0 scale-100 blur-none' 
          : 'opacity-40 translate-y-6 scale-[0.985] blur-[0.3px]'
      }`}
    >
      <div className="w-full px-5 sm:px-8 lg:px-12">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-2">
              <FolderGit2 size={14} />
              <span>Interactive Spotlight Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Projects & Engineering
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-normal leading-relaxed">
              Featured applications, enterprise systems, and architecture builds presented with full technical breakdowns and high-res previews.
            </p>
          </div>

          {/* View Mode Toggle: Curated 3D Spotlight vs Live Repos */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs font-medium shadow-2xs">
              <button
                onClick={() => {
                  setViewMode('curated');
                  setSearchQuery('');
                  setSelectedTag(null);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:outline-none ${
                  viewMode === 'curated'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Curated Spotlight ({String(curatedProjects.length).padStart(2, '0')})
              </button>
              <button
                onClick={() => setViewMode('github')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:outline-none ${
                  viewMode === 'github'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>Live Repos</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              </button>
            </div>

            <button
              onClick={() => loadGithubRepos(true)}
              disabled={githubLoading}
              title="Refresh live GitHub data"
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:outline-none"
              aria-label="Refresh GitHub Repos"
            >
              <RefreshCw size={14} className={githubLoading ? 'animate-spin text-cyan-400' : ''} />
            </button>
          </div>
        </div>

        {/* =========================================================
            OPTION 1: CURATED 3D SPOTLIGHT VIEW (DECLUTTERED)
            ========================================================= */}
        {viewMode === 'curated' && (
          <div className="w-full">
            <ProjectSpotlightCarousel
              projects={curatedProjects}
              githubMap={githubMap}
              onOpenDetails={(p) => {
                setModalInitialTab('overview');
                setActiveModalProject(p);
              }}
              onOpenCode={(p) => {
                setModalInitialTab('code');
                setActiveModalProject(p);
              }}
            />
          </div>
        )}

        {/* =========================================================
            LIVE GITHUB REPOSITORIES VIEW (SEARCHABLE & FILTERABLE)
            ========================================================= */}
        {viewMode === 'github' && (
          <div className="space-y-6">
            
            {/* Live Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search live GitHub repositories by name, language, or topic..."
                  className="w-full pl-9 pr-9 py-2.5 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition shadow-2xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                <span>{filteredGithubProjects.length} repositories synced</span>
                {githubSource && (
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800">
                    {githubSource}
                  </span>
                )}
              </div>
            </div>

            {/* Active Tag Filter */}
            {selectedTag && (
              <div className="flex items-center gap-2 pt-1 text-xs">
                <span className="text-slate-500 dark:text-slate-400">Filtered by tag:</span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-mono font-medium">
                  #{selectedTag}
                  <button
                    onClick={() => setSelectedTag(null)}
                    className="hover:text-cyan-800 dark:hover:text-cyan-200 ml-1 cursor-pointer"
                    aria-label="Remove tag filter"
                  >
                    <X size={12} />
                  </button>
                </span>
                <button
                  onClick={() => {
                    setSelectedTag(null);
                    setSearchQuery('');
                  }}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 underline ml-2 cursor-pointer"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Live Repos Content State */}
            {githubLoading ? (
              <div className="p-12 flex flex-col items-center justify-center gap-3 rounded-3xl bg-slate-100/60 dark:bg-slate-900/40 border border-dashed border-slate-300 dark:border-slate-800">
                <RefreshCw size={22} className="text-cyan-500 animate-spin" />
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Syncing live repositories from GitHub API…
                </p>
              </div>
            ) : githubError && filteredGithubProjects.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-300/60 dark:border-amber-900/50 space-y-4">
                <div className="inline-flex p-3 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400">
                  <RefreshCw size={22} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                    Couldn't load live GitHub data
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                    {githubError}
                  </p>
                </div>
                <button
                  onClick={() => loadGithubRepos(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition cursor-pointer"
                >
                  <RefreshCw size={13} /> Try again
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
                      className="group relative flex flex-col justify-between p-6 rounded-3xl neo-raised border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-[#181b22] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer shadow-sm"
                      onClick={() => setActiveModalProject(project)}
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                              <span className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium border ${devStatus.badgeClass}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${devStatus.dotClass}`} />
                                {devStatus.label}
                              </span>
                              {project.language && (
                                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                                  {project.language}
                                </span>
                              )}
                              {project.year && (
                                <span className="text-[11px] text-slate-400 font-mono">
                                  {project.year}
                                </span>
                              )}
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors">
                              {project.title}
                            </h3>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveModalProject(project);
                            }}
                            className="p-2 rounded-xl text-slate-400 hover:text-cyan-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition shrink-0"
                            title="View Full Details"
                            aria-label="View Project Details"
                          >
                            <Info size={15} />
                          </button>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                          {project.description}
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
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedTag(isTagActive ? null : tag);
                                  }}
                                  className={`text-[11px] px-2 py-0.5 rounded-md font-mono transition cursor-pointer border ${
                                    isTagActive
                                      ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                                      : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-cyan-400'
                                  }`}
                                >
                                  #{tag}
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* Stats & Actions */}
                        <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                          <div className="flex items-center gap-3">
                            {project.pushedAt && (
                              <span className="flex items-center gap-1 text-[11px] font-mono">
                                <Clock size={11} /> {formatTimeAgo(project.pushedAt)}
                              </span>
                            )}
                            {project.stars > 0 && (
                              <span className="flex items-center gap-0.5 text-amber-500 font-medium text-[11px]">
                                <Star size={11} fill="currentColor" /> {project.stars}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setModalInitialTab('code');
                                setActiveModalProject(project);
                              }}
                              className="inline-flex items-center gap-1 font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-400 cursor-pointer transition"
                            >
                              <FileCode size={13} />
                              <span>Code</span>
                            </button>

                            {liveDemo && (
                              <a
                                href={liveDemo}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
                              >
                                <Globe size={13} />
                                <span>Demo</span>
                              </a>
                            )}

                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 font-medium text-cyan-400 hover:underline"
                            >
                              <Github size={13} />
                              <span>Repo</span>
                              <ExternalLink size={11} />
                            </a>
                          </div>
                        </div>

                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="p-12 text-center rounded-3xl bg-slate-100/60 dark:bg-slate-900/40 border border-dashed border-slate-300 dark:border-slate-800 space-y-3">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  No repositories matched your search
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTag(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400 cursor-pointer"
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
          onClose={() => {
            setActiveModalProject(null);
            setModalInitialTab('overview');
          }}
          onSelectTag={(tag) => setSelectedTag(tag)}
        />
      )}

    </section>
  );
}
