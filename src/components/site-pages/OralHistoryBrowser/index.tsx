'use client'

import React, { useMemo, useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import OralHistoryCard from '@/components/site-pages/OralHistoryCard'
import type { OralHistory } from '@/data/pages'

type FilterKey = 'year' | 'location' | 'unit' | 'language'

interface OralHistoryBrowserProps {
  entries: OralHistory[]
  searchLabel: string
  searchPlaceholder: string
  filters: ReadonlyArray<{ key: FilterKey; label: string }>
  pageSize: number
  loadMore: string
  emptyMessage: string
  noMatches: string
}

const emptyFilters: Record<FilterKey, string> = { year: '', location: '', unit: '', language: '' }

/** Every year an entry covers, so "2005" finds someone who served 2004–2007. */
const yearsOf = (entry: OralHistory): number[] => {
  if (!entry.served) return []
  const [first, last] = entry.served
  return Array.from({ length: last - first + 1 }, (_, i) => first + i)
}

const matches = (entry: OralHistory, key: FilterKey, value: string): boolean => {
  if (!value) return true
  if (key === 'year') return yearsOf(entry).includes(Number(value))
  return entry[key] === value
}

const controlClass =
  'min-h-[48px] w-full rounded border border-iwilf-stone bg-white font-iwilf-sans text-base text-iwilf-charcoal shadow-sm focus:border-iwilf-navy focus:outline-none focus:ring-2 focus:ring-iwilf-navy'

// Search bar, Year / Location / Unit / Language filters, card grid and "Load
// More Interviews" from the concept's Oral Histories page. Static export, so
// filtering runs in the browser. Each dropdown lists only values present in
// the published entries.
const OralHistoryBrowser = ({
  entries,
  searchLabel,
  searchPlaceholder,
  filters,
  pageSize,
  loadMore,
  emptyMessage,
  noMatches,
}: OralHistoryBrowserProps) => {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(emptyFilters)
  const [shown, setShown] = useState(pageSize)

  const options = useMemo(() => {
    const values = (key: FilterKey) =>
      key === 'year'
        ? [...new Set(entries.flatMap(yearsOf))].sort((a, b) => a - b).map(String)
        : [...new Set(entries.map((e) => e[key]).filter((v): v is string => Boolean(v)))].sort()
    return Object.fromEntries(filters.map(({ key }) => [key, values(key)])) as Record<
      FilterKey,
      string[]
    >
  }, [entries, filters])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return entries.filter(
      (entry) =>
        filters.every(({ key }) => matches(entry, key, selected[key])) &&
        (!q ||
          [entry.displayName, entry.location, entry.unit, entry.language]
            .join(' ')
            .toLowerCase()
            .includes(q))
    )
  }, [entries, filters, query, selected])

  const reset = () => {
    setQuery('')
    setSelected(emptyFilters)
    setShown(pageSize)
  }

  return (
    <div>
      <form
        role="search"
        onSubmit={(event) => event.preventDefault()}
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[2fr_repeat(4,1fr)_auto]"
      >
        <div className="relative sm:col-span-2 lg:col-span-1">
          <label htmlFor="oral-search" className="sr-only">
            {searchLabel}
          </label>
          <input
            id="oral-search"
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setShown(pageSize)
            }}
            placeholder={searchPlaceholder}
            className={`${controlClass} pe-11 ps-4 placeholder:text-iwilf-charcoal/70`}
          />
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute end-4 top-1/2 h-5 w-5 -translate-y-1/2 text-iwilf-charcoal"
          />
        </div>
        {filters.map(({ key, label }) => (
          <div key={key} className="relative">
            <label htmlFor={`oral-filter-${key}`} className="sr-only">
              {label}
            </label>
            <select
              id={`oral-filter-${key}`}
              value={selected[key]}
              onChange={(event) => {
                setSelected({ ...selected, [key]: event.target.value })
                setShown(pageSize)
              }}
              className={`${controlClass} appearance-none pe-10 ps-4`}
            >
              <option value="">{label}</option>
              {options[key].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute end-3 top-1/2 h-5 w-5 -translate-y-1/2 text-iwilf-charcoal"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={reset}
          className="min-h-[48px] rounded bg-iwilf-navy px-5 font-iwilf-sans text-sm font-bold uppercase tracking-wide text-white hover:bg-iwilf-bronze-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-iwilf-navy focus-visible:ring-offset-2"
        >
          Reset
        </button>
      </form>

      <div aria-live="polite" className="mt-8">
        {results.length === 0 ? (
          <p className="rounded border border-dashed border-iwilf-bronze bg-white/60 px-4 py-3 font-iwilf-sans text-base text-iwilf-charcoal">
            {entries.length === 0 ? emptyMessage : noMatches}
          </p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.slice(0, shown).map((entry) => (
              <li key={entry.id}>
                <OralHistoryCard entry={entry} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {results.length > shown && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setShown(shown + pageSize)}
            className="min-h-[48px] rounded border-2 border-iwilf-charcoal px-10 font-iwilf-sans text-sm font-bold uppercase tracking-wide text-iwilf-charcoal hover:bg-iwilf-charcoal hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-iwilf-navy focus-visible:ring-offset-2"
          >
            {loadMore}
          </button>
        </div>
      )}
    </div>
  )
}

export default OralHistoryBrowser
