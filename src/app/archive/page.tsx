import React from 'react'
import type { Metadata } from 'next'
import { FolderOpen } from 'lucide-react'
import SiteHeader from '@/components/site-header'
import PageIntro from '@/components/site-pages/PageIntro'
import ArchiveBrowser from '@/components/site-pages/ArchiveBrowser'
import { archive } from '@/data/pages'
import { pageMetadata } from '@/lib/pageMetadata'

export const metadata: Metadata = pageMetadata({
  title: archive.title,
  description: archive.intro,
  path: '/archive',
})

const ArchivePage = () => {
  return (
    <>
      <SiteHeader current="/archive" />
      <main id="main-content" className="bg-iwilf-warm-white">
        <PageIntro title={archive.title} intro={archive.intro} />

        <div className="mx-auto max-w-[1248px] px-4 py-12 md:px-8 lg:py-16">
          <ArchiveBrowser
            searchLabel={archive.searchLabel}
            searchPlaceholder={archive.searchPlaceholder}
            browseHeading={archive.browseHeading}
            types={archive.types}
            items={archive.items}
            emptyMessage={archive.emptyMessage}
          />

          <section
            aria-labelledby="collections-heading"
            className="mt-12 border-t border-iwilf-stone pt-10"
          >
            <h2
              id="collections-heading"
              className="font-iwilf-sans text-sm font-bold uppercase tracking-wider text-iwilf-charcoal"
            >
              {archive.collectionsHeading}
            </h2>
            {/* The concept shows a photo per collection; until there are
                approved photos and items, each card is a placeholder. */}
            <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {archive.collections.map((name) => (
                <li key={name}>
                  <div
                    aria-hidden="true"
                    className="flex aspect-[4/3] items-center justify-center rounded bg-iwilf-navy"
                  >
                    <FolderOpen className="h-12 w-12 text-iwilf-bronze-light" strokeWidth={1.25} />
                  </div>
                  <h3 className="mt-3 font-iwilf-sans text-base font-bold text-iwilf-charcoal">
                    {name}
                  </h3>
                  <p className="font-iwilf-sans text-sm text-iwilf-charcoal">Coming soon</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  )
}

export default ArchivePage
