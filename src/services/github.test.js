// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fetchUserRepos, getDevStatus, formatTimeAgo } from './github';

const CACHE_KEY = 'portfolio_github_repos_v1';

function makeRepo(overrides = {}) {
  return {
    id: 123,
    name: 'Test-Repo',
    full_name: 'danielaplan/Test-Repo',
    description: 'A test repo',
    stargazers_count: 3,
    forks_count: 1,
    open_issues_count: 0,
    language: 'JavaScript',
    topics: ['wip'],
    html_url: 'https://github.com/danielaplan/Test-Repo',
    homepage: 'https://example.com',
    updated_at: new Date().toISOString(),
    pushed_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    size: 10,
    default_branch: 'main',
    archived: false,
    license: { spdx_id: 'MIT' },
    fork: false,
    ...overrides,
  };
}

function jsonResponse(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
}

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
});

describe('fetchUserRepos — caching', () => {
  it('returns cached data without calling fetch when within TTL', async () => {
    const repos = [makeRepo()];
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ timestamp: Date.now(), repos })
    );
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const res = await fetchUserRepos('danielaplan', false);

    expect(fetchMock).not.toHaveBeenCalled();
    expect(res.source).toBe('cache');
    expect(res.data).toHaveLength(1);
    expect(res.data[0].name).toBe('Test-Repo');
  });

  it('writes to localStorage and returns source "network" on a successful fetch', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse([makeRepo()]));
    vi.stubGlobal('fetch', fetchMock);

    const res = await fetchUserRepos('danielaplan', false);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(res.source).toBe('network');
    expect(res.data).toHaveLength(1);
    const stored = JSON.parse(localStorage.getItem(CACHE_KEY));
    expect(stored.repos).toHaveLength(1);
  });

  it('forceRefresh bypasses the cache and hits the network', async () => {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ timestamp: Date.now(), repos: [makeRepo({ name: 'Stale' })] })
    );
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse([makeRepo()]));
    vi.stubGlobal('fetch', fetchMock);

    const res = await fetchUserRepos('danielaplan', true);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(res.data[0].name).toBe('Test-Repo');
  });
});

describe('fetchUserRepos — resilience', () => {
  it('returns a rate-limit error result on HTTP 403 that names the reset time', async () => {
    const resetEpoch = Math.floor(Date.now() / 1000) + 3600;
    const fetchMock = vi
      .fn()
      .mockResolvedValue(
        new Response(null, { status: 403, headers: { 'X-RateLimit-Reset': String(resetEpoch) } })
      );
    vi.stubGlobal('fetch', fetchMock);

    const res = await fetchUserRepos('danielaplan');
    expect(res.source).toBe('error');
    expect(res.error).toMatch(/rate limit/i);
  });

  it('falls back to stale cache when the network errors but cache exists', async () => {
    const repos = [makeRepo({ name: 'Stale' })];
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ timestamp: Date.now() - 60 * 60 * 1000, repos })
    );
    const fetchMock = vi.fn().mockRejectedValue(new Error('network down'));
    vi.stubGlobal('fetch', fetchMock);

    const res = await fetchUserRepos('danielaplan', false);

    expect(res.source).toBe('stale-cache');
    expect(res.data[0].name).toBe('Stale');
  });

  it('returns an empty error result when the network errors and no cache exists', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('network down'));
    vi.stubGlobal('fetch', fetchMock);

    const res = await fetchUserRepos('danielaplan', false);

    expect(res.source).toBe('error');
    expect(res.data).toEqual([]);
  });
});

describe('getDevStatus', () => {
  it('marks archived repos as archived', () => {
    expect(getDevStatus(new Date().toISOString(), true).status).toBe('archived');
  });

  it('marks repos with a "wip" topic as active', () => {
    expect(getDevStatus(new Date().toISOString(), false, ['wip']).status).toBe('active');
  });

  it('marks recently pushed repos as active', () => {
    expect(getDevStatus(new Date().toISOString()).status).toBe('active');
  });

  it('marks repos not pushed in >180 days as completed', () => {
    const old = new Date(Date.now() - 400 * 24 * 60 * 60 * 1000).toISOString();
    expect(getDevStatus(old).status).toBe('completed');
  });
});

describe('formatTimeAgo', () => {
  it('formats a recent date without throwing', () => {
    const out = formatTimeAgo(new Date().toISOString());
    expect(typeof out).toBe('string');
    expect(out.length).toBeGreaterThan(0);
  });

  it('returns an empty string for missing input', () => {
    expect(formatTimeAgo('')).toBe('');
  });
});
