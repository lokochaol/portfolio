type Repo = { name: string; full_name: string; fork: boolean; archived: boolean };

const HEADERS: HeadersInit = process.env.GITHUB_TOKEN
  ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
  : {};

const BYTES_PER_LINE = 35;

async function fetchAllRepos(): Promise<Repo[]> {
  const repos: Repo[] = [];
  // /user/repos with type=all includes private repos and org repos the user is a member of
  // Requires a token with `repo` scope
  const endpoint = process.env.GITHUB_TOKEN
    ? "https://api.github.com/user/repos?per_page=100&type=all"
    : "https://api.github.com/users/lokochaol/repos?per_page=100&type=owner";

  let url: string | null = endpoint;
  while (url) {
    const currentUrl = url;
    const res: Response = await fetch(currentUrl, {
      headers: HEADERS,
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`repos fetch failed: ${res.status}`);
    const page: Repo[] = await res.json();
    repos.push(...page);

    // follow Link header for pagination
    const link = res.headers.get("link") ?? "";
    const next = link.match(/<([^>]+)>;\s*rel="next"/)?.[1] ?? null;
    url = next;
  }
  return repos;
}

export type LangStat = {
  name: string;
  level: number;      // percentage 0-100
  lines: number;      // approximate line count
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
            { headers: HEADERS, next: { revalidate: 86400 } }
          );
          if (!r.ok) return;
          const langs: Record<string, number> = await r.json();
          for (const [lang, bytes] of Object.entries(langs)) {
            totals[lang] = (totals[lang] ?? 0) + bytes;
          }
        } catch {
          // skip repos that fail
        }
      })
    );

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
    console.warn("GitHub language fetch failed, using fallback:", e);
    return [];
  }
}
