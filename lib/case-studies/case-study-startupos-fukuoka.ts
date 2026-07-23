import type { Work } from '@/lib/work-types'

export const startupOsFukuokaCaseStudy: Work = {
  slug: 'startupos-fukuoka',
  name: 'StartupOS Fukuoka',
  year: '2026',
  category: 'SaaS · Program Operations',
  linkType: 'case-study',
  selected: true,
  image: '/images/works/startupos-fukuoka-founder-index-jp.png',
  tagline:
    'A bilingual program-ops portal for Japan’s Business Management Visa: checklists, forms, documents, and mentor handoffs in one invite-only app.',
  tech: [
    'Next.js 16',
    'React 19',
    'TypeScript',
    'Supabase (Auth, Postgres, RLS, Storage, Realtime)',
    'next-intl',
    'Tailwind CSS 4',
    'shadcn/ui',
    'Mapbox GL JS',
    'pdfmake',
    'Playwright',
    'Vitest',
    'Vercel',
  ],
  caseStudy: {
    overview:
      'Fukuoka’s Business Management Visa founders were stuck in PDF checklists, email/LINE document tennis, and Word-form revision loops, while staff and mentors had no shared view of progress. I designed and built StartupOS Fukuoka as a secure, bilingual (EN/JP) SaaS portal for founders, program staff, and mentors: visual phase progress, dependency-aware checklists with document gates, structured forms with immutable version review and PDF export, a private document vault, realtime program messaging that survives mentor handoffs, calendar, resource library, and an interactive Fukuoka map. The stack is Next.js on Vercel with Supabase Auth (email OTP), PostgreSQL Row Level Security, Storage, and Realtime, live as an invite-only prototype at startupos-fukuoka.vercel.app.',
    role: 'Founder & Full-stack Engineer',
    timeline: '2025–2026 · MVP build through early 2026; live prototype May 2026; pilot & partnership ongoing',
    team: 'Solo product build with program stakeholders (staff / mentor feedback for beta partnership)',
    liveUrl: 'https://startupos-fukuoka.vercel.app',
    liveLabel: 'startupos-fukuoka.vercel.app',
    results: [
      { label: 'Languages', value: 'EN + JP' },
      { label: 'Roles', value: 'Founder · Staff · Mentor' },
      { label: 'Access model', value: 'Invite-only OTP' },
    ],
    sections: [
      {
        heading: 'The problem',
        body: [
          'Founders on the Fukuoka Business Management Visa program navigated a manual, fragmented process: stale PDF checklists with outdated steps and prices, documents scattered across email and LINE, Word forms bouncing for weeks with no clear “latest version,” and no shared dashboard for staff or mentors. When mentors changed, context was lost in private threads. Housing, banks, and local services lived outside any single foreigner-friendly directory.',
          'The product had to serve three audiences at once (founders who need “what’s next,” staff who need cohort visibility and form review, and mentors who need scoped access to assigned founders) without becoming a public consumer app. Invite-only auth, bilingual UX, and database-enforced permissions were non-negotiable from day one.',
        ],
      },
      {
        heading: 'My approach',
        body: [
          'I built StartupOS as one city-ready program-ops platform rather than a slide-deck prototype: Next.js 16 App Router with React Server Components, locale routing via next-intl (founders default EN, staff default JA), and Supabase for auth, Postgres, private document storage, and realtime messaging. Every sensitive table is gated by PostgreSQL RLS keyed on auth.uid() and role helpers, with Next.js route guards as a second layer.',
          'The founder experience centers on a visual progress tracker (Pre-Japan → Business Startup Activities → In Japan → Before Leaving → Post-Japan) and a smart checklist with dependencies, required document uploads, and linked program forms. Staff get a cohort dashboard with health pills (on track / at risk / needs review), a form review queue with comments and immutable approved versions, and in-app checklist/form template admin so content can change without a developer deploy.',
        ],
      },
      {
        heading: 'Product & engineering details',
        body: [
          'Program forms are JSON schema–driven: founders autosave drafts, submit for review, and staff/mentors request changes or approve. Each submit creates an immutable form_submission_versions row; approved packets export to PDF and land in the documents vault with source = form_export. Messaging is a per-founder program channel with Realtime subscriptions; past mentors retain read-only access after handoff, and assignment history is audited.',
          'I also shipped calendar (react-big-calendar + date-fns locales), a bilingual resource library, Mapbox GL pins for immigration / banks / coworking / daily essentials, Vitest unit + RLS tests, and Playwright e2e coverage for auth and public smoke paths. The architecture is intentionally city-agnostic (checklist and form templates are configuration), so the same codebase could later serve other Japanese startup visa or soft-landing programs without a rewrite.',
        ],
      },
      {
        heading: 'Outcome',
        body: [
          'startupos-fukuoka.vercel.app is a live, invite-only MVP: founders can track phases, complete gated checklist steps, submit structured forms, store documents, and message their program team in English or Japanese; staff and mentors review forms, manage templates, and see cohort health at a glance. The prototype is pilot-ready and positioned as a SaaS launch with Fukuoka GBS invited as the first beta partner, replacing fragmented PDF/email ops with a single bilingual portal grounded in real visa-program workflows.',
        ],
      },
    ],
    gallery: [
      {
        src: '/images/works/case-studies/startupos-fukuoka-dashboard.png',
        caption: 'Founder dashboard: phase progress and dependency-aware next steps.',
      },
      {
        src: '/images/works/case-studies/startupos-fukuoka-checklist.png',
        caption: 'Smart checklist: required uploads and linked program forms.',
      },
      {
        src: '/images/works/case-studies/startupos-fukuoka-staff.png',
        caption: 'Staff cohort view: health status, form review, and founder assignments.',
      },
    ],
  },
}
