import React from 'react'
import type { Metadata } from 'next'
import SiteHeader from '@/components/site-header'
import PageIntro from '@/components/site-pages/PageIntro'
import OralHistoryBrowser from '@/components/site-pages/OralHistoryBrowser'
import { oralHistories } from '@/data/pages'
import { pageMetadata } from '@/lib/pageMetadata'

export const metadata: Metadata = pageMetadata({
  title: oralHistories.title,
  description: oralHistories.intro,
  path: '/oral-histories',
})

const OralHistoriesPage = () => {
  return (
    <>
      <SiteHeader current="/oral-histories" />
      <main id="main-content" className="bg-iwilf-warm-white">
        <PageIntro title={oralHistories.title} intro={oralHistories.intro} />

        <section
          aria-label="Interviews"
          className="mx-auto max-w-[1248px] px-4 py-12 md:px-8 lg:py-16"
        >
          <OralHistoryBrowser
            entries={oralHistories.entries}
            searchLabel={oralHistories.searchLabel}
            searchPlaceholder={oralHistories.searchPlaceholder}
            filters={oralHistories.filters}
            pageSize={oralHistories.pageSize}
            loadMore={oralHistories.loadMore}
            emptyMessage={oralHistories.emptyMessage}
            noMatches={oralHistories.noMatches}
          />
        </section>
      </main>
    </>
  )
}

export default OralHistoriesPage
