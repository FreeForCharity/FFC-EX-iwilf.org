import React from 'react'
import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

import AboutUsPage from '../../src/app/about-us/page'
import ArchivePage from '../../src/app/archive/page'
import OralHistoriesPage from '../../src/app/oral-histories/page'
import ArchiveBrowser from '../../src/components/site-pages/ArchiveBrowser'
import OralHistoryBrowser from '../../src/components/site-pages/OralHistoryBrowser'
import OralHistoryCard from '../../src/components/site-pages/OralHistoryCard'
import { about, archive, oralHistories, type OralHistory } from '../../src/data/pages'

expect.extend(toHaveNoViolations)

// [nav label, page, <h1> text]
const pages: Array<[string, () => React.JSX.Element, string]> = [
  ['About Us', AboutUsPage, about.title],
  ['Archive', ArchivePage, archive.title],
  ['Oral Histories', OralHistoriesPage, oralHistories.title],
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
    const nav = screen.getByRole('navigation', { name: 'Main' })
    expect(within(nav).getByRole('link', { name: label })).toHaveAttribute('aria-current', 'page')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Page />)
    expect(await axe(container)).toHaveNoViolations()
  })
})

describe('About page tabs', () => {
  it("has the concept's five tabs, Our Story first", () => {
    render(<AboutUsPage />)
    const tabs = screen.getAllByRole('tab')
    expect(tabs.map((tab) => tab.textContent)).toEqual(about.tabs.map((tab) => tab.label))
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tabpanel')).toHaveTextContent(about.tabs[0].paragraphs[0])
  })

  it('switches tabs on click and with the arrow keys', () => {
    render(<AboutUsPage />)
    fireEvent.click(screen.getByRole('tab', { name: 'Financials' }))
    expect(screen.getByRole('tab', { name: 'Financials' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Coming soon.')

    fireEvent.keyDown(screen.getByRole('tab', { name: 'Financials' }), { key: 'ArrowRight' })
    expect(screen.getByRole('tab', { name: 'News' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: 'News' })).toHaveFocus()

    fireEvent.keyDown(screen.getByRole('tab', { name: 'News' }), { key: 'ArrowRight' })
    expect(screen.getByRole('tab', { name: 'Our Story' })).toHaveAttribute('aria-selected', 'true')
  })

  it('follows the URL fragment, also when it changes while the page is open', () => {
    window.history.replaceState(null, '', '#leadership')
    render(<AboutUsPage />)
    expect(screen.getByRole('tab', { name: 'Leadership' })).toHaveAttribute('aria-selected', 'true')

    act(() => {
      window.location.hash = '#board'
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    })
    expect(screen.getByRole('tab', { name: 'Board of Directors' })).toHaveAttribute(
      'aria-selected',
      'true'
    )
    window.history.replaceState(null, '', window.location.pathname)
  })

  it('Meet Our Leadership opens the Leadership tab', () => {
    render(<AboutUsPage />)
    fireEvent.click(screen.getByRole('button', { name: about.meetLeadership }))
    expect(screen.getByRole('tab', { name: 'Leadership' })).toHaveAttribute('aria-selected', 'true')
  })

  it('lists the five values', () => {
    render(<AboutUsPage />)
    const values = screen.getByRole('complementary', { name: about.valuesHeading })
    for (const { label } of about.values) {
      expect(within(values).getByText(label)).toBeInTheDocument()
    }
  })
})

describe('Archive page', () => {
  it("has the search bar, the concept's six type tiles and the collections", () => {
    render(<ArchivePage />)
    expect(screen.getByRole('searchbox', { name: archive.searchLabel })).toBeInTheDocument()
    const tiles = screen.getByRole('list', { name: archive.browseHeading })
    expect(
      within(tiles)
        .getAllByRole('listitem')
        .map((li) => li.textContent)
    ).toEqual(archive.types.map((t) => t.label))
    expect(within(tiles).getByRole('link', { name: 'Oral Histories' })).toHaveAttribute(
      'href',
      '/oral-histories'
    )
    for (const name of archive.collections) {
      expect(screen.getByRole('heading', { level: 3, name })).toBeInTheDocument()
    }
  })
})

describe('ArchiveBrowser', () => {
  const items = [
    {
      type: 'publication' as const,
      title: 'Example article',
      source: 'Example Times',
      url: 'https://example.com/a',
    },
    {
      type: 'photograph' as const,
      title: 'Example photo set',
      source: 'Example Archive',
      url: 'https://example.com/p',
    },
  ]
  const renderBrowser = (list = items) =>
    render(
      <ArchiveBrowser
        searchLabel={archive.searchLabel}
        searchPlaceholder={archive.searchPlaceholder}
        browseHeading={archive.browseHeading}
        types={archive.types}
        items={list}
        emptyMessage={archive.emptyMessage}
      />
    )

  it('shows nothing until someone searches or picks a type', () => {
    renderBrowser()
    expect(screen.queryByText('Example article')).toBeNull()
  })

  it('filters by search text', () => {
    renderBrowser()
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'photo' } })
    expect(screen.getByRole('link', { name: /Example photo set/ })).toHaveAttribute(
      'target',
      '_blank'
    )
    expect(screen.queryByText('Example article')).toBeNull()
  })

  it('toggles a type tile', () => {
    renderBrowser()
    const tile = screen.getByRole('button', { name: 'Publications' })
    fireEvent.click(tile)
    expect(tile).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('Example article')).toBeInTheDocument()
    expect(screen.queryByText('Example photo set')).toBeNull()
    fireEvent.click(tile)
    expect(tile).toHaveAttribute('aria-pressed', 'false')
  })

  it('explains an empty archive', () => {
    renderBrowser([])
    fireEvent.click(screen.getByRole('button', { name: 'Documents' }))
    expect(screen.getByText(archive.emptyMessage)).toBeInTheDocument()
  })
})

