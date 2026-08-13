import matter from "gray-matter";
import { blog as blogConfig, github as githubConfig } from "@/site.config";

const OWNER = githubConfig.username;
const REPO = blogConfig.repoName;
const BRANCH = blogConfig.branch;
const API_URL = `https://api.github.com/repos/${OWNER}/${REPO}/contents?ref=${BRANCH}`;
const RAW_BASE = `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}`;
const REVALIDATE = blogConfig.revalidate;

export interface Post {
  slug: string;
  fileName: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  excerpt: string;
  url: string;
}

export interface PostContent {
  post: Post;
  content: string;
}

interface ContentsFile {
  name: string;
  path: string;
  html_url: string;
  download_url: string | null;
}

function githubHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token ?? ""}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "portfolio-site",
  };
}

function slugFromFileName(fileName: string): string {
  return fileName.replace(/\.md$/i, "");
}

function toLocalDate(value: unknown): string | null {
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

function toTags(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((tag): tag is string => typeof tag === "string");
}

function fallbackExcerpt(content: string): string {
  const text = content
    .split(/\r?\n/)
    .map((line) => line.replace(/^#{1,6}\s+/, "").trim())
    .find((line) => line.length > 0);
  return (text ?? "No description yet.").slice(0, 160);
}

function parsePost(
  fileName: string,
  rawContent: string,
  url: string
): Post | null {
  const { data, content } = matter(rawContent);

  const title = typeof data.title === "string" ? data.title.trim() : "";
  const date = toLocalDate(data.date);
  if (!title || !date) return null;

  const description =
    typeof data.description === "string" ? data.description.trim() : "";

  return {
    slug: slugFromFileName(fileName),
    fileName,
    title,
    date,
    description,
    tags: toTags(data.tags),
    excerpt: description || fallbackExcerpt(content),
    url,
  };
}

async function fetchRaw(path: string): Promise<string | null> {
  try {
    const response = await fetch(`${RAW_BASE}/${path}`, {
      next: { revalidate: REVALIDATE },
    });
    if (!response.ok) return null;
    return await response.text();
  } catch {
    return null;
  }
}

export async function getBlogPosts(): Promise<Post[]> {
  const token = process.env.GITHUB_TOKEN ?? "";

  try {
    const response = await fetch(API_URL, {
      headers: githubHeaders(token),
      next: { revalidate: REVALIDATE },
    });

    if (!response.ok) return [];

    const files = (await response.json()) as ContentsFile[];
    const markdownFiles = files.filter(
      (file) =>
        file.name.toLowerCase().endsWith(".md") &&
        file.name.toLowerCase() !== "readme.md"
    );

    const contents = await Promise.all(
      markdownFiles.map((file) => fetchRaw(file.path))
    );

    const posts = markdownFiles
      .map((file, index) =>
        contents[index] ? parsePost(file.name, contents[index]!, file.html_url) : null
      )
      .filter((post): post is Post => post !== null);

    return posts.sort((a, b) => String(b.date).localeCompare(String(a.date)));
  } catch {
    return [];
  }
}

export async function getPostContent(slug: string): Promise<PostContent | null> {
  const raw = await fetchRaw(`${slug}.md`);
  if (!raw) return null;

  const { content } = matter(raw);
  const post = parsePost(
    `${slug}.md`,
    raw,
    `https://github.com/${OWNER}/${REPO}/blob/${BRANCH}/${slug}.md`
  );
  if (!post) return null;

  return { post, content };
}