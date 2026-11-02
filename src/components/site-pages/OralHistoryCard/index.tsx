import React from 'react'
import { UserRound } from 'lucide-react'
import { assetPath } from '@/lib/assetPath'
import type { OralHistory } from '@/data/pages'

interface OralHistoryCardProps {
  entry: OralHistory
}

const linkClass =
  'inline-flex min-h-[44px] items-center rounded px-4 font-iwilf-sans text-sm font-bold uppercase tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-iwilf-navy focus-visible:ring-offset-2'

// One interview. Shows only what Ali approved for this person: the name as
// given, and a photo only when one is supplied (otherwise a neutral icon).
const OralHistoryCard = ({ entry }: OralHistoryCardProps) => {
  return (
    <article className="flex h-full flex-col rounded bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        {entry.photo ? (
          <img
            src={assetPath(`/Images/oral-histories/${entry.photo.file}`)}
            alt={entry.photo.alt}
            width={80}
            height={80}
            loading="lazy"
            className="h-20 w-20 rounded object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-20 w-20 items-center justify-center rounded bg-iwilf-stone text-iwilf-navy"
          >
            <UserRound className="h-10 w-10" strokeWidth={1.5} />
          </span>
        )}
        <div>
          <h3 className="font-iwilf-serif text-2xl text-iwilf-navy">{entry.displayName}</h3>
          {entry.served && (
            <p className="font-iwilf-sans text-sm text-iwilf-charcoal">Served {entry.served}</p>
          )}
        </div>
      </div>
      <p className="mt-4 flex-1 font-iwilf-sans text-base leading-relaxed text-iwilf-charcoal">
        {entry.summary}
      </p>
      {(entry.videoUrl || entry.transcriptUrl) && (
        <div className="mt-4 flex flex-wrap gap-3">
          {entry.videoUrl && (
            <a
              href={entry.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkClass} bg-iwilf-bronze-dark text-white hover:bg-iwilf-navy`}
            >
              Watch
              <span className="sr-only">
                {' '}
                {entry.displayName}&apos;s interview (opens in a new tab)
              </span>
            </a>
          )}
          {entry.transcriptUrl && (
            <a
              href={entry.transcriptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkClass} border-2 border-iwilf-navy text-iwilf-navy hover:bg-iwilf-navy hover:text-white`}
            >
              Read
              <span className="sr-only">
                {' '}
                {entry.displayName}&apos;s transcript (opens in a new tab)
              </span>
            </a>
          )}
        </div>
      )}
    </article>
  )
}

export default OralHistoryCard