describe('Oral Histories page', () => {
  it('has the search bar, the four filters and the empty state', () => {
    render(<OralHistoriesPage />)
    expect(screen.getByRole('searchbox', { name: oralHistories.searchLabel })).toBeInTheDocument()
    for (const { label } of oralHistories.filters) {
      expect(screen.getByRole('combobox', { name: label })).toBeInTheDocument()
    }
    expect(oralHistories.entries).toHaveLength(0)
    expect(screen.getByText(oralHistories.emptyMessage)).toBeInTheDocument()
  })
})

describe('OralHistoryBrowser', () => {
  const make = (n: number, extra: Partial<OralHistory> = {}): OralHistory => ({
    id: `e${n}`,
    displayName: `Example ${n}.`,
    ...extra,
  })
  const entries = [
    make(1, { location: 'Baghdad', served: [2004, 2007], language: 'Arabic' }),
    make(2, { location: 'Basra', served: [2008, 2010], language: 'Kurdish' }),
    ...Array.from({ length: 10 }, (_, i) => make(i + 3)),
  ]
  const renderBrowser = () =>
    render(
      <OralHistoryBrowser
        entries={entries}
        searchLabel={oralHistories.searchLabel}
        searchPlaceholder={oralHistories.searchPlaceholder}
        filters={oralHistories.filters}
        pageSize={9}
        loadMore={oralHistories.loadMore}
        emptyMessage={oralHistories.emptyMessage}
        noMatches={oralHistories.noMatches}
      />
    )

  it('shows nine cards, then loads more', () => {
    renderBrowser()
    expect(screen.getAllByRole('article')).toHaveLength(9)
    fireEvent.click(screen.getByRole('button', { name: oralHistories.loadMore }))
    expect(screen.getAllByRole('article')).toHaveLength(12)
    expect(screen.queryByRole('button', { name: oralHistories.loadMore })).toBeNull()
  })

  it('filters by year within the years served', () => {
    renderBrowser()
    fireEvent.change(screen.getByRole('combobox', { name: 'Year' }), { target: { value: '2005' } })
    expect(screen.getAllByRole('article')).toHaveLength(1)
    expect(screen.getByRole('heading', { name: 'Example 1.' })).toBeInTheDocument()
  })

  it('lists only values present in the entries, and resets', () => {
    renderBrowser()
    const location = screen.getByRole('combobox', { name: 'Location' })
    expect(
      within(location)
        .getAllByRole('option')
        .map((o) => o.textContent)
    ).toEqual(['Location', 'Baghdad', 'Basra'])
    fireEvent.change(location, { target: { value: 'Basra' } })
    expect(screen.getAllByRole('article')).toHaveLength(1)
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'nobody' } })
    expect(screen.getByText(oralHistories.noMatches)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }))
    expect(screen.getAllByRole('article')).toHaveLength(9)
  })
})

describe('OralHistoryCard', () => {
  it('shows a neutral icon, not a photo, when none is approved', async () => {
    const { container } = render(
      <OralHistoryCard entry={{ id: 'a', displayName: 'Anonymous interpreter' }} />
    )
    expect(container.querySelector('img')).toBeNull()
    expect(screen.getByRole('heading', { level: 3, name: 'Anonymous interpreter' })).toBeVisible()
    expect(screen.queryByRole('link')).toBeNull()
    expect(await axe(container)).toHaveNoViolations()
  })

  it('shows an approved photo, place, years and Watch / Read links', async () => {
    const { container } = render(
      <OralHistoryCard
        entry={{
          id: 'b',
          displayName: 'Example N.',
          location: 'Baghdad',
          served: [2004, 2007],
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
    expect(screen.getByText('Baghdad')).toBeInTheDocument()
    expect(screen.getByText('2004–2007')).toBeInTheDocument()
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
