export type WorkLinkType = 'case-study' | 'github' | 'website'

export type CaseStudySection = {
  heading: string
  body: string[]
}

export type CaseStudy = {
  overview: string
  role: string
  timeline: string
  team: string
  liveUrl?: string
  liveLabel?: string
  results: { label: string; value: string }[]
  sections: CaseStudySection[]
  gallery: { src: string; caption: string }[]
}

export type Work = {
  slug: string
  name: string
  year: string
  category: string
  linkType: WorkLinkType
  href?: string
  selected?: boolean
  image: string
  tagline: string
  tech: string[]
  caseStudy?: CaseStudy
}

export type FeaturedProject = {
  slug: string
  name: string
  year: string
  image: string
  tagline: string
  problem: string
  solution: string
  tech: string[]
  results: { label: string; value: string }[]
}
