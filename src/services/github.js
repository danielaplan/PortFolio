const CACHE_KEY = 'portfolio_github_repos_v1';
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes
const REQUEST_TIMEOUT = 8000; // ms — abort hung requests instead of spinning forever

// Status thresholds (days since last push) used by getDevStatus
const RECENT_DAYS = 45; // pushed within this window => "Active Dev"
const MAINTAINED_DAYS = 180; // pushed within this window => "Maintained"

export async function fetchUserRepos(username = 'danielaplan', forceRefresh = false) {
  if (!forceRefresh && typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_TTL) {
          return { data: parsed.repos, source: 'cache', lastFetched: parsed.timestamp };
        }
      }
    } catch (e) {
      console.warn('Failed reading GitHub repos from localStorage cache', e);
    }
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
    let response;
    try {
      response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`, {
        headers: {
          Accept: 'application/vnd.github.v3+json'
        },
        signal: controller.signal
      });
    } finally {
      clearTimeout(timeoutId);
    }

    // Unauthenticated GitHub API allows 60 req/hr per IP. A 403 here almost
    // always means rate-limited, not a real auth error — surface the reset time.
    if (response.status === 403) {
      const resetEpoch = response.headers.get('X-RateLimit-Reset');
      const resetsAt = resetEpoch ? new Date(Number(resetEpoch) * 1000).toLocaleTimeString() : 'soon';
      throw new Error(`GitHub API rate limit reached. Resets at ${resetsAt}.`);
    }

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const rawRepos = await response.json();

    // Clean & map repo fields
    const repos = rawRepos
      .filter(repo => !repo.fork && repo.name !== username) // filter out forks & readme repo if desired
      .map(repo => ({
        id: String(repo.id),
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description || 'Public repository by Daniel Aplan.',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        openIssues: repo.open_issues_count,
        language: repo.language || 'Code',
        topics: repo.topics || [],
        htmlUrl: repo.html_url,
        homepage: repo.homepage,
        updatedAt: repo.updated_at,
        pushedAt: repo.pushed_at,
        createdAt: repo.created_at,
        size: repo.size,
        defaultBranch: repo.default_branch,
        archived: Boolean(repo.archived),
        license: repo.license?.spdx_id || null
      }));

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          repos
        }));
      } catch (e) {
        console.warn('Failed writing GitHub repos to localStorage cache', e);
      }
    }

    return { data: repos, source: 'network', lastFetched: Date.now() };
  } catch (error) {
    console.error('Failed to fetch repos from GitHub API:', error);
    // Try returning stale cached data if available
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        return { data: parsed.repos, source: 'stale-cache', lastFetched: parsed.timestamp, error: error.message };
      }
    }
    return { data: [], source: 'error', error: error.message };
  }
}

export function getDevStatus(pushedAt, isArchived = false, topics = []) {
  if (isArchived) {
    return {
      status: 'archived',
      label: 'Archived',
      description: 'Read-only archive',
      badgeClass: 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20',
      dotClass: 'bg-rose-500'
    };
  }

  const topicList = Array.isArray(topics) ? topics.map(t => t.toLowerCase()) : [];
  if (topicList.includes('wip') || topicList.includes('in-development') || topicList.includes('beta')) {
    return {
      status: 'active',
      label: 'Active Dev',
      description: 'Work in progress',
      badgeClass: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
      dotClass: 'bg-emerald-500 animate-pulse'
    };
  }

  if (!pushedAt) {
    return {
      status: 'completed',
      label: 'Stable',
      description: 'Production ready',
      badgeClass: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
      dotClass: 'bg-slate-400'
    };
  }

  const diffInDays = Math.floor((Date.now() - new Date(pushedAt).getTime()) / (1000 * 60 * 60 * 24));

  if (diffInDays <= RECENT_DAYS) {
    return {
      status: 'active',
      label: 'Active Dev',
      description: 'Recently updated',
      badgeClass: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
      dotClass: 'bg-emerald-500 animate-pulse'
    };
  }

  if (diffInDays <= MAINTAINED_DAYS) {
    return {
      status: 'maintained',
      label: 'Maintained',
      description: 'Actively maintained',
      badgeClass: 'bg-sky-100 text-sky-700 border-sky-200 dark:bg-cyan-500/10 dark:text-cyan-400 dark:border-cyan-500/20',
      dotClass: 'bg-cyan-400'
    };
  }

  return {
    status: 'completed',
    label: 'Completed',
    description: 'Stable build',
    badgeClass: 'bg-slate-200 text-slate-700 border-slate-300 dark:bg-slate-500/10 dark:text-slate-400 dark:border-slate-500/20',
    dotClass: 'bg-slate-400'
  };
}

export function formatTimeAgo(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'just now';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}d ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths}mo ago`;
  return `${Math.floor(diffInMonths / 12)}y ago`;
}
