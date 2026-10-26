import React from 'react'
import { render, screen, within } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

import SiteHeader from '../../src/components/site-header'
import Hero from '../../src/components/home-page/Hero'
import MissionSection from '../../src/components/home-page/MissionSection'
import SupportSection from '../../src/components/home-page/SupportSection'
import { donateUrl, mission, navLinks } from '../../src/data/landing'

expect.extend(toHaveNoViolations)

const expectSafeDonateLink = (link: HTMLElement) => {
  expect(link).toHaveAttribute('href', donateUrl)
  expect(link).toHaveAttribute('target', '_blank')
  expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
}

describe('SiteHeader', () => {
  it('renders a banner with the main navigation', () => {
    render(<SiteHeader />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
    const nav = screen.getByRole('navigation', { name: 'Main' })
    for (const link of navLinks) {
      expect(within(nav).getByRole('link', { name: link.label })).toHaveAttribute('href', link.href)
    }
  })

  it('links Donate to the Zeffy form in a new tab', () => {
    render(<SiteHeader />)
    expectSafeDonateLink(screen.getByRole('link', { name: /donate/i }))
  })

  it('only links to sections that exist on the landing page', () => {
    const sectionIds = ['#mission', '#support']
    for (const link of navLinks) {
      expect(sectionIds).toContain(link.href)
    }
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<SiteHeader />)
    expect(await axe(container)).toHaveNoViolations()
  })
})

describe('Hero', () => {
  it('renders the single page heading', () => {
    render(<Hero />)
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveTextContent('Documenting the Heroism of Iraq War Interpreters')
  })

  it('offers the mission anchor and the donation link', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: 'Our Mission' })).toHaveAttribute('href', '#mission')
    expectSafeDonateLink(screen.getByRole('link', { name: /support the foundation/i }))
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Hero />)
    expect(await axe(container)).toHaveNoViolations()
  })
})

describe('MissionSection', () => {
  it('renders the mission anchor and every pillar', () => {
    const { container } = render(<MissionSection />)
    expect(container.querySelector('#mission')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Our Mission' })).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(mission.pillars.length)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<MissionSection />)
    expect(await axe(container)).toHaveNoViolations()
  })
})

describe('SupportSection', () => {
  it('renders the support anchor and donation link', () => {
    const { container } = render(<SupportSection />)
    expect(container.querySelector('#support')).toBeInTheDocument()
    expectSafeDonateLink(screen.getByRole('link', { name: /donate now/i }))
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<SupportSection />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
