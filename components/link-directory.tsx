"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { MouseEvent } from "react";
import type { LinkCategory, UILink } from "@/data/links";
import { categoryOrder } from "@/data/links";

function getHost(url: string) {
  return new URL(url).hostname.replace(/^www\./, "");
}

function getFaviconUrl(url: string) {
  const domain = getHost(url);
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
}

function getGroupedLinks(links: UILink[]) {
  return categoryOrder
    .map((category) => ({
      category,
      links: links.filter((link) => link.category === category),
    }))
    .filter((group) => group.links.length > 0);
}

function openInNewTab(event: MouseEvent<HTMLAnchorElement>, url: string) {
  if (event.defaultPrevented) {
    return;
  }

  if (event.type === "auxclick" && event.button !== 1) {
    return;
  }

  if (event.type === "click" && event.button !== 0) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
  window.open(url, "_blank", "noopener,noreferrer");
}

export function LinkDirectory({ links }: { links: UILink[] }) {
  const groups = getGroupedLinks(links);

  return (
    <main className="site-shell">
      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">curated interface links</p>
        <h1 id="hero-title">ui.anants.studio</h1>
        <p className="hero-lede">
          A quiet directory for UI inspiration, components, color, type, assets,
          mockups, channels, and tools.
        </p>
      </section>

      <div className="directory-layout">
        <aside className="category-rail" aria-label="Directory sections">
          {groups.map((group) => (
            <a href={`#${group.category.toLowerCase()}`} key={group.category}>
              <span>{group.category}</span>
              <small>{group.links.length}</small>
            </a>
          ))}
        </aside>

        <div className="directory">
          {groups.map((group) => (
            <DirectorySection
              category={group.category}
              key={group.category}
              links={group.links}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

function DirectorySection({
  category,
  links,
}: {
  category: LinkCategory;
  links: UILink[];
}) {
  return (
    <section
      className="directory-section"
      id={category.toLowerCase()}
      aria-labelledby={`${category.toLowerCase()}-title`}
    >
      <div className="section-heading">
        <p>{links.length} links</p>
        <h2 id={`${category.toLowerCase()}-title`}>{category}</h2>
      </div>

      <div className="link-list">
        {links.map((link) => (
          <LinkRow key={link.id} link={link} />
        ))}
      </div>
    </section>
  );
}

function LinkRow({ link }: { link: UILink }) {
  const descriptionId = `${link.id}-description`;
  const newTabId = `${link.id}-new-tab`;
  const sourceUrl = link.sourceUrl;
  const titleId = `${link.id}-title`;

  return (
    <article className="link-row">
      <a
        aria-describedby={`${descriptionId} ${newTabId}`}
        aria-labelledby={titleId}
        className="link-hit-area"
        href={link.url}
        onAuxClick={(event) => openInNewTab(event, link.url)}
        onClick={(event) => openInNewTab(event, link.url)}
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className="sr-only" id={newTabId}>
          Opens in a new tab
        </span>
      </a>

      <Image
        alt=""
        aria-hidden="true"
        className="favicon"
        height={34}
        src={getFaviconUrl(link.url)}
        unoptimized
        width={34}
      />

      <span className="link-main">
        <span className="link-title" id={titleId}>
          {link.title}
        </span>
        <span className="link-description" id={descriptionId}>
          {link.description}
        </span>
        {sourceUrl ? (
          <a
            className="source-link"
            href={sourceUrl}
            onAuxClick={(event) => openInNewTab(event, sourceUrl)}
            onClick={(event) => openInNewTab(event, sourceUrl)}
            rel="noopener noreferrer"
            target="_blank"
          >
            {link.sourceLabel ?? "Source"}
          </a>
        ) : null}
      </span>

      <span className="link-meta">
        <span>{getHost(link.url)}</span>
        <ArrowUpRight aria-hidden="true" size={15} />
      </span>
    </article>
  );
}
