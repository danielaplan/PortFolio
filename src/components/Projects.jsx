import React, { useState, useEffect, useMemo } from 'react';
import { 
  ExternalLink, 
  FolderGit2, 
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
  Filter,
  Check,
  FileCode
} from 'lucide-react';
import Github from './icons/Github';
import ProjectModal from './ProjectModal';
import { curatedProjects } from '../data/projects';
import { fetchUserRepos, formatTimeAgo, getDevStatus } from '../services/github';

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [viewMode, setViewMode] = useState('curated'); // 'curated' | 'github'
  const [githubRepos, setGithubRepos] = useState([]);
  const [githubLoading, setGithubLoading] = useState(false);
  const [githubSource, setGithubSource] = useState(null);
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [modalInitialTab, setModalInitialTab] = useState('overview');

  // Load GitHub Repositories with caching
  const loadGithubRepos = async (force = false) => {
    setGithubLoading(true);
    try {
      const res = await fetchUserRepos('danielaplan', force);
      setGithubRepos(res.data || []);
      setGithubSource(res.source);
    } catch (e) {
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
      // Check if this repo is in curated projects to inherit rich data
      const matchedCurated = curatedProjects.find(
        cp => cp.repoName?.toLowerCase() === repo.name.toLowerCase()
      );

      return {
        id: `gh-${repo.id}`,
        title: matchedCurated?.title || repo.name.replace(/[-_]/g, ' '),
        repoName: repo.name,
        category: matchedCurated?.category || (repo.language ? `${repo.language} Project` : 'Repository'),
        description: matchedCurated?.description || repo.description || 'Public GitHub repository.',
        longDescription: matchedCurated?.longDescription || repo.description,
        keyFeatures: matchedCurated?.keyFeatures || [],
        tags: matchedCurated?.tags || [repo.language, ...repo.topics].filter(Boolean),
        link: repo.htmlUrl,
        demoUrl: matchedCurated?.demoUrl || repo.homepage || null,
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

  // Active dataset depending on viewMode
  const activeDataset = viewMode === 'curated' ? curatedProjects : formattedGithubProjects;

  // Extract all dynamic categories and counts
  const categories = useMemo(() => {
    const counts = { all: activeDataset.length };
    activeDataset.forEach(p => {
      if (p.category) {
        counts[p.category] = (counts[p.category] || 0) + 1;
      }
    });
    return counts;
  }, [activeDataset]);

  // Dynamic filter and search processing
  const filteredProjects = useMemo(() => {
    return activeDataset.filter(project => {
      // Category filter
      if (filter !== 'all' && project.category !== filter) {
        return false;
      }

      // Tag filter
      if (selectedTag && !project.tags?.some(t => t.toLowerCase() === selectedTag.toLowerCase())) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = project.title?.toLowerCase().includes(q);
        const inDesc = project.description?.toLowerCase().includes(q);
        const inTags = project.tags?.some(t => t.toLowerCase().includes(q));
        const inCategory = project.category?.toLowerCase().includes(q);
        return inTitle || inDesc || inTags || inCategory;
      }

      return true;
    });
  }, [activeDataset, filter, selectedTag, searchQuery]);

  const handleResetFilters = () => {
    setFilter('all');
    setSelectedTag(null);
    setSearchQuery('');
  };

  return (
    <section id="projects" className="py-20 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-4xl mx-auto px-6">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              <FolderGit2 size={16} />
              <span>Interactive Portfolio</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Projects & Engineering
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Explore highlighted software solutions, academic systems, and live GitHub repositories.
            </p>
          </div>

          {/* View Mode Toggle & Live Sync Indicator */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs font-medium">
              <button
                onClick={() => {
                  setViewMode('curated');
                  setFilter('all');
                }}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  viewMode === 'curated'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Curated ({curatedProjects.length})
              </button>
              <button
                onClick={() => {
                  setViewMode('github');
                  setFilter('all');
                }}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'github'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>Live Repos</span>
                <span className="px-1.5 py-0.2 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 text-[10px]">
                  {githubRepos.length || '•'}
                </span>
              </button>
            </div>

            <button
              onClick={() => loadGithubRepos(true)}
              disabled={githubLoading}
              title="Refresh live GitHub data"
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer disabled:opacity-50"
              aria-label="Refresh GitHub Repos"
            >
              <RefreshCw size={14} className={githubLoading ? 'animate-spin text-blue-500' : ''} />
            </button>
          </div>
        </div>

        {/* Dynamic Controls Bar: Search & Category Filter */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by name, keyword, or technology..."
                className="w-full pl-9 pr-9 py-2.5 rounded-2xl bg-white/50 dark:bg-slate-900/40 backdrop-blur-md border border-white/60 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition shadow-2xs"
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

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {Object.keys(categories).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-xl font-medium transition cursor-pointer capitalize border ${
                    filter === cat
                      ? 'bg-blue-600 text-white border-blue-500 shadow-xs font-semibold'
                      : 'bg-white/50 dark:bg-slate-900/40 border-white/60 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-800/80'
                  }`}
                >
                  {cat === 'all' ? `All (${categories.all})` : `${cat} (${categories[cat]})`}
                </button>
              ))}
            </div>

          </div>

          {/* Active Tag Filter Indicator */}
          {selectedTag && (
            <div className="flex items-center gap-2 pt-1 text-xs">
              <span className="text-slate-500 dark:text-slate-400">Filtered by tag:</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-mono font-medium">
                #{selectedTag}
                <button
                  onClick={() => setSelectedTag(null)}
                  className="hover:text-blue-800 dark:hover:text-blue-200 ml-1 cursor-pointer"
                  aria-label="Remove tag filter"
                >
                  <X size={12} />
                </button>
              </span>
              <button
                onClick={handleResetFilters}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 underline ml-2 cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredProjects.map((project) => {
              const ghData = githubMap.get((project.repoName || project.title).toLowerCase());
              const liveDemo = project.demoUrl || ghData?.homepage;
              const devStatus = getDevStatus(ghData?.pushedAt || project.pushedAt, ghData?.archived || project.archived, project.tags);

              return (
                <article
                  key={project.id}
                  className="group relative flex flex-col justify-between p-6 rounded-3xl glass-card cursor-pointer"
                  onClick={() => setActiveModalProject(project)}
                >
                  <div className="space-y-4">
                    
                    {/* Header: Title & Badges */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          {/* Development Status Pill */}
                          <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium border ${devStatus.badgeClass}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${devStatus.dotClass}`} />
                            {devStatus.label}
                          </span>

                          {project.featured && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                              <Sparkles size={11} /> Featured
                            </span>
                          )}
                          {project.category && (
                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                              {project.category}
                            </span>
                          )}
                          {project.year && (
                            <span className="text-[11px] text-slate-400 dark:text-slate-500">
                              {project.year}
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </h3>
                      </div>

                      {/* Quick Details Trigger */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalProject(project);
                        }}
                        className="p-2 rounded-xl text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 transition shrink-0"
                        title="View Full Details"
                        aria-label="View Project Details"
                      >
                        <Info size={15} />
                      </button>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags & Action Links */}
                  <div className="pt-6 space-y-4">
                    
                    {/* Clickable Tech Stack Tags */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag, j) => {
                          const isTagActive = selectedTag?.toLowerCase() === tag.toLowerCase();
                          return (
                            <button
                              key={j}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTag(isTagActive ? null : tag);
                              }}
                              className={`text-[11px] px-2.5 py-0.8 rounded-md font-mono transition cursor-pointer border ${
                                isTagActive
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : 'bg-white dark:bg-slate-800 border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:border-blue-400 dark:hover:border-blue-500'
                              }`}
                              title={`Filter by #${tag}`}
                            >
                              {tag}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Live GitHub Stats & Action Bar */}
                    <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      
                      {/* Live Repo Stats */}
                      <div className="flex items-center gap-3">
                        {ghData?.pushedAt && (
                          <span className="flex items-center gap-1 text-[11px] text-slate-400">
                            <Clock size={11} /> {formatTimeAgo(ghData.pushedAt)}
                          </span>
                        )}
                        {ghData && ghData.stars > 0 && (
                          <span className="flex items-center gap-0.5 text-amber-500 font-medium text-[11px]">
                            <Star size={11} fill="currentColor" /> {ghData.stars}
                          </span>
                        )}
                      </div>

                      {/* CTAs */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalInitialTab('code');
                            setActiveModalProject(project);
                          }}
                          className="inline-flex items-center gap-1 font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition"
                          title="Inspect Architecture & Code"
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
                          href={project.link || ghData?.htmlUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 font-medium text-blue-600 dark:text-blue-400 hover:underline"
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
          /* Empty State */
          <div className="p-12 text-center rounded-3xl bg-slate-50/60 dark:bg-slate-900/30 border border-dashed border-slate-300 dark:border-slate-800 space-y-4">
            <div className="inline-flex p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400">
              <Search size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                No projects matched your criteria
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Try searching for a different keyword, removing the tag filter, or clearing your search.
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition cursor-pointer"
            >
              Reset Filters
            </button>
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
