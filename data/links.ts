export type LinkCategory =
  | "Inspiration"
  | "Components"
  | "Patterns"
  | "Typography"
  | "Motion"
  | "Tools"
  | "References";

export type UILink = {
  id: string;
  title: string;
  url: string;
  category: LinkCategory;
  description: string;
  tags: string[];
  note?: string;
  featured?: boolean;
  added: string;
};

export const categoryOrder: LinkCategory[] = [
  "Inspiration",
  "Components",
  "Patterns",
  "Typography",
  "Motion",
  "Tools",
  "References",
];

export const uiLinks: UILink[] = [
  {
    id: "mobbin",
    title: "Mobbin",
    url: "https://mobbin.com",
    category: "Inspiration",
    description: "Mobile and web product screens organized by flow, pattern, and company.",
    tags: ["screens", "mobile", "flows"],
    note: "Best for real product references.",
    featured: true,
    added: "2026-05-27",
  },
  {
    id: "godly",
    title: "Godly",
    url: "https://godly.website",
    category: "Inspiration",
    description: "High-polish web references with strong art direction and motion.",
    tags: ["websites", "motion", "visual"],
    featured: true,
    added: "2026-05-27",
  },
  {
    id: "lapa",
    title: "Lapa Ninja",
    url: "https://www.lapa.ninja",
    category: "Inspiration",
    description: "Landing pages, portfolios, and startup websites sorted by category.",
    tags: ["landing", "portfolio", "startup"],
    added: "2026-05-27",
  },
  {
    id: "awwwards",
    title: "Awwwards",
    url: "https://www.awwwards.com",
    category: "Inspiration",
    description: "Experimental web design, interaction, and visual craft references.",
    tags: ["awards", "experimental", "web"],
    added: "2026-05-27",
  },
  {
    id: "framer-marketplace",
    title: "Framer Marketplace",
    url: "https://www.framer.com/marketplace",
    category: "Inspiration",
    description: "Templates and patterns from designers building in Framer.",
    tags: ["framer", "templates", "web"],
    featured: true,
    added: "2026-05-27",
  },
  {
    id: "shadcn",
    title: "shadcn/ui",
    url: "https://ui.shadcn.com",
    category: "Components",
    description: "Composable React components built on Radix primitives and Tailwind.",
    tags: ["react", "components", "system"],
    featured: true,
    added: "2026-05-27",
  },
  {
    id: "radix",
    title: "Radix UI",
    url: "https://www.radix-ui.com",
    category: "Components",
    description: "Accessible low-level primitives for building serious design systems.",
    tags: ["accessibility", "primitives", "react"],
    added: "2026-05-27",
  },
  {
    id: "origin-ui",
    title: "Origin UI",
    url: "https://originui.com",
    category: "Components",
    description: "Copy-paste UI blocks and small interaction patterns for React apps.",
    tags: ["blocks", "react", "copy"],
    added: "2026-05-27",
  },
  {
    id: "magic-ui",
    title: "Magic UI",
    url: "https://magicui.design",
    category: "Components",
    description: "Animated UI components and sections for SaaS and product sites.",
    tags: ["animation", "sections", "react"],
    added: "2026-05-27",
  },
  {
    id: "ui-patterns",
    title: "UI Patterns",
    url: "https://ui-patterns.com",
    category: "Patterns",
    description: "Common product design patterns explained through examples.",
    tags: ["patterns", "ux", "product"],
    added: "2026-05-27",
  },
  {
    id: "checklist-design",
    title: "Checklist Design",
    url: "https://www.checklist.design",
    category: "Patterns",
    description: "Practical checklists for common interface and product flows.",
    tags: ["checklists", "ux", "flows"],
    featured: true,
    added: "2026-05-27",
  },
  {
    id: "laws-of-ux",
    title: "Laws of UX",
    url: "https://lawsofux.com",
    category: "References",
    description: "A concise reference for design psychology and interaction principles.",
    tags: ["ux", "principles", "reference"],
    added: "2026-05-27",
  },
  {
    id: "fontshare",
    title: "Fontshare",
    url: "https://www.fontshare.com",
    category: "Typography",
    description: "Free, polished font families from Indian Type Foundry.",
    tags: ["fonts", "brand", "free"],
    featured: true,
    added: "2026-05-27",
  },
  {
    id: "typewolf",
    title: "Typewolf",
    url: "https://www.typewolf.com",
    category: "Typography",
    description: "Typography inspiration, pairings, and live website font references.",
    tags: ["pairings", "fonts", "web"],
    added: "2026-05-27",
  },
  {
    id: "google-fonts",
    title: "Google Fonts",
    url: "https://fonts.google.com",
    category: "Typography",
    description: "Open-source web fonts with broad language coverage and easy delivery.",
    tags: ["fonts", "open-source", "web"],
    added: "2026-05-27",
  },
  {
    id: "motion-primitives",
    title: "Motion Primitives",
    url: "https://motion-primitives.com",
    category: "Motion",
    description: "Tasteful React motion components for transitions, text, and layout.",
    tags: ["motion", "react", "microinteractions"],
    featured: true,
    added: "2026-05-27",
  },
  {
    id: "easings",
    title: "Easings",
    url: "https://easings.net",
    category: "Motion",
    description: "Named easing curves with previews and CSS cubic-bezier values.",
    tags: ["css", "easing", "animation"],
    added: "2026-05-27",
  },
  {
    id: "shots",
    title: "Shots",
    url: "https://shots.so",
    category: "Tools",
    description: "Fast mockup generator for product screenshots and social visuals.",
    tags: ["mockups", "screenshots", "marketing"],
    added: "2026-05-27",
  },
  {
    id: "realtime-colors",
    title: "Realtime Colors",
    url: "https://www.realtimecolors.com",
    category: "Tools",
    description: "Preview color palettes on a realistic landing page before committing.",
    tags: ["color", "palette", "preview"],
    added: "2026-05-27",
  },
  {
    id: "coolors",
    title: "Coolors",
    url: "https://coolors.co",
    category: "Tools",
    description: "Palette generation, contrast checks, gradients, and color utilities.",
    tags: ["color", "palette", "tools"],
    added: "2026-05-27",
  },
  {
    id: "design-spells",
    title: "Design Spells",
    url: "https://www.designspells.com",
    category: "References",
    description: "Small, memorable interaction details collected from around the web.",
    tags: ["details", "interactions", "inspiration"],
    added: "2026-05-27",
  },
];
