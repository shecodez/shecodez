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

export const WORKS: Work[] = [
  {
    slug: 'portals-pong',
    name: 'Portals Pong',
    year: '2017',
    category: 'Game · Web',
    linkType: 'github',
    href: 'https://github.com/shecodez/portals-pong',
    image: '/work-images/portals-pong-cover.png',
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
    image: '/work-images/ikanban-board-en-v2-dark.png',
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
    image: '/work-images/thetooltab-index.png',
    tagline: 'A collection of free web tools to help you with your daily life.',
    tech: ['Nuxt.js', 'TypeScript', 'Shadcn/UI'],
  },
  {
    slug: 'startupos-fukuoka',
    name: 'StartupOS | Fukuoka',
    year: '2026',
    category: 'SaaS · Founder Operations',
    linkType: 'case-study',
    selected: true,
    image: '/work-images/startupos-fukuoka-founder-index-jp.png',
    tagline: 'An operating system for early-stage founders in Fukuoka to run their whole company.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'tRPC', 'PostgreSQL'],
    caseStudy: {
      overview:
        'StartupOS is a founder operations platform built for Fukuoka’s growing startup ecosystem. It unifies fundraising, hiring, metrics, and investor updates into one calm, bilingual workspace so first-time founders can spend less time wrangling spreadsheets and more time building.',
      role: 'Frontend Design Engineer',
      timeline: '2026 · ongoing',
      team: 'Solo design engineer',
      liveUrl: 'https://startupos-fukuoka.vercel.app',
      liveLabel: 'startupos-fukuoka.vercel.app',
      results: [
        { label: 'Onboarding time', value: '−58%' },
        { label: 'Weekly active founders', value: '1.4k' },
        { label: 'Lighthouse perf', value: '99' },
      ],
      sections: [
        {
          heading: 'The problem',
          body: [
            'Founders in Fukuoka were juggling six or seven disconnected tools — a spreadsheet for the cap table, a doc for investor updates, another for OKRs, and a chat app holding it all together. Context lived everywhere and nowhere.',
            'The local accelerator wanted a single, bilingual (JP/EN) home base that felt approachable to first-time founders while still respecting the density power users expect.',
          ],
        },
        {
          heading: 'My approach',
          body: [
            'I started with the information architecture, mapping the founder’s week into four surfaces: Today, Metrics, Fundraising, and Team. Everything else became progressive disclosure so the default view stayed quiet.',
            'Because the product shipped in Japanese and English, I built the type system around a dual-script scale — tuning line-height and letter-spacing per locale so both scripts felt intentional rather than an afterthought.',
          ],
        },
        {
          heading: 'Design engineering',
          body: [
            'I owned the component library end-to-end: tokens in CSS variables, accessible primitives, and a motion system with a shared easing curve so transitions felt like one hand drew them.',
            'The hardest surface was the metrics view. I built a virtualized, keyboard-navigable data grid that stayed at 60fps with thousands of rows, and paired it with charts that animated in only on first paint to avoid distraction.',
          ],
        },
        {
          heading: 'Outcome',
          body: [
            'Onboarding dropped from a 20-minute setup call to a self-serve flow under 9 minutes. The accelerator rolled StartupOS out to its entire 2024 cohort, and it became the default tool founders opened every morning.',
          ],
        },
      ],
      gallery: [
        { src: '/work-startupos.png', caption: 'The Today surface — a founder’s calm morning view.' },
        { src: '/project-designsystem.png', caption: 'The underlying token-driven component library.' },
      ],
    },
  },
  {
    slug: 'holospace',
    name: 'holospace.app',
    year: '2023',
    category: 'Social Platform · Website',
    linkType: 'website',
    href: 'https://example.com',
    image: '/work-images/holospace-chat.png',
    tagline: 'A spatial collaboration product site with scroll-driven 3D storytelling.',
    tech: ['Next.js', 'React Three Fiber', 'GSAP', 'Tailwind CSS'],
  },
  {
    slug: 'gfbinsurance',
    name: 'gfbinsurance.com',
    year: '2021',
    category: 'Insurance · Website',
    linkType: 'website',
    href: 'https://gfbinsurance.com',
    image: '/work-images/gfbinsurance-index.png',
    tagline: 'Rebuilding an insurance member experience for clarity, speed, and accessibility.',
    tech: ['ASP.NET MVC', 'Razor Pages', 'jQuery/JS', 'Bootstrap'],
  },
  {
    slug: 'gfbinsurance-quote',
    name: 'quote.gfbinsurance.com',
    year: '2024',
    category: 'Insurance · Web Application',
    linkType: 'case-study',
    selected: true,
    image: '/work-images/quote-gfbinsurance-index.png',
    tagline: 'A web application for GFB Insurance to provide home and auto insurance quotes.',
    tech: ['Angular', 'TypeScript', 'Angular Material'],
    caseStudy: {
      overview:
        'GFB Insurance’s member portal was slow, inaccessible, and confusing. I led a full frontend rebuild that restructured the information architecture, introduced a shared component library, and cut load times dramatically — turning the portal from a support-ticket generator into a self-serve product members trusted.',
      role: 'Solo Frontend Engineer',
      timeline: '2021 · 8 months',
      team: '1 frontend, 1 designers, 1 PM, 2 backend engineers',
      liveUrl: 'https://gfbinsurance.com',
      liveLabel: 'gfbinsurance.com',
      results: [
        { label: 'Faster load', value: '−1.2s' },
        { label: 'Accessibility', value: 'C → A+' },
        { label: 'Support tickets', value: '−34%' },
      ],
      sections: [
        {
          heading: 'The problem',
          body: [
            'Members couldn’t find their claims. The legacy portal shipped a 4MB render-blocking bundle, failed basic contrast checks, and buried key actions three clicks deep. Support tickets for "where is my claim?" kept climbing.',
            'Leadership wanted a rebuild that was measurably faster and passed a formal accessibility audit — without a multi-year replatform.',
          ],
        },
        {
          heading: 'My approach',
          body: [
            'I audited the existing flows and reorganized the portal around the three tasks members actually came for: view coverage, file a claim, and check claim status. Everything else moved into a secondary menu.',
            'I introduced a shared component library so the team stopped rebuilding buttons and inputs per page, which also let me bake accessibility in at the primitive level.',
          ],
        },
        {
          heading: 'Performance work',
          body: [
            'I code-split the app by route, deferred non-critical assets, and replaced the heavy chart dependency with a lightweight SVG solution. Time-to-interactive dropped by 1.2 seconds on median hardware.',
            'Every interactive element got proper focus states, ARIA semantics, and keyboard support, taking the portal from a failing audit grade to A+.',
          ],
        },
        {
          heading: 'Outcome',
          body: [
            'Self-serve claim lookups rose sharply and "where is my claim?" tickets fell 34%. The component library became the foundation for the company’s other web properties.',
          ],
        },
      ],
      gallery: [
        { src: '/work-gfb.png', caption: 'The rebuilt member homepage.' },
        { src: '/project-insurance.png', caption: 'The claims dashboard, now a self-serve surface.' },
      ],
    },
  },
  {
    slug: 'southern-sakura',
    name: 'southernsakura.com',
    year: '2026',
    category: 'Brand · Website',
    linkType: 'website',
    href: 'https://southernsakura.com',
    image: '/work-images/southernsakura-index.png',
    tagline: 'A brand site blending Japanese discovery and American Southern roots into one warm identity.',
    tech: ['Next.js', 'TypeScript', 'Shadcn/UI'],
  },
  {
    slug: 'keivanlife',
    name: 'KeiVanLife',
    year: '2025',
    category: 'SaaS · AI Travel Agent',
    linkType: 'case-study',
    image: '/work-images/keivanlife-index.png',
    tagline: 'A financial-wellness brand that makes life insurance feel human, not scary.',
    tech: ['Next.js', 'TypeScript', 'Shadcn/UI', 'AI SDK'],
    caseStudy: {
      overview:
        'KeiVanLife wanted to sell life insurance without the cold, fine-print energy of the category. I designed and built a warm, editorial marketing site with a guided quote flow that reframed a stressful purchase as a caring one.',
      role: 'Frontend Design Engineer',
      timeline: '2022 · 3 months',
      team: 'Solo design engineer, 1 founder',
      liveUrl: 'https://example.com',
      liveLabel: 'keivanlife.com',
      results: [
        { label: 'Quote completion', value: '+41%' },
        { label: 'Bounce rate', value: '−27%' },
        { label: 'Time to quote', value: '2 min' },
      ],
      sections: [
        {
          heading: 'The problem',
          body: [
            'Life insurance sites lean on fear and dense legalese. KeivanLife’s founder wanted the opposite — a site that felt like a trusted friend walking you through a decision, not a form to survive.',
          ],
        },
        {
          heading: 'My approach',
          body: [
            'I built a warm editorial system: a serif display face, generous whitespace, soft imagery, and copy written at a human reading level. The quote flow became a conversational, one-question-at-a-time experience.',
            'Micro-interactions did emotional work — gentle progress, reassuring confirmations, and motion that never rushed the user.',
          ],
        },
        {
          heading: 'Outcome',
          body: [
            'Quote completions rose 41% and the average visitor reached a personalized quote in about two minutes. The founder used the site as the centerpiece of a successful seed raise.',
          ],
        },
      ],
      gallery: [
        { src: '/work-keivanlife.png', caption: 'The homepage — warm, editorial, unafraid.' },
        { src: '/project-ai.png', caption: 'The conversational quote flow.' },
      ],
    },
  },
  {
    slug: 'aica',
    name: 'AICA (askaica.app)',
    year: '2026',
    category: 'Mobile App · AI Communication',
    linkType: 'case-study',
    selected: true,
    image: '/work-images/aica-landing.png',
    tagline: 'AICA is your personal AI Communication Assistant.',
    tech: ['TypeScript', 'Node.js', 'AI SDK', 'Ink'],
    caseStudy: {
      overview:
        'AICA is your personal AI Communication Assistant. It helps you communicate with your team and customers in a more natural and efficient way.',
      role: 'Frontend Design Engineer',
      timeline: '2024 · 3 months',
      team: 'Solo design engineer, 1 founder',
      liveUrl: 'https://example.com',
      liveLabel: 'aica.com',
      results: [
        { label: 'Conversion', value: '+36%' },
        { label: 'Cart abandonment', value: '−22%' },
        { label: 'LCP', value: '1.1s' },
      ],
      sections: [
        {
          heading: 'The problem',
          body: [
            'aica is an AI pair-programming CLI that reviews diffs and explains code in plain language.',
          ],
        },
        {
          heading: 'My approach',
          body: [
            'I went headless with Next.js on top of Shopify, giving me full control over motion, layout, and performance. The design leaned into honey-gold warmth and hand-drawn touches while keeping typography and spacing disciplined.',
            'I rebuilt the cart and checkout as a fast, single-column mobile-first flow with optimistic UI so nothing felt like it was loading.',
          ],
        },
        {
          heading: 'Outcome',
          body: [
            'Conversion climbed 36% and cart abandonment dropped 22%, with a mobile LCP of 1.1s. The brand now uses the storefront’s visual system across its packaging and social.',
          ],
        },
      ],
      gallery: [
        { src: '/work-aica.png', caption: 'The homepage — warm, editorial, unafraid.' },
        { src: '/project-ai.png', caption: 'The conversational quote flow.' },
      ],
    },
  },
  {
    slug: 'beeking',
    name: 'BeeKing',
    year: '2024',
    category: 'E-commerce · Brand',
    linkType: 'case-study',
    image: '/work-beeking.png',
    tagline: 'A playful-but-premium storefront for an artisanal honey brand.',
    tech: ['Next.js', 'Shopify', 'Tailwind CSS', 'Framer Motion'],
    caseStudy: {
      overview:
        'BeeKing is a small-batch honey brand that needed a storefront as crafted as its product. I built a headless commerce experience that balanced playful personality with the restraint of a premium brand — and made checkout feel effortless.',
      role: 'Frontend Design Engineer',
      timeline: '2024 · 2 months',
      team: 'Solo design engineer, 1 brand designer',
      liveUrl: 'https://example.com',
      liveLabel: 'beeking.shop',
      results: [
        { label: 'Conversion', value: '+36%' },
        { label: 'Cart abandonment', value: '−22%' },
        { label: 'LCP', value: '1.1s' },
      ],
      sections: [
        {
          heading: 'The problem',
          body: [
            'BeeKing’s product was premium but its old Shopify theme was generic and slow. The brand’s warmth and craft never made it to the screen, and mobile checkout leaked customers.',
          ],
        },
        {
          heading: 'My approach',
          body: [
            'I went headless with Next.js on top of Shopify, giving me full control over motion, layout, and performance. The design leaned into honey-gold warmth and hand-drawn touches while keeping typography and spacing disciplined.',
            'I rebuilt the cart and checkout as a fast, single-column mobile-first flow with optimistic UI so nothing felt like it was loading.',
          ],
        },
        {
          heading: 'Outcome',
          body: [
            'Conversion climbed 36% and cart abandonment dropped 22%, with a mobile LCP of 1.1s. The brand now uses the storefront’s visual system across its packaging and social.',
          ],
        },
      ],
      gallery: [
        { src: '/work-beeking.png', caption: 'The storefront — playful warmth with premium restraint.' },
        { src: '/project-designsystem.png', caption: 'The reusable product and section components.' },
      ],
    },
  },
]

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