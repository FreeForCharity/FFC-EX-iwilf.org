import React from 'react'
import { donateUrl, support } from '@/data/landing'

const SupportSection = () => {
  return (
    <section id="support" aria-labelledby="support-heading" className="bg-iwilf-stone">
      <div className="mx-auto flex max-w-[1248px] flex-col items-start gap-8 px-4 py-16 md:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 id="support-heading" className="text-3xl text-iwilf-navy md:text-4xl">
            {support.heading}
          </h2>
          <p className="mt-4 font-sans text-lg leading-relaxed text-iwilf-charcoal">
            {support.body}
          </p>
        </div>
        <a
          href={donateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded bg-iwilf-bronze-dark px-8 font-sans text-base font-bold uppercase tracking-wide text-white hover:bg-iwilf-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-iwilf-navy focus-visible:ring-offset-2"
        >
          Donate Now
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </section>
  )
}

export default SupportSection
