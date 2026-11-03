import React from 'react'
import { UserRound } from 'lucide-react'
import { assetPath } from '@/lib/assetPath'
import type { OralHistory } from '@/data/pages'

interface OralHistoryCardProps {
  entry: OralHistory
}

const linkClass =
  'inline-flex min-h-[44px] items-center rounded px-1 font-iwilf-sans text-sm font-bold text-iwilf-charcoal underline-offset-4 hover:text-iwilf-navy hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-iwilf-navy'

// One interview, laid out like the concept's cards: portrait on the left, then
// name, place, years and Watch / Read. Shows only what Ali approved for this
// person; without an approved photo the portrait is a neutral icon.
const OralHistoryCard = ({ entry }: OralHistoryCardProps) => {
  return (
    <article className="flex h-full overflow-hidden rounded bg-white shadow-sm">
      {entry.photo ? (
        <img
          src={assetPath(`/Images/oral-histories/${entry.photo.file}`)}
          alt={entry.photo.alt}
          width={160}
          height={200}
          loading="lazy"
          className="w-2/5 shrink-0 object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex w-2/5 shrink-0 items-center justify-center bg-iwilf-navy text-iwilf-bronze-light"
        >
          <UserRound className="h-14 w-14" strokeWidth={1.25} />
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col p-4">
        <h3 className="font-iwilf-serif text-xl text-iwilf-charcoal">{entry.displayName}</h3>
        <span aria-hidden="true" className="mt-2 block h-0.5 w-10 bg-iwilf-bronze" />
        {entry.location && (
          <p className="mt-2 font-iwilf-sans text-sm text-iwilf-charcoal">{entry.location}</p>
        )}
        {entry.served && (
          <p className="font-iwilf-sans text-sm text-iwilf-charcoal">
            {entry.served[0]}–{entry.served[1]}
          </p>
        )}
        {(entry.videoUrl || entry.transcriptUrl) && (
          <div className="mt-auto flex flex-wrap gap-x-4 pt-3">
            {entry.videoUrl && (
              <a
                href={entry.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
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
                className={linkClass}
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
      </div>
    </article>
  )
}

export default OralHistoryCard
