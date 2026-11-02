import React from 'react'
import { FileText, Image as ImageIcon, Newspaper, PlayCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import ComingSoon from '@/components/site-pages/ComingSoon'
import type { ArchiveItem, ArchiveType } from '@/data/pages'

const icons: Record<ArchiveType, LucideIcon> = {
  article: FileText,
  news: Newspaper,
  photo: ImageIcon,
  video: PlayCircle,
}

interface ArchiveSectionProps {
  type: ArchiveType
  heading: string
  items: ArchiveItem[]
}

// One "browse by type" group of the archive. Every item links out to the
// original source in a new tab; nothing is embedded or re-hosted.
const ArchiveSection = ({ type, heading, items }: ArchiveSectionProps) => {
  const Icon = icons[type]
  const id = `archive-${type}`

  return (
    <section id={type} aria-labelledby={id} className="scroll-mt-6">
      <h2 id={id} className="flex items-center gap-3 font-iwilf-serif text-3xl text-iwilf-navy">
        <Icon aria-hidden="true" className="h-7 w-7 text-iwilf-bronze" strokeWidth={1.75} />
        {heading}
      </h2>
      <div className="mt-4">
        {items.length === 0 ? (
          <ComingSoon />
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {items.map((item) => (
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
        )}
      </div>
    </section>
  )
}

export default ArchiveSection
