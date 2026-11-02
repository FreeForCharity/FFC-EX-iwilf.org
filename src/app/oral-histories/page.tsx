import React from 'react'
import type { Metadata } from 'next'
import SiteHeader from '@/components/site-header'
import PageIntro from '@/components/site-pages/PageIntro'
import ComingSoon from '@/components/site-pages/ComingSoon'
import OralHistoryCard from '@/components/site-pages/OralHistoryCard'
import { oralHistories } from '@/data/pages'
import { pageMetadata } from '@/lib/pageMetadata'

export const metadata: Metadata = pageMetadata({
  title: oralHistories.title,
  description: oralHistories.intro,
  path: '/oral-histories',
})

const OralHistoriesPage = () => {
  const { entries } = oralHistories

  return (
    <>
      <SiteHeader current="/oral-histories" />
      <main id="main-content" className="bg-iwilf-warm-white">
        <PageIntro title={oralHistories.title} intro={oralHistories.intro} />

        <section
          aria-labelledby="interviews-heading"
          className="mx-auto max-w-[1248px] px-4 py-16 md:px-8 lg:py-20"
        >
          <h2
            id="interviews-heading"
            className="mb-6 font-iwilf-serif text-3xl text-iwilf-navy md:text-4xl"
          >
            Interviews
          </h2>
          {entries.length === 0 ? (
            <ComingSoon>Interviews will appear here as they are published.</ComingSoon>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {entries.map((entry) => (
                <li key={entry.id}>
                  <OralHistoryCard entry={entry} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  )
}

export default OralHistoriesPage
