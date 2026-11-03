import React from 'react'
import { assetPath } from '@/lib/assetPath'

interface PageIntroProps {
  title: string
  intro: string
  /**
   * Optional photo for the right half, as in the concept. A file in
   * public/Images/, and only one Ali has approved.
   */
  image?: { file: string; alt: string }
}

// Light title band at the top of each site page, holding the page's only <h1>
// (the concept's "Other pages" layout).
const PageIntro = ({ title, intro, image }: PageIntroProps) => {
  return (
    <section className="border-b border-iwilf-stone bg-gradient-to-r from-iwilf-warm-white to-iwilf-stone">
      <div className="mx-auto grid max-w-[1248px] items-center gap-8 px-4 py-12 md:px-8 lg:min-h-[18rem] lg:grid-cols-2 lg:py-16">
        <div>
          <h1 className="font-iwilf-serif text-4xl leading-tight text-iwilf-charcoal md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-md font-iwilf-sans text-lg leading-relaxed text-iwilf-charcoal">
            {intro}
          </p>
        </div>
        {image && (
          <img
            src={assetPath(`/Images/${image.file}`)}
            alt={image.alt}
            className="hidden h-72 w-full rounded object-cover lg:block"
          />
        )}
      </div>
    </section>
  )
}

export default PageIntro
