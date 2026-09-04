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
  SlidersHorizontal,
  FolderGit2
} from 'lucide-react';
import Github from './icons/Github';
import { getTechIcon } from './icons/TechIcons';
import ProjectModal from './ProjectModal';
import ProjectSpotlightCarousel from '@/components/ui/card-fan-carousel';
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
        frameworkBadge: matchedCurated?.frameworkBadge || repo.language || 'Codebase',
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
      if (filter !== 'all' && project.category !== filter) {
        return false;
      }
      if (selectedTag && !project.tags?.some(t => t.toLowerCase() === selectedTag.toLowerCase())) {
        return false;
      }
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
    <section id="projects" className="py-12 sm:py-20 border-t border-slate-200/60 dark:border-slate-800/60">
      <div className="w-full px-5 sm:px-8 lg:px-12">

        {/* Section Header (Stitch Layout) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-500 mb-1.5">
              <FolderGit2 size={15} />
              <span>Interactive Spotlight Showcase</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Projects & Engineering
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
              Featured applications, enterprise systems, and architecture builds presented with full technical breakdowns and high-res previews.
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
                Curated Projects ({String(curatedProjects.length).padStart(2, '0')})
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
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              </button>
            </div>

            <button
              onClick={() => loadGithubRepos(true)}
              disabled={githubLoading}
              title="Refresh live GitHub data"
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer disabled:opacity-50"
              aria-label="Refresh GitHub Repos"
            >
              <RefreshCw size={14} className={githubLoading ? 'animate-spin text-cyan-400' : ''} />
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
                className="w-full pl-9 pr-9 py-2.5 rounded-2xl bg-white/50 dark:bg-slate-900/60 backdrop-blur-md border border-white/60 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition shadow-2xs"
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
                      ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-sm'
                      : 'bg-white/50 dark:bg-slate-900/60 border-white/60 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-800/80'
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
                onClick={handleResetFilters}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 underline ml-2 cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* =========================================================
            3D PROJECT SPOTLIGHT CAROUSEL (THE PROJECT ITSELF IN 3D)
            ========================================================= */}
        {viewMode === 'github' && githubLoading ? (
          <div className="p-12 flex flex-col items-center justify-center gap-3 rounded-3xl bg-slate-50/60 dark:bg-slate-900/30 border border-dashed border-slate-300 dark:border-slate-800">
            <RefreshCw size={22} className="text-cyan-500 animate-spin" />
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Syncing live repositories…</p>
          </div>
        ) : githubError && filteredProjects.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-300/60 dark:border-amber-900/50 space-y-4">
            <div className="inline-flex p-3 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400">
              <RefreshCw size={22} />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                Couldn't load live GitHub data
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                {githubError} Showing curated projects instead.
              </p>
            </div>
            <button
              onClick={() => loadGithubRepos(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition cursor-pointer"
            >
              <RefreshCw size={13} /> Try again
            </button>
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="w-full">
            <ProjectSpotlightCarousel
              projects={filteredProjects}
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
        ) : (
          <div className="p-12 text-center rounded-3xl bg-slate-50/60 dark:bg-slate-900/30 border border-dashed border-slate-300 dark:border-slate-800 space-y-4">
            <div className="inline-flex p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400">
              <Search size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                {viewMode === 'github' && githubRepos.length === 0
                  ? 'No repositories found'
                  : 'No projects matched your criteria'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Try searching for a different keyword, removing the tag filter, or clearing your search.
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400 transition cursor-pointer"
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
