import { github as githubConfig } from "@/site.config";

const SEARCH_QUERY = `user:${githubConfig.username}+topic:${githubConfig.topic}`;
const API_URL = `https://api.github.com/search/repositories?q=${SEARCH_QUERY}`;
const REVALIDATE = githubConfig.revalidate;

export interface Project {
  fullName: string;
  name: string;
  description: string;
  topics: string[];
  language: string | null;
  homepage: string | null;
  htmlUrl: string;
  stars: number;
  forks: number;
  updatedAt: string;
  featured: boolean;
  hasReadme: boolean;
}

interface SearchResponse {
  items?: Array<{
    full_name: string;
    name: string;
    description: string | null;
    topics?: string[];
    language: string | null;
    homepage: string | null;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
  }>;
}

function githubHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token ?? ""}`,
    Accept: "application/vnd.github.raw+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "portfolio-site",
  };
}

export async function hasReadme(fullName: string): Promise<boolean> {
  const token = process.env.GITHUB_TOKEN ?? "";

  try {
    const response = await fetch(
      `https://api.github.com/repos/${fullName}/readme`,
      {
        headers: githubHeaders(token),
        next: { revalidate: REVALIDATE },
      }
    );
    return response.ok;
  } catch {
    return false;
  }
}

export async function getProjectReadme(
  fullName: string
): Promise<string | null> {
  const token = process.env.GITHUB_TOKEN ?? "";

  try {
    const response = await fetch(
      `https://api.github.com/repos/${fullName}/readme`,
      {
        headers: githubHeaders(token),
        next: { revalidate: REVALIDATE },
      }
    );
    if (!response.ok) return null;
    return await response.text();
  } catch {
    return null;
  }
}

export async function getPortfolioRepos(): Promise<Project[]> {
  const token = process.env.GITHUB_TOKEN ?? "";

  try {
    const response = await fetch(API_URL, {
      headers: githubHeaders(token),
      next: { revalidate: REVALIDATE },
    });

    if (!response.ok) return [];

    const data = (await response.json()) as SearchResponse;

    const items = data.items ?? [];

    const readmeChecks = await Promise.all(
      items.map((item) => hasReadme(item.full_name))
    );

    const projects = items.map((item, index) => ({
      fullName: item.full_name,
      name: item.name,
      description: item.description ?? "",
      topics: item.topics ?? [],
      language: item.language,
      homepage: item.homepage,
      htmlUrl: item.html_url,
      stars: item.stargazers_count,
      forks: item.forks_count,
      updatedAt: item.updated_at,
      featured: (item.topics ?? []).includes("featured"),
      hasReadme: readmeChecks[index],
    }));

    return projects.sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return String(b.updatedAt).localeCompare(String(a.updatedAt));
    });
  } catch {
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getPortfolioRepos();
  return projects.find((project) => project.name === slug) ?? null;
}
