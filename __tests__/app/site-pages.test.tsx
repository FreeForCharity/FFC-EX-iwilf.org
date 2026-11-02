import React from 'react'
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

import AboutUsPage from '../../src/app/about-us/page'
import ArchivePage from '../../src/app/archive/page'
import OralHistoriesPage from '../../src/app/oral-histories/page'
import ArchiveSection from '../../src/components/site-pages/ArchiveSection'
import OralHistoryCard from '../../src/components/site-pages/OralHistoryCard'
import { about, archive, oralHistories } from '../../src/data/pages'

expect.extend(toHaveNoViolations)

const pages: Array<[string, () => React.JSX.Element, string, string]> = [
  ['About Us', AboutUsPage, about.title, '/about-us'],
  ['Archive', ArchivePage, archive.title, '/archive'],
  ['Oral Histories', OralHistoriesPage, oralHistories.title, '/oral-histories'],
]

describe.each(pages)('%s page', (label, Page, title) => {
  it('owns the main landmark and a single top-level heading', () => {
    render(<Page />)
    const mains = screen.getAllByRole('main')
    expect(mains).toHaveLength(1)
    expect(mains[0]).toHaveAttribute('id', 'main-content')

    const h1s = screen.getAllByRole('heading', { level: 1 })
    expect(h1s).toHaveLength(1)
    expect(h1s[0]).toHaveTextContent(title)
  })

  it('marks itself as the current page in the header', () => {
    render(<Page />)
    expect(screen.getByRole('link', { name: label })).toHaveAttribute('aria-current', 'page')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Page />)
    expect(await axe(container)).toHaveNoViolations()
  })
})

describe('About Us page', () => {
  it("shows Ali's mission statement and a placeholder for each pending section", () => {
    render(<AboutUsPage />)
    expect(
      screen.getByRole('heading', { level: 2, name: about.missionHeading })
    ).toBeInTheDocument()
    for (const heading of about.pendingSections) {
      expect(screen.getByRole('heading', { level: 2, name: heading })).toBeInTheDocument()
    }
    expect(screen.getAllByText('Coming soon.')).toHaveLength(about.pendingSections.length)
  })
})

describe('Archive page', () => {
  it('has a browse-by-type link and a section for every type', () => {
    const { container } = render(<ArchivePage />)
    const browse = screen.getByRole('navigation', { name: 'Browse by type' })
    for (const { type, heading } of archive.types) {
      expect(browse.querySelector(`a[href="#${type}"]`)).toHaveTextContent(heading)
      expect(container.querySelector(`section#${type}`)).toBeInTheDocument()
    }
  })
})

describe('ArchiveSection', () => {
  const item = {
    type: 'article' as const,
    title: 'Example article',
    source: 'Example Times',
    date: '2008',
    url: 'https://example.com/article',
  }

  it('shows "coming soon" when a type has no items', () => {
    render(<ArchiveSection type="news" heading="News" items={[]} />)
    expect(screen.getByText('Coming soon.')).toBeInTheDocument()
  })

  it('links each item out to its source in a new tab', async () => {
    const { container } = render(
      <ArchiveSection type="article" heading="Articles" items={[item]} />
    )
    const link = screen.getByRole('link', { name: /Example article/ })
    expect(link).toHaveAttribute('href', item.url)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
    expect(screen.getByText('Example Times · 2008')).toBeInTheDocument()
    expect(await axe(container)).toHaveNoViolations()
  })
})

describe('Oral Histories page', () => {
  it('shows the empty state until interviews are published', () => {
    render(<OralHistoriesPage />)
    expect(oralHistories.entries).toHaveLength(0)
    expect(screen.getByText(/Interviews will appear here/)).toBeInTheDocument()
  })
})

describe('OralHistoryCard', () => {
  it('shows a neutral icon, not a photo, when none is approved', async () => {
    const { container } = render(
      <OralHistoryCard
        entry={{ id: 'a', displayName: 'Anonymous interpreter', summary: 'Summary text.' }}
      />
    )
    expect(container.querySelector('img')).toBeNull()
    expect(screen.getByRole('heading', { level: 3, name: 'Anonymous interpreter' })).toBeVisible()
    expect(screen.queryByRole('link')).toBeNull()
    expect(await axe(container)).toHaveNoViolations()
  })

  it('shows an approved photo and links to the video and transcript', async () => {
    const { container } = render(
      <OralHistoryCard
        entry={{
          id: 'b',
          displayName: 'Example N.',
          served: '2004–2007',
          summary: 'Summary text.',
          photo: { file: 'example.webp', alt: 'Portrait of Example N.' },
          videoUrl: 'https://example.com/video',
          transcriptUrl: 'https://example.com/transcript',
        }}
      />
    )
    expect(screen.getByRole('img', { name: 'Portrait of Example N.' })).toHaveAttribute(
      'src',
      expect.stringContaining('/Images/oral-histories/example.webp')
    )
    expect(screen.getByText('Served 2004–2007')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Watch/ })).toHaveAttribute(
      'href',
      'https://example.com/video'
    )
    expect(screen.getByRole('link', { name: /Read/ })).toHaveAttribute(
      'href',
      'https://example.com/transcript'
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
