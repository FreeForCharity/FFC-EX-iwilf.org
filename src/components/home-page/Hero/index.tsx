import React from 'react'
import { assetPath } from '@/lib/assetPath'
import { donateUrl, hero } from '@/data/landing'

// Solid navy hero (no photo until Ali approves one) holding the page's only <h1>.
const Hero = () => {
  return (
    <section id="hero" className="bg-iwilf-navy text-white">
      <div className="mx-auto grid max-w-[1248px] items-center gap-10 px-4 py-16 md:px-8 lg:grid-cols-[1fr_auto] lg:py-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl leading-tight md:text-5xl lg:text-6xl">
            <span className="block">{hero.titleLead}</span>
            <span className="block">{hero.title}</span>
          </h1>
          <p className="mt-6 font-sans text-lg leading-relaxed text-white/90">{hero.intro}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#mission"
              className="inline-flex min-h-[44px] items-center justify-center rounded bg-iwilf-bronze-dark px-6 font-sans text-base font-bold uppercase tracking-wide text-white hover:bg-iwilf-bronze-light hover:text-iwilf-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Our Mission
            </a>
            <a
              href={donateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center rounded border-2 border-white px-6 font-sans text-base font-bold uppercase tracking-wide text-white hover:bg-white hover:text-iwilf-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-iwilf-bronze-light"
            >
              Support the Foundation
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
        <img
          src={assetPath('/Images/iwilf-seal-480.webp')}
          alt=""
          width={320}
          height={320}
          className="mx-auto hidden h-64 w-64 lg:block xl:h-80 xl:w-80"
        />
      </div>
    </section>
  )
}

export default Hero
