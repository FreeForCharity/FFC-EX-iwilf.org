// Copy and content for the IWILF site pages (About, Archive, Oral Histories).
// Layout and wording follow the "Other pages" in Ali's design concept (issue
// #5), plus his page notes (2026-11-02).
//
// Never invent content here. Sections Ali hasn't provided yet stay empty and
// the page shows a "coming soon" note. No interpreter names, faces or
// locations without Ali's explicit approval of each one: some interpreters and
// their families may still be at risk. The concept's photos are illustrations,
// not approved images, so none are used.

export type AboutTabId = 'our-story' | 'leadership' | 'board' | 'financials' | 'news'
export type ValueId = 'integrity' | 'accuracy' | 'respect' | 'service' | 'transparency'

export interface AboutTab {
  id: AboutTabId
  label: string
  /** Empty until Ali provides the text; the tab then shows "coming soon". */
  paragraphs: string[]
}

export const about = {
  title: 'About the Foundation',
  intro:
    'The Iraq War Interpreters Legacy Foundation is dedicated to preserving the history, service, and legacy of Iraqi interpreters through archives, research, education, and public engagement.',
  // The concept's five tabs. Ali plans names, titles and bios for Leadership
  // and the Board; later the page grows to team and staff, annual reports and
  // impact.
  tabs: [
    {
      id: 'our-story',
      label: 'Our Story',
      // Wording from the concept's Our Story tab.
      paragraphs: [
        'Founded to ensure that the sacrifices and contributions of Iraqi interpreters are never forgotten, our foundation serves as the trusted steward of their history.',
        'We work with veterans, scholars, families, and institutions to collect, preserve, and share the stories that shaped a generation.',
      ],
    },
    { id: 'leadership', label: 'Leadership', paragraphs: [] },
    { id: 'board', label: 'Board of Directors', paragraphs: [] },
    { id: 'financials', label: 'Financials', paragraphs: [] },
    { id: 'news', label: 'News', paragraphs: [] },
  ] satisfies AboutTab[],
  meetLeadership: 'Meet Our Leadership',
  valuesHeading: 'Our Values',
  values: [
    { id: 'integrity', label: 'Integrity' },
    { id: 'accuracy', label: 'Accuracy' },
    { id: 'respect', label: 'Respect' },
    { id: 'service', label: 'Service' },
    { id: 'transparency', label: 'Transparency' },
  ] satisfies Array<{ id: ValueId; label: string }>,
}

export type ArchiveType =
  'document' | 'oral-history' | 'photograph' | 'interview' | 'map' | 'publication'

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
  title: 'The Archives',
  intro:
    'Search and explore our digital collections of documents, photographs, interviews, and historical records.',
  searchLabel: 'Search the archive',
  searchPlaceholder: 'Search the archive...',
  browseHeading: 'Browse by Type',
  // The concept's six tiles. Ali's notes (articles, news, photos, YouTube)
  // fit as Publications, Photographs and Interviews. Oral Histories has its
  // own page, so that tile links there.
  types: [
    { type: 'document', label: 'Documents' },
    { type: 'oral-history', label: 'Oral Histories', href: '/oral-histories' },
    { type: 'photograph', label: 'Photographs' },
    { type: 'interview', label: 'Interviews' },
    { type: 'map', label: 'Maps' },
    { type: 'publication', label: 'Publications' },
  ] satisfies Array<{ type: ArchiveType; label: string; href?: string }>,
  collectionsHeading: 'Popular Collections',
  // Collection names from the concept; each opens once it has items.
  collections: [
    'Operation Iraqi Freedom',
    'Interpreter Recognition',
    'Embedded Teams',
    'Special Immigrant Visa',
  ],
  emptyMessage: 'Archive items will appear here as they are published.',
  // Each item needs Ali's approval: public coverage can still name or show
  // people who are at risk.
  items: [] as ArchiveItem[],
}

export interface OralHistory {
  id: string
  /**
   * Exactly as Ali approves it for this person: a full name, a first name and
   * initial (as in the concept, e.g. "Ali H."), or 'Anonymous interpreter'.
   */
  displayName: string
  /** City or region, only if approved. */
  location?: string
  /** Years of service as [first, last], only if approved. */
  served?: [number, number]
  unit?: string
  language?: string
  /** File in public/Images/oral-histories/, only with the person's consent. */
  photo?: { file: string; alt: string }
  videoUrl?: string
  transcriptUrl?: string
}

export const oralHistories = {
  title: 'Oral Histories',
  intro:
    'Firsthand accounts from the men and women who served as interpreters during the Iraq War.',
  searchLabel: 'Search interviews',
  searchPlaceholder: 'Search interviews...',
  // The concept's four filters; each lists only values present in entries.
  filters: [
    { key: 'year', label: 'Year' },
    { key: 'location', label: 'Location' },
    { key: 'unit', label: 'Unit' },
    { key: 'language', label: 'Language' },
  ] as const,
  pageSize: 9,
  loadMore: 'Load More Interviews',
  emptyMessage: 'Interviews will appear here as they are published.',
  noMatches: 'No interviews match these filters.',
  entries: [] as OralHistory[],
}
