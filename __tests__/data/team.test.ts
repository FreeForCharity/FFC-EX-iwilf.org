import { team } from '../../src/data/team'

describe('Team data integrity', () => {
  // The roster is per-charity content, so its SIZE and its NAMES are not
  // asserted -- a rebrand replaces both. What must hold for every fork is that
  // every member is well-formed. The roster may be empty -- TheFreeForCharityTeam
  // then renders nothing (covered in that component's own suite); IWILF asked
  // for no leadership names on the site yet (issue #5).
  it('should export the roster as an array', () => {
    expect(Array.isArray(team)).toBe(true)
  })

  // A loop rather than it.each: it.each throws on an empty table.
  for (const member of team) {
    it(`team member "${member.name}" should have required fields`, () => {
      expect(member.name).toBeDefined()
      expect(typeof member.name).toBe('string')
      expect(member.name.trim().length).toBeGreaterThan(0)

      expect(member.role).toBeDefined()
      expect(typeof member.role).toBe('string')
      expect(member.role.trim().length).toBeGreaterThan(0)

      // Photos were removed in favor of initials monograms — no imageUrl field.
      expect('imageUrl' in member).toBe(false)

      // linkedinUrl is optional; when set it must be an https:// URL on
      // linkedin.com (or a subdomain) — the only shape TeamMemberCard turns into
      // a link (safeLinkedInUrl). Enforcing the host here means bad data fails
      // the suite instead of silently rendering as a non-link.
      if (member.linkedinUrl !== undefined) {
        expect(member.linkedinUrl).toMatch(/^https:\/\/([a-z0-9-]+\.)*linkedin\.com(\/|$)/i)
      }
    })
  }

  it('should have no duplicate names', () => {
    const names = team.map((m) => m.name)
    expect(new Set(names).size).toBe(names.length)
  })

  it('should carry a non-placeholder name and role for every member', () => {
    // Catches the half-finished rebrand: JSON copied from the template and
    // renamed to the new charity's file name, but never filled in.
    const placeholders = [/^your name$/i, /^full name$/i, /^team member$/i, /^tbd$/i, /^todo$/i]
    for (const member of team) {
      for (const placeholder of placeholders) {
        expect(member.name).not.toMatch(placeholder)
        expect(member.role).not.toMatch(placeholder)
      }
    }
  })
})
