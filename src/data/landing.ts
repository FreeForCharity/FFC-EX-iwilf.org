// Landing-page copy for the Iraq War Interpreters Legacy Foundation, taken from
// the design concept Ali attached to issue #5 (2026-09-30). Kept here rather
// than in site.config.ts so this content does not collide with FFC's in-flight
// rebrand PRs (#6 / #7).
//
// No interpreter names, faces, locations or statistics belong here until Ali
// approves each one.

export interface NavLink {
  label: string
  href: string
}

export interface MissionPillar {
  title: string
  description: string
}

export const orgName = 'Iraq War Interpreters Legacy Foundation'

// Ali's Zeffy form (issue #5, 2026-09-30). Linked out, not embedded: an iframe
// would need a CSP change, which is FFC's call. Move to siteConfig.donationUrl
// once the rebrand lands.
export const donateUrl = 'https://www.zeffy.com/en-US/donation-form/support-iwilfs-mission'

// Only sections that exist on the page. Archive, Oral Histories, Research,
// Education and About join this list when their pages are built.
export const navLinks: NavLink[] = [
  { label: 'Our Mission', href: '#mission' },
  { label: 'Support', href: '#support' },
]

export const hero = {
  titleLead: 'Alliance in Action:',
  title: 'Documenting the Heroism of Iraq War Interpreters',
  intro:
    'Preserving the history, service, and legacy of Iraqi interpreters through archives, oral histories, research, and education.',
}

export const mission = {
  heading: 'Our Mission',
  // Ali's official mission statement, word for word. Don't edit without his OK.
  statements: [
    'The Iraq War Interpreters Legacy Foundation preserves, documents, researches, interprets, and advances public understanding of the service, sacrifice, professionalism, and enduring legacy of the interpreters, translators, cultural advisors, and other language professionals who served alongside the United States and Coalition Forces during Operation Iraqi Freedom (2003–2011).',
    'The Foundation fulfills this mission through historical preservation, scholarly research, public education, recognition of distinguished service, institutional collaboration, and responsible stewardship of historical resources. By collecting and preserving primary historical sources, supporting evidence-based scholarship, promoting educational initiatives, and recognizing individual and collective contributions, the Foundation seeks to ensure that this important history remains permanently accessible for the benefit of present and future generations.',
  ],
  pillars: [
    { title: 'Preserve', description: 'Oral histories, documents, photos, and interviews.' },
    { title: 'Archive', description: 'Build and maintain a digital archive for generations.' },
    { title: 'Honor', description: 'Recognize acts of heroism and dedicated service.' },
    {
      title: 'Research',
      description: 'Support scholarly research and provide primary sources.',
    },
    { title: 'Educate', description: 'Inform military leaders, policymakers, and the public.' },
    { title: 'Convene', description: 'Host conferences, exhibitions, and public programs.' },
  ] satisfies MissionPillar[],
}

export const support = {
  heading: 'Help Preserve History',
  body: 'Your support makes it possible to record more stories, preserve vital documents, and educate future generations about the essential role Iraqi interpreters played during the Iraq War.',
}
