import React from 'react'
import type { Metadata } from 'next'
import SiteHeader from '@/components/site-header'
import PageIntro from '@/components/site-pages/PageIntro'
import ComingSoon from '@/components/site-pages/ComingSoon'
import { mission } from '@/data/landing'
import { about } from '@/data/pages'
import { pageMetadata } from '@/lib/pageMetadata'

export const metadata: Metadata = pageMetadata({
  title: about.title,
  description: about.intro,
  path: '/about-us',
})

const sectionHeading = 'font-iwilf-serif text-3xl text-iwilf-navy md:text-4xl'

const AboutUsPage = () => {
  return (
    <>
      <SiteHeader current="/about-us" />
      <main id="main-content" className="bg-iwilf-warm-white">
        <PageIntro title={about.title} intro={about.intro} />

        <div className="mx-auto grid max-w-[1248px] gap-14 px-4 py-16 md:px-8 lg:grid-cols-[2fr_1fr] lg:py-20">
          <div className="grid gap-14">
            <section aria-labelledby="about-mission">
              <h2 id="about-mission" className={sectionHeading}>
                {about.missionHeading}
              </h2>
              {mission.statements.map((statement) => (
                <p
                  key={statement}
                  className="mt-4 font-iwilf-sans text-lg leading-relaxed text-iwilf-charcoal"
                >
                  {statement}
                </p>
              ))}
            </section>

            {about.pendingSections.map((heading) => {
              const id = `about-${heading.toLowerCase().replace(/\s+/g, '-')}`
              return (
                <section key={heading} aria-labelledby={id}>
                  <h2 id={id} className={`${sectionHeading} mb-4`}>
                    {heading}
                  </h2>
                  <ComingSoon />
                </section>
              )
            })}
          </div>

          <aside aria-labelledby="about-values" className="self-start rounded bg-iwilf-stone p-6">
            <h2 id="about-values" className="font-iwilf-serif text-2xl text-iwilf-navy">
              {about.valuesHeading}
            </h2>
            <ul className="mt-4 grid gap-2 font-iwilf-sans text-lg text-iwilf-charcoal">
              {about.values.map((value) => (
                <li key={value} className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-iwilf-bronze" />
                  {value}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </main>
    </>
  )
}

export default AboutUsPage
