// Copy and content for the IWILF site pages (About, Archive, Oral Histories).
// Layout and wording follow the "Other pages" in Ali's design concept (issue
// #5), plus his page notes (2026-11-02).
//
// Never invent content here. Sections Ali hasn't provided yet stay empty and
// the page shows a "coming soon" note. No interpreter names, faces or
// locations without Ali's explicit approval of each one: some interpreters and
// their families may still be at risk. The concept's photos are illustrations,
// not approved images, so none are used.

import aliAlmrayatee from './team/ali-almrayatee.json'
import samerMatroud from './team/samer-matroud.json'

export type AboutTabId = 'our-story' | 'leadership'
export type ValueId = 'integrity' | 'accuracy' | 'respect' | 'service' | 'transparency'

export interface ProfileSection {
  /** Omitted for the opening paragraph of a bio. */
  heading?: string
  paragraphs: string[]
}

export interface LeaderProfile {
  name: string
  role: string
  sections: ProfileSection[]
}

export interface AboutTab {
  id: AboutTabId
  label: string
  paragraphs?: string[]
  profiles?: LeaderProfile[]
}

// Name and title come from src/data/team/; the bios are Ali's text (2026-11-04),
// word for word apart from two typo fixes and the removal of one date and
// company name from Samer's. Don't edit without his OK.
const leaders: LeaderProfile[] = [
  {
    ...aliAlmrayatee,
    sections: [
      {
        paragraphs: [
          "Ali Almrayatee is the Founder and Executive Director of the Iraq War Interpreters Legacy Foundation (IWILF), where he leads the Foundation's institutional development, historical preservation initiatives, research agenda, and educational mission. A former Iraqi combat interpreter who served alongside the United States military, Ali founded IWILF to address a significant gap in the historical understanding of the Iraq War: the largely undocumented contributions, operational experiences, and firsthand knowledge of Iraqi interpreters who served alongside American and Coalition forces.",
        ],
      },
      {
        heading: 'Professional Background',
        paragraphs: [
          "Ali's professional experience spans military operations, counterterrorism intelligence, diplomacy, government affairs, institutional development, and international business. During the Iraq War, he worked alongside the United States Army, Marine Corps, and Navy, participating in combat, intelligence, humanitarian, reconstruction, and civil affairs missions. His responsibilities also included supporting U.S.-led training initiatives for Iraqi police forces, political institutions, and local government authorities, as well as facilitating negotiations with Iraqi tribal and political leaders.",
          'In 2007, while serving alongside American forces at Haditha Dam, Ali helped disrupt an Al-Qaeda-planned terrorist attack inside a U.S. military installation, protecting American personnel, including U.S. Navy SEALs, Army Special Forces, and Marines of 1st Battalion, 3rd Marines. He also contributed to the organization and administration of high-level U.S. military engagements and official visits by American government and military officials throughout Iraq.',
          'Beyond operational assignments, Ali contributed to U.S.-supervised efforts to rebuild Iraqi governmental and security capabilities following 2003. His work included the development of the Strategic Crude Oil Pipeline Security Force, police intelligence capabilities, and improvements to the legal and judicial system in Anbar Governorate. He also advocated for the rights of Iraqi interpreters, addressing disputes with Iraqi authorities and the challenges faced by interpreters serving alongside U.S. forces.',
          'Following his military service, Ali served as a Marketing Expert for the Turkish Ministry of Economy and Assistant to the Turkish Commercial Attaché to Iraq. He subsequently joined the Iraqi Ministry of Foreign Affairs and later served as a Senior Security Advisor to the Chairman of the Legal Committee at the Iraqi Council of Representatives. His security advisory work included contributions to efforts associated with securing the release of U.S. veteran contractor hostages in 2016 and addressing the security challenges posed by ISIS.',
          'His private-sector experience includes serving as Middle East Operations Manager for a USMC veterans owned and operated military logistics contractor supporting Operation Inherent Resolve, the international campaign against ISIS in Iraq and Syria. He also held a Middle East business development position with U.S.–Iraqi military industries.',
          'Ali subsequently undertook counterterrorism intelligence work supporting U.S. government agencies, contributing to efforts to identify and disrupt terrorist networks and plots internationally.',
        ],
      },
      {
        heading: 'Education & Research',
        paragraphs: [
          "Ali holds a Master's degree in International Relations and Global Security from American Military University. He is an international security analyst whose areas of focus include counterterrorism, violent extremism, hybrid warfare, international security, and geopolitical affairs. His analysis and commentary have appeared in U.S. think tanks and news outlets. His academic background, combined with extensive operational and governmental experience, informs his analysis of regional security challenges, U.S. foreign policy, and the relationship between military operations and political developments.",
        ],
      },
      {
        heading: 'More About Ali',
        paragraphs: [
          "Ali's commitment to documenting the legacy of Iraqi interpreters is rooted in his own experience. Having served alongside American military personnel and participated in the operational, political, and institutional dimensions of the Iraq War, he understands that interpreters were often far more than linguistic intermediaries. They were trusted operational partners who helped bridge cultural, political, and institutional divides between American forces and Iraqi society.",
        ],
      },
    ],
  },
  {
    ...samerMatroud,
    sections: [
      {
        paragraphs: [
          "Samer Matroud is a Co-Founder and Board Member of the Iraq War Interpreters Legacy Foundation (IWILF), contributing extensive firsthand operational experience and historical knowledge to the Foundation's leadership. A former Iraqi military interpreter who served alongside U.S. Marine Corps and Army units during Operation Iraqi Freedom, Samer brings a unique understanding of the interpreters' role in combat operations, intelligence activities, military command, and engagement with Iraqi society.",
        ],
      },
      {
        heading: 'Professional Background',
        paragraphs: [
          'Samer served for six years alongside U.S. military forces in Iraq, working with multiple United States Marine Corps units throughout Anbar Governorate. His service also extended to the United States Army, with assignments in Baghdad, Mosul, and Wasit Governorates. Since mid-2006, he has served as an interpreter for USMC battalion commanders, gaining firsthand exposure to military operations at both tactical and command levels.',
          'His operational assignments encompassed combat patrols, counterinsurgency operations, intelligence collection, detainee interrogations, and meetings with locals. Beyond linguistic interpretation, he provided cultural and contextual analysis, facilitated engagements between American military personnel and Iraqi communities, and supported Military Transition Team (MiTT) operations involving joint activities and the training of Iraqi security forces.',
          'His responsibilities also extended into the political and institutional dimensions of the American-led campaign in Iraq. Samer participated in negotiations with tribal leaders and facilitated discussions addressing disputes and operational challenges involving Iraqi government officials, military commanders, and law enforcement authorities. These engagements provided him with direct insight into Iraqi governmental institutions, local power structures, tribal relationships, and societal dynamics during the post-2003 period.',
          'Throughout his military service, Samer also advocated for the rights and professional recognition of Iraqi interpreters, addressing issues affecting their treatment and working relationships with Iraqi authorities while serving alongside U.S. armed forces.',
          'In 2006, while serving with 3rd Battalion, 3rd Marines, Samer was seriously wounded by an improvised explosive device (IED). Despite his injuries, he maintained his composure, received initial medical assistance, and insisted on continuing his responsibilities as the squad interpreter. Before proceeding to medical evacuation vehicles, he interviewed local Iraqis, demonstrating extraordinary commitment to his duties under combat conditions. In recognition of his conduct and courage during this incident, he was recommended by the U.S. Marine Corps for the Defense of Freedom Medal.',
          'His courage was further demonstrated on June 14, 2006, when he risked his life to assist in the extraction of a fatally wounded Marine under enemy fire. These incidents represent defining examples of his commitment to the American personnel alongside whom he served and the responsibilities he carried as an interpreter in combat environments.',
        ],
      },
      {
        heading: 'Education',
        paragraphs: [
          "Samer holds a Bachelor's degree in Chemical Engineering. His academic background complements his extensive operational experience, reflecting a technical and analytical foundation alongside his years of military service and engagement with complex political, cultural, and institutional environments in Iraq.",
        ],
      },
      {
        heading: 'More About Samer',
        paragraphs: [
          "Samer's commitment to IWILF is rooted in his belief that the history of the Iraq War cannot be fully understood without the firsthand knowledge of the Iraqi interpreters who served alongside American forces. Having participated directly in combat operations, intelligence activities, negotiations, and engagements with Iraqi communities and institutions, he understands the extent to which interpreters contributed to the implementation of military objectives and the broader American mission in Iraq.",
          'Through his leadership at IWILF, Samer seeks to help preserve this missing dimension of the historical record, ensuring that the experiences of interpreters are documented through firsthand testimony, historical research, and institutional archives.',
        ],
      },
    ],
  },
]

export const about = {
  title: 'About the Foundation',
  intro:
    'The Iraq War Interpreters Legacy Foundation is dedicated to preserving the history, service, and legacy of Iraqi interpreters through archives, research, education, and public engagement.',
  // Ali removed the concept's Board of Directors, Financials and News tabs
  // until there is content for them (2026-11-04).
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
    { id: 'leadership', label: 'Leadership', profiles: leaders },
  ] as AboutTab[],
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
