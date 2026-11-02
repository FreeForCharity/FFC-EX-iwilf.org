'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Eye, HandHeart, Medal, ShieldCheck, Target } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { AboutTab, AboutTabId, ValueId } from '@/data/pages'

const valueIcons: Record<ValueId, LucideIcon> = {
  integrity: ShieldCheck,
  accuracy: Target,
  respect: HandHeart,
  service: Medal,
  transparency: Eye,
}

interface AboutTabsProps {
  tabs: AboutTab[]
  meetLeadership: string
  valuesHeading: string
  values: Array<{ id: ValueId; label: string }>
}

// The concept's five About tabs, with Our Values beside them. Follows the WAI
// tabs pattern: arrow keys, Home and End move between tabs. A link to
// /about-us/#leadership (or any tab id) opens that tab.
const AboutTabs = ({ tabs, meetLeadership, valuesHeading, values }: AboutTabsProps) => {
  const [active, setActive] = useState<AboutTabId>(tabs[0].id)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  useEffect(() => {
    const fromHash = window.location.hash.slice(1)
    if (tabs.some((tab) => tab.id === fromHash)) setActive(fromHash as AboutTabId)
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
              {tab.paragraphs.length > 0 ? (
                tab.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mb-6 max-w-[62ch] font-iwilf-sans text-lg leading-8 text-iwilf-charcoal"
                  >
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="max-w-[62ch] rounded border border-dashed border-iwilf-bronze bg-white px-5 py-4 font-iwilf-sans text-lg text-iwilf-charcoal">
                  Coming soon.
                </p>
              )}
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
