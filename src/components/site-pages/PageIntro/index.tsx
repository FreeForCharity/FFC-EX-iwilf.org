import React from 'react'

interface PageIntroProps {
  title: string
  intro: string
}

// Navy title band at the top of each site page, holding the page's only <h1>.
const PageIntro = ({ title, intro }: PageIntroProps) => {
  return (
    <section className="bg-iwilf-navy text-white">
      <div className="mx-auto max-w-[1248px] px-4 py-12 md:px-8 lg:py-16">
        <h1 className="font-iwilf-serif text-4xl leading-tight md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl font-iwilf-sans text-lg leading-relaxed text-white/90">
          {intro}
        </p>
      </div>
    </section>
  )
}

export default PageIntro
