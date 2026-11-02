import React from 'react'
import type { Metadata } from 'next'
import SiteHeader from '@/components/site-header'
import PageIntro from '@/components/site-pages/PageIntro'
import ArchiveSection from '@/components/site-pages/ArchiveSection'
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

        <div className="mx-auto max-w-[1248px] px-4 py-16 md:px-8 lg:py-20">
          <nav aria-label="Browse by type">
            <ul className="flex flex-wrap gap-3">
              {archive.types.map(({ type, heading }) => (
                <li key={type}>
                  <a
                    href={`#${type}`}
                    className="inline-flex min-h-[44px] items-center rounded border border-iwilf-navy px-4 font-iwilf-sans text-base text-iwilf-navy hover:bg-iwilf-navy hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-iwilf-navy focus-visible:ring-offset-2"
                  >
                    {heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-12 grid gap-14">
            {archive.types.map(({ type, heading }) => (
              <ArchiveSection
                key={type}
                type={type}
                heading={heading}
                items={archive.items.filter((item) => item.type === type)}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default ArchivePage
