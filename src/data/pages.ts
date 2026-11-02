// Copy and content for the IWILF site pages (About Us, Archive, Oral
// Histories). Structure from Ali's design concept (issue #5) and his page
// notes (2026-11-02).
//
// Never invent content here. Sections Ali hasn't provided yet stay empty and
// the page shows a "coming soon" note. No interpreter names, faces or
// locations without Ali's explicit approval of each one: some interpreters and
// their families may still be at risk.

export const about = {
  title: 'About Us',
  intro:
    'Preserving the history, service, and legacy of Iraqi interpreters through archives, oral histories, research, and education.',
  missionHeading: 'Our Mission',
  // Ali's story, leadership and Board of Directors text and names go here
  // when he provides them (he plans names, titles and bios for this page).
  // Later: team and staff, annual reports, impact.
  pendingSections: ['Our Story', 'Leadership', 'Board of Directors'],
  valuesHeading: 'Our Values',
  // From the About page in Ali's design concept.
  values: ['Integrity', 'Accuracy', 'Respect', 'Service', 'Transparency'],
}

export type ArchiveType = 'article' | 'news' | 'photo' | 'video'

export interface ArchiveItem {
  type: ArchiveType
  title: string
  /** Publisher or channel, e.g. a newspaper or YouTube channel name. */
  source: string
  /** Link out to the original; videos are linked, not embedded (CSP). */
  url: string
  /** As published, e.g. '2008' or 'March 2011'. */
  date?: string
  description?: string
}

export const archive = {
  title: 'The Archive',
  intro:
    'Articles, news, photographs, and videos about the interpreters who served alongside U.S. and Coalition forces.',
  // "Browse by type", in the order Ali listed them.
  types: [
    { type: 'article', heading: 'Articles' },
    { type: 'news', heading: 'News' },
    { type: 'photo', heading: 'Photographs' },
    { type: 'video', heading: 'Videos' },
  ] satisfies Array<{ type: ArchiveType; heading: string }>,
  // Each item needs Ali's approval: public coverage can still name or show
  // people who are at risk.
  items: [] as ArchiveItem[],
}

export interface OralHistory {
  id: string
  /**
   * Exactly as Ali approves it for this person: a full name, a first name and
   * initial, or 'Anonymous interpreter'.
   */
  displayName: string
  /** Years of service, if approved, e.g. '2004–2007'. */
  served?: string
  summary: string
  /** File in public/Images/oral-histories/, only with the person's consent. */
  photo?: { file: string; alt: string }
  videoUrl?: string
  transcriptUrl?: string
}

export const oralHistories = {
  title: 'Oral Histories',
  intro:
    'Firsthand accounts from the men and women who served as interpreters during the Iraq War.',
  entries: [] as OralHistory[],
}
