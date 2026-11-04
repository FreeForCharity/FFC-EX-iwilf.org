import React from 'react'
import { render, screen } from '@testing-library/react'

import HomePage from '../../src/app/home-page'

describe('HomePage (app/home-page)', () => {
  it('should render without crashing', () => {
    render(<HomePage />)
  })

  // Leadership names live on the About page, at Ali's request. The template's
  // team section would otherwise show them, or Free For Charity's sample team.
  it('should not render the team section', () => {
    const { container } = render(<HomePage />)
    expect(container.querySelector('#team')).toBeNull()
    expect(screen.queryByRole('heading', { name: /Team$/ })).toBeNull()
  })
})
