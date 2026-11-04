'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ChevronDown, Eye, HandHeart, Medal, ShieldCheck, Target } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { AboutTab, AboutTabId, ValueId } from '@/data/pages'

const valueIcons: Record<ValueId, LucideIcon> = {
  integrity: ShieldCheck,
  accuracy: Target,
  respect: HandHeart,
  service: Medal,
  transparency: Eye,
}

const bodyText = 'mb-6 max-w-[62ch] font-iwilf-sans text-lg leading-8 text-iwilf-charcoal'

interface AboutTabsProps {
  tabs: AboutTab[]
  meetLeadership: string
  valuesHeading: string
  values: Array<{ id: ValueId; label: string }>
}

// The About tabs (Our Story and Leadership), with Our Values beside them. Follows the WAI
// tabs pattern: arrow keys, Home and End move between tabs. A link to
// /about-us/#leadership (or any tab id) opens that tab, including when the
// fragment changes while the page is open.
const AboutTabs = ({ tabs, meetLeadership, valuesHeading, values }: AboutTabsProps) => {
  const [active, setActive] = useState<AboutTabId>(tabs[0].id)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  useEffect(() => {
    const syncFromHash = () => {
      const fromHash = window.location.hash.slice(1)
      if (tabs.some((tab) => tab.id === fromHash)) setActive(fromHash as AboutTabId)
    }
    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    return () => window.removeEventListener('hashchange', syncFromHash)
  }, [tabs])

  const select = (id: AboutTabId, focus = false) => {
    setActive(id)
    window.history.replaceState(null, '', `#${id}`)
    if (focus) tabRefs.current[id]?.focus()
  }

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const last = tabs.length - 1
    const next =
      event.key === 'ArrowRight'
        ? index === last
          ? 0
          : index + 1
        : event.key === 'ArrowLeft'
          ? index === 0
            ? last
            : index - 1
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null
    if (next === null) return
    event.preventDefault()
    select(tabs[next].id, true)
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="About the Foundation"
        className="flex flex-wrap gap-x-2 border-b-2 border-iwilf-stone sm:gap-x-6"
      >
        {tabs.map((tab, index) => {
          const selected = tab.id === active
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el
              }}
              id={`tab-${tab.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(tab.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={`-mb-0.5 min-h-[48px] whitespace-nowrap border-b-4 px-2 font-iwilf-sans text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-iwilf-navy ${
                selected
                  ? 'border-iwilf-navy font-bold text-iwilf-navy'
                  : 'border-transparent text-iwilf-charcoal hover:text-iwilf-navy'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16">
        <div>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              id={`panel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${tab.id}`}
              tabIndex={0}
              hidden={tab.id !== active}
              className="rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-iwilf-navy"
            >
              <h2 className="mb-5 font-iwilf-serif text-3xl text-iwilf-navy">{tab.label}</h2>
              {tab.paragraphs?.map((paragraph) => (
                <p key={paragraph} className={bodyText}>
                  {paragraph}
                </p>
              ))}
              {tab.profiles?.map((profile) => (
                <article
                  key={profile.name}
                  className="mb-12 border-b border-iwilf-stone pb-12 last:mb-0 last:border-b-0 last:pb-0"
                >
                  <h3 className="font-iwilf-serif text-2xl text-iwilf-navy">{profile.name}</h3>
                  <p className="mb-6 mt-1 font-iwilf-sans text-lg font-medium text-iwilf-bronze-dark">
                    {profile.role}
                  </p>
                  {/* The opening paragraph always shows; the longer sections
                      collapse so the page reads as a summary first. Native
                      <details>: keyboard and screen-reader support built in,
                      and the full text stays in the page for search engines. */}
                  {profile.sections.map((section) =>
                    section.heading ? (
                      <details
                        key={section.heading}
                        className="group max-w-[62ch] border-t border-iwilf-stone text-lg last:border-b"
                      >
                        <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-4 rounded py-3 hover:text-iwilf-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-iwilf-navy [&::-webkit-details-marker]:hidden">
                          <h4 className="font-iwilf-sans text-lg font-bold text-iwilf-charcoal">
                            {section.heading}
                          </h4>
                          <ChevronDown
                            aria-hidden="true"
                            className="h-5 w-5 shrink-0 text-iwilf-navy transition-transform group-open:rotate-180 motion-reduce:transition-none"
                          />
                        </summary>
                        <div className="pb-2 pt-2">
                          {section.paragraphs.map((paragraph) => (
                            <p key={paragraph} className={bodyText}>
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </details>
                    ) : (
                      <div key="intro">
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph} className={bodyText}>
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    )
                  )}
                </article>
              ))}
              {tab.id === 'our-story' && (
                <button
                  type="button"
                  onClick={() => select('leadership', true)}
                  className="mt-2 min-h-[48px] rounded bg-iwilf-navy px-8 font-iwilf-sans text-sm font-bold uppercase tracking-wide text-white hover:bg-iwilf-bronze-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-iwilf-navy focus-visible:ring-offset-2"
                >
                  {meetLeadership}
                </button>
              )}
            </div>
          ))}
        </div>

        <aside
          aria-labelledby="values-heading"
          className="self-start rounded border border-iwilf-stone border-t-4 border-t-iwilf-navy bg-white p-8 shadow-sm"
        >
          <h2 id="values-heading" className="font-iwilf-serif text-2xl text-iwilf-navy">
            {valuesHeading}
          </h2>
          <ul className="mt-6 grid gap-4">
            {values.map(({ id, label }) => {
              const Icon = valueIcons[id]
              return (
                <li
                  key={id}
                  className="flex items-center gap-4 font-iwilf-sans text-lg font-medium text-iwilf-charcoal"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-iwilf-stone text-iwilf-navy"
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  {label}
                </li>
              )
            })}
          </ul>
        </aside>
      </div>
    </div>
  )
}

export default AboutTabs
