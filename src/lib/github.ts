type Repo = { name: string; fork: boolean; archived: boolean };

const HEADERS: HeadersInit = process.env.GITHUB_TOKEN
  ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
  : {};

export async function getLanguageStats(): Promise<{ name: string; level: number }[]> {
  try {
    const res = await fetch(
      "https://api.github.com/users/lokochaol/repos?per_page=100&type=owner",
      { headers: HEADERS, next: { revalidate: 86400 } }
    );
    if (!res.ok) throw new Error(`repos fetch failed: ${res.status}`);

    const repos: Repo[] = await res.json();
    const ownRepos = repos.filter((r) => !r.fork && !r.archived);

    const totals: Record<string, number> = {};

    await Promise.all(
      ownRepos.map(async (repo) => {
        try {
          const r = await fetch(
            `https://api.github.com/repos/lokochaol/${repo.name}/languages`,
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

    const total = Object.values(totals).reduce((a, b) => a + b, 0);
    if (total === 0) return [];

    return Object.entries(totals)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([name, bytes]) => ({
        name,
        level: Math.round((bytes / total) * 100),
      }));
  } catch (e) {
    console.warn("GitHub language fetch failed, using fallback:", e);
    return [];
  }
}
