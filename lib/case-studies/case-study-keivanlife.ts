import type { Work } from '@/lib/work-types'

export const keivanlifeCaseStudy: Work = {
  slug: 'keivanlife',
  name: 'keivanlife.com',
  year: '2025',
  category: 'Travel · Remote Work · Full-Stack Product',
  linkType: 'case-study',
  image: '/images/works/keivanlife-index.png',
  tagline:
    'Half Work, Half Adventure, Total Freedom: a connectivity-aware planner for remote workers exploring Kyushu, Japan.',
  tech: [
    'Next.js 15',
    'React 19',
    'TypeScript',
    'tRPC',
    'Drizzle ORM',
    'Neon + PostGIS',
    'Clerk',
    'MapLibre',
    'OpenRouter / Gemini',
    'UploadThing',
    'Upstash Redis',
    'TanStack Form + Zod',
    'Tailwind CSS 4',
    'pnpm + Turborepo',
    'Netlify',
  ],
  caseStudy: {
    overview:
      'KeiVanLife (軽半ライフ) helps digital nomads plan remote-work travel across Kyushu without connectivity surprises. I designed and built the full product end to end: a Next.js App Router web app for workspace discovery, community connectivity reports, and VanAI itinerary planning that schedules work blocks around Wi‑Fi and meetings while leaving room for exploration. The stack is a create-t3-turbo-style monorepo (Neon PostgreSQL with PostGIS, Drizzle, Clerk auth, MapLibre maps, UploadThing photos, and OpenRouter-backed structured itinerary generation) deployed on Netlify.',
    role: 'Founder / Full-Stack Engineer',
    timeline: '2025–2026 · Primary build Apr–Jun 2025, light maintenance into 2026',
    team: 'Solo builder: product, schema, UI, AI planner, maps, auth, and CI/CD',
    liveUrl: 'https://keivanlife.com',
    liveLabel: 'keivanlife.com',
    results: [
      { label: 'Core pillars', value: 'Connectivity · Workspaces · AI itineraries' },
      { label: 'Focus region', value: 'Kyushu, Japan' },
      { label: 'Ownership', value: 'Solo end-to-end MVP' },
    ],
    sections: [
      {
        heading: 'The problem',
        body: [
          'Remote workers exploring southern Japan still have to guess whether a café, michi-no-eki, or rural stretch can support a video call. Connectivity data, work-friendly spaces, and trip planning live in separate tools, so people either over-index on tourist hubs or risk dead zones during critical work hours.',
          'KeiVanLife needed a single product surface: contribute and browse connectivity intel, discover remote-work-friendly workspaces, and generate itineraries that treat productivity constraints (meetings, minimum speeds, quiet environments) as first-class inputs, not an afterthought bolted onto a generic travel planner.',
        ],
      },
      {
        heading: 'My approach',
        body: [
          'I built the platform as a TypeScript monorepo (pnpm + Turborepo) with Next.js as the BFF: App Router pages, server query modules, and route handlers over a Drizzle schema on Neon with PostGIS enabled for geo-aware data. Clerk handles auth; shared UI lives in an internal design-system package; UploadThing covers workspace and review photos.',
          'The itinerary path is the product differentiator: a multi-step planner captures work schedules, critical meetings, dual timezones, connectivity needs, and travel interests, then VanAI (OpenRouter → Gemini with structured JSON output) returns stops plus backup plans for rain or weak connectivity. Community itineraries, dashboards, profiles, contribution leaderboards, and a markdown blog round out the MVP loop of discover → contribute → plan → save/share.',
        ],
      },
      {
        heading: 'Product & engineering details',
        body: [
          'Domain model covers workspaces (cafés, coworking, libraries, hotels, michi-no-eki, and more) with amenities, reviews, and photo galleries; connectivity speed-test reports with voting; itineraries and stops with engagement (likes, bookmarks, saves, views); user preferences for work/travel/connectivity; and persisted AI metadata (model, tokens, cost, latency) for each generated plan.',
          'Maps use MapLibre with Carto basemaps on workspace and itinerary views. Rate limiting runs through Upstash Redis; env validation uses T3 Env; CI/CD is GitHub Actions into Netlify. I kept honesty in scope: the connectivity map UI ships, but some layers still use sample points; subscriptions appear in schema/settings without a live payment provider; Expo mobile and admin tooling remain on the roadmap.',
        ],
      },
      {
        heading: 'Outcome',
        body: [
          'keivanlife.com is a substantial solo MVP for connectivity-aware remote-work travel in Kyushu: authenticated users can browse and review workspaces, submit connectivity reports, generate and edit VanAI itineraries, browse community plans, and manage profiles and preferences. The codebase is a coherent full-stack product foundation, ready for live map data wiring, billing, mobile, and ops hardening, and a clear portfolio piece for end-to-end ownership from problem framing through schema, AI, and deploy.',
        ],
      },
    ],
    gallery: [
      {
        src: '/images/works/case-studies/keivanlife-connectivity-map.png',
        caption: 'Connectivity map: remote-work-friendly locations across Kyushu.',
      },
      {
        src: '/images/works/case-studies/keivanlife-itinerary.png',
        caption: 'VanAI itinerary planner: work schedule and connectivity-aware trip generation.',
      },
      {
        src: '/images/works/case-studies/keivanlife-workspace.png',
        caption: 'Workspace directory entry: a remote-work-friendly location (details, wifi speed, seating, and reviews).',
      },
    ],
  },
}
