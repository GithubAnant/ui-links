"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  Check,
  Copy,
  Grid2X2,
  List,
  Search,
  SlidersHorizontal,
  Sparkle,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { LinkCategory, UILink } from "@/data/links";
import { categoryOrder } from "@/data/links";

type ViewMode = "grid" | "list";
type CategoryFilter = "All" | LinkCategory;

function getHost(url: string) {
  return new URL(url).hostname.replace(/^www\./, "");
}

function getFaviconUrl(url: string) {
  const domain = getHost(url);
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
}

function normalize(value: string) {
  return value.toLowerCase().trim();
}

export function LinkDirectory({ links }: { links: UILink[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [activeTag, setActiveTag] = useState("All");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categoryCounts = useMemo(() => {
    const counts = new Map<CategoryFilter, number>([["All", links.length]]);
    for (const category of categoryOrder) {
      counts.set(
        category,
        links.filter((link) => link.category === category).length,
      );
    }
    return counts;
  }, [links]);

  const tags = useMemo(() => {
    const tagCounts = new Map<string, number>();
    for (const link of links) {
      for (const tag of link.tags) {
        tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
      }
    }

    return [...tagCounts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 14)
      .map(([tag]) => tag);
  }, [links]);

  const filteredLinks = useMemo(() => {
    const searchTerm = normalize(query);

    return links.filter((link) => {
      const matchesCategory =
        activeCategory === "All" || link.category === activeCategory;
      const matchesTag = activeTag === "All" || link.tags.includes(activeTag);
      const searchable = normalize(
        [
          link.title,
          link.description,
          link.category,
          link.note,
          getHost(link.url),
          ...link.tags,
        ]
          .filter(Boolean)
          .join(" "),
      );
      const matchesQuery = !searchTerm || searchable.includes(searchTerm);

      return matchesCategory && matchesTag && matchesQuery;
    });
  }, [activeCategory, activeTag, links, query]);

  const featuredLinks = useMemo(
    () => links.filter((link) => link.featured).slice(0, 6),
    [links],
  );

  const shouldShowFeatured =
    activeCategory === "All" && activeTag === "All" && query.length === 0;

  async function copyLink(link: UILink) {
    try {
      await navigator.clipboard.writeText(link.url);
      setCopiedId(link.id);
      window.setTimeout(() => setCopiedId(null), 1400);
    } catch {
      setCopiedId(null);
    }
  }

  function resetFilters() {
    setQuery("");
    setActiveCategory("All");
    setActiveTag("All");
  }

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="wordmark" href="/" aria-label="ui.anants.studio home">
          <span className="wordmark-mark">ui</span>
          <span>anants.studio</span>
        </a>
        <nav className="topnav" aria-label="Primary">
          <a href="#directory">Directory</a>
          <a href="mailto:anant@anants.studio?subject=UI%20link%20for%20ui.anants.studio">
            Submit
          </a>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">
            <Sparkle aria-hidden="true" size={14} />
            UI links, sorted cleanly
          </p>
          <h1 id="hero-title">ui.anants.studio</h1>
          <p className="hero-lede">
            A black-shelf directory for the UI references worth opening twice:
            inspiration, components, systems, typography, motion, and tools.
          </p>
        </div>

        <div className="hero-panel" aria-label="Directory stats">
          <div>
            <span>{links.length}</span>
            <p>Links</p>
          </div>
          <div>
            <span>{categoryOrder.length}</span>
            <p>Stacks</p>
          </div>
          <div>
            <span>{featuredLinks.length}</span>
            <p>Pinned</p>
          </div>
        </div>
      </section>

      <section className="control-deck" aria-label="Filters">
        <div className="search-wrap">
          <Search aria-hidden="true" size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search links, tags, notes..."
            aria-label="Search UI links"
          />
          {query ? (
            <button
              className="icon-button ghost"
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              title="Clear search"
            >
              <X aria-hidden="true" size={16} />
            </button>
          ) : null}
        </div>

        <div className="filter-row">
          <div className="filter-label">
            <SlidersHorizontal aria-hidden="true" size={15} />
            Stack
          </div>
          <div className="chip-row" role="list" aria-label="Category filters">
            {(["All", ...categoryOrder] as CategoryFilter[]).map((category) => (
              <button
                key={category}
                className="chip"
                data-active={activeCategory === category}
                type="button"
                onClick={() => setActiveCategory(category)}
              >
                <span>{category}</span>
                <small>{categoryCounts.get(category) ?? 0}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="filter-row">
          <div className="filter-label">Tags</div>
          <div className="chip-row compact" role="list" aria-label="Tag filters">
            <button
              className="chip"
              data-active={activeTag === "All"}
              type="button"
              onClick={() => setActiveTag("All")}
            >
              All
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                className="chip"
                data-active={activeTag === tag}
                type="button"
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {shouldShowFeatured ? (
        <section className="featured-section" aria-labelledby="featured-title">
          <div className="section-heading">
            <p>Start here</p>
            <h2 id="featured-title">Pinned references</h2>
          </div>
          <div className="featured-rail">
            {featuredLinks.map((link, index) => (
              <a
                className="featured-link"
                href={link.url}
                key={link.id}
                rel="noreferrer"
                target="_blank"
                style={{ "--delay": `${index * 55}ms` } as React.CSSProperties}
              >
                <Image
                  alt=""
                  aria-hidden="true"
                  className="favicon"
                  height={28}
                  src={getFaviconUrl(link.url)}
                  width={28}
                />
                <span>{link.title}</span>
                <ArrowUpRight aria-hidden="true" size={15} />
              </a>
            ))}
          </div>
        </section>
      ) : null}

      <section className="directory" id="directory" aria-labelledby="directory-title">
        <div className="directory-head">
          <div>
            <p className="section-kicker">{filteredLinks.length} results</p>
            <h2 id="directory-title">Directory</h2>
          </div>
          <div className="directory-actions">
            <button
              className="icon-button"
              data-active={viewMode === "grid"}
              type="button"
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
              title="Grid view"
            >
              <Grid2X2 aria-hidden="true" size={17} />
            </button>
            <button
              className="icon-button"
              data-active={viewMode === "list"}
              type="button"
              onClick={() => setViewMode("list")}
              aria-label="List view"
              title="List view"
            >
              <List aria-hidden="true" size={17} />
            </button>
            {(query || activeCategory !== "All" || activeTag !== "All") && (
              <button className="reset-button" type="button" onClick={resetFilters}>
                Reset
              </button>
            )}
          </div>
        </div>

        {filteredLinks.length > 0 ? (
          <div className={`link-grid ${viewMode}`}>
            {filteredLinks.map((link, index) => (
              <article
                className="link-card"
                key={link.id}
                style={{ "--delay": `${index * 28}ms` } as React.CSSProperties}
              >
                <div className="card-topline">
                  <div className="source">
                    <Image
                      alt=""
                      aria-hidden="true"
                      className="favicon"
                      height={32}
                      src={getFaviconUrl(link.url)}
                      width={32}
                    />
                    <div>
                      <p>{link.category}</p>
                      <span>{getHost(link.url)}</span>
                    </div>
                  </div>
                  <div className="card-actions">
                    <button
                      className="icon-button ghost"
                      type="button"
                      onClick={() => copyLink(link)}
                      aria-label={`Copy ${link.title} URL`}
                      title={`Copy ${link.title} URL`}
                    >
                      {copiedId === link.id ? (
                        <Check aria-hidden="true" size={16} />
                      ) : (
                        <Copy aria-hidden="true" size={16} />
                      )}
                    </button>
                    <a
                      className="icon-button"
                      href={link.url}
                      rel="noreferrer"
                      target="_blank"
                      aria-label={`Open ${link.title}`}
                      title={`Open ${link.title}`}
                    >
                      <ArrowUpRight aria-hidden="true" size={16} />
                    </a>
                  </div>
                </div>

                <div className="card-body">
                  <h3>{link.title}</h3>
                  <p>{link.description}</p>
                </div>

                <div className="tag-list" aria-label={`${link.title} tags`}>
                  {link.tags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setActiveTag(tag)}
                      data-active={activeTag === tag}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No links found.</p>
            <button type="button" onClick={resetFilters}>
              Clear filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
