import {
  aicaCaseStudy,
  beekingCaseStudy,
  gfbInsuranceQuoteCaseStudy,
  keivanlifeCaseStudy,
  startupOsFukuokaCaseStudy,
} from './case-studies'
import type { FeaturedProject, Work } from './work-types'

export type {
  CaseStudy,
  CaseStudySection,
  FeaturedProject,
  Work,
  WorkLinkType,
} from './work-types'

export const WORKS: Work[] = [
  {
    slug: 'portals-pong',
    name: 'Portals Pong',
    year: '2017',
    category: 'Game · Web',
    linkType: 'github',
    href: 'https://github.com/shecodez/portals-pong',
    image: '/images/works/portals-pong-cover.png',
    tagline: 'A classic pong game with a portal twist (HTML5/Canvas/JS).',
    tech: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    slug: 'ikanban',
    name: 'iKanban',
    year: '2021',
    category: 'Open Source · Productivity',
    linkType: 'github',
    href: 'https://github.com/shecodez/ikanban',
    image: '/images/works/ikanban-board-en-v2-dark.png',
    tagline: 'Manage & Organize your Tasks, To-Dos, & Story Boards more easily!',
    tech: ['Vue', 'TypeScript', 'supabase', 'windicss'],
  },
  {
    slug: 'thetooltab',
    name: 'thetooltab.com',
    year: '2025',
    category: 'SaaS · Web Tools',
    linkType: 'website',
    href: 'https://thetooltab.com',
    image: '/images/works/thetooltab-index.png',
    tagline: 'A collection of free web tools to help you with your daily life.',
    tech: ['Nuxt.js', 'TypeScript', 'Shadcn/UI'],
  },
  startupOsFukuokaCaseStudy,
  {
    slug: 'holospace',
    name: 'holospace.app',
    year: '2023',
    category: 'Social Platform · Website',
    linkType: 'website',
    href: 'https://holospace-web.vercel.app/',
    image: '/images/works/holospace-chat.png',
    tagline: 'Real-time chat (text + voice) and 3D avatar (holo) spaces. React, Expo, Turborepo. Note: It\'s a hobby project.',
    tech: ['React', 'Expo', 'Turborepo', 'Tailwind CSS'],
  },
  {
    slug: 'gfbinsurance',
    name: 'gfbinsurance.com',
    year: '2021',
    category: 'Insurance · Website',
    linkType: 'website',
    href: 'https://gfbinsurance.com',
    image: '/images/works/gfbinsurance-index.png',
    tagline: 'Rebuilding an insurance member experience for clarity, speed, and accessibility.',
    tech: ['ASP.NET MVC', 'Razor Pages', 'jQuery/JS', 'Bootstrap'],
  },
  gfbInsuranceQuoteCaseStudy,
  {
    slug: 'southern-sakura',
    name: 'southernsakura.com',
    year: '2026',
    category: 'Brand · Website',
    linkType: 'website',
    href: 'https://southernsakura.com',
    image: '/images/works/southernsakura-index.png',
    tagline: 'A brand site blending Southern American roots with Japanese discovery into one warm identity.',
    tech: ['Next.js', 'TypeScript', 'Shadcn/UI'],
  },
  keivanlifeCaseStudy,
  aicaCaseStudy,
  beekingCaseStudy,
]

function sectionBodyToText(body: string[]): string {
  return body.join(' ')
}

export function getWork(slug: string): Work | undefined {
  return WORKS.find((w) => w.slug === slug)
}

export function getCaseStudies(): Work[] {
  return WORKS.filter((w) => w.linkType === 'case-study' && w.caseStudy)
}

export function getFeaturedProjects(): FeaturedProject[] {
  return WORKS.filter((w) => w.selected && w.caseStudy).map((work) => {
    const { caseStudy } = work
    const [problemSection, solutionSection] = caseStudy!.sections

    return {
      slug: work.slug,
      name: work.name,
      year: work.year,
      image: work.image,
      tagline: work.tagline,
      tech: work.tech,
      problem: sectionBodyToText(problemSection?.body ?? []),
      solution: sectionBodyToText(solutionSection?.body ?? []),
      results: caseStudy!.results,
    }
  })
}
