import React from 'react'
import Link from 'next/link'
import { assetPath } from '@/lib/assetPath'
import { donateUrl, navLinks, orgName } from '@/data/landing'

// IWILF top bar: seal, name, in-page section links and the Donate button.
// A new component rather than an edit to src/components/header, which FFC's
// rebrand PR #6 also changes. Server component: the two links wrap on small
// screens, so no menu toggle (and no client JS) is needed yet.
const SiteHeader = () => {
  return (
    <header className="bg-iwilf-navy text-white">
      {/* Seal and Donate on the top row, section links centred on a row
          below, as in the design concept. */}
      <div className="mx-auto flex max-w-[1248px] flex-wrap items-center justify-between gap-x-3 gap-y-2 md:gap-x-6 px-4 py-3 md:px-8">
        <Link
          href="/"
          className="flex min-h-[44px] items-center gap-2 rounded md:gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-iwilf-bronze-light"
        >
          <img
            src={assetPath('/Images/iwilf-seal-112.webp')}
            alt=""
            width={56}
            height={56}
            className="h-10 w-10 md:h-14 md:w-14"
          />
          <span className="max-w-[11.5rem] font-iwilf-sans md:max-w-[14rem] text-sm font-bold uppercase leading-tight md:text-base md:tracking-wide">
            {orgName}
          </span>
        </Link>

        <nav aria-label="Main" className="order-last w-full">
          <ul className="flex items-center justify-center gap-1 md:gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-[44px] items-center rounded px-2 font-iwilf-sans text-base hover:text-iwilf-bronze-light focus:outline-none focus-visible:ring-2 focus-visible:ring-iwilf-bronze-light"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={donateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center rounded bg-iwilf-bronze-dark px-4 md:px-5 font-iwilf-sans text-base font-bold uppercase tracking-wide text-white hover:bg-iwilf-bronze-light hover:text-iwilf-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Donate
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </header>
  )
}

export default SiteHeader
