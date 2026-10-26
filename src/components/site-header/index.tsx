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
      <div className="mx-auto flex max-w-[1248px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3 md:px-8">
        <Link
          href="/"
          className="flex min-h-[44px] items-center gap-3 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-iwilf-bronze-light"
        >
          <img
            src={assetPath('/Images/iwilf-seal-112.webp')}
            alt=""
            width={56}
            height={56}
            className="h-12 w-12 md:h-14 md:w-14"
          />
          <span className="max-w-[14rem] font-sans text-sm font-bold uppercase leading-tight tracking-wide md:text-base">
            {orgName}
          </span>
        </Link>

        <div className="flex items-center gap-2 md:gap-6">
          <nav aria-label="Main">
            <ul className="flex items-center gap-1 md:gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-[44px] items-center rounded px-2 font-sans text-base hover:text-iwilf-bronze-light focus:outline-none focus-visible:ring-2 focus-visible:ring-iwilf-bronze-light"
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
            className="inline-flex min-h-[44px] items-center rounded bg-iwilf-bronze-dark px-5 font-sans text-base font-bold uppercase tracking-wide text-white hover:bg-iwilf-bronze focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Donate
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
