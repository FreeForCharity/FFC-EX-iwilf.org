import React from 'react'
import { Archive, Award, FileText, GraduationCap, Search, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { mission } from '@/data/landing'

const icons: Record<string, LucideIcon> = {
  Preserve: FileText,
  Archive: Archive,
  Honor: Award,
  Research: Search,
  Educate: GraduationCap,
  Convene: Users,
}

const MissionSection = () => {
  return (
    <section id="mission" aria-labelledby="mission-heading" className="bg-iwilf-warm-white">
      <div className="mx-auto grid max-w-[1248px] gap-12 px-4 py-16 md:px-8 lg:grid-cols-[1fr_2fr] lg:py-24">
        <div>
          <h2 id="mission-heading" className="text-3xl text-iwilf-navy md:text-4xl">
            {mission.heading}
          </h2>
          {mission.statements.map((statement) => (
            <p
              key={statement}
              className="mt-4 font-sans text-lg leading-relaxed text-iwilf-charcoal"
            >
              {statement}
            </p>
          ))}
        </div>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {mission.pillars.map((pillar) => {
            const Icon = icons[pillar.title] ?? FileText
            return (
              <li key={pillar.title}>
                <Icon aria-hidden="true" className="h-8 w-8 text-iwilf-bronze" strokeWidth={1.75} />
                <h3 className="mt-3 font-sans text-base font-bold uppercase tracking-wide text-iwilf-navy">
                  {pillar.title}
                </h3>
                <p className="mt-1 font-sans text-base leading-relaxed text-iwilf-charcoal">
                  {pillar.description}
                </p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default MissionSection
