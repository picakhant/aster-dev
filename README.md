# Portfolio Overview

A simple personal portfolio website built with Next.js. It shows your profile on the home page and lists your GitHub repositories on the projects page.

## Features

- **Home page** — profile image, your name, role, bio, tech stack, and a fake terminal.
- **Projects page** — loads your GitHub repositories automatically and shows them as cards.
- **Project detail page** — opens a project card and shows the repository README file.
- **Blog page** — renders your blog posts straight from markdown files in a GitHub repository. Write in markdown, commit, and the post goes live.
- **Contact page** — a "Say Hello" email button with copy-to-clipboard, social link cards (Email / Telegram / GitHub), and your location and timezone.
- **Dark theme** — uses daisyUI with the Dracula theme. A theme toggle is in the navbar.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- daisyUI
- Framer Motion
- react-markdown

## Getting Started

Clone the repository and go into the project folder:

```bash
git clone <your-repo-url>
cd <project-folder>
```

Install the dependencies:

```bash
npm install
```

Create your environment file from the example:

```bash
cp .env.example .env.local
```

Open `.env.local` and add your GitHub personal access token. The token is used to fetch your repositories. It does not need any special permissions because your repositories are public.

> Tip: If you run the site without a token, it still works for public repositories. The token just gives you a higher rate limit.

Now edit the configuration file. See the [Configuration](#configuration) section below.

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Configuration

**Edit ONE file: `site.config.ts`** at the root of the project. Every field has a short comment explaining what it does.

Here is what you can change:

- **Basic info** — your name, role, bio, and site name.
- **Profile image** — put your image in the `public` folder and set the `avatar` path.
- **Contact** — the contact email, GitHub link, Telegram links, your location, and timezone.
- **SEO** — site description, keywords, and social media preview text.
- **Navbar links** — edit the `navLinks` list.
- **GitHub settings** — your username, the topic used to filter projects, and how often the data refreshes.

You do not need to read or edit any other code to make this site yours.

## How the Projects Page Works

The projects page reads your GitHub account:

1. It searches for your repositories with the `portfolio` topic (set in `github.topic`).
2. Only repositories with that topic are shown as cards.
3. If a repository has a `README.md`, the card shows an **Overview** button.
4. Clicking the button opens a detail page that renders the README file nicely.

To add a project: open the repository on GitHub, go to **Settings → Topics**, and add the `portfolio` topic. The site picks it up automatically (after a short delay based on the refresh time).

To remove a project: remove the topic from the repository.

## How the Blog Works

The blog reads your posts from a public GitHub repository (set in `blog.repoName` in `site.config.ts`, default `aster-blogs`). It uses the same live-fetch approach as the projects page — there is no build step and no database.

1. Every `*.md` file at the **root** of that repository is treated as a blog post (`README.md` is ignored).
2. The site lists the files, fetches their content, and reads the YAML frontmatter.
3. Posts with a valid `title` and `date` are shown as cards on `/blog`, sorted newest first. Files without frontmatter are skipped.
4. Clicking a card opens `/blog/<filename-without-.md>` and renders the post with the same markdown renderer used for project READMEs.

### Writing a post

Create a markdown file at the repo root. It must start with YAML frontmatter:

```
---
title: "My first post"
date: 2026-08-13
description: "A short summary shown on the blog card."
tags: [nextjs, javascript]
---

Write your post in **markdown** here.
```

- `title` and `date` are required. `description` and `tags` are optional.
- Push the file to GitHub and it will appear on the site after the refresh time (`blog.revalidate` seconds, 600 by default).
- Images: use absolute URLs in markdown, e.g. `![alt](https://example.com/image.png)` or an HTML `<img src="https://..." />` tag — raw HTML is supported. Relative image paths won't work because they would point at your site's domain.
- To update a post, edit the file and push again. To remove a post, delete the file.

## Commands

| Command                | What it does                          |
| ---------------------- | ------------------------------------- |
| `npm install`          | Install all dependencies              |
| `npm run dev`          | Start the development server          |
| `npm run build`        | Build the site for production         |
| `npm run start`        | Serve the production build            |
| `npm run lint`         | Check the code for style issues       |

## Project Structure

| Folder / File        | What it is                                |
| -------------------- | ----------------------------------------- |
| `site.config.ts`     | **Edit this file** to customize the site  |
| `app/`               | The pages (home, projects, project detail, blog) |
| `app/projects/`      | The projects listing and detail pages     |
| `app/blog/`          | The blog listing and detail pages         |
| `app/contact/`       | The contact page                          |
| `components/`        | Reusable UI components                    |
| `components/projects/` | Project cards, grid, and markdown renderer |
| `components/blog/`   | Blog cards and grid                       |
| `components/contact/`| Contact cards and copy-email button       |
| `lib/github.ts`      | Fetches your repositories from GitHub     |
| `lib/blog.ts`        | Fetches your blog posts from GitHub       |
| `public/`            | Static files like your profile image      |
| `.env` / `.env.local`| Environment variables (GitHub token)      |

## Deploy to Vercel

Push the code to a GitHub repository, then:

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Add New → Project** and choose this repository.
3. Vercel detects Next.js automatically and builds it.
4. Add the `GITHUB_TOKEN` environment variable in **Project → Settings → Environment Variables**.
5. Deploy.

The site updates automatically every time you push to the `main` branch.
