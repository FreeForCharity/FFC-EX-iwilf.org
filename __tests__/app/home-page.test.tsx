import React from 'react'
import { render, screen } from '@testing-library/react'

// Mock TeamMemberCard since TheFreeForCharityTeam uses it
jest.mock('../../src/components/ui/TeamMemberCard', () => {
  return function MockTeamMemberCard({
    name,
    role,
  }: {
    name: string
    role: string
    linkedinUrl?: string
  }) {
    return (
      <div data-testid="team-member-card">
        <span>{name}</span>
        <span>{role}</span>
      </div>
    )
  }
})

import HomePage from '../../src/app/home-page'
import { team } from '../../src/data/team'

describe('HomePage (app/home-page)', () => {
  it('should render without crashing', () => {
    render(<HomePage />)
  })

  it('should render one TheFreeForCharityTeam card per roster member', () => {
    // The roster may be empty (IWILF asked for no names yet, issue #5); the
    // Team section then renders nothing.
    render(<HomePage />)
    expect(screen.queryAllByTestId('team-member-card')).toHaveLength(team.length)
  })
})
