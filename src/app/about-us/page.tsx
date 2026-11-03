import React from 'react'
import type { Metadata } from 'next'
import SiteHeader from '@/components/site-header'
import PageIntro from '@/components/site-pages/PageIntro'
import AboutTabs from '@/components/site-pages/AboutTabs'
import { about } from '@/data/pages'
import { pageMetadata } from '@/lib/pageMetadata'

export const metadata: Metadata = pageMetadata({
  title: about.title,
  description: about.intro,
  path: '/about-us',
})

const AboutUsPage = () => {
  return (
    <>
      <SiteHeader current="/about-us" />
      <main id="main-content" className="bg-iwilf-warm-white">
        <PageIntro title={about.title} intro={about.intro} />
        <div className="mx-auto max-w-[1248px] px-4 py-10 md:px-8 lg:py-14">
          <AboutTabs
            tabs={about.tabs}
            meetLeadership={about.meetLeadership}
            valuesHeading={about.valuesHeading}
            values={about.values}
          />
        </div>
      </main>
    </>
  )
}

export default AboutUsPage
