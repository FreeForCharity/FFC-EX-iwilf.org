'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { BookCopy, Camera, FileText, Map, Mic, MicVocal, Search } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ArchiveItem, ArchiveType } from '@/data/pages'

const icons: Record<ArchiveType, LucideIcon> = {
  document: FileText,
  'oral-history': Mic,
  photograph: Camera,
  interview: MicVocal,
  map: Map,
  publication: BookCopy,
}

interface ArchiveBrowserProps {
  searchLabel: string
  searchPlaceholder: string
  browseHeading: string
  types: Array<{ type: ArchiveType; label: string; href?: string }>
  items: ArchiveItem[]
  emptyMessage: string
}

const tileClass =
  'flex h-full min-h-[7.5rem] flex-col items-center justify-center gap-3 rounded bg-iwilf-stone/60 px-3 py-5 text-center font-iwilf-sans text-base text-iwilf-charcoal hover:bg-iwilf-stone focus:outline-none focus-visible:ring-2 focus-visible:ring-iwilf-navy focus-visible:ring-offset-2'

// Search bar and "Browse by Type" tiles from the concept's Archive page. Static
// export, so search and filtering run in the browser over the items in
// src/data/pages.ts. Results only show once someone searches or picks a type.
const ArchiveBrowser = ({
  searchLabel,
  searchPlaceholder,
  browseHeading,
  types,
  items,
  emptyMessage,
}: ArchiveBrowserProps) => {
  const [query, setQuery] = useState('')
  const [activeType, setActiveType] = useState<ArchiveType | null>(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter(
      (item) =>
        (!activeType || item.type === activeType) &&
        (!q ||
          [item.title, item.source, item.description ?? '', item.date ?? '']
            .join(' ')
            .toLowerCase()
            .includes(q))
    )
  }, [items, query, activeType])

  const browsing = query.trim() !== '' || activeType !== null

  return (
    <div>
      <form role="search" onSubmit={(event) => event.preventDefault()} className="relative">
        <label htmlFor="archive-search" className="sr-only">
          {searchLabel}
        </label>
        <input
          id="archive-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={searchPlaceholder}
          className="min-h-[52px] w-full rounded border border-iwilf-stone bg-white py-3 pe-12 ps-4 font-iwilf-sans text-base text-iwilf-charcoal shadow-sm placeholder:text-iwilf-charcoal/70 focus:border-iwilf-navy focus:outline-none focus:ring-2 focus:ring-iwilf-navy"
        />
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute end-4 top-1/2 h-5 w-5 -translate-y-1/2 text-iwilf-charcoal"
        />
      </form>

      <h2
        id="browse-heading"
        className="mt-10 font-iwilf-sans text-sm font-bold uppercase tracking-wider text-iwilf-charcoal"
      >
        {browseHeading}
      </h2>
      <ul
        aria-labelledby="browse-heading"
        className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
      >
        {types.map(({ type, label, href }) => {
          const Icon = icons[type]
          const content = (
            <>
              <Icon aria-hidden="true" className="h-9 w-9 text-iwilf-navy" strokeWidth={1.5} />
              {label}
            </>
          )
          return (
            <li key={type}>
              {href ? (
                <Link href={href} className={tileClass}>
                  {content}
                </Link>
              ) : (
                <button
                  type="button"
                  aria-pressed={activeType === type}
                  onClick={() => setActiveType(activeType === type ? null : type)}
                  className={`${tileClass} w-full aria-pressed:bg-iwilf-navy aria-pressed:text-white aria-pressed:[&>svg]:text-white`}
                >
                  {content}
                </button>
              )}
            </li>
          )
        })}
      </ul>

      <div aria-live="polite">
        {browsing &&
          (results.length === 0 ? (
            <p className="mt-8 rounded border border-dashed border-iwilf-bronze bg-white/60 px-4 py-3 font-iwilf-sans text-base text-iwilf-charcoal">
              {items.length === 0 ? emptyMessage : 'No archive items match your search.'}
            </p>
          ) : (
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {results.map((item) => (
                <li key={item.url} className="rounded bg-white p-5 shadow-sm">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded font-iwilf-sans text-lg font-bold text-iwilf-navy underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-iwilf-navy"
                  >
                    {item.title}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  <p className="mt-1 font-iwilf-sans text-sm text-iwilf-charcoal">
                    {item.date ? `${item.source} · ${item.date}` : item.source}
                  </p>
                  {item.description && (
                    <p className="mt-2 font-iwilf-sans text-base leading-relaxed text-iwilf-charcoal">
                      {item.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ))}
      </div>
    </div>
  )
}

export default ArchiveBrowser
