// ============================================================
// SITE CONFIGURATION
// ============================================================
// This is the ONE file you need to edit to make this site yours.
// Change your name, links, contact info, and GitHub settings here.
// You do not need to touch any other code.
// ============================================================

// Basic site information.
export const site = {
  // Short brand name shown in the navbar and footer.
  brand: "~/aster.dev",

  // Your full name.
  name: "Aster Julian Ray",

  // Your first name.
  firstName: "Aster",

  // Your job title or role.
  role: "Full-Stack Web Developer",

  // A short text shown as a badge on the home page.
  badge: "Hello World 👋",

  // A short greeting shown under the profile image.
  tagline: "Welcome to my workspace",

  // One or two sentences about you, used in the home hero and the bio.
  bio: "Hi, I'm Aster Julian Ray. A Web Developer and Community Mentor. I specialize in building scalable applications and guiding junior students to craft clean code.",

  // Path to your profile image. Put the image in the "public" folder.
  avatar: "/profile.png",

  // Text description of the profile image (used by screen readers).
  avatarAlt: "Portrait of Aster Julian Ray",

  // Your contact email.
  email: "picakhant@gmail.com",

  // The main URL of your site.
  url: "https://aster-dev.vercel.app",

  // Your full GitHub profile link.
  github: "https://github.com/picakhant",

  // Your Telegram profile link.
  telegram: "https://t.me/aster_julian_ray",

  // Your Telegram community or group link.
  telegramCommunity: "https://t.me/+1Jq9vv2dn542ODI1",

  // Where you are based, shown on the contact page.
  location: "Pyay, Myanmar",

  // Your timezone, shown on the contact page.
  timezone: "UTC+6:30",

  // Short status text (currently not shown on the page).
  status: "Open for collaborations & tech discussions",

  // Long description used for SEO and search engines.
  description:
    "Personal portfolio, tech articles, and community mentorship hub by Aster Julian Ray, a Computer Science student at UCSPyay.",

  // The site name shown in browser tab titles and social previews.
  siteName: "Aster.dev",

  // Title used when the site is shared on social media (Open Graph).
  ogTitle: "Aster Julian Ray - CS Student & Web Developer",

  // Description used when the site is shared on social media.
  ogDescription:
    "Building modern web applications and mentoring junior developers.",

  // Description used when the site is shared on Twitter.
  twitterDescription: "CS Student at UCSPyay & Full-Stack Web Developer.",

  // Keywords that help search engines understand the site.
  keywords: [
    "Aster Julian Ray",
    "UCSPyay",
    "Web Developer Myanmar",
    "Next.js Portfolio",
    "JavaScript",
    "TypeScript",
  ],
} as const;

// Links shown in the navigation bar.
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

// The big title text on the home page.
// Set "highlight: true" to color that part with the primary color.
export const heroTitle: { text: string; highlight?: boolean }[] = [
  { text: "Building the web," },
  { text: "one line at a time.", highlight: true },
];

export type HeroCta = {
  label: string;
  href: string;
  variant: "primary" | "outline";
};

// The buttons under the hero title.
export const hero = {
  description:
    "Hi, I'm Aster Julian Ray. A Web Developer and Community Mentor. I specialize in building scalable applications and guiding junior students to craft clean code.",
  ctas: [
    { label: "Join Telegram Community", href: site.telegramCommunity, variant: "outline" },
  ] as HeroCta[],
} as const;

export type TerminalSegment = { text: string; className?: string };
export type TerminalLine = {
  id: number;
  prefix: string;
  segments: TerminalSegment[];
};

// The tech stack cards shown below the hero.
// "glow" is the CSS class applied on hover.
export const techStack: { name: string; glow: string }[] = [
  {
    name: "Next.js",
    glow: "hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]",
  },
  {
    name: "React",
    glow: "hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]",
  },
  {
    name: "TypeScript",
    glow: "hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]",
  },
  {
    name: "Express.js",
    glow: "hover:border-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]",
  },
  {
    name: "Node.js",
    glow: "hover:border-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]",
  },
  {
    name: "Tailwind",
    glow: "hover:border-teal-400 hover:shadow-[0_0_15px_rgba(45,212,191,0.3)]",
  },
] as const;

// The fake terminal window on the home page (decorative text).
export const heroTerminal: TerminalLine[] = [
  {
    id: 1,
    prefix: "$",
    segments: [
      { text: "npm init next-app@latest portfolio", className: "text-warning" },
    ],
  },
  {
    id: 2,
    prefix: ">",
    segments: [
      { text: "installing dependencies...", className: "text-base-content/60" },
    ],
  },
  {
    id: 3,
    prefix: "✓",
    segments: [
      { text: "Created Aster's Portfolio", className: "text-success" },
    ],
  },
  {
    id: 4,
    prefix: "$",
    segments: [
      { text: "cd portfolio && npm run dev", className: "text-warning" },
    ],
  },
  {
    id: 5,
    prefix: ">",
    segments: [
      {
        text: "ready - started server on 0.0.0.0:3000",
        className: "text-info",
      },
    ],
  },
  {
    id: 6,
    prefix: "//",
    segments: [{ text: "Skills matched:", className: "text-base-content/40" }],
  },
  {
    id: 7,
    prefix: " ",
    segments: [
      { text: "[ " },
      { text: "'Next.js'", className: "text-primary" },
      { text: ", " },
      { text: "'React'", className: "text-primary" },
      { text: ", " },
      { text: "'TypeScript'", className: "text-primary" },
      { text: " ]" },
    ],
  },
  {
    id: 8,
    prefix: " ",
    segments: [
      { text: "[ " },
      { text: "'Express'", className: "text-secondary" },
      { text: ", " },
      { text: "'Prisma'", className: "text-secondary" },
      { text: ", " },
      { text: "'Ubuntu'", className: "text-secondary" },
      { text: " ]" },
    ],
  },
];

// GitHub API settings for the Projects page.
// Only your public repositories with this topic will be shown.
export const github = {
  // Your GitHub username.
  username: "picakhant",

  // The topic that marks a repo as a project. Add this topic to any
  // repository in GitHub -> repo settings -> topics to show it here.
  topic: "portfolio",

  // How often (in seconds) the site refreshes the project data.
  revalidate: 180,
} as const;

// Blog settings for the Blog page.
// Blog posts are plain markdown files stored in a public GitHub repo.
// Drop a .md file in that repo (with YAML frontmatter), commit and push —
// it will show up here after "revalidate" seconds.
export const blog = {
  // The GitHub repository that stores the posts. Your github.username
  // above is the owner, so the full repo is "picakhant/aster-blogs".
  repoName: "aster-blogs",

  // The branch the posts are committed to.
  branch: "main",

  // How often (in seconds) the site refreshes the blog data.
  revalidate: 600,
} as const;
