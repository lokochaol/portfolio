type Repo = { name: string; full_name: string; fork: boolean; archived: boolean };

const HEADERS: HeadersInit = process.env.GITHUB_TOKEN
  ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
  : {};

const BYTES_PER_LINE = 35;

async function fetchAllRepos(): Promise<Repo[]> {
  const repos: Repo[] = [];
  const endpoint = process.env.GITHUB_TOKEN
    ? "https://api.github.com/user/repos?per_page=100&type=all"
    : "https://api.github.com/users/lokochaol/repos?per_page=100&type=owner";

  let url: string | null = endpoint;
  while (url) {
    const currentUrl = url;
    const res: Response = await fetch(currentUrl, {
      headers: HEADERS,
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`repos fetch failed: ${res.status}`);
    const page: Repo[] = await res.json();
    repos.push(...page);
    const link = res.headers.get("link") ?? "";
    url = link.match(/<([^>]+)>;\s*rel="next"/)?.[1] ?? null;
  }
  return repos;
}

export type LangStat = {
  name: string;
  level: number;
  lines: number;
};

export type GitHubStats = {
  linesChanged: number;
  commits: number;
  mergedPRs: number;
};


export async function getLanguageStats(): Promise<LangStat[]> {
  try {
    const repos = await fetchAllRepos();
    const ownRepos = repos.filter((r) => !r.fork && !r.archived);

    const totals: Record<string, number> = {};

    await Promise.all(
      ownRepos.map(async (repo) => {
        try {
          const r = await fetch(
            `https://api.github.com/repos/${repo.full_name}/languages`,
            { headers: HEADERS, next: { revalidate: 3600 } }
          );
          if (!r.ok) return;
          const langs: Record<string, number> = await r.json();
          for (const [lang, bytes] of Object.entries(langs)) {
            totals[lang] = (totals[lang] ?? 0) + bytes;
          }
        } catch {
          // skip
        }
      })
    );

    const EXCLUDE = new Set([
      "Jupyter Notebook",
      "HTML", "CSS", "SCSS", "Less",
      "SVG", "Markdown",
      "Makefile", "CMake", "Meson",
      "Dockerfile",
      "Shell", "Batchfile", "PowerShell",
      "PHP",
    ]);
    for (const key of Object.keys(totals)) {
      if (EXCLUDE.has(key)) delete totals[key];
    }

    const totalBytes = Object.values(totals).reduce((a, b) => a + b, 0);
    if (totalBytes === 0) return [];

    return Object.entries(totals)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8)
      .map(([name, bytes]) => ({
        name,
        level: Math.round((bytes / totalBytes) * 100),
        lines: Math.round(bytes / BYTES_PER_LINE),
      }));
  } catch (e) {
    console.warn("GitHub language fetch failed:", e);
    return [];
  }
}

type ContributorWeek = { a: number; d: number; c: number };
type Contributor = { author: { login: string } | null; weeks: ContributorWeek[] };

async function getLinesChangedForRepo(fullName: string): Promise<number> {
  const url = `https://api.github.com/repos/${fullName}/stats/contributors`;
  try {
    const res = await fetch(url, { headers: HEADERS, next: { revalidate: 3600 } });
    if (res.status === 202) {
      // GitHub is computing stats; wait 3s and try once more
      await new Promise((r) => setTimeout(r, 3000));
      const res2 = await fetch(url, { headers: HEADERS, next: { revalidate: 3600 } });
      if (!res2.ok || res2.status === 202) return 0;
      const data2: Contributor[] = await res2.json();
      if (!Array.isArray(data2)) return 0;
      const mine2 = data2.find((c) => c.author?.login === "lokochaol");
      if (!mine2) return 0;
      return mine2.weeks.reduce((sum, w) => sum + w.a + w.d, 0);
    }
    if (!res.ok) return 0;
    const data: Contributor[] = await res.json();
    if (!Array.isArray(data)) return 0;
    const mine = data.find((c) => c.author?.login === "lokochaol");
    if (!mine) return 0;
    return mine.weeks.reduce((sum, w) => sum + w.a + w.d, 0);
  } catch {
    return 0;
  }
}

async function getMergedPRsForRepo(fullName: string): Promise<number> {
  let count = 0;
  let url: string | null =
    `https://api.github.com/repos/${fullName}/pulls?state=closed&per_page=100`;
  while (url) {
    try {
      const res: Response = await fetch(url, {
        headers: HEADERS,
        next: { revalidate: 3600 },
      });
      if (!res.ok) break;
      const prs: Array<{ user: { login: string } | null; merged_at: string | null }> =
        await res.json();
      count += prs.filter(
        (pr) => pr.user?.login === "lokochaol" && pr.merged_at
      ).length;
      const link = res.headers.get("link") ?? "";
      url = link.match(/<([^>]+)>;\s*rel="next"/)?.[1] ?? null;
    } catch {
      break;
    }
  }
  return count;
}

async function getCommitCount(): Promise<number> {
  try {
    const res = await fetch(
      "https://api.github.com/search/commits?q=author:lokochaol&per_page=1",
      {
        headers: {
          ...HEADERS,
          Accept: "application/vnd.github.cloak-preview+json",
        },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return 0;
    const data = await res.json();
    return data.total_count ?? 0;
  } catch {
    return 0;
  }
}

export async function getGitHubStats(): Promise<GitHubStats | null> {
  if (!process.env.GITHUB_TOKEN) return null;
  try {
    const repos = await fetchAllRepos();
    const allRepos = repos.filter((r) => !r.fork && !r.archived);

    const [repoLines, repoMergedPRs, commits] = await Promise.all([
      Promise.all(allRepos.map((r) => getLinesChangedForRepo(r.full_name))),
      Promise.all(allRepos.map((r) => getMergedPRsForRepo(r.full_name))),
      getCommitCount(),
    ]);

    const linesChanged = repoLines.reduce((a, b) => a + b, 0);
    const mergedPRs = repoMergedPRs.reduce((a, b) => a + b, 0);

    return { linesChanged, commits, mergedPRs };
  } catch (e) {
    console.warn("GitHub stats fetch failed:", e);
    return null;
  }
}
